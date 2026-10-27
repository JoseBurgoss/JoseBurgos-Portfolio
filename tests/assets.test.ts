import { execFileSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const phones = [
  ...['login', 'feed', 'guides', 'map'].map((n) => `src/assets/projects/reportaya-${n}.webp`),
  ...['list', 'menu', 'detail', 'favorites'].map((n) => `src/assets/projects/moviesapp-${n}.webp`),
  ...['cuenta', 'cuenta-entrar', 'cancha', 'cuadre', 'fase', 'pique', 'brio', 'admin'].map((n) => `src/assets/projects/burgo-${n}.webp`),
  ...['entrar', 'inicio', 'productos', 'comunidad'].map((n) => `src/assets/projects/sobre-${n}.webp`),
  ...['inicio', 'encargo', 'villa', 'inicio-en'].map((n) => `src/assets/projects/burgo-dev-${n}.webp`),
];
const wides = [
  'src/assets/projects/el-zuliano.webp',
  'src/assets/projects/tienda-burgos.webp',
  ...['cuenta-escritorio', 'admin-escritorio'].map((n) => `src/assets/projects/burgo-${n}.webp`),
  ...['escritorio-inicio', 'escritorio-entrar'].map((n) => `src/assets/projects/sobre-${n}.webp`),
  ...['escritorio', 'villa-escritorio'].map((n) => `src/assets/projects/burgo-dev-${n}.webp`),
];

describe('capturas de teléfono', () => {
  for (const f of phones) {
    it(`${f}: vertical, razón de aspecto 0.40–0.48`, async () => {
      expect(existsSync(f)).toBe(true);
      const { width, height } = await sharp(f).metadata();
      expect(height).toBeGreaterThanOrEqual(1000);
      const ratio = (width ?? 0) / (height ?? 1);
      expect(ratio).toBeGreaterThan(0.4);
      expect(ratio).toBeLessThan(0.48);
    });
  }
});

describe('capturas web', () => {
  for (const f of wides) {
    it(`${f}: horizontal ≥ 1200 px de ancho, razón 1.6–2.4`, async () => {
      expect(existsSync(f)).toBe(true);
      const { width, height } = await sharp(f).metadata();
      expect(width).toBeGreaterThanOrEqual(1200);
      const ratio = (width ?? 0) / (height ?? 1);
      expect(ratio).toBeGreaterThan(1.6);
      expect(ratio).toBeLessThan(2.4);
    });
  }
});

describe('foto, CV y OG', () => {
  it('foto retrato', async () => {
    const { width, height } = await sharp('src/assets/jose-burgos.webp').metadata();
    expect(height).toBeGreaterThan(width ?? 0);
  });
  it('CVs y OG existen', () => {
    for (const f of ['public/cv/CV_Jose_Burgos_ES.pdf', 'public/cv/CV_Jose_Burgos_EN.pdf', 'public/og.png']) {
      expect(existsSync(f), f).toBe(true);
    }
  });
  it('los CV públicos no exponen el teléfono personal', () => {
    for (const f of ['public/cv/CV_Jose_Burgos_ES.pdf', 'public/cv/CV_Jose_Burgos_EN.pdf']) {
      const text = execFileSync('pdftotext', [f, '-'], { encoding: 'utf8' });
      expect(text, f).toContain('joseburgos153@gmail.com');
      expect(text, f).not.toMatch(/\+?58\s?414|0629243/);
    }
  });
  it('og.png mide 1200x630', async () => {
    const { width, height } = await sharp('public/og.png').metadata();
    expect([width, height]).toEqual([1200, 630]);
  });
});
