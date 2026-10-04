import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const targets = [
  { url: 'https://el-zuliano.vercel.app/', out: 'el-zuliano' },
  // La tienda desplegada no termina de cargar sus productos (spinners): se captura solo la parte superior.
  { url: 'https://tienda-virtual-pi-liart.vercel.app/', out: 'tienda-burgos', height: 640 },
];
mkdirSync('src/assets/projects', { recursive: true });
mkdirSync('assets-src', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 800 }, deviceScaleFactor: 1, locale: 'es-VE' });
for (const t of targets) {
  const page = await context.newPage();
  await page.goto(t.url, { waitUntil: 'load', timeout: 60000 }); // 'networkidle' nunca llega en la tienda (peticiones continuas)
  await page.waitForTimeout(9000); // espera a que carguen los productos/artículos
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: 1440, height: t.height ?? 800 } });
  await sharp(png).toFile(`assets-src/${t.out}.png`); // copia para revisar a ojo
  await sharp(png).webp({ quality: 85 }).toFile(`src/assets/projects/${t.out}.webp`);
  await page.close();
}
await browser.close();
console.log('Capturas web listas');
