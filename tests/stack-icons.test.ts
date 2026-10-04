import { describe, expect, it } from 'vitest';
import { site } from '../src/content/site';
import { iconFor, noIcon } from '../src/data/stack-icons';

describe('íconos del stack', () => {
  const items = site.stack.flatMap((g) => g.items);

  it('cada tecnología tiene ícono o está declarada explícitamente sin ícono', () => {
    const unresolved = items.filter((name) => !iconFor(name) && !noIcon.includes(name));
    expect(unresolved).toEqual([]);
  });

  it('los íconos traen un path SVG utilizable', () => {
    const withIcon = items.filter((name) => iconFor(name));
    expect(withIcon.length).toBeGreaterThanOrEqual(15);
    for (const name of withIcon) expect(iconFor(name)!.path.length, name).toBeGreaterThan(20);
  });
});

describe('datos rápidos de Sobre mí', () => {
  it('tres datos por idioma', () => {
    expect(site.facts.es).toHaveLength(3);
    expect(site.facts.en).toHaveLength(3);
  });
});
