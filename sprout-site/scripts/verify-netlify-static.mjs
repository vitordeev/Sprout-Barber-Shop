import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { resolve } from 'node:path';
import vm from 'node:vm';
import { createServer } from 'node:http';
const root = resolve('../publicar-netlify');
const html = readFileSync(root + '/index.html', 'utf8');
const refs = [...html.matchAll(/(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((s) => s.startsWith('/'));
for (const ref of refs)
  if (!existsSync(root + decodeURIComponent(ref.split('?')[0])))
    throw Error('Arquivo ausente: ' + ref);
if ([...html.matchAll(/<video\b/g)].length !== 8)
  throw Error('Quantidade incorreta de vídeos');
const js = readdirSync(root).filter((n) => n.endsWith('.js'));
for (const file of js) new vm.Script(readFileSync(root + '/' + file, 'utf8'));
if (html.includes('data-video-next') || html.includes('data-video-prev'))
  throw Error('O carrossel não deve exibir botões de navegação');
const videoSection = html.split('id="videos"')[1]?.split('</section>')[0];
if (!videoSection || videoSection.includes('<figcaption'))
  throw Error('Seção de vídeos ausente ou com títulos visíveis');
const scripts = js
  .map((file) => readFileSync(root + '/' + file, 'utf8'))
  .join('\n');
if (!scripts.includes('pointermove') || !scripts.includes('setPointerCapture'))
  throw Error('Navegação por arraste ausente');
const css = readFileSync(root + '/site.css', 'utf8');
if (!css.includes('scrollbar-width:none') || !css.includes('/ 3'))
  throw Error('CSS do carrossel ausente');
const headers = readFileSync(root + '/_headers', 'utf8');
if (!headers.includes("media-src 'self'"))
  throw Error('Política de vídeos ausente');
const server = createServer((req, res) => {
  const file =
    root +
    decodeURIComponent(
      req.url.split('?')[0] === '/' ? '/index.html' : req.url.split('?')[0],
    );
  if (!existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.writeHead(200);
  res.end(readFileSync(file));
});
await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
try {
  const url = 'http://127.0.0.1:' + server.address().port;
  for (const path of ['/', ...new Set(refs)]) {
    const response = await fetch(url + path);
    if (response.status !== 200) throw Error('HTTP inválido: ' + path);
    await response.arrayBuffer();
  }
} finally {
  server.close();
}
console.log(
  'OK: página e recursos servidos por HTTP; oito vídeos sem títulos ou setas, arraste, CSS responsivo e scripts válidos.',
);
