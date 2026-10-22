import type { ImageMetadata } from 'astro';

const images = import.meta.glob<ImageMetadata>(
  '../assets/cuts/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' },
);

export const cutPhotos = Object.entries(images)
  .sort(([a], [b]) => a.localeCompare(b, 'pt-BR', { numeric: true }))
  .map(([, photo], index) => ({
    photo,
    number: String(index + 1).padStart(2, '0'),
  }));

export const hasCutPhotos = cutPhotos.length > 0;
