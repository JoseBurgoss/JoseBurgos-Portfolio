import { describe, expect, it } from 'vitest';
import { habits, moment } from '../src/content/case';

const nums = (s: string) => (s.match(/\d+/g) ?? []).join(',');
const all = [
  ...habits.flatMap((h) => [h.title, h.text]),
  ...moment.steps.flatMap((s) => [s.title, s.text]),
  moment.title, moment.lede, moment.meta, moment.kicker,
];

describe('Cómo trabajo: paridad ES/EN', () => {
  it('cada texto existe en ambos idiomas', () => {
    for (const t of all) {
      expect(t.es.trim().length).toBeGreaterThan(0);
      expect(t.en.trim().length).toBeGreaterThan(0);
    }
  });
  it('los números de cada paso coinciden entre ES y EN (nada se traduce "a ojo")', () => {
    for (const s of moment.steps) expect(nums(s.text.es), s.id).toBe(nums(s.text.en));
    expect(nums(moment.meta.es)).toBe(nums(moment.meta.en));
  });
  it('no hay texto pendiente', () => {
    expect(JSON.stringify({ habits, moment })).not.toMatch(/\b(TODO|TBD)\b|lorem ipsum/);
  });
});

describe('Momento real: evidencia citada', () => {
  it('los hashes de commit son de 7 caracteres hexadecimales', () => {
    const hashes = moment.evidence.filter((e) => /^[0-9a-f]{7}$/.test(e.code));
    expect(hashes.map((e) => e.code)).toEqual(['c0ffe60', 'b0bf918']);
  });
  it('los enlaces externos son https y no apuntan a IPs ni a repos privados', () => {
    const text = JSON.stringify({ habits, moment });
    const urls = text.match(/https?:\/\/[^"\s]+/g) ?? [];
    for (const u of urls) {
      expect(u.startsWith('https://'), u).toBe(true);
      expect(u).not.toMatch(/\d+\.\d+\.\d+\.\d+/);
      expect(u).not.toMatch(/github\.com\/JoseBurgossDev/);
    }
  });
  it('no menciona repos ni cuentas de empresa', () => {
    expect(JSON.stringify({ habits, moment })).not.toMatch(/akdesarrollador|ALKOSTO/i);
  });
});
