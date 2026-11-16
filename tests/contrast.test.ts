import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast } from '../src/lib/contrast';

const css = readFileSync('src/styles/tokens.css', 'utf8');
/** Bloque de un tema: desde su selector hasta la primera llave de cierre. */
const block = (start: string) => {
  const i = css.indexOf(start);
  if (i < 0) throw new Error(`bloque ${start} no encontrado`);
  return css.slice(i, css.indexOf('}', i));
};
const themes = {
  noche: block(":root,\n:root[data-theme='night']"),
  día: block(":root[data-theme='day']"),
  'día (sin elección, por sistema)': block(':root:not([data-theme])'),
};
const token = (theme: string, name: string) => {
  const m = theme.match(new RegExp(String.raw`--${name}:\s*(oklch\([^)/]*\))`));
  if (!m) throw new Error(`token --${name} no encontrado o no es oklch(L C H)`);
  return m[1];
};

describe('contraste base', () => {
  it('negro sobre blanco ≈ 21', () => {
    expect(contrast('oklch(0 0 0)', 'oklch(1 0 0)')).toBeCloseTo(21, 0);
  });
});

// WCAG AA: texto 4.5, texto principal ≥ 7 (AAA), bordes de controles y foco ≥ 3.
const cases: Array<[string, string, number]> = [
  ['text', 'bg', 7],
  ['text', 'surface', 7],
  ['text', 'surface-2', 7],
  ['text-2', 'bg', 4.5],
  ['text-2', 'surface', 4.5],
  ['text-2', 'surface-2', 4.5],
  ['link', 'bg', 4.5],
  ['link', 'surface', 4.5],
  ['ok', 'bg', 4.5],
  ['on-acc', 'acc', 7], // el amarillo es relleno: siempre con tinta encima
  ['line-strong', 'bg', 3],
  ['line-strong', 'surface', 3],
];
for (const [name, theme] of Object.entries(themes)) {
  describe(`contraste de tokens, tema ${name}`, () => {
    // La variante «sistema» solo redefine lo que cambia; el amarillo y la tinta sobre amarillo vienen del bloque de día.
    const t = (n: string) => {
      try { return token(theme, n); } catch { return token(themes.día, n); }
    };
    for (const [fg, bg, min] of cases) {
      it(`${fg} sobre ${bg} ≥ ${min}`, () => {
        expect(contrast(t(fg), t(bg))).toBeGreaterThanOrEqual(min);
      });
    }
  });
}

describe('el amarillo nunca es texto sobre claro', () => {
  it('amarillo sobre el fondo de día no llega a 3 (por eso es relleno con tinta encima)', () => {
    expect(contrast(token(themes.día, 'acc'), token(themes.día, 'bg'))).toBeLessThan(3);
  });
});
