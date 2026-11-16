import { expect, test } from '@playwright/test';

test('prefers-reduced-motion desactiva las animaciones y la vista previa', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  const names = await page.evaluate(() =>
    [...document.querySelectorAll('.fc, .hero__h, .now, .clock i')].map((el) => getComputedStyle(el).animationName),
  );
  expect(names.length).toBeGreaterThan(0);
  expect(names.every((n) => n === 'none')).toBe(true);
  await expect(page.locator('html')).not.toHaveClass(/js-reveal/);
  await page.locator('.row a').first().hover();
  await expect(page.locator('.peek')).not.toHaveClass(/is-on/);
});

test('con movimiento normal el muro aparece con el scroll (js-reveal)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/en/');
  await expect(page.locator('html')).toHaveClass(/js-reveal/);
  const card = page.locator('.fc').first();
  await expect(card).toHaveAttribute('data-reveal', '');
  const transition = await card.evaluate((el) => getComputedStyle(el).transitionProperty);
  expect(transition).toContain('opacity');
});

test('al pasar el cursor la captura de la tarjeta se desplaza (movimiento normal, puntero fino)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/en/');
  const card = page.locator('.fc--cabal');
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000); // termina la aparición con el scroll
  const cover = card.locator('.fc__cover');
  const before = await cover.evaluate((el) => getComputedStyle(el).objectPosition);
  await card.hover();
  await expect.poll(() => cover.evaluate((el) => getComputedStyle(el).objectPosition), { timeout: 4000 }).not.toBe(before);
});

test('no hay relámpago ni destello de fondo', async ({ page }) => {
  await page.goto('/en/');
  expect(await page.locator('.bolt, .sky').count()).toBe(0);
});
