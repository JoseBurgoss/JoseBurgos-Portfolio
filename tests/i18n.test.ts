import { describe, expect, it } from 'vitest';
import { isLang, langFromPath, localePath, switchLangPath } from '../src/i18n/utils';
import { ui } from '../src/i18n/ui';

describe('isLang / langFromPath', () => {
  it('reconoce idiomas', () => {
    expect(isLang('es')).toBe(true);
    expect(isLang('en')).toBe(true);
    expect(isLang('fr')).toBe(false);
    expect(isLang(undefined)).toBe(false);
  });
  it('lee el idioma del primer segmento y cae en es', () => {
    expect(langFromPath('/en/proyectos/x/')).toBe('en');
    expect(langFromPath('/es/')).toBe('es');
    expect(langFromPath('/')).toBe('es');
    expect(langFromPath('/fr/algo/')).toBe('es');
  });
});

describe('localePath', () => {
  it('construye rutas con barra final', () => {
    expect(localePath('es')).toBe('/es/');
    expect(localePath('en', 'proyectos/reportaya/')).toBe('/en/proyectos/reportaya/');
    expect(localePath('en', '/proyectos/reportaya')).toBe('/en/proyectos/reportaya/');
  });
});

describe('switchLangPath (cambio de idioma conserva la página)', () => {
  it('home', () => {
    expect(switchLangPath('/es/', 'en')).toBe('/en/');
    expect(switchLangPath('/en/', 'es')).toBe('/es/');
  });
  it('página de proyecto', () => {
    expect(switchLangPath('/es/proyectos/reportaya/', 'en')).toBe('/en/proyectos/reportaya/');
  });
  it('sin barra final y raíz', () => {
    expect(switchLangPath('/es', 'en')).toBe('/en/');
    expect(switchLangPath('/', 'en')).toBe('/en/');
  });
  it('ruta sin prefijo de idioma se antepone', () => {
    expect(switchLangPath('/fr/algo/', 'en')).toBe('/en/fr/algo/');
  });
});

describe('paridad de textos de interfaz', () => {
  const keys = (o: unknown, prefix = ''): string[] =>
    Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
      typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`],
    );
  const leaves = (o: unknown): string[] =>
    Object.values(o as Record<string, unknown>).flatMap((v) =>
      typeof v === 'object' && v !== null ? leaves(v) : [String(v)],
    );
  it('es y en tienen las mismas claves', () => {
    expect(keys(ui.es).sort()).toEqual(keys(ui.en).sort());
  });
  it('no hay textos vacíos ni pendientes', () => {
    for (const lang of ['es', 'en'] as const) {
      for (const text of leaves(ui[lang])) {
        expect(text.trim().length).toBeGreaterThan(0);
        expect(text).not.toMatch(/\b(TODO|TBD)\b/);
        expect(text).not.toMatch(/lorem ipsum/i);
      }
    }
  });
});
