import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

// Remove audio tracks from non-fragmented MP4 without re-encoding the video.
function boxes(buffer, start = 0, end = buffer.length) {
  const list = [];
  for (let offset = start; offset < end;) {
    if (offset + 8 > end) throw Error('Cabeçalho MP4 incompleto');
    let size = buffer.readUInt32BE(offset),
      header = 8;
    if (size === 1) {
      size = Number(buffer.readBigUInt64BE(offset + 8));
      header = 16;
    }
    if (size === 0) size = end - offset;
    if (size < header || offset + size > end) throw Error('Caixa MP4 inválida');
    list.push({
      type: buffer.toString('ascii', offset + 4, offset + 8),
      start: offset,
      end: offset + size,
      header,
    });
    offset += size;
  }
  return list;
}
function child(buffer, parent, type) {
  return boxes(buffer, parent.start + parent.header, parent.end).find(
    (box) => box.type === type,
  );
}
function handler(buffer, track) {
  const media = child(buffer, track, 'mdia');
  const info = media && child(buffer, media, 'hdlr');
  return info
    ? buffer.toString(
        'ascii',
        info.start + info.header + 8,
        info.start + info.header + 12,
      )
    : '';
}
function silence(buffer) {
  const top = boxes(buffer);
  if (top.some((box) => box.type === 'moof'))
    throw Error('MP4 fragmentado requer remux externo');
  const moov = top.find((box) => box.type === 'moov');
  if (!moov || moov.header !== 8) throw Error('Estrutura moov não suportada');
  const contents = boxes(buffer, moov.start + moov.header, moov.end);
  const audio = contents.filter(
    (box) => box.type === 'trak' && handler(buffer, box) === 'soun',
  );
  if (!audio.length) return { buffer, removed: 0 };
  const delta = -audio.reduce((total, box) => total + box.end - box.start, 0);
  const kept = contents
    .filter((box) => !audio.includes(box))
    .map((box) => Buffer.from(buffer.subarray(box.start, box.end)));
  const containers = new Set(['trak', 'mdia', 'minf', 'stbl']);
  function adjust(data, start = 0, end = data.length) {
    for (const box of boxes(data, start, end)) {
      if (containers.has(box.type))
        adjust(data, box.start + box.header, box.end);
      if (box.type !== 'stco' && box.type !== 'co64') continue;
      const base = box.start + box.header;
      const count = data.readUInt32BE(base + 4);
      for (let index = 0; index < count; index++) {
        const pos = base + 8 + index * (box.type === 'stco' ? 4 : 8);
        const old =
          box.type === 'stco'
            ? data.readUInt32BE(pos)
            : Number(data.readBigUInt64BE(pos));
        if (old < moov.end) continue;
        if (box.type === 'stco') data.writeUInt32BE(old + delta, pos);
        else data.writeBigUInt64BE(BigInt(old + delta), pos);
      }
    }
  }
  kept.forEach((part) => adjust(part));
  const head = Buffer.from(buffer.subarray(moov.start, moov.start + 8));
  head.writeUInt32BE(moov.end - moov.start + delta, 0);
  return {
    buffer: Buffer.concat([
      buffer.subarray(0, moov.start),
      head,
      ...kept,
      buffer.subarray(moov.end),
    ]),
    removed: audio.length,
  };
}
for (const name of readdirSync('public/videos').filter((name) =>
  name.endsWith('.mp4'),
)) {
  const file = join('public/videos', name);
  const source = readFileSync(file);
  const result = silence(source);
  const top = boxes(result.buffer);
  const moov = top.find((box) => box.type === 'moov');
  const tracks = boxes(
    result.buffer,
    moov.start + moov.header,
    moov.end,
  ).filter((box) => box.type === 'trak');
  if (
    !tracks.some((track) => handler(result.buffer, track) === 'vide') ||
    tracks.some((track) => handler(result.buffer, track) === 'soun')
  )
    throw Error('Validação de faixas falhou');
  for (let i = 0; i < top.length; i++) {
    if (top[i].type !== 'mdat') continue;
    const oldMedia = boxes(source).filter((box) => box.type === 'mdat');
    const currentMedia = top.filter((box) => box.type === 'mdat');
    if (
      !oldMedia.every((box, index) =>
        source
          .subarray(box.start + box.header, box.end)
          .equals(
            result.buffer.subarray(
              currentMedia[index].start + currentMedia[index].header,
              currentMedia[index].end,
            ),
          ),
      )
    )
      throw Error('Conteúdo de mídia alterado');
  }
  writeFileSync(file, result.buffer);
  console.log(
    `${name}: ${result.removed} faixa(s) de áudio removida(s); vídeo preservado.`,
  );
}
