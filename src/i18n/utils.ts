export const locales = ['es', 'en'] as const;
export type Lang = (typeof locales)[number];
/** Idioma de entrada: inglés (la raíz y las rutas sin prefijo caen aquí). Quien elige español queda recordado. */
export const defaultLang: Lang = 'en';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

export function langFromPath(pathname: string): Lang {
  const first = pathname.split('/').filter(Boolean)[0];
  return isLang(first) ? first : defaultLang;
}

function withSlashes(path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, '');
  return clean ? `${clean}/` : '';
}

export function localePath(lang: Lang, path = ''): string {
  return `/${lang}/${withSlashes(path)}`;
}

export function switchLangPath(pathname: string, target: Lang): string {
  const segments = pathname.split('/').filter(Boolean);
  const rest = isLang(segments[0]) ? segments.slice(1) : segments;
  return localePath(target, rest.join('/'));
}
