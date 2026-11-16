import sharp from 'sharp';

// «Catatumbo»: noche, texto en papel, un solo cuadrado amarillo como punto final. Mismos hex que tokens.css (aprox. sRGB).
const BG = '#080c16';
const TEXT = '#f6f4eb';
const MUTED = '#a9b0c0';
const ACC = '#fadf27';
const LINE = '#2a3144';

async function render({ width, height, out, textX, lines, mark }) {
  const text = lines
    .map((l) => `<text x="${textX}" y="${l.y}" font-family="Segoe UI, Arial, sans-serif" font-size="${l.size}" font-weight="${l.weight ?? 400}" fill="${l.color}">${l.text}</text>`)
    .join('\n');
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${BG}"/>
  <rect x="${textX}" y="${lines[0].y - lines[0].size - 36}" width="64" height="4" fill="${ACC}"/>
  ${text}
  <rect x="${mark.x}" y="${mark.y}" width="${mark.s}" height="${mark.s}" fill="${ACC}"/>
  <rect x="${textX}" y="${height - 96}" width="${width - textX * 2}" height="1" fill="${LINE}"/>
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
  mark: { x: 1008, y: 108, s: 120 },
  lines: [
    { text: 'José Burgos', y: 250, size: 96, weight: 800, color: TEXT },
    { text: 'Full-Stack &amp; Mobile Developer', y: 322, size: 36, weight: 600, color: TEXT },
    { text: 'Apps that hold up · React Native · TypeScript · Go', y: 384, size: 26, color: MUTED },
    { text: 'jose.burgo.dev', y: 560, size: 24, color: MUTED },
  ],
});

// Portada de LinkedIn (1584x396). La foto de perfil tapa la esquina inferior izquierda: el texto empieza en x=480.
if (process.argv.includes('--banner')) {
  await render({
    width: 1584,
    height: 396,
    out: process.argv[process.argv.indexOf('--banner') + 1],
    textX: 480,
    mark: { x: 1400, y: 60, s: 72 },
    lines: [
      { text: 'Apps that hold up', y: 170, size: 52, weight: 800, color: TEXT },
      { text: 'Full-Stack &amp; Mobile Developer', y: 220, size: 26, weight: 600, color: TEXT },
      { text: 'React Native · TypeScript · Go', y: 258, size: 22, color: MUTED },
      { text: 'jose.burgo.dev', y: 298, size: 20, color: MUTED },
    ],
  });
}
