import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/projects';
mkdirSync(OUT, { recursive: true });
const webp = { quality: 82 };

// ReportaYa: tira de 4 pantallas (1920x1080). Cada pantalla mide ~486 px; la última queda recortada en 462.
const strip = 'assets-src/reportaya.png';
const meta = await sharp(strip).metadata();
if (meta.width !== 1920 || meta.height !== 1080) {
  throw new Error(`Se esperaba 1920x1080, llegó ${meta.width}x${meta.height}`);
}
const screens = [
  ['login', 0, 486],
  ['feed', 486, 486],
  ['guides', 972, 486],
  ['map', 1458, 462],
];
for (const [name, left, width] of screens) {
  await sharp(strip).extract({ left, top: 0, width, height: 1080 }).webp(webp).toFile(`${OUT}/reportaya-${name}.webp`);
}

// MoviesApp: capturas de iPhone 1170x2532 reducidas a 480 px de ancho (~1039 px de alto).
const movies = { IMG_5730: 'list', IMG_5731: 'menu', IMG_5733: 'detail', IMG_5737: 'favorites' };
for (const [src, name] of Object.entries(movies)) {
  await sharp(`assets-src/movies-${src}.png`).resize({ width: 480 }).webp(webp).toFile(`${OUT}/moviesapp-${name}.webp`);
}

// Foto (retrato 3:4)
await sharp('assets-src/foto.jpg').resize({ width: 960 }).webp({ quality: 80 }).toFile('src/assets/jose-burgos.webp');

console.log('Activos generados en src/assets');
