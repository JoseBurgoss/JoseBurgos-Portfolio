import { expect, test } from '@playwright/test';

test('el selector conserva el proyecto al cambiar de idioma', async ({ page }) => {
  await page.goto('/es/proyectos/reportaya/');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/en\/proyectos\/reportaya\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/es\/proyectos\/reportaya\/$/);
});

test.describe('raíz: inglés por defecto, y se recuerda la elección', () => {
  test.describe('navegador en español', () => {
    test.use({ locale: 'es-VE' });
    test('/ → /en/ (el idioma de entrada es inglés aunque el navegador sea español)', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/en/');
    });
  });
  test('si la persona eligió español, / → /es/', async ({ page }) => {
    await page.goto('/en/');
    await page.locator('[data-lang-switch]').click();
    await page.waitForURL('**/es/');
    await page.goto('/');
    await page.waitForURL('**/es/');
  });
});

test('hreflang y canonical apuntan a las dos versiones, x-default en inglés', async ({ page }) => {
  await page.goto('/en/proyectos/moviesapp/');
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', /\/es\/proyectos\/moviesapp\/$/);
  await expect(page.locator('link[rel="alternate"][hreflang="x-default"]')).toHaveAttribute('href', /\/en\/proyectos\/moviesapp\/$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/proyectos\/moviesapp\/$/);
});

test('el titular en inglés cabe sin desbordar a 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 });
  await page.goto('/en/');
  const over = await page.evaluate(() => {
    const h = document.querySelector('.hero__h')!;
    return h.scrollWidth - h.clientWidth;
  });
  expect(over).toBeLessThanOrEqual(1);
});
