import { expect, test } from '@playwright/test';

test('el selector conserva el proyecto al cambiar de idioma', async ({ page }) => {
  await page.goto('/es/proyectos/reportaya/');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/en\/proyectos\/reportaya\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/es\/proyectos\/reportaya\/$/);
});

test.describe('raíz según idioma del navegador', () => {
  test.describe('inglés', () => {
    test.use({ locale: 'en-US' });
    test('/ → /en/', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/en/');
    });
  });
  test.describe('español', () => {
    test.use({ locale: 'es-VE' });
    test('/ → /es/', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/es/');
    });
  });
});

test('hreflang y canonical apuntan a las dos versiones', async ({ page }) => {
  await page.goto('/en/proyectos/moviesapp/');
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', /\/es\/proyectos\/moviesapp\/$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/proyectos\/moviesapp\/$/);
});
