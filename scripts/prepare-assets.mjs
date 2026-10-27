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

// Capturas de teléfono: se recorta desde arriba a la proporción del marco (9:19,5) y se lleva a 480 px de ancho.
// Fuentes en assets-src/ (no versionado):
//   - "prod": capturas de las páginas públicas en producción (npm run capture).
//   - "impl": capturas de la implementación con datos de ejemplo, de DocumentacionDiseno<app>-temaimpl//     y de Manuales_capturas (Cancha y Sobre dentro de la sesión; no se usa ninguna cuenta real).
const phones = {
  'burgo-cuenta': 'burgo-cuenta.png', // impl: La villa de Cuenta «Credencial»
  'burgo-cuenta-entrar': 'burgo-cuenta-entrar.png', // prod: entrar
  'burgo-cancha': 'burgo-cancha.jpg', // impl: partido en «Dorsal»
  'burgo-cuadre': 'burgo-cuadre.png', // impl: Hoy en «Libreta»
  'burgo-fase': 'burgo-fase.png', // impl: mi sector en «Esfera»
  'burgo-pique': 'burgo-pique.png', // impl: inicio en «Capicúa»
  'burgo-brio': 'burgo-brio.png', // impl: Hoy en «Romana»
  'burgo-admin': 'burgo-admin.png', // impl: usuarios en «Torre»
  'sobre-entrar': 'sobre-entrar.png', // prod
  'sobre-inicio': 'sobre-inicio.jpg', // impl
  'sobre-productos': 'sobre-productos.jpg', // impl
  'sobre-comunidad': 'sobre-comunidad.jpg', // impl
  'burgo-dev-inicio': 'burgo-dev-inicio.png', // prod
  'burgo-dev-encargo': 'burgo-dev-encargo.png', // prod
  'burgo-dev-villa': 'burgo-dev-villa.png', // prod
  'burgo-dev-inicio-en': 'burgo-dev-inicio-en.png', // prod
};
for (const [name, file] of Object.entries(phones)) {
  const m = await sharp(`assets-src/${file}`).metadata();
  const want = Math.floor((m.width * 19.5) / 9);
  if (m.height < want - 8) throw new Error(`${file}: ${m.width}x${m.height} es más baja que ${want}`);
  const height = Math.min(want, m.height);
  await sharp(`assets-src/${file}`)
    .extract({ left: 0, top: 0, width: m.width, height })
    .resize({ width: 480, kernel: 'lanczos3' })
    .webp(webp)
    .toFile(`${OUT}/${name}.webp`);
}

// Capturas de escritorio: recorte superior a 2,17:1 (proporción del marco ancho), hasta 1400 px de ancho.
const wides = {
  'burgo-cuenta-escritorio': 'burgo-cuenta-escritorio.png', // impl
  'burgo-admin-escritorio': 'burgo-admin-escritorio.png', // impl
  'sobre-escritorio-inicio': 'sobre-escritorio-inicio.jpg', // impl
  'sobre-escritorio-entrar': 'sobre-escritorio-entrar.png', // prod
  'burgo-dev-escritorio': 'burgo-dev-escritorio.png', // prod
  'burgo-dev-villa-escritorio': 'burgo-dev-villa-escritorio.png', // prod
};
for (const [name, file] of Object.entries(wides)) {
  const m = await sharp(`assets-src/${file}`).metadata();
  const height = Math.round(m.width / 2.17);
  await sharp(`assets-src/${file}`)
    .extract({ left: 0, top: 0, width: m.width, height: Math.min(height, m.height) })
    .resize({ width: Math.min(1400, m.width), kernel: 'lanczos3' })
    .webp(webp)
    .toFile(`${OUT}/${name}.webp`);
}

// Foto (retrato 3:4)
await sharp('assets-src/foto.jpg').resize({ width: 960 }).webp({ quality: 80 }).toFile('src/assets/jose-burgos.webp');

console.log('Activos generados en src/assets');
