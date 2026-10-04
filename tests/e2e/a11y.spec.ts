import { expect, test } from '@playwright/test';

test('los titulares nunca van en cursiva', async ({ page }) => {
  for (const p of ['/es/', '/en/proyectos/reportaya/']) {
    await page.goto(p);
    const styles = await page.$$eval('h1, h2, h3', (hs) => hs.map((h) => getComputedStyle(h).fontStyle));
    expect(styles.every((s) => s === 'normal')).toBe(true);
  }
});

test('un único h1 por página y lang correcto', async ({ page }) => {
  for (const [p, lang] of [['/es/', 'es'], ['/en/', 'en']] as const) {
    await page.goto(p);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
  }
});

test('el foco por teclado es visible', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe('none');
});

test('las imágenes informativas tienen alt y las decorativas lo dejan vacío', async ({ page }) => {
  await page.goto('/es/proyectos/reportaya/');
  const missing = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
  expect(missing).toBe(0);
  const empty = await page.$$eval('.gallery img', (imgs) => imgs.filter((i) => !(i.getAttribute('alt') ?? '').trim()).length);
  expect(empty).toBe(0);
});

test('el menú móvil se abre, se cierra con Escape y mantiene aria-expanded', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/es/');
  const toggle = page.locator('.nav-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-nav')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#site-nav')).toBeHidden();
});
