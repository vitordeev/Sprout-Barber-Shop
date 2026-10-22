import { readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const files = readdirSync(resolve('public/videos'))
  .filter((name) => /\.(mp4|webm)$/i.test(name))
  .sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true }));

export const videoSlots = Array.from(
  { length: Math.max(8, files.length) },
  (_, index) => ({
    title: `Vídeo ${String(index + 1).padStart(2, '0')}`,
    src: files[index] ? `/videos/${encodeURIComponent(files[index])}` : null,
  }),
);

export const hasVideos = files.length > 0;
