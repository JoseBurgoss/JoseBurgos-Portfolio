import { expect, test } from '@playwright/test';

const pages = ['/es/', '/en/', '/es/proyectos/reportaya/', '/en/proyectos/moviesapp/', '/es/proyectos/el-zuliano/', '/en/proyectos/tienda-burgos/'];

for (const p of pages) {
  test(`enlaces internos y descargas responden 200: ${p}`, async ({ page }) => {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''));
    const internal = [...new Set(hrefs.filter((h) => h.startsWith('/')).map((h) => h.split('#')[0]))].filter(Boolean);
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test(`todas las imágenes cargan: ${p}`, async ({ page }) => {
    await page.goto(p);
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
    await page.waitForLoadState('networkidle');
    const broken = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.currentSrc || i.src),
    );
    expect(broken).toEqual([]);
  });
}

test('las descargas de CV existen en ambos idiomas', async ({ request }) => {
  for (const f of ['/cv/CV_Jose_Burgos_ES.pdf', '/cv/CV_Jose_Burgos_EN.pdf']) {
    const res = await request.get(f);
    expect(res.status(), f).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  }
});
