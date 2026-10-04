import { expect, test } from '@playwright/test';

const widths = [320, 375, 414, 768, 1280];
const pages = ['/es/', '/en/', '/es/proyectos/reportaya/', '/en/proyectos/el-zuliano/'];

for (const w of widths) {
  for (const p of pages) {
    test(`sin desborde horizontal: ${p} a ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(p);
      const offenders = await page.evaluate(() => {
        const vw = window.innerWidth;
        return [...document.querySelectorAll('body *')]
          .filter((el) => !el.parentElement?.closest('.tile')) // la tarjeta sí se mide; solo sus capturas recortadas se excluyen
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

test('titulares y botones en una sola línea a 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/es/');
  const multiline = await page.evaluate(() =>
    [...document.querySelectorAll('.btn, .wordmark, nav a')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 24;
        return r.width > 0 && r.height > lh * 2.2;
      })
      .map((el) => el.textContent?.trim()),
  );
  expect(multiline).toEqual([]);
});
