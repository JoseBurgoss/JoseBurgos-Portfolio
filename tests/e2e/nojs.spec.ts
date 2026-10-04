import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

test('sin JavaScript la navegación móvil sigue siendo alcanzable', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.locator('#site-nav a').first()).toBeVisible();
  await expect(page.locator('.nav-toggle')).toBeHidden();
});
