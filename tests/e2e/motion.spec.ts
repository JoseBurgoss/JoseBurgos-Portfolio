import { expect, test } from '@playwright/test';

test('prefers-reduced-motion desactiva las animaciones', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/es/');
  const names = await page.evaluate(() =>
    [...document.querySelectorAll('.tile, .tile .frame')].map((el) => getComputedStyle(el).animationName),
  );
  expect(names.length).toBeGreaterThan(0);
  expect(names.every((n) => n === 'none')).toBe(true);
});

test('con movimiento normal el muro aparece con el scroll (js-reveal) y con movimiento reducido no', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/es/');
  await expect(page.locator('html')).toHaveClass(/js-reveal/);
  const tile = page.locator('.tile').first();
  await expect(tile).toHaveAttribute('data-reveal', '');
  const transition = await tile.evaluate((el) => getComputedStyle(el).transitionProperty);
  expect(transition).toContain('opacity');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/es/');
  await expect(page.locator('html')).not.toHaveClass(/js-reveal/);
});
