import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { site } from '../src/content/site';

const isL10n = (v: unknown): v is { es: unknown; en: unknown } =>
  typeof v === 'object' && v !== null && 'es' in v && 'en' in v;

function walk(value: unknown, path: string, visit: (p: string, v: { es: unknown; en: unknown }) => void) {
  if (isL10n(value)) return visit(path, value);
  if (Array.isArray(value)) value.forEach((v, i) => walk(v, `${path}[${i}]`, visit));
  else if (typeof value === 'object' && value !== null)
    Object.entries(value).forEach(([k, v]) => walk(v, `${path}.${k}`, visit));
}

const placeholder = /\b(TODO|TBD)\b/;
const lorem = /lorem ipsum/i;

describe('site.ts: paridad ES/EN', () => {
  it('cada campo bilingüe tiene ambos idiomas y misma cantidad de ítems', () => {
    const seen: string[] = [];
    walk(site, 'site', (path, v) => {
      seen.push(path);
      for (const lang of ['es', 'en'] as const) {
        const x = v[lang];
        if (Array.isArray(x)) expect(x.length, `${path}.${lang}`).toBeGreaterThan(0);
        else expect(String(x).trim().length, `${path}.${lang}`).toBeGreaterThan(0);
      }
      if (Array.isArray(v.es)) expect((v.en as unknown[]).length, path).toBe(v.es.length);
    });
    expect(seen.length).toBeGreaterThan(10);
  });
  it('no hay texto pendiente ni métricas inventadas', () => {
    const text = JSON.stringify(site);
    expect(text).not.toMatch(placeholder);
    expect(text).not.toMatch(lorem);
    expect(text).not.toMatch(/\b\d{2,}\s?\+\s?(clients|clientes|users|usuarios)\b/i);
  });
  it('las rutas de CV son las esperadas', () => {
    expect(site.cv.es).toBe('/cv/CV_Jose_Burgos_ES.pdf');
    expect(site.cv.en).toBe('/cv/CV_Jose_Burgos_EN.pdf');
  });
});

describe('casos de estudio MDX', () => {
  const projects = ['reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos'];
  for (const lang of ['es', 'en']) {
    for (const p of projects) {
      const file = `src/content/proyectos/${lang}/${p}.mdx`;
      it(`${lang}/${p}.mdx existe, declara project y tiene ≥ 3 secciones`, () => {
        expect(existsSync(file)).toBe(true);
        const src = readFileSync(file, 'utf8');
        expect(src).toMatch(new RegExp(`^project: ${p}$`, 'm'));
        expect(src).not.toMatch(/^slug:/m);
        expect(src).not.toMatch(placeholder);
        expect(src).not.toMatch(lorem);
        expect((src.match(/^## /gm) ?? []).length).toBeGreaterThanOrEqual(3);
      });
    }
  }
  it('ReportaYa no promete publicación en tiendas ni cita tecnologías ausentes del CV', () => {
    for (const lang of ['es', 'en']) {
      const src = readFileSync(`src/content/proyectos/${lang}/reportaya.mdx`, 'utf8');
      expect(src, lang).not.toMatch(/Google Play|App Store|PostGIS/i);
    }
  });
  it('no hay archivos de más', () => {
    expect(readdirSync('src/content/proyectos/es').sort()).toEqual(projects.map((p) => `${p}.mdx`).sort());
    expect(readdirSync('src/content/proyectos/en').sort()).toEqual(projects.map((p) => `${p}.mdx`).sort());
  });
});
