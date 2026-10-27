import sharp from 'sharp';
import { writeFileSync } from 'node:fs';

// Marca: tres losetas del muro de proyectos (la misma cuadrícula asimétrica del sitio y de og.png).
// Dos colores de la paleta: naranja de acento y un neutro que cambia con el tema del navegador.
const ACCENT = '#f86f15';
const INK = '#14161b';
const PAPER = '#f1eee7';
const MID = '#8c909b'; // neutro intermedio, solo para el .ico (no hay media query en ese formato)

// Geometría sobre 32x32: margen 2, hueco 2. Una loseta alta a la izquierda, una ancha arriba a la derecha y una chica abajo.
const tiles = [
  { x: 2, y: 2, w: 12, h: 28, c: 'a' },
  { x: 16, y: 2, w: 14, h: 18, c: 'n' },
  { x: 16, y: 22, w: 14, h: 8, c: 'a' },
];
const rect = (t, fill, k = 1, ox = 0, oy = 0, r = 2) =>
  `<rect x="${ox + t.x * k}" y="${oy + t.y * k}" width="${t.w * k}" height="${t.h * k}" rx="${r * k}" ${fill}/>`;

// icon.svg: el neutro es tinta en pestañas claras y papel en pestañas oscuras.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
<style>.a{fill:${ACCENT}}.n{fill:${INK}}@media (prefers-color-scheme:dark){.n{fill:${PAPER}}}</style>
${tiles.map((t) => `<rect class="${t.c}" x="${t.x}" y="${t.y}" width="${t.w}" height="${t.h}" rx="2"/>`).join('\n')}
</svg>
`;
writeFileSync('public/icon.svg', svg);

const flat = (size, neutral, bg, pad) => {
  const k = (size - pad * 2) / 28; // las losetas ocupan 28 de los 32 unidades; el margen lo pone `pad`
  const ox = pad - 2 * k;
  const body = tiles.map((t) => rect(t, `fill="${t.c === 'a' ? ACCENT : neutral}"`, k, ox, ox, 2)).join('');
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">${bg ? `<rect width="${size}" height="${size}" fill="${bg}"/>` : ''}${body}</svg>`);
};

// apple-touch-icon: iOS no admite transparencia; fondo tinta y márgenes amplios (iOS redondea las esquinas).
await sharp(flat(180, PAPER, INK, 34), { density: 300 }).png().toFile('public/apple-touch-icon.png');

// favicon.ico (16, 32 y 48 px, PNG dentro del contenedor ICO), transparente.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(flat(s * 8, MID, null, 2 * 8), { density: 72 }).resize(s, s, { kernel: 'lanczos3' }).png().toBuffer()));
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

// Vista previa para revisar a ojo (no se publica): el SVG a 16 y 32 px, ampliado sin suavizar, sobre pestaña clara y oscura.
const prev = [];
for (const [bg, scheme] of [['#f3f3f3', 'light'], ['#202124', 'dark']]) {
  for (const s of [16, 32]) {
    const svgS = svg.replace('<svg ', `<svg width="${s}" height="${s}" `).replace('@media (prefers-color-scheme:dark){.n{fill:' + PAPER + '}}', scheme === 'dark' ? '.n{fill:' + PAPER + '}' : '');
    prev.push({ s, bg, buf: await sharp(Buffer.from(svgS), { density: 72 }).resize(s, s).png().toBuffer() });
  }
}
const cell = 160;
const composites = [];
for (let i = 0; i < prev.length; i++) composites.push({ input: await sharp({ create: { width: cell, height: cell, channels: 3, background: prev[i].bg } }).png().toBuffer(), left: (i % 2) * cell, top: Math.floor(i / 2) * cell });
for (let i = 0; i < prev.length; i++) {
  const { s, buf } = prev[i];
  const up = await sharp(buf).resize(s * (s === 16 ? 8 : 4), s * (s === 16 ? 8 : 4), { kernel: 'nearest' }).png().toBuffer();
  composites.push({ input: up, left: (i % 2) * cell + 16, top: Math.floor(i / 2) * cell + 16 });
}
await sharp({ create: { width: cell * 2, height: cell * 2, channels: 4, background: '#888' } }).composite(composites).png().toFile('assets-src/favicon-preview.png');
console.log('Íconos listos');
