import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast } from '../src/lib/contrast';

const css = readFileSync('src/styles/tokens.css', 'utf8');
const token = (name: string) => {
  const m = css.match(new RegExp(String.raw`--${name}:\s*(oklch\([^)]*\))`));
  if (!m) throw new Error(`token --${name} no encontrado o no es oklch(L C H)`);
  return m[1];
};

describe('contraste base', () => {
  it('negro sobre blanco ≈ 21', () => {
    expect(contrast('oklch(0 0 0)', 'oklch(1 0 0)')).toBeCloseTo(21, 0);
  });
});

describe('contraste de tokens (WCAG AA = 4.5, texto principal ≥ 7)', () => {
  const cases: Array<[string, string, number]> = [
    ['color-paper', 'color-ink', 7],
    ['color-muted', 'color-ink', 4.5],
    ['color-accent', 'color-ink', 4.5],
    ['color-accent-ink', 'color-accent', 4.5],
    ['color-ink', 'color-tile-zuliano', 7],
    ['color-paper', 'color-tile-movies', 7],
    ['color-ink', 'color-tile-tienda', 7],
    ['color-muted', 'color-ink-2', 4.5],
    ['color-paper', 'color-ink-2', 7],
    ['color-accent', 'color-ink-2', 4.5],
  ];
  for (const [fg, bg, min] of cases) {
    it(`${fg} sobre ${bg} ≥ ${min}`, () => {
      expect(contrast(token(fg), token(bg))).toBeGreaterThanOrEqual(min);
    });
  }
  it('el foco es visible sobre el fondo (≥ 3)', () => {
    expect(contrast(token('color-focus'), token('color-ink'))).toBeGreaterThanOrEqual(3);
  });
});
