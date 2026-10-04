import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('licencia y ausencia de la plantilla', () => {
  it('LICENSE está a nombre de José Burgos', () => {
    const text = readFileSync('LICENSE', 'utf8');
    expect(text).toMatch(/José Andres Burgos Bolivar/);
    expect(text).not.toMatch(/Oscar Hernandez/);
  });
  it('ningún archivo versionado menciona a la plantilla original', () => {
    const files = execFileSync('git', ['ls-files'], { encoding: 'utf8' })
      .split('\n')
      .filter((f) => f && !f.startsWith('docs/') && !/\.(webp|png|jpg|pdf)$/.test(f) && f !== 'tests/license.test.ts');
    const hits = files.filter((f) => /Oscar Hernandez/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
