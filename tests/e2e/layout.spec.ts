import { expect, test } from '@playwright/test';

const widths = [320, 375, 414, 768, 1280, 1440];
const pages = ['/en/', '/es/', '/es/proyectos/reportaya/', '/en/proyectos/el-zuliano/', '/es/proyectos/tienda-burgos/'];

for (const w of widths) {
  for (const p of pages) {
    test(`sin desborde horizontal: ${p} a ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(p);
      const offenders = await page.evaluate(() => {
        const vw = window.innerWidth;
        return [...document.querySelectorAll('body *')]
          .filter((el) => !el.closest('.fc__media, .peek, .photo, .frame')) // capturas recortadas a propósito
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > vw + 1;
          })
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className)}`);
      });
      expect(offenders).toEqual([]);
    });
  }
}

test('botones, logo y enlaces del menú en una sola línea a 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/en/');
  // Cuenta las líneas de texto reales (rectángulos de cada nodo de texto), no la altura de la caja.
  const multiline = await page.evaluate(() =>
    [...document.querySelectorAll('.btn, .logo, .nav a, .ibtn')]
      .filter((el) => {
        if (el.getBoundingClientRect().width === 0) return false;
        const tops = new Set<number>();
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
        for (let n = walker.nextNode(); n; n = walker.nextNode()) {
          if (!n.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          for (const rect of range.getClientRects()) tops.add(Math.round(rect.top / 6));
        }
        return tops.size > 1;
      })
      .map((el) => el.textContent?.trim()),
  );
  expect(multiline).toEqual([]);
});

test('los controles táctiles miden al menos 44 px (cabecera, chips, filas, botones, pie)', async ({ page }) => {
  for (const w of [390, 1440]) {
    await page.setViewportSize({ width: w, height: 900 });
    await page.goto('/en/');
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
    const small = await page.evaluate(() =>
      [...document.querySelectorAll('.btn, .ibtn, .nav-toggle, .chip, .logo, .nav a, .row a, .ft a, .fc__link, .now a, .mail')]
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && r.height > 0 && (r.height < 43.5 || r.width < 43.5);
        })
        .map((el) => `${el.className} ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`),
    );
    expect(small, `a ${w}px`).toEqual([]);
  }
});
