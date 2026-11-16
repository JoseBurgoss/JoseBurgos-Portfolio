import { expect, test } from '@playwright/test';

const opacityOf = () => (els: Element[]) => els.map((el) => Number(getComputedStyle(el).opacity));

test.describe('aparición al hacer scroll', () => {
  test('con movimiento normal, un bloque fuera de pantalla empieza oculto y aparece al llegar', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/en/');
    const block = page.locator('#contact [data-reveal]').first();
    expect(await block.evaluate((el) => Number(getComputedStyle(el).opacity))).toBeLessThan(0.1);
    await block.scrollIntoViewIfNeeded();
    await expect.poll(() => block.evaluate((el) => Number(getComputedStyle(el).opacity))).toBe(1);
  });

  test('con movimiento reducido todo es visible sin hacer scroll', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/');
    const ops = await page.$$eval('[data-reveal]', opacityOf());
    expect(ops.length).toBeGreaterThan(5);
    expect(ops.every((o) => o === 1)).toBe(true);
  });

  test.describe('sin JavaScript', () => {
    test.use({ javaScriptEnabled: false });
    test('todo es visible', async ({ page }) => {
      await page.goto('/en/');
      const ops = await page.$$eval('[data-reveal]', opacityOf());
      expect(ops.length).toBeGreaterThan(5);
      expect(ops.every((o) => o === 1)).toBe(true);
      await expect(page.locator('[data-copy-email]')).toBeHidden();
    });
  });
});

test('experiencia: una fila por empleo y una por estudios, con regla de tinta', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('.exp > li')).toHaveCount(3);
  const border = await page.locator('.exp').evaluate((el) => getComputedStyle(el).borderTopWidth);
  expect(border).toBe('2px');
});

test('el stack es texto con barras: sin íconos ni chips', async ({ page }) => {
  await page.goto('/en/');
  expect(await page.locator('#stack svg, #stack img').count()).toBe(0);
  expect(await page.locator('.stack__g li').count()).toBeGreaterThanOrEqual(20);
});

test('sobre mí muestra tres datos rápidos', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.locator('.facts li')).toHaveCount(3);
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
  await page.goto('/en/');
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

test.describe('tema día / noche', () => {
  test('sin elección guardada sigue al sistema; el botón alterna y la elección persiste', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/en/');
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    const light = await bg();
    await expect(page.locator('html')).not.toHaveAttribute('data-theme', /.+/);
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    await expect.poll(bg).not.toBe(light);
    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'night');
    await page.locator('[data-theme-toggle]').click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day');
    await page.goto('/es/proyectos/cabal/');
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'day'); // se conserva entre páginas
  });

  test('con el sistema en oscuro y sin elección, la página abre en noche', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');
    const bg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
    // noche: fondo muy oscuro (canal rojo bajo)
    expect(Number(bg.match(/\d+/)![0])).toBeLessThan(40);
  });

  test('el botón anuncia la acción contraria al tema actual', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('jb-theme', 'night'));
    await page.goto('/en/');
    await expect(page.locator('[data-theme-toggle]')).toHaveAttribute('aria-label', 'Switch to day mode');
  });
});

test.describe('archivo', () => {
  test('los filtros muestran el conteo y ocultan filas', async ({ page }) => {
    await page.goto('/en/');
    await expect(page.locator('.chip')).toHaveCount(5);
    await expect(page.locator('.chip[data-filter="all"] small')).toHaveText('15');
    await page.locator('.chip[data-filter="proto"]').click();
    await expect(page.locator('.row:not(.is-off)')).toHaveCount(8);
    await expect(page.locator('.chip[data-filter="proto"]')).toHaveAttribute('aria-pressed', 'true');
  });

  test('la vista previa sigue al cursor con puntero fino', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/');
    const row = page.locator('.row a').nth(4);
    await row.scrollIntoViewIfNeeded();
    await row.hover();
    await expect(page.locator('.peek')).toHaveClass(/is-on/);
    await page.mouse.move(0, 0);
    await page.locator('h1').hover();
    await expect(page.locator('.peek')).not.toHaveClass(/is-on/);
  });

  test('en móvil la fila lleva miniatura y no hay vista flotante', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/');
    await expect(page.locator('.row a').first().locator('img')).toBeVisible();
    await expect(page.locator('.peek')).toBeHidden();
  });
});

test.describe('casos de estudio', () => {
  test('se leen en cuatro movimientos y el índice los enlaza', async ({ page }) => {
    await page.goto('/en/proyectos/cabal/');
    for (const id of ['problem', 'decisions', 'screens', 'next']) await expect(page.locator(`#${id}`)).toHaveCount(1);
    await expect(page.locator('.toc a')).toHaveCount(4);
    const order = await page.evaluate(() => ['problem', 'decisions', 'screens', 'next'].map((id) => document.getElementById(id)!.getBoundingClientRect().top));
    expect([...order].sort((a, b) => a - b)).toEqual(order);
  });

  test('Cabal tiene su pieza propia: el plan de pagos 40/20/20/20 explica cada tramo', async ({ page }) => {
    await page.goto('/en/proyectos/cabal/');
    const buttons = page.locator('.plan__bar button');
    await expect(buttons).toHaveCount(4);
    await buttons.nth(3).scrollIntoViewIfNeeded();
    await buttons.nth(3).click();
    await expect(page.locator('[data-plan-note]')).toContainText('3-month warranty');
    await expect(buttons.nth(3)).toHaveAttribute('aria-pressed', 'true');
  });

  test('el nombre largo del caso cabe a 320 px', async ({ page }) => {
    await page.setViewportSize({ width: 320, height: 700 });
    await page.goto('/es/proyectos/tienda-burgos/');
    const over = await page.locator('.cs-h1').evaluate((el) => el.scrollWidth - el.clientWidth);
    expect(over).toBeLessThanOrEqual(1);
  });
});
