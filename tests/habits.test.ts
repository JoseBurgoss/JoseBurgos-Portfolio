import { describe, expect, it } from 'vitest';
import { habits } from '../src/content/habits';

const all = habits.flatMap((h) => [h.title, h.text, ...(h.proof ? [h.proof.label] : [])]);

describe('Cómo trabajo: paridad ES/EN', () => {
  it('hay cinco hábitos y cada texto existe en ambos idiomas', () => {
    expect(habits).toHaveLength(5);
    for (const t of all) {
      expect(t.es.trim().length).toBeGreaterThan(0);
      expect(t.en.trim().length).toBeGreaterThan(0);
    }
  });
  it('los números coinciden entre ES y EN (nada se traduce "a ojo")', () => {
    const nums = (s: string) => (s.match(/\d+/g) ?? []).join(',');
    for (const h of habits) expect(nums(h.text.es), h.id).toBe(nums(h.text.en));
  });
  it('no hay texto pendiente', () => {
    expect(JSON.stringify(habits)).not.toMatch(/\b(TODO|TBD)\b|lorem ipsum/);
  });
  it('ningún hábito apunta a una sección que ya no existe', () => {
    expect(JSON.stringify(habits)).not.toMatch(/#momento|caso de abajo|case below/i);
  });
});

describe('Cómo trabajo: enlaces', () => {
  it('los enlaces externos son https y no apuntan a IPs ni a repos privados', () => {
    const urls = JSON.stringify(habits).match(/https?:\/\/[^"\s]+/g) ?? [];
    for (const u of urls) {
      expect(u.startsWith('https://'), u).toBe(true);
      expect(u).not.toMatch(/\d+\.\d+\.\d+\.\d+/);
      expect(u).not.toMatch(/github\.com\/JoseBurgossDev/);
    }
  });
  it('no menciona repos ni cuentas de empresa', () => {
    expect(JSON.stringify(habits)).not.toMatch(/akdesarrollador|ALKOSTO/i);
  });
});
