import { expect, test } from '@playwright/test';

test('el foco de teclado en una tarjeta dibuja un anillo visible fuera de la tarjeta', async ({ page }) => {
  await page.goto('/es/');
  for (let i = 0; i < 20; i++) {
    await page.keyboard.press('Tab');
    const onTile = await page.evaluate(() => document.activeElement?.classList.contains('tile__link') ?? false);
    if (onTile) break;
  }
  const ring = await page.evaluate(() => {
    const link = document.activeElement as HTMLElement;
    const tile = link.closest('.tile') as HTMLElement;
    const t = getComputedStyle(tile);
    return { link: getComputedStyle(link).outlineStyle, style: t.outlineStyle, width: parseFloat(t.outlineWidth), offset: parseFloat(t.outlineOffset) };
  });
  expect(ring.style).toBe('solid');
  expect(ring.width).toBeGreaterThanOrEqual(3);
  expect(ring.offset).toBeGreaterThanOrEqual(0); // fuera de la tarjeta: sobre el fondo oscuro de la página
  expect(ring.link).toBe('none');
});

test('las tarjetas se elevan al pasar el mouse (movimiento normal)', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/es/');
  const tile = page.locator('.tile--moviesapp');
  await tile.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500); // termina la animación de entrada
  const before = await tile.evaluate((el) => getComputedStyle(el).translate);
  await tile.hover();
  await page.waitForTimeout(600);
  const after = await tile.evaluate((el) => getComputedStyle(el).translate);
  expect(before === 'none' || before === '0px').toBe(true);
  expect(after).toContain('-4px');
});

test('las imágenes decorativas de las tarjetas tienen alt vacío', async ({ page }) => {
  await page.goto('/es/');
  const withAlt = await page.$$eval('.tile img', (imgs) => imgs.filter((i) => (i.getAttribute('alt') ?? '') !== '').length);
  expect(withAlt).toBe(0);
});
