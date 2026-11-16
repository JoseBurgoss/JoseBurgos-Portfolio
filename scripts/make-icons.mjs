import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// Marca «Catatumbo»: el cuadrado amarillo (el mismo punto final de los titulares). Funciona sobre pestañas claras y oscuras.
const ACC = '#fadf27';
const BG = '#080c16';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<rect x="6" y="6" width="20" height="20" fill="${ACC}"/>
</svg>
`;
writeFileSync('public/icon.svg', svg);

const square = (size, bg, pad) =>
  Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}<rect x="${pad}" y="${pad}" width="${size - pad * 2}" height="${size - pad * 2}" fill="${ACC}"/></svg>`);

// apple-touch-icon: iOS no admite transparencia; fondo noche y márgenes amplios (iOS redondea las esquinas).
await sharp(square(180, BG, 52), { density: 300 }).png().toFile('public/apple-touch-icon.png');

// favicon.ico (16, 32 y 48 px, PNG dentro del contenedor ICO), transparente.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(square(s * 8, null, 2 * 8), { density: 72 }).resize(s, s, { kernel: 'lanczos3' }).png().toBuffer()));
const head = Buffer.alloc(6);
head.writeUInt16LE(1, 2);
head.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const dir = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e[0] = s; e[1] = s; e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
  e.writeUInt32LE(pngs[i].length, 8); e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
writeFileSync('public/favicon.ico', Buffer.concat([head, ...dir, ...pngs]));
console.log('Íconos listos');
