import { expect, test } from '@playwright/test';

for (const [lang, title] of [['es', 'Dos bordes donde debía haber uno'], ['en', 'Two borders where there should be one']] as const) {
  test(`${lang}: el momento real y los cinco hábitos están en la página`, async ({ page }) => {
    await page.goto(`/${lang}/`);
    await expect(page.locator('#momento h3')).toHaveText(title);
    await expect(page.locator('#momento .step')).toHaveCount(5);
    await expect(page.locator('#method .habit')).toHaveCount(5);
    await expect(page.locator('#momento .evidence li')).toHaveCount(5);
  });
}

test('la tarjeta del hero y el menú llevan al caso y a la sección', async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/es/');
  await expect(page.locator('.teaser')).toHaveAttribute('href', '#momento');
  await expect(page.locator('#site-nav a[href="/es/#method"]')).toHaveText('Cómo trabajo');
});

test('la reproducción usa la cascada real: antes dos aros, después uno', async ({ page }) => {
  await page.goto('/es/');
  // Quita el estado fijo para medir el foco de verdad.
  await page.evaluate(() => document.querySelectorAll('.dm-field').forEach((f) => f.classList.remove('is-on')));
  const bug = page.locator('.dm-field--bug input');
  const ok = page.locator('.dm-field--ok input');
  const outline = (l: typeof bug) => l.evaluate((el) => getComputedStyle(el).outlineStyle);
  const ring = (l: typeof bug) => l.evaluate((el) => getComputedStyle(el.parentElement!).boxShadow);
  await bug.focus();
  expect(await outline(bug)).toBe('solid');
  expect(await ring(bug)).toContain('inset');
  await ok.focus();
  expect(await outline(ok)).toBe('none');
  expect(await ring(ok)).toContain('inset');
});

test('movimiento reducido: la tarjeta del hero queda con un solo aro y sin animación', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/es/');
  const r = await page.locator('.teaser__field i').evaluate((el) => ({ op: getComputedStyle(el).opacity, an: getComputedStyle(el).animationName }));
  expect(r).toEqual({ op: '0', an: 'none' });
  const an = await page.locator('.dm-field').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(an).toBe('none');
});

test('sin foco: la captura del caso tiene alt descriptivo', async ({ page }) => {
  await page.goto('/en/');
  const alt = await page.locator('#momento .shot img').getAttribute('alt');
  expect(alt ?? '').toContain('Two-step verification');
});
