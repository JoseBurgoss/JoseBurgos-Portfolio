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

test('con movimiento normal el muro sí anima', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/es/');
  const name = await page.locator('.tile').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(name).not.toBe('none');
});
