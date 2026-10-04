import { expect, test } from '@playwright/test';

const opacityOf = () => (els: Element[]) => els.map((el) => Number(getComputedStyle(el).opacity));

test.describe('aparición al hacer scroll', () => {
  test('con movimiento normal, un bloque fuera de pantalla empieza oculto y aparece al llegar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/es/');
    const block = page.locator('#contact [data-reveal]').first();
    await expect(block).toHaveCount(1);
    expect(await block.evaluate((el) => Number(getComputedStyle(el).opacity))).toBeLessThan(0.1);
    await block.scrollIntoViewIfNeeded();
    await expect.poll(() => block.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
  });

  test('con movimiento reducido todo es visible sin hacer scroll', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/es/');
    const ops = await page.$$eval('[data-reveal]', opacityOf());
    expect(ops.length).toBeGreaterThan(5);
    expect(ops.every((o) => o === 1)).toBe(true);
  });

  test.describe('sin JavaScript', () => {
    test.use({ javaScriptEnabled: false });
    test('todo es visible', async ({ page }) => {
      await page.goto('/es/');
      const ops = await page.$$eval('[data-reveal]', opacityOf());
      expect(ops.length).toBeGreaterThan(5);
      expect(ops.every((o) => o === 1)).toBe(true);
      await expect(page.locator('[data-copy-email]')).toBeHidden();
    });
  });
});

test('experiencia se muestra como línea de tiempo con un punto por empleo', async ({ page }) => {
  await page.goto('/es/');
  const line = await page.locator('.jobs').evaluate((el) => getComputedStyle(el, '::before').content);
  expect(line).not.toBe('none');
  const dots = await page.$$eval('.job', (jobs) => jobs.map((j) => getComputedStyle(j, '::before').content));
  expect(dots.length).toBeGreaterThanOrEqual(3);
  expect(dots.every((c) => c !== 'none')).toBe(true);
});

test('el stack muestra íconos monocromos', async ({ page }) => {
  await page.goto('/en/');
  const icons = page.locator('#stack svg');
  expect(await icons.count()).toBeGreaterThanOrEqual(15);
  const fills = await icons.evaluateAll((svgs) => svgs.map((s) => s.querySelector('path')?.getAttribute('fill')));
  expect(fills.every((f) => f === 'currentColor')).toBe(true);
});

test('sobre mí muestra tres datos rápidos', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.locator('.about__facts li')).toHaveCount(3);
});

test('copiar correo copia al portapapeles y lo anuncia', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/es/');
  const btn = page.locator('[data-copy-email]');
  await btn.scrollIntoViewIfNeeded();
  await btn.click();
  await expect(page.locator('[data-copy-status]')).toHaveText('Copiado');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('joseburgos153@gmail.com');
});

test('Escape cierra el menú móvil y devuelve el foco al botón', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/es/');
  await page.locator('.nav-toggle').click();
  await page.locator('#site-nav a').first().focus();
  await page.keyboard.press('Escape');
  await expect(page.locator('#site-nav')).toBeHidden();
  expect(await page.evaluate(() => document.activeElement?.classList.contains('nav-toggle'))).toBe(true);
});

test('las capturas de la galería ofrecen varios tamaños (srcset)', async ({ page }) => {
  await page.goto('/es/proyectos/el-zuliano/');
  const srcset = await page.locator('.gallery img').first().getAttribute('srcset');
  expect((srcset ?? '').split(',').length).toBeGreaterThanOrEqual(2);
});

test('página 404 propia y bilingüe', async ({ page }) => {
  const res = await page.goto('/no-existe/');
  expect(res?.status()).toBe(404);
  await expect(page.locator('.notfound a[href="/es/"]')).toBeVisible();
  await expect(page.locator('.notfound a[href="/en/"]')).toBeVisible();
});
