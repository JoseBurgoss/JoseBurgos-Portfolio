import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

// Solo páginas públicas (sin sesión ni cuentas). Un solo navegador a la vez.
// `mobile`: teléfono 414x900 a 2x. `scrollTo`: id de sección a la que se baja antes de capturar.
// `webp`: además escribe el .webp final (las capturas antiguas de El Zuliano y la tienda); el resto pasa por `npm run assets`.
const all = [
  { url: 'https://el-zuliano.burgo.dev/', out: 'el-zuliano', height: 800, webp: true },
  // Se captura solo la parte superior de la tienda.
  { url: 'https://tienda.burgo.dev/', out: 'tienda-burgos', height: 640, webp: true },
  { url: 'https://cuenta.burgo.dev/entrar', out: 'burgo-cuenta-entrar', mobile: true },
  { url: 'https://sobre.burgo.dev/entrar', out: 'sobre-entrar', mobile: true },
  { url: 'https://sobre.burgo.dev/entrar', out: 'sobre-escritorio-entrar' },
  { url: 'https://burgo.dev/', out: 'burgo-dev-inicio', mobile: true },
  { url: 'https://burgo.dev/', out: 'burgo-dev-encargo', mobile: true, scrollTo: 'l2' },
  { url: 'https://burgo.dev/', out: 'burgo-dev-villa', mobile: true, scrollTo: 'l3' },
  { url: 'https://burgo.dev/en/', out: 'burgo-dev-inicio-en', mobile: true },
  { url: 'https://burgo.dev/', out: 'burgo-dev-escritorio' },
  { url: 'https://burgo.dev/', out: 'burgo-dev-villa-escritorio', scrollTo: 'l3' },
];
// `npm run capture -- sobre-entrar burgo-dev-inicio` captura solo esas; sin argumentos, todas.
const only = process.argv.slice(2);
const targets = only.length ? all.filter((t) => only.includes(t.out)) : all;
mkdirSync('src/assets/projects', { recursive: true });
mkdirSync('assets-src', { recursive: true });

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, locale: 'es-VE' });
const phone = await browser.newContext({ viewport: { width: 414, height: 900 }, deviceScaleFactor: 2, locale: 'es-VE', isMobile: true, hasTouch: true });
for (const t of targets) {
  const page = await (t.mobile ? phone : desktop).newPage();
  await page.goto(t.url, { waitUntil: 'load', timeout: 60000 }); // 'networkidle' nunca llega en la tienda (peticiones continuas)
  await page.waitForTimeout(t.webp ? 9000 : 4000); // espera a que carguen los productos/artículos o las fuentes
  if (t.scrollTo) {
    await page.evaluate((id) => document.getElementById(id)?.scrollIntoView({ block: 'start' }), t.scrollTo);
    await page.waitForTimeout(2500);
  }
  const png = !t.mobile && t.height
    ? await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1440, height: t.height } })
    : await page.screenshot({ type: 'png' });
  await sharp(png).toFile(`assets-src/${t.out}.png`); // fuente para `npm run assets`
  if (t.webp) await sharp(png).webp({ quality: 85 }).toFile(`src/assets/projects/${t.out}.webp`);
  await page.close();
}
await browser.close();
console.log('Capturas web listas');
