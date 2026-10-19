import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const all = [
  { url: 'https://el-zuliano.burgo.dev/', out: 'el-zuliano' },
  // Se captura solo la parte superior de la tienda.
  { url: 'https://tienda.burgo.dev/', out: 'tienda-burgos', height: 640 },
  // Sobre es una PWA móvil: captura de teléfono (414x900 a 2x, reducida a 480 px de ancho).
  { url: 'https://sobre.burgo.dev/', out: 'sobre-entrar', mobile: true },
];
// `npm run capture -- sobre burgo-cuenta` captura solo esas; sin argumentos, todas.
const only = process.argv.slice(2);
const targets = only.length ? all.filter((t) => only.includes(t.out)) : all;
mkdirSync('src/assets/projects', { recursive: true });
mkdirSync('assets-src', { recursive: true });

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1440, height: 800 }, deviceScaleFactor: 1, locale: 'es-VE' });
const phone = await browser.newContext({ viewport: { width: 414, height: 900 }, deviceScaleFactor: 2, locale: 'es-VE', isMobile: true, hasTouch: true });
for (const t of targets) {
  const page = await (t.mobile ? phone : desktop).newPage();
  await page.goto(t.url, { waitUntil: 'load', timeout: 60000 }); // 'networkidle' nunca llega en la tienda (peticiones continuas)
  await page.waitForTimeout(9000); // espera a que carguen los productos/artículos
  const png = t.mobile
    ? await page.screenshot({ type: 'png' })
    : await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1440, height: t.height ?? 800 } });
  await sharp(png).toFile(`assets-src/${t.out}.png`); // copia para revisar a ojo
  const img = t.mobile ? sharp(png).resize({ width: 480 }) : sharp(png);
  await img.webp({ quality: 85 }).toFile(`src/assets/projects/${t.out}.webp`);
  await page.close();
}
await browser.close();
console.log('Capturas web listas');
