import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

test('sin JavaScript la navegación móvil sigue siendo alcanzable', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('#site-nav a').first()).toBeVisible();
  await expect(page.locator('.nav-toggle')).toBeHidden();
});

test('sin JavaScript el tema sigue al sistema (noche por defecto, día si el sistema es claro)', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/en/');
  const light = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.emulateMedia({ colorScheme: 'dark' });
  const dark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  expect(light).not.toBe(dark);
});

test('sin JavaScript el archivo muestra todas las filas y los filtros no aparecen', async ({ page }) => {
  await page.goto('/en/');
  expect(await page.locator('.row').count()).toBe(15);
  await expect(page.locator('[data-chips]')).toBeHidden();
});
