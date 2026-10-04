import sharp from 'sharp';

const W = 1200;
const H = 630;
const INK = '#14161b';
const PAPER = '#f1eee7';
const ACCENT = '#f86f15';

const phones = await Promise.all(
  ['feed', 'map', 'guides'].map((n) => sharp(`src/assets/projects/reportaya-${n}.webp`).resize({ height: 380 }).png().toBuffer()),
);

const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <text x="72" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="88" font-weight="700" fill="${PAPER}">José Burgos</text>
  <text x="72" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="${ACCENT}">Full-Stack &amp; Mobile Developer</text>
  <text x="72" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="${PAPER}" fill-opacity="0.7">React Native · TypeScript · Go</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: text, left: 0, top: 0 },
    { input: phones[0], left: 640, top: 125 },
    { input: phones[1], left: 830, top: 125 },
    { input: phones[2], left: 1020, top: 125 },
  ])
  .png()
  .toFile('public/og.png');
console.log('og.png listo');
