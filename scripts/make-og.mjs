import sharp from 'sharp';

// Imágenes generales (sin un proyecto concreto): texto + mosaico abstracto con los colores del muro.
const INK = '#14161b';
const PAPER = '#f1eee7';
const ACCENT = '#f86f15';
const MUTED = '#b7b2a8';
const SLATE = '#2c3140';
const SAND = '#d8d4c9';

function mosaic(x, y, w, h, r) {
  const g = 14;
  const lw = Math.round(w * 0.48);
  const rw = w - lw - g;
  const th = Math.round(h * 0.46);
  const bh = h - th - g;
  const bw = Math.round((rw - g) / 2);
  return `
  <rect x="${x}" y="${y}" width="${lw}" height="${h}" rx="${r}" fill="${ACCENT}"/>
  <rect x="${x + lw + g}" y="${y}" width="${rw}" height="${th}" rx="${r}" fill="${PAPER}"/>
  <rect x="${x + lw + g}" y="${y + th + g}" width="${bw}" height="${bh}" rx="${r}" fill="${SLATE}"/>
  <rect x="${x + lw + g + bw + g}" y="${y + th + g}" width="${rw - bw - g}" height="${bh}" rx="${r}" fill="${SAND}"/>`;
}

async function render({ width, height, out, textX, lines, tiles }) {
  const text = lines
    .map((l) => `<text x="${textX}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size}" font-weight="${l.weight ?? 400}" fill="${l.color}">${l.text}</text>`)
    .join('\n');
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${INK}"/>
  ${mosaic(tiles.x, tiles.y, tiles.w, tiles.h, tiles.r)}
  ${text}
</svg>`;
  await sharp(Buffer.from(svg)).png().toFile(out);
  console.log(`${out} listo`);
}

// Open Graph del sitio (1200x630)
await render({
  width: 1200,
  height: 630,
  out: 'public/og.png',
  textX: 72,
  tiles: { x: 760, y: 120, w: 370, h: 390, r: 18 },
  lines: [
    { text: 'José Burgos', y: 270, size: 84, weight: 700, color: PAPER },
    { text: 'Full-Stack &amp; Mobile Developer', y: 335, size: 34, weight: 600, color: ACCENT },
    { text: 'React Native · TypeScript · Node.js · Go', y: 395, size: 26, color: MUTED },
    { text: 'jose-burgos-portfolio.vercel.app', y: 540, size: 24, color: MUTED },
  ],
});

// Portada de LinkedIn (1584x396). La foto de perfil tapa la esquina inferior izquierda: el texto empieza en x=480.
if (process.argv.includes('--banner')) {
  await render({
    width: 1584,
    height: 396,
    out: process.argv[process.argv.indexOf('--banner') + 1],
    textX: 480,
    tiles: { x: 1240, y: 48, w: 290, h: 300, r: 16 },
    lines: [
      { text: 'Mobile and web apps that work.', y: 160, size: 44, weight: 700, color: PAPER },
      { text: 'Full-Stack &amp; Mobile Developer', y: 212, size: 26, weight: 600, color: ACCENT },
      { text: 'React Native · TypeScript · Node.js · Go', y: 252, size: 22, color: MUTED },
      { text: 'jose-burgos-portfolio.vercel.app', y: 292, size: 20, color: MUTED },
    ],
  });
}
