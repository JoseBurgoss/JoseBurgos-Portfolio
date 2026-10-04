# Portafolio José Burgos — Plan de construcción

> **Para quien ejecute:** usar `superpowers:subagent-driven-development` (recomendado) o `superpowers:executing-plans`. Los pasos usan casillas `- [ ]`.

**Objetivo:** construir el portafolio nuevo (código propio, bilingüe ES/EN, muro de proyectos + casos de estudio) y publicarlo en `jose-burgos-portfolio.vercel.app` reemplazando la plantilla.

**Arquitectura:** sitio estático con Astro 7. Estilos en CSS propio con tokens OKLCH, sin Tailwind ni librerías de UI. Datos bilingües en `src/content/site.ts` (TypeScript) y casos de estudio en una colección MDX (`es/` y `en/`). Una sola isla de React (`MobileNav`), el resto es HTML/CSS estático. Pruebas con Vitest (lógica, contenido, activos) y Playwright (diseño, enlaces, accesibilidad básica).

**Stack:** Node ≥ 22.12, Astro `^7.3.5`, `@astrojs/react` `^7`, `@astrojs/mdx` `^8`, `@astrojs/sitemap` `^3`, React 19, sharp, Vitest, Playwright, fuentes autoalojadas con Fontsource.

**Spec:** `docs/superpowers/specs/2026-10-04-portafolio-design.md`

## Restricciones globales

Aplican a todas las tareas.

- Directorio del proyecto: `C:\Users\Alkosto\Burgos\Portafolio` (Git Bash: `/c/Users/Alkosto/Burgos/Portafolio`). Rama de trabajo: `redesign`. Remoto: `https://github.com/JoseBurgoss/JoseBurgos-Portfolio.git`.
- Cuenta de GitHub activa: `JoseBurgoss` (`gh auth switch -u JoseBurgoss`).
- Ningún archivo de la plantilla original (© Oscar Hernandez) sobrevive. No copiar nada de ella.
- Todos los colores y `font-family` salen de variables de `src/styles/tokens.css`. Prohibido `#hex`, `rgb()`, `oklch()` y nombres de fuente sueltos en componentes (solo en `tokens.css`).
- Colores en OKLCH con formato `oklch(L C H)` (decimales, sin `%`) para que el test de contraste los lea.
- Solo se animan `transform`, `translate` y `opacity`. Nunca `width`, `height`, `padding` ni `margin`.
- Titulares siempre `font-style: normal`. Sin texto con degradado, sin fondos de grilla decorativa, sin ventanas/teléfonos dibujados (solo capturas reales con borde fino).
- Sin cifras, testimonios ni logros inventados. Solo lo que ya está en el CV/LinkedIn aprobado.
- Paridad ES/EN: toda cadena visible existe en ambos idiomas.
- Rutas: `/es/…` y `/en/…`. Raíz `/` redirige según idioma del navegador (por defecto `es`).
- En frontmatter MDX el identificador del proyecto se llama `project` (nunca `slug`: en Astro 7 `slug` reemplaza el `id` y las versiones ES/EN chocan).
- `html` y `body` con `overflow-x: clip` (nunca `hidden`). Pistas de grid con imágenes: `minmax(0, 1fr)`. Botones y enlaces de navegación en una sola línea (`white-space: nowrap`).
- Ancho mínimo soportado: 320 px sin scroll horizontal.
- Mensajes de commit en inglés, formato `feat|fix|chore|docs|test: …`, terminados con la línea `Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>`.
- Idioma de la interfaz: español por defecto.

## Review Focus

Casos que la especificación implica y que más probablemente fallen. Cada uno tiene su prueba en la tarea indicada.

1. **320 px:** titulares largos y tarjetas del muro desbordan horizontalmente → Tarea 10 (`layout.spec.ts`).
2. **Sin JavaScript:** el menú móvil queda oculto e inalcanzable → Tarea 4 y Tarea 10 (`nojs.spec.ts`).
3. **`prefers-reduced-motion`:** las animaciones siguen corriendo → Tarea 10 (`motion.spec.ts`).
4. **Traducción incompleta:** una clave existe en ES y falta en EN (o al revés) → Tarea 3 y Tarea 5.
5. **Cambio de idioma en página de proyecto:** debe conservar el mismo proyecto; rutas raras o sin prefijo no deben romperse → Tarea 3 (`i18n.test.ts`) y Tarea 10 (`i18n.spec.ts`).
6. **Enlaces o imágenes rotas** (CV, capturas, rutas de proyecto) → Tarea 10 (`links.spec.ts`).

---

## Estructura de archivos

```
.gitignore · package.json · astro.config.mjs · tsconfig.json
vitest.config.ts · playwright.config.ts · LICENSE · README.md
scripts/            prepare-assets.mjs · capture-web.mjs · make-og.mjs
assets-src/         (ignorado por git) originales pesados
public/             cv/CV_Jose_Burgos_{ES,EN}.pdf · robots.txt · favicon.svg · og.png
src/
  lib/contrast.ts                     OKLCH → luminancia → razón de contraste
  i18n/ui.ts · utils.ts               textos de interfaz y rutas por idioma
  content.config.ts                   colección `proyectos`
  content/site.ts                     datos bilingües del home
  content/proyectos/{es,en}/*.mdx     casos de estudio
  data/projects.ts                    imágenes y orden de los proyectos
  assets/                             jose-burgos.webp · projects/*.webp
  styles/tokens.css · base.css
  layouts/BaseLayout.astro
  components/                         Header · Footer · Frame · Wall · Home · About ·
                                      Experience · Stack · Certs · OtherProjects · Contact
  islands/MobileNav.tsx
  pages/index.astro · [lang]/index.astro · [lang]/proyectos/[project].astro
tests/              contrast · i18n · content · assets · license (Vitest)
tests/e2e/          layout · nojs · motion · i18n · links · a11y (Playwright)
```

---

### Task 1: Repositorio, limpieza de la plantilla y andamiaje

**Files:**
- Crear: `.gitignore`, `package.json`, `astro.config.mjs`, `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`
- Eliminar: todo archivo de la plantilla (todo lo que no esté bajo `docs/`)

**Interfaces:**
- Produce: scripts npm `dev`, `build`, `preview`, `test`, `test:e2e`, `assets`, `capture`, `og`; carpeta `assets-src/` con los originales.

- [ ] **Paso 1: Preparar la rama sobre `origin/main`**

```bash
cd /c/Users/Alkosto/Burgos/Portafolio
git config user.name "José Burgos"
git config user.email "joseburgos153@gmail.com"
gh auth switch -u JoseBurgoss
gh auth setup-git
git branch -m redesign
git remote add origin https://github.com/JoseBurgoss/JoseBurgos-Portfolio.git
git fetch origin
git rebase --onto origin/main --root redesign
git log --oneline | head -3
```

Esperado: arriba aparece `docs: add portfolio redesign spec` sobre los commits de la plantilla.

- [ ] **Paso 2: Guardar los originales de capturas antes de borrar la plantilla**

```bash
mkdir -p assets-src
git show origin/main:public/projects/reportaya.png > assets-src/reportaya.png
for f in IMG_5730 IMG_5731 IMG_5733 IMG_5737; do
  gh api -H "Accept: application/vnd.github.raw" "repos/JoseBurgoss/MoviesApp-Expo/contents/DemoImages/$f.PNG" > "assets-src/movies-$f.png"
done
cp /c/Users/Alkosto/Burgos/CVS/foto-jose-burgos.jpg assets-src/foto.jpg
ls -la assets-src
```

Esperado: 6 archivos, cada uno > 100 KB (si alguno pesa 14 bytes es un 404: revisar la ruta).

- [ ] **Paso 3: Eliminar la plantilla**

```bash
git ls-files | grep -v '^docs/' | xargs git rm -q
git ls-files
```

Esperado: solo archivos bajo `docs/`.

- [ ] **Paso 4: `.gitignore`**

```gitignore
node_modules/
dist/
.astro/
.vercel/
.env
.env.*
assets-src/
lh-*.json
playwright-report/
test-results/
.superpowers/
.DS_Store
```

- [ ] **Paso 5: `package.json`**

```json
{
  "name": "jose-burgos-portfolio",
  "type": "module",
  "version": "1.0.0",
  "private": true,
  "engines": { "node": ">=22.12.0" },
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview --port 4321",
    "test": "vitest run",
    "test:e2e": "playwright test",
    "assets": "node scripts/prepare-assets.mjs",
    "capture": "node scripts/capture-web.mjs",
    "og": "node scripts/make-og.mjs"
  },
  "allowScripts": { "esbuild": true, "sharp": true }
}
```

- [ ] **Paso 6: Instalar dependencias**

```bash
npm install astro @astrojs/react @astrojs/mdx @astrojs/sitemap react react-dom sharp \
  @fontsource-variable/schibsted-grotesk @fontsource-variable/instrument-sans @fontsource/jetbrains-mono
npm install -D @types/react @types/react-dom vitest @playwright/test
npx playwright install chromium
```

Esperado: sin errores. Verificar que `package.json` quedó con `astro ^7.3.5`.

- [ ] **Paso 7: `astro.config.mjs`**

```js
// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jose-burgos-portfolio.vercel.app',
  trailingSlash: 'always',
  integrations: [
    react(),
    mdx(),
    sitemap({
      filter: (page) => new URL(page).pathname !== '/',
      i18n: { defaultLocale: 'es', locales: { es: 'es-VE', en: 'en-US' } },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: true },
  },
});
```

- [ ] **Paso 8: `tsconfig.json`, `vitest.config.ts`, `playwright.config.ts`**

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist", "node_modules", "assets-src"],
  "compilerOptions": { "jsx": "react-jsx", "jsxImportSource": "react" }
}
```

`vitest.config.ts`:
```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: { include: ['tests/**/*.test.ts'], environment: 'node' },
});
```

`playwright.config.ts`:
```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:4321' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'npm run build && npm run preview',
    url: 'http://localhost:4321/es/',
    reuseExistingServer: true,
    timeout: 180_000,
  },
});
```

- [ ] **Paso 9: Página mínima para comprobar el andamiaje**

`src/pages/[lang]/index.astro` (temporal; la Tarea 8 la reemplaza):
```astro
---
export function getStaticPaths() {
  return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];
}
---
<html lang={Astro.params.lang}><head><meta charset="utf-8" /><title>José Burgos</title></head><body><h1>José Burgos</h1></body></html>
```

- [ ] **Paso 10: Verificar build y commit**

```bash
npm run build
```
Esperado: `Complete!` y existen `dist/es/index.html` y `dist/en/index.html`.

```bash
git add -A
git commit -m "chore: replace third-party template with fresh Astro 7 scaffold

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 2: Tokens, estilos base, fuentes y prueba de contraste

**Files:**
- Crear: `src/lib/contrast.ts`, `tests/contrast.test.ts`, `src/styles/tokens.css`, `src/styles/base.css`

**Interfaces:**
- Produce: `parseOklch(value: string): [number, number, number]`, `luminance(lch: [number, number, number]): number`, `contrast(a: string, b: string): number` (reciben cadenas `oklch(L C H)`); clases globales `.container`, `.sr-only`, `.btn`, `.btn--primary`, `.section`; keyframes globales `rise` y `float`; variables CSS descritas abajo.

- [ ] **Paso 1: Escribir la prueba que falla**

`tests/contrast.test.ts`:
```ts
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { contrast } from '../src/lib/contrast';

const css = readFileSync('src/styles/tokens.css', 'utf8');
const token = (name: string) => {
  const m = css.match(new RegExp(`--${name}:\\s*(oklch\\([^)]*\\))`));
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
```

- [ ] **Paso 2: Ejecutar y ver que falla**

Run: `npx vitest run tests/contrast.test.ts`
Expected: FAIL (`Cannot find module '../src/lib/contrast'`).

- [ ] **Paso 3: Implementar `src/lib/contrast.ts`**

```ts
export type Lch = [number, number, number];

export function parseOklch(value: string): Lch {
  const m = value.match(/oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/);
  if (!m) throw new Error(`No es oklch(L C H): ${value}`);
  return [Number(m[1]), Number(m[2]), Number(m[3])];
}

function toLinearSrgb([L, C, H]: Lch): [number, number, number] {
  const h = (H * Math.PI) / 180;
  const a = C * Math.cos(h);
  const b = C * Math.sin(h);
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ];
}

export function luminance(lch: Lch): number {
  const [r, g, b] = toLinearSrgb(lch).map((v) => Math.min(1, Math.max(0, v)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(parseOklch(a)), luminance(parseOklch(b))].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}
```

- [ ] **Paso 4: `src/styles/tokens.css`**

```css
:root {
  /* Color */
  --color-ink: oklch(0.20 0.015 260);
  --color-ink-2: oklch(0.26 0.018 260);
  --color-paper: oklch(0.95 0.012 85);
  --color-muted: oklch(0.74 0.012 85);
  --color-accent: oklch(0.70 0.19 48);
  --color-accent-ink: oklch(0.18 0.03 50);
  --color-focus: oklch(0.82 0.15 85);
  --color-tile-zuliano: oklch(0.90 0.02 85);
  --color-tile-movies: oklch(0.32 0.03 265);
  --color-tile-tienda: oklch(0.85 0.02 85);
  --color-line: oklch(0.95 0.012 85 / 0.18);

  /* Tipografía */
  --font-display: 'Schibsted Grotesk Variable', system-ui, sans-serif;
  --font-body: 'Instrument Sans Variable', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, 'Cascadia Mono', monospace;
  --text-sm: clamp(0.875rem, 0.85rem + 0.1vw, 0.95rem);
  --text-base: clamp(1rem, 0.96rem + 0.2vw, 1.0625rem);
  --text-lg: clamp(1.125rem, 1.05rem + 0.4vw, 1.3rem);
  --text-xl: clamp(1.5rem, 1.2rem + 1.4vw, 2.25rem);
  --text-2xl: clamp(2rem, 1.4rem + 3vw, 3.5rem);
  --text-display: clamp(2.5rem, 1.2rem + 6.4vw, 5.5rem);

  /* Espacio (escala de 4 pt) */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: clamp(4rem, 8vw, 7rem);

  /* Forma y capas */
  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --shadow-frame: 0 20px 40px -18px oklch(0 0 0 / 0.6);

  /* Movimiento */
  --ease-out: cubic-bezier(0.2, 0.8, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --dur-fast: 150ms;
  --dur-base: 300ms;
  --dur-slow: 800ms;

  /* Layout */
  --measure: 62ch;
  --page-pad: clamp(1rem, 4vw, 2rem);
  --page-max: 78rem;
}
```

- [ ] **Paso 4b: Verificar nombres de archivos de fuentes**

```bash
ls node_modules/@fontsource-variable/schibsted-grotesk/ | head
ls node_modules/@fontsource-variable/instrument-sans/ | head
ls node_modules/@fontsource/jetbrains-mono/ | grep -E "^(400|500)\.css$"
```
Esperado: existen `index.css` en las dos primeras y `400.css`, `500.css` en la tercera. Si el nombre de familia en `index.css` no coincide con `--font-*` de arriba (`grep -h "font-family" node_modules/@fontsource-variable/*/index.css | sort -u`), ajustar `--font-display`/`--font-body` en `tokens.css` al nombre exacto.

- [ ] **Paso 5: `src/styles/base.css`**

```css
@import '@fontsource-variable/schibsted-grotesk/index.css';
@import '@fontsource-variable/instrument-sans/index.css';
@import '@fontsource/jetbrains-mono/400.css';
@import '@fontsource/jetbrains-mono/500.css';

*, *::before, *::after { box-sizing: border-box; }

html {
  overflow-x: clip;
  color-scheme: dark;
  -webkit-text-size-adjust: 100%;
  scroll-behavior: smooth;
  scroll-padding-top: 5rem;
}

body {
  margin: 0;
  overflow-x: clip;
  min-height: 100svh;
  background: var(--color-ink);
  color: var(--color-paper);
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: 1.6;
  text-rendering: optimizeLegibility;
}

h1, h2, h3 {
  margin: 0;
  min-width: 0;
  font-family: var(--font-display);
  font-style: normal;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: -0.03em;
  overflow-wrap: anywhere;
  text-wrap: balance;
}
h1 { font-size: var(--text-display); }
h2 { font-size: var(--text-2xl); }
h3 { font-size: var(--text-lg); letter-spacing: -0.01em; line-height: 1.2; }

p { margin: 0; max-width: var(--measure); }
ul, ol { margin: 0; padding: 0; list-style: none; }
img { display: block; max-width: 100%; height: auto; }

a {
  color: inherit;
  text-decoration-color: var(--color-accent);
  text-decoration-thickness: 2px;
  text-underline-offset: 0.25em;
}
a:hover { color: var(--color-accent); }

:focus-visible {
  outline: 3px solid var(--color-focus);
  outline-offset: 3px;
  border-radius: 2px;
}

.container { width: min(100% - 2 * var(--page-pad), var(--page-max)); margin-inline: auto; }
.section { padding-block: var(--space-3xl); }
.sr-only {
  position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
  overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
}

.btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  white-space: nowrap; padding: 0.8rem 1.25rem; border-radius: 999px;
  border: 1px solid var(--color-line);
  font-weight: 600; text-decoration: none;
  transition: transform var(--dur-fast) var(--ease-out);
}
.btn:hover { transform: translateY(-2px); color: inherit; }
.btn--primary { background: var(--color-accent); color: var(--color-accent-ink); border-color: transparent; }
.btn--primary:hover { color: var(--color-accent-ink); }

@keyframes rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
@keyframes float { 50% { translate: 0 -0.6rem; } }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation: none !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Paso 6: Ejecutar y ver que pasa**

Run: `npx vitest run tests/contrast.test.ts`
Expected: PASS (todas las razones calculadas con estos valores son ≥ los mínimos; si alguna falla, subir/bajar `L` del token afectado y repetir).

- [ ] **Paso 7: Commit**

```bash
git add -A
git commit -m "feat: add design tokens, base styles and contrast tests

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Núcleo de i18n

**Files:**
- Crear: `src/i18n/utils.ts`, `src/i18n/ui.ts`, `tests/i18n.test.ts`

**Interfaces:**
- Produce (`utils.ts`): `locales`, `type Lang`, `defaultLang: Lang`, `isLang(x: unknown): x is Lang`, `langFromPath(pathname: string): Lang`, `localePath(lang: Lang, path?: string): string`, `switchLangPath(pathname: string, target: Lang): string`.
- Produce (`ui.ts`): `interface Ui`, `ui: Record<Lang, Ui>`.

- [ ] **Paso 1: Pruebas que fallan**

`tests/i18n.test.ts`:
```ts
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
        expect(text).not.toMatch(/TODO|TBD|lorem/i);
      }
    }
  });
});
```

- [ ] **Paso 2: Ejecutar y ver que falla**

Run: `npx vitest run tests/i18n.test.ts`
Expected: FAIL (módulos no encontrados).

- [ ] **Paso 3: `src/i18n/utils.ts`**

```ts
export const locales = ['es', 'en'] as const;
export type Lang = (typeof locales)[number];
export const defaultLang: Lang = 'es';

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
```

- [ ] **Paso 4: `src/i18n/ui.ts`**

```ts
import type { Lang } from './utils';

export interface Ui {
  meta: { homeTitle: string; homeDescription: string };
  nav: { label: string; skip: string; work: string; about: string; experience: string; stack: string; contact: string; menu: string; close: string; switchTo: string };
  hero: { role: string; title: string; sub: string; ctaWork: string; ctaCv: string };
  work: { title: string; open: string };
  about: { title: string; photoAlt: string };
  experience: { title: string; education: string };
  stack: { title: string };
  certs: { title: string };
  other: { title: string; intro: string; repo: string };
  contact: { title: string; lead: string; linkedin: string; github: string; cvEs: string; cvEn: string };
  project: { back: string; kind: string; status: string; stack: string; links: string; gallery: string; next: string };
  footer: { built: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    meta: {
      homeTitle: 'José Burgos — Desarrollador Full-Stack & Mobile',
      homeDescription: 'Ingeniero en Computación en Maracaibo. Apps móviles y web con React Native, TypeScript y Go. Abierto a oportunidades remotas y proyectos freelance.',
    },
    nav: { label: 'Principal', skip: 'Saltar al contenido', work: 'Proyectos', about: 'Sobre mí', experience: 'Experiencia', stack: 'Stack', contact: 'Contacto', menu: 'Menú', close: 'Cerrar', switchTo: 'Cambiar a inglés' },
    hero: { role: 'Desarrollador Full-Stack & Mobile', title: 'Apps móviles y web que funcionan.', sub: 'Ingeniero en Computación en Maracaibo. React Native, TypeScript y Go.', ctaWork: 'Ver proyectos', ctaCv: 'Descargar CV' },
    work: { title: 'Proyectos', open: 'ver caso de estudio' },
    about: { title: 'Sobre mí', photoAlt: 'Retrato de José Burgos' },
    experience: { title: 'Experiencia', education: 'Educación' },
    stack: { title: 'Stack' },
    certs: { title: 'Certificaciones' },
    other: { title: 'Otros proyectos', intro: 'Trabajos de la universidad y de práctica, con el código en GitHub.', repo: 'Ver en GitHub' },
    contact: { title: 'Hablemos.', lead: 'Estoy abierto a oportunidades remotas y a proyectos freelance de web y móvil.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV en español', cvEn: 'CV en inglés' },
    project: { back: 'Todos los proyectos', kind: 'Tipo', status: 'Estado', stack: 'Stack', links: 'Enlaces', gallery: 'Capturas', next: 'Siguiente proyecto' },
    footer: { built: 'Hecho con Astro. Código propio.' },
  },
  en: {
    meta: {
      homeTitle: 'José Burgos — Full-Stack & Mobile Developer',
      homeDescription: 'Computer Engineer based in Maracaibo. Mobile and web apps with React Native, TypeScript and Go. Open to remote roles and freelance projects.',
    },
    nav: { label: 'Main', skip: 'Skip to content', work: 'Work', about: 'About', experience: 'Experience', stack: 'Stack', contact: 'Contact', menu: 'Menu', close: 'Close', switchTo: 'Switch to Spanish' },
    hero: { role: 'Full-Stack & Mobile Developer', title: 'Mobile and web apps that work.', sub: 'Computer Engineer in Maracaibo. React Native, TypeScript and Go.', ctaWork: 'See projects', ctaCv: 'Download CV' },
    work: { title: 'Work', open: 'view case study' },
    about: { title: 'About', photoAlt: 'Portrait of José Burgos' },
    experience: { title: 'Experience', education: 'Education' },
    stack: { title: 'Stack' },
    certs: { title: 'Certifications' },
    other: { title: 'Other projects', intro: 'University and practice work, with the code on GitHub.', repo: 'View on GitHub' },
    contact: { title: "Let's talk.", lead: "I'm open to remote roles and freelance web and mobile projects.", linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV in Spanish', cvEn: 'CV in English' },
    project: { back: 'All projects', kind: 'Type', status: 'Status', stack: 'Stack', links: 'Links', gallery: 'Screenshots', next: 'Next project' },
    footer: { built: 'Built with Astro. Hand-written code.' },
  },
};
```

- [ ] **Paso 5: Ejecutar y ver que pasa**

Run: `npx vitest run tests/i18n.test.ts`
Expected: PASS.

- [ ] **Paso 6: Commit**

```bash
git add -A
git commit -m "feat: add i18n route helpers and UI strings

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Layout base, cabecera con isla de menú y pie

**Files:**
- Crear: `src/layouts/BaseLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/islands/MobileNav.tsx`, `public/favicon.svg`, `public/robots.txt`

**Interfaces:**
- Consume: `ui`, `localePath`, `switchLangPath`, `Lang` (Tarea 3); `base.css`, `tokens.css` (Tarea 2).
- Produce: `<BaseLayout lang title description pathname ogImage? jsonLd?>` con `<slot />`; `<Header lang pathname />`; `<Footer lang />`. El `<main id="main">` lo pone cada página dentro del slot. La nav tiene `id="site-nav"`, el enlace de idioma lleva `data-lang-switch`.

- [ ] **Paso 1: `src/islands/MobileNav.tsx`**

```tsx
import { useEffect, useState } from 'react';

type Props = { label: string; closeLabel: string };

export default function MobileNav({ label, closeLabel }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('js-nav');
    return () => document.documentElement.classList.remove('js-nav');
  }, []);

  useEffect(() => {
    const nav = document.getElementById('site-nav');
    if (!nav) return;
    nav.dataset.open = String(open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onClick = (e: Event) => {
      if ((e.target as HTMLElement).closest('a')) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    nav.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      nav.removeEventListener('click', onClick);
    };
  }, [open]);

  return (
    <button
      type="button"
      className="nav-toggle"
      aria-expanded={open}
      aria-controls="site-nav"
      onClick={() => setOpen((o) => !o)}
    >
      {open ? closeLabel : label}
    </button>
  );
}
```

- [ ] **Paso 2: `src/components/Header.astro`**

```astro
---
import MobileNav from '../islands/MobileNav.tsx';
import { ui } from '../i18n/ui';
import { localePath, switchLangPath, type Lang } from '../i18n/utils';

interface Props { lang: Lang; pathname: string }
const { lang, pathname } = Astro.props;
const t = ui[lang];
const other: Lang = lang === 'es' ? 'en' : 'es';
const home = localePath(lang);
const links = [
  ['work', t.nav.work],
  ['about', t.nav.about],
  ['experience', t.nav.experience],
  ['stack', t.nav.stack],
  ['contact', t.nav.contact],
] as const;
---
<a class="skip" href="#main">{t.nav.skip}</a>
<header class="site-header">
  <div class="container site-header__row">
    <a class="wordmark" href={home}>José Burgos</a>
    <MobileNav client:media="(max-width: 48rem)" label={t.nav.menu} closeLabel={t.nav.close} />
    <nav id="site-nav" aria-label={t.nav.label}>
      <ul>
        {links.map(([id, label]) => (
          <li><a href={`${home}#${id}`}>{label}</a></li>
        ))}
      </ul>
      <a class="lang" data-lang-switch href={switchLangPath(pathname, other)} hreflang={other} lang={other} aria-label={t.nav.switchTo}>{other.toUpperCase()}</a>
    </nav>
  </div>
</header>

<style>
  .skip { position: absolute; left: var(--space-md); top: -4rem; z-index: 20; padding: var(--space-xs) var(--space-md); background: var(--color-paper); color: var(--color-ink); border-radius: var(--radius-sm); }
  .skip:focus { top: var(--space-sm); }
  .site-header { position: sticky; top: 0; z-index: 10; background: var(--color-ink); border-bottom: 1px solid var(--color-line); }
  .site-header__row { display: flex; align-items: center; justify-content: space-between; gap: var(--space-md); min-height: 4rem; }
  .wordmark { font-family: var(--font-display); font-weight: 700; font-size: var(--text-lg); text-decoration: none; white-space: nowrap; }
  .wordmark:hover { color: var(--color-accent); }
  nav { display: flex; align-items: center; gap: var(--space-lg); }
  nav ul { display: flex; gap: var(--space-lg); }
  nav a { white-space: nowrap; text-decoration: none; font-size: var(--text-sm); }
  nav a:hover { text-decoration: underline; }
  .lang { padding: 0.25rem 0.6rem; border: 1px solid var(--color-line); border-radius: 999px; font-family: var(--font-mono); }

  :global(.nav-toggle) { display: none; padding: 0.5rem 1rem; border: 1px solid var(--color-line); border-radius: 999px; background: transparent; color: inherit; font: inherit; font-size: var(--text-sm); cursor: pointer; white-space: nowrap; }

  @media (max-width: 48rem) {
    .site-header__row { flex-wrap: wrap; }
    nav { flex-wrap: wrap; width: 100%; gap: var(--space-sm) var(--space-lg); padding-bottom: var(--space-md); }
    nav ul { flex-wrap: wrap; gap: var(--space-sm) var(--space-lg); }
    :global(.js-nav) :global(.nav-toggle) { display: inline-flex; }
    :global(.js-nav) nav { display: none; }
    :global(.js-nav) nav[data-open='true'] { display: flex; flex-direction: column; align-items: flex-start; }
    :global(.js-nav) nav[data-open='true'] ul { flex-direction: column; }
  }
</style>
```

- [ ] **Paso 3: `src/components/Footer.astro`**

```astro
---
import { ui } from '../i18n/ui';
import { site } from '../content/site';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const year = new Date().getFullYear();
---
<footer class="site-footer">
  <div class="container footer__row">
    <p>© {year} {site.name}</p>
    <p>{ui[lang].footer.built}</p>
  </div>
</footer>

<style>
  .site-footer { border-top: 1px solid var(--color-line); padding-block: var(--space-xl); color: var(--color-muted); font-size: var(--text-sm); }
  .footer__row { display: flex; flex-wrap: wrap; justify-content: space-between; gap: var(--space-sm) var(--space-lg); }
</style>
```

`Footer` importa `site` de `src/content/site.ts`, que se crea en la Tarea 5. Para que esta tarea compile sola, crear ahora un `src/content/site.ts` mínimo y la Tarea 5 lo reemplaza:

```ts
export const site = { name: 'José Burgos' };
```

- [ ] **Paso 4: `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/tokens.css';
import '../styles/base.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import { switchLangPath, type Lang } from '../i18n/utils';

interface Props {
  lang: Lang;
  title: string;
  description: string;
  pathname: string;
  jsonLd?: Record<string, unknown>;
}
const { lang, title, description, pathname, jsonLd } = Astro.props;
const origin = Astro.site!.origin;
const canonical = new URL(pathname, origin).href;
const ogImage = new URL('/og.png', origin).href;
const alt = (l: Lang) => new URL(switchLangPath(pathname, l), origin).href;
---
<!doctype html>
<html lang={lang}>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hreflang="es" href={alt('es')} />
    <link rel="alternate" hreflang="en" href={alt('en')} />
    <link rel="alternate" hreflang="x-default" href={alt('es')} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="theme-color" content="#14161b" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="José Burgos" />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={canonical} />
    <meta property="og:image" content={ogImage} />
    <meta property="og:locale" content={lang === 'es' ? 'es_VE' : 'en_US'} />
    <meta name="twitter:card" content="summary_large_image" />
    {jsonLd && <script type="application/ld+json" set:html={JSON.stringify(jsonLd)} />}
  </head>
  <body>
    <Header lang={lang} pathname={pathname} />
    <slot />
    <Footer lang={lang} />
  </body>
</html>
```

- [ ] **Paso 5: `public/favicon.svg` y `public/robots.txt`**

`public/favicon.svg`:
```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#14161b"/><text x="32" y="43" text-anchor="middle" font-family="system-ui, Arial, sans-serif" font-size="30" font-weight="700" fill="#f86f15">JB</text></svg>
```

`public/robots.txt`:
```
User-agent: *
Allow: /

Sitemap: https://jose-burgos-portfolio.vercel.app/sitemap-index.xml
```

- [ ] **Paso 6: Página temporal para verificar el layout**

Reemplazar `src/pages/[lang]/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import { ui } from '../../i18n/ui';
import type { Lang } from '../../i18n/utils';
export function getStaticPaths() {
  return [{ params: { lang: 'es' } }, { params: { lang: 'en' } }];
}
const lang = Astro.params.lang as Lang;
---
<BaseLayout lang={lang} title={ui[lang].meta.homeTitle} description={ui[lang].meta.homeDescription} pathname={Astro.url.pathname}>
  <main id="main" class="container section"><h1>{ui[lang].hero.title}</h1></main>
</BaseLayout>
```

- [ ] **Paso 7: Verificar build y HTML**

```bash
npm run build
grep -c 'data-lang-switch' dist/es/index.html
grep -o 'hreflang="[a-z-]*"' dist/es/index.html | sort -u
```
Esperado: build `Complete!`, `1`, y `hreflang="en"`, `hreflang="es"`, `hreflang="x-default"`.

- [ ] **Paso 8: Commit**

```bash
git add -A
git commit -m "feat: add base layout, header with mobile nav island and footer

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Contenido (datos del home y casos de estudio) con pruebas de paridad

**Files:**
- Reemplazar: `src/content/site.ts`
- Crear: `src/content.config.ts`, `src/content/proyectos/{es,en}/{reportaya,moviesapp,el-zuliano,tienda-burgos}.mdx` (8 archivos), `tests/content.test.ts`

**Interfaces:**
- Produce (`site.ts`): `type L10n<T> = Record<Lang, T>`, `site` con `name`, `email`, `links.{linkedin,github}`, `cv: L10n<string>` (rutas `/cv/…`), `about: L10n<string[]>`, `experience: Experience[]`, `education`, `stack: StackGroup[]`, `certs: Cert[]`, `otherProjects: OtherProject[]`.
- Produce (colección): `getCollection('proyectos')` → entradas con `id` = `es/reportaya` etc. y `data: { project, title, kind, status, summary, stack: string[], links: {label, href}[] }`.

- [ ] **Paso 1: Pruebas que fallan**

`tests/content.test.ts`:
```ts
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
    expect(text).not.toMatch(/TODO|TBD|lorem/i);
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
        expect(src).not.toMatch(/TODO|TBD|lorem/i);
        expect((src.match(/^## /gm) ?? []).length).toBeGreaterThanOrEqual(3);
      });
    }
  }
  it('no hay archivos de más', () => {
    expect(readdirSync('src/content/proyectos/es').sort()).toEqual(projects.map((p) => `${p}.mdx`).sort());
    expect(readdirSync('src/content/proyectos/en').sort()).toEqual(projects.map((p) => `${p}.mdx`).sort());
  });
});
```

- [ ] **Paso 2: Ejecutar y ver que falla**

Run: `npx vitest run tests/content.test.ts`
Expected: FAIL (`site.cv` indefinido; faltan los MDX).

- [ ] **Paso 3: `src/content/site.ts`**

```ts
import type { Lang } from '../i18n/utils';

export type L10n<T> = Record<Lang, T>;

export interface Experience {
  id: string;
  role: L10n<string>;
  org: string;
  period: L10n<string>;
  place: L10n<string>;
  summary: L10n<string>;
  highlights: L10n<string[]>;
}
export interface StackGroup { id: string; label: L10n<string>; items: string[] }
export interface Cert { name: L10n<string>; issuer: string; year?: string; detail?: L10n<string> }
export interface OtherProject { name: string; description: L10n<string>; tech: string; href: string }

export const site = {
  name: 'José Burgos',
  email: 'joseburgos153@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jose-burgos-/',
    github: 'https://github.com/JoseBurgoss',
  },
  cv: { es: '/cv/CV_Jose_Burgos_ES.pdf', en: '/cv/CV_Jose_Burgos_EN.pdf' } as L10n<string>,

  about: {
    es: [
      'Soy Ingeniero en Computación (Universidad Rafael Urdaneta) y desarrollador Full-Stack & Mobile en Maracaibo. En la división de Innovación de ALKOSTO construyo aplicaciones de consumo y de operación con React Native, Expo, React/Next.js, TypeScript, Node.js y Go, incluyendo sistemas en tiempo real, geolocalización y notificaciones push.',
      'Me interesa entregar software confiable y mantenible: APIs REST, JWT/RBAC, PostgreSQL y MySQL, Docker, CI/CD y Sentry. También estudio ciberseguridad.',
    ],
    en: [
      "I'm a Computer Engineer (Rafael Urdaneta University) and a Full-Stack & Mobile developer based in Maracaibo. In ALKOSTO's Innovation division I build consumer and operational apps with React Native, Expo, React/Next.js, TypeScript, Node.js and Go, including real-time systems, geolocation and push notifications.",
      'I care about shipping reliable, maintainable software: REST APIs, JWT/RBAC, PostgreSQL and MySQL, Docker, CI/CD and Sentry. I also study cybersecurity.',
    ],
  } as L10n<string[]>,

  experience: [
    {
      id: 'alkosto',
      role: { es: 'Innovation Software Engineer', en: 'Innovation Software Engineer' },
      org: 'ALKOSTO',
      period: { es: 'Oct 2025 — Presente', en: 'Oct 2025 — Present' },
      place: { es: 'Maracaibo, Venezuela · Presencial', en: 'Maracaibo, Venezuela · On-site' },
      summary: {
        es: 'División de Innovación. Plataformas de consumo y operativas con React Native/Expo, React/Next.js, TypeScript, Node.js y Go.',
        en: 'Innovation division. Consumer and operational platforms with React Native/Expo, React/Next.js, TypeScript, Node.js and Go.',
      },
      highlights: {
        es: [
          'Capa de mapas y geolocalización de una plataforma de delivery en tiempo real: evalué Google Maps, primero entregué una solución open-source de menor costo (Leaflet + OSRM, reduciendo costos en más de 40%) y luego migré a Google Maps SDK + Navigation SDK por la funcionalidad y confiabilidad que exigía la escala.',
          'Arquitecturas de comunicación en tiempo real con WebSockets y SSE: sincronización de pedidos, notificaciones push, tracking de conductores y actualizaciones de inventario.',
          'Módulos de inventario con escaneo de códigos de barras, conteo cíclico y auditoría por ubicaciones, con dashboards en React Query + Zustand.',
          'Plataforma de beneficios corporativos (Next.js, TypeScript, shadcn/ui): tarjetas, bloqueo/desbloqueo, historial de consumos y roles RBAC.',
          'Gestor de proyectos interno estilo Notion: backend en Go (Gin/GORM), frontend en React + Zustand, tablero Kanban y documentos BlockNote.',
        ],
        en: [
          'Mapping and geolocation layer of a real-time delivery platform: evaluated Google Maps, first shipped a lower-cost open-source stack (Leaflet + OSRM, cutting costs by over 40%), then migrated to Google Maps SDK + Navigation SDK for the functionality and reliability required at scale.',
          'Real-time communication architectures with WebSockets and SSE: order synchronization, push notifications, driver tracking and inventory updates.',
          'Inventory modules with barcode scanning, cycle counts and location-based auditing, with dashboards built on React Query + Zustand.',
          'Corporate benefits platform (Next.js, TypeScript, shadcn/ui): benefit cards, lock/unlock, consumption history and RBAC roles.',
          'Internal Notion-style project manager: Go backend (Gin/GORM), React + Zustand frontend, Kanban boards and BlockNote documents.',
        ],
      },
    },
    {
      id: 'coolto',
      role: { es: 'Desarrollador Full-Stack (Pasantía)', en: 'Full-Stack Developer (Internship)' },
      org: 'Coolto Agency',
      period: { es: 'Jul 2025 — Sep 2025 · 240 horas', en: 'Jul 2025 — Sep 2025 · 240 hours' },
      place: { es: 'Maracaibo, Venezuela · Híbrido', en: 'Maracaibo, Venezuela · Hybrid' },
      summary: {
        es: 'Agencia de desarrollo ágil especializada en soluciones web y móviles modernas.',
        en: 'Agile software agency specializing in modern web and mobile solutions.',
      },
      highlights: {
        es: [
          'Ciclo completo de aplicaciones web con React 18, TypeScript, Node.js y PostgreSQL.',
          'APIs RESTful con autenticación JWT y manejo de errores; mejora de tiempos de carga en un 40% en componentes UI responsivos.',
          'Monitoreo con Sentry e internacionalización (i18n) en tres idiomas; trabajo con Agile/Scrum, Jest y Git Flow.',
        ],
        en: [
          'Full development cycle of web applications using React 18, TypeScript, Node.js and PostgreSQL.',
          'RESTful APIs with JWT authentication and error handling; 40% faster load times on responsive UI components.',
          'Monitoring with Sentry and internationalization (i18n) in three languages; Agile/Scrum, Jest and Git Flow.',
        ],
      },
    },
  ] as Experience[],

  education: {
    school: { es: 'Universidad Rafael Urdaneta', en: 'Rafael Urdaneta University' } as L10n<string>,
    degree: { es: 'Ingeniería en Computación (Graduado)', en: 'Computer Engineering (Graduated)' } as L10n<string>,
    period: '2021 — 2025',
  },

  stack: [
    { id: 'mobile', label: { es: 'Móvil', en: 'Mobile' }, items: ['React Native', 'Expo', 'Google Maps SDK', 'Push notifications', 'Android (Java)'] },
    { id: 'web', label: { es: 'Web', en: 'Web' }, items: ['React', 'Next.js', 'TypeScript', 'Astro', 'HTML & CSS', 'shadcn/ui'] },
    { id: 'backend', label: { es: 'Backend y datos', en: 'Backend & data' }, items: ['Node.js', 'Express', 'Go (Gin/GORM)', 'REST', 'WebSockets / SSE', 'JWT / RBAC', 'PostgreSQL', 'MySQL / MariaDB', 'Firebase'] },
    { id: 'tools', label: { es: 'Herramientas', en: 'Tooling' }, items: ['Docker', 'Git (Git Flow)', 'Jest', 'Sentry', 'Vite', 'CI/CD'] },
  ] as StackGroup[],

  certs: [
    { name: { es: 'EF SET English Certificate — C2 Proficient', en: 'EF SET English Certificate — C2 Proficient' }, issuer: 'EF SET', detail: { es: 'Puntaje 81/100', en: 'Score 81/100' } },
    {
      name: { es: 'Google Cybersecurity Professional Certificate', en: 'Google Cybersecurity Professional Certificate' },
      issuer: 'Google · Coursera',
      year: '2025',
      detail: {
        es: 'Cursos completados: Foundations of Cybersecurity, Connect and Protect, Play It Safe.',
        en: 'Completed courses: Foundations of Cybersecurity, Connect and Protect, Play It Safe.',
      },
    },
    { name: { es: 'Introducción a la Ciberseguridad', en: 'Introduction to Cybersecurity' }, issuer: 'Cisco', year: '2025' },
  ] as Cert[],

  otherProjects: [
    {
      name: 'Hash-Evaluator',
      description: {
        es: 'Prueba hashes MD5, SHA-1 y SHA-256 buscando prefijos de ceros, con visualización.',
        en: 'Tests MD5, SHA-1 and SHA-256 hashes for zero prefixes, with visualization.',
      },
      tech: 'Python',
      href: 'https://github.com/JoseBurgoss/Hash-Evaluator',
    },
    {
      name: 'Analizador Semántico',
      description: {
        es: 'Analizador sintáctico y semántico para Pascal: verifica estructura y detecta errores de tipo.',
        en: 'Syntactic and semantic analyzer for Pascal: checks structure and detects type errors.',
      },
      tech: 'C',
      href: 'https://github.com/JoseBurgoss/Analizador_Semantico',
    },
    {
      name: 'Analizador Sintáctico',
      description: { es: 'Analizador sintáctico (parser) escrito en C.', en: 'Syntactic analyzer (parser) written in C.' },
      tech: 'C',
      href: 'https://github.com/JoseBurgoss/Analizador_Sintactico',
    },
  ] as OtherProject[],
};
```

- [ ] **Paso 4: `src/content.config.ts`**

```ts
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const proyectos = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/proyectos' }),
  schema: z.object({
    project: z.enum(['reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos']),
    title: z.string(),
    kind: z.string(),
    status: z.string(),
    summary: z.string(),
    stack: z.array(z.string()).min(1),
    links: z.array(z.object({ label: z.string(), href: z.string().url() })).default([]),
  }),
});

export const collections = { proyectos };
```

- [ ] **Paso 5: MDX en español**

`src/content/proyectos/es/reportaya.mdx`:
```mdx
---
project: reportaya
title: ReportaYa
kind: App Android nativa · Tesis de ingeniería
status: Entregada y defendida. Reconstrucción planificada.
summary: App para que los vecinos de Maracaibo reporten problemas urbanos desde el teléfono y los vean en un mapa.
stack: [Java, Android, Firebase Auth, Realtime Database, Storage, FCM, Google Maps, React]
links: []
---

## Problema

En Maracaibo, reportar un bache, una fuga de agua o basura acumulada no tiene un canal simple ni visible. ReportaYa nació como mi tesis de ingeniería para que cualquier vecino pueda reportarlo desde el teléfono y ver el reporte en un mapa.

## Solución

Una app Android nativa en Java con autenticación, un feed ciudadano de reportes, reporte con foto y ubicación, guías urbanas sobre servicios municipales y un mapa con agrupación de reportes sobre Google Maps. El backend usa Firebase: Auth, Realtime Database, Storage y FCM para notificaciones. Un panel web de administración hecho en React permite gestionar los reportes.

## Qué sigue

La tesis fue entregada y defendida. Estoy planificando una reconstrucción de nivel producción: app con React Native (Expo), API propia y PostgreSQL con PostGIS, empezando por Android y Google Play. El repositorio original es privado.
```

`src/content/proyectos/es/moviesapp.mdx`:
```mdx
---
project: moviesapp
title: MoviesApp
kind: App móvil · React Native
status: Proyecto de práctica
summary: App móvil para descubrir películas, con autenticación, reseñas y favoritos.
stack: [React Native, Expo, Firebase, Babel]
links:
  - label: GitHub
    href: https://github.com/JoseBurgoss/MoviesApp-Expo
---

## Problema

Quería aprender el flujo completo de una app móvil con React Native y Expo: navegación, autenticación y datos remotos, en un caso fácil de entender como el de las películas.

## Solución

Una lista de películas populares con calificación, una pantalla de detalle con reseñas, un menú lateral y una sección de favoritos. La autenticación y los datos viven en Firebase.

## Lo que me dejó

Es una app sencilla a propósito: sirvió de base para los patrones de navegación y estado que después apliqué en proyectos reales de React Native.
```

`src/content/proyectos/es/el-zuliano.mdx`:
```mdx
---
project: el-zuliano
title: El Zuliano
kind: Plataforma web de noticias
status: Desplegada
summary: Plataforma de noticias con registro, suscripciones y actualizaciones en tiempo real.
stack: [React, JavaScript, CSS, Firebase]
links:
  - label: Sitio en vivo
    href: https://el-zuliano.vercel.app
  - label: GitHub
    href: https://github.com/JoseBurgoss/El-Zuliano
---

## Problema

Los sitios de noticias suelen recargar al usuario de información. Quise construir una experiencia de lectura clara y personalizable, con cuentas y suscripciones.

## Solución

Una plataforma de noticias hecha con React: portada con los artículos más populares, navegación por categorías, búsqueda, registro de usuarios, suscripción e integración con redes sociales. Los datos se actualizan en tiempo real y el diseño es responsivo.

## Lo que me dejó

Estructurar una aplicación React de varias vistas, manejar cuentas con Firebase y cuidar la lectura en pantallas pequeñas.
```

`src/content/proyectos/es/tienda-burgos.mdx`:
```mdx
---
project: tienda-burgos
title: Tienda Burgos
kind: E-commerce web
status: Desplegada
summary: Tienda en línea con carrito, búsqueda filtrada, gestión de cantidades y autenticación.
stack: [React, JavaScript, CSS, Firebase]
links:
  - label: Sitio en vivo
    href: https://tienda-virtual-pi-liart.vercel.app/
  - label: GitHub
    href: https://github.com/JoseBurgoss/Tienda-virtual
---

## Problema

Quería practicar el flujo central de una tienda en línea: encontrar un producto, agregarlo al carrito y controlar cuántas unidades se llevan.

## Solución

Una tienda en React con productos destacados y recomendados, búsqueda con filtros, carrito con control de cantidades y registro e inicio de sesión con Firebase.

## Lo que me dejó

Manejar el estado del carrito, organizar los componentes de una tienda y cuidar los estados de carga mientras llegan los productos.
```

- [ ] **Paso 6: MDX en inglés**

`src/content/proyectos/en/reportaya.mdx`:
```mdx
---
project: reportaya
title: ReportaYa
kind: Native Android app · Engineering thesis
status: Delivered and defended. Rebuild planned.
summary: An app for residents of Maracaibo to report urban problems from their phone and see them on a map.
stack: [Java, Android, Firebase Auth, Realtime Database, Storage, FCM, Google Maps, React]
links: []
---

## Problem

In Maracaibo, reporting a pothole, a water leak or piled-up garbage has no simple, visible channel. ReportaYa started as my engineering thesis so that any resident can report it from their phone and see the report on a map.

## Solution

A native Android app in Java with authentication, a citizen feed of reports, reporting with photo and location, urban guides about municipal services and a map that groups reports on top of Google Maps. The backend uses Firebase: Auth, Realtime Database, Storage and FCM for notifications. A React admin web panel lets administrators manage the reports.

## What's next

The thesis was delivered and defended. I'm planning a production-grade rebuild: a React Native (Expo) app, an API of my own and PostgreSQL with PostGIS, starting with Android and Google Play. The original repository is private.
```

`src/content/proyectos/en/moviesapp.mdx`:
```mdx
---
project: moviesapp
title: MoviesApp
kind: Mobile app · React Native
status: Practice project
summary: A mobile app to discover movies, with authentication, reviews and favorites.
stack: [React Native, Expo, Firebase, Babel]
links:
  - label: GitHub
    href: https://github.com/JoseBurgoss/MoviesApp-Expo
---

## Problem

I wanted to learn the full flow of a mobile app with React Native and Expo (navigation, authentication and remote data) on a case that is easy to understand, like movies.

## Solution

A list of popular movies with ratings, a detail screen with reviews, a side menu and a favorites section. Authentication and data live in Firebase.

## What it gave me

It is a simple app on purpose: it became the base for the navigation and state patterns I later applied in real React Native projects.
```

`src/content/proyectos/en/el-zuliano.mdx`:
```mdx
---
project: el-zuliano
title: El Zuliano
kind: News web platform
status: Deployed
summary: A news platform with registration, subscriptions and real-time updates.
stack: [React, JavaScript, CSS, Firebase]
links:
  - label: Live site
    href: https://el-zuliano.vercel.app
  - label: GitHub
    href: https://github.com/JoseBurgoss/El-Zuliano
---

## Problem

News sites tend to overload the reader. I wanted a clear, personalizable reading experience, with accounts and subscriptions.

## Solution

A news platform built with React: a front page with the most popular articles, browsing by category, search, user registration, subscriptions and social media integration. Data updates in real time and the layout is responsive.

## What it gave me

Structuring a multi-view React application, handling accounts with Firebase and caring about reading on small screens.
```

`src/content/proyectos/en/tienda-burgos.mdx`:
```mdx
---
project: tienda-burgos
title: Tienda Burgos
kind: Web e-commerce
status: Deployed
summary: An online store with cart, filtered search, quantity management and authentication.
stack: [React, JavaScript, CSS, Firebase]
links:
  - label: Live site
    href: https://tienda-virtual-pi-liart.vercel.app/
  - label: GitHub
    href: https://github.com/JoseBurgoss/Tienda-virtual
---

## Problem

I wanted to practice the core flow of an online store: finding a product, adding it to the cart and controlling how many units to take.

## Solution

A React store with featured and recommended products, filtered search, a cart with quantity control, and sign-up and login with Firebase.

## What it gave me

Handling cart state, organizing a store's components and caring about loading states while products arrive.
```

- [ ] **Paso 7: Ejecutar pruebas**

Run: `npx vitest run tests/content.test.ts`
Expected: PASS.

- [ ] **Paso 8: Verificar que la colección carga en el build**

```bash
npm run build 2>&1 | grep -iE "error|Complete"
```
Expected: `Complete!` y sin errores de schema.

- [ ] **Paso 9: Commit**

```bash
git add -A
git commit -m "feat: add bilingual site data and project case study content

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Activos (capturas, foto, CV, OG) y sus pruebas

**Files:**
- Crear: `scripts/prepare-assets.mjs`, `scripts/capture-web.mjs`, `scripts/make-og.mjs`, `tests/assets.test.ts`, `public/cv/CV_Jose_Burgos_{ES,EN}.pdf`, `public/og.png`
- Generar: `src/assets/jose-burgos.webp`, `src/assets/projects/*.webp`

**Interfaces:**
- Produce: `src/assets/jose-burgos.webp`; `src/assets/projects/reportaya-{login,feed,guides,map}.webp`; `moviesapp-{list,menu,detail,favorites}.webp`; `el-zuliano.webp`; `tienda-burgos.webp`.

- [ ] **Paso 1: Prueba que falla**

`tests/assets.test.ts`:
```ts
import { existsSync } from 'node:fs';
import sharp from 'sharp';
import { describe, expect, it } from 'vitest';

const phones = [
  ...['login', 'feed', 'guides', 'map'].map((n) => `src/assets/projects/reportaya-${n}.webp`),
  ...['list', 'menu', 'detail', 'favorites'].map((n) => `src/assets/projects/moviesapp-${n}.webp`),
];
const wides = ['src/assets/projects/el-zuliano.webp', 'src/assets/projects/tienda-burgos.webp'];

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
  it('og.png mide 1200x630', async () => {
    const { width, height } = await sharp('public/og.png').metadata();
    expect([width, height]).toEqual([1200, 630]);
  });
});
```

- [ ] **Paso 2: Ejecutar y ver que falla**

Run: `npx vitest run tests/assets.test.ts`
Expected: FAIL (archivos inexistentes).

- [ ] **Paso 3: `scripts/prepare-assets.mjs`**

```js
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const OUT = 'src/assets/projects';
mkdirSync(OUT, { recursive: true });
const webp = { quality: 82 };

// ReportaYa: tira de 4 pantallas (1920x1080). Cada pantalla mide ~486 px; la última queda recortada en 462.
const strip = 'assets-src/reportaya.png';
const meta = await sharp(strip).metadata();
if (meta.width !== 1920 || meta.height !== 1080) {
  throw new Error(`Se esperaba 1920x1080, llegó ${meta.width}x${meta.height}`);
}
const screens = [
  ['login', 0, 486],
  ['feed', 486, 486],
  ['guides', 972, 486],
  ['map', 1458, 462],
];
for (const [name, left, width] of screens) {
  await sharp(strip).extract({ left, top: 0, width, height: 1080 }).webp(webp).toFile(`${OUT}/reportaya-${name}.webp`);
}

// MoviesApp: capturas de iPhone 1170x2532 reducidas a 480 px de ancho.
const movies = { IMG_5730: 'list', IMG_5731: 'menu', IMG_5733: 'detail', IMG_5737: 'favorites' };
for (const [src, name] of Object.entries(movies)) {
  await sharp(`assets-src/movies-${src}.png`).resize({ width: 480 }).webp(webp).toFile(`${OUT}/moviesapp-${name}.webp`);
}
// La prueba exige altura ≥ 1000: 480 px de ancho → ~1039 px de alto.

// Foto (retrato 3:4)
await sharp('assets-src/foto.jpg').resize({ width: 960 }).webp({ quality: 80 }).toFile('src/assets/jose-burgos.webp');

console.log('Activos generados en src/assets');
```

- [ ] **Paso 4: `scripts/capture-web.mjs`**

```js
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const targets = [
  { url: 'https://el-zuliano.vercel.app/', out: 'el-zuliano' },
  { url: 'https://tienda-virtual-pi-liart.vercel.app/', out: 'tienda-burgos' },
];
mkdirSync('src/assets/projects', { recursive: true });
mkdirSync('assets-src', { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ viewport: { width: 1440, height: 800 }, deviceScaleFactor: 1, locale: 'es-VE' });
for (const t of targets) {
  const page = await context.newPage();
  await page.goto(t.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(6000); // espera a que carguen los productos/artículos
  const png = await page.screenshot({ type: 'png' });
  await sharp(png).toFile(`assets-src/${t.out}.png`); // copia para revisar a ojo
  await sharp(png).webp({ quality: 85 }).toFile(`src/assets/projects/${t.out}.webp`);
  await page.close();
}
await browser.close();
console.log('Capturas web listas');
```

- [ ] **Paso 5: Generar y revisar a ojo**

```bash
npm run assets
npm run capture
```
Abrir `assets-src/tienda-burgos.png` y `assets-src/el-zuliano.png`. Si la tienda aún muestra tarjetas de carga (spinners) en vez de productos, subir `waitForTimeout` a 12000 y repetir `npm run capture`. Esperado: ambas capturas muestran contenido real cargado.

- [ ] **Paso 6: CVs**

```bash
mkdir -p public/cv
cp /c/Users/Alkosto/Burgos/CVS/actualizados/CV_Jose_Burgos_ES.pdf public/cv/
cp /c/Users/Alkosto/Burgos/CVS/actualizados/CV_Jose_Burgos_EN.pdf public/cv/
```

- [ ] **Paso 7: `scripts/make-og.mjs` y generar la imagen**

```js
import sharp from 'sharp';

const W = 1200;
const H = 630;
const INK = '#14161b';
const PAPER = '#f1eee7';
const ACCENT = '#f86f15';

const phones = await Promise.all(
  ['feed', 'map', 'guides'].map((n) => sharp(`src/assets/projects/reportaya-${n}.webp`).resize({ height: 380 }).png().toBuffer()),
);

const text = Buffer.from(`<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${INK}"/>
  <text x="72" y="270" font-family="Segoe UI, Arial, sans-serif" font-size="88" font-weight="700" fill="${PAPER}">José Burgos</text>
  <text x="72" y="340" font-family="Segoe UI, Arial, sans-serif" font-size="34" font-weight="600" fill="${ACCENT}">Full-Stack &amp; Mobile Developer</text>
  <text x="72" y="560" font-family="Segoe UI, Arial, sans-serif" font-size="28" fill="${PAPER}" fill-opacity="0.7">React Native · TypeScript · Go</text>
</svg>`);

await sharp({ create: { width: W, height: H, channels: 3, background: INK } })
  .composite([
    { input: text, left: 0, top: 0 },
    { input: phones[0], left: 640, top: 125 },
    { input: phones[1], left: 830, top: 125 },
    { input: phones[2], left: 1020, top: 125 },
  ])
  .png()
  .toFile('public/og.png');
console.log('og.png listo');
```

```bash
npm run og
```
Abrir `public/og.png` y comprobar a ojo que el texto no se superpone con los teléfonos y que nada queda cortado en el borde derecho. Si el tercer teléfono pasa de 1200 px, bajar `height` a 360 y reintentar.

- [ ] **Paso 8: Ejecutar pruebas**

Run: `npx vitest run tests/assets.test.ts`
Expected: PASS.

- [ ] **Paso 9: Commit**

```bash
git add -A
git commit -m "feat: add screenshots, portrait, CVs and OG image with asset pipeline

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 7: Datos de proyectos, `Frame` y muro (hero + proyectos)

**Files:**
- Crear: `src/data/projects.ts`, `src/components/Frame.astro`, `src/components/Wall.astro`

**Interfaces:**
- Consume: colección `proyectos` (Tarea 5), imágenes (Tarea 6), `ui`, `localePath`.
- Produce: `ProjectId`, `tileOrder: ProjectId[]`, `projectOrder: ProjectId[]`, `projectMedia: Record<ProjectId, ProjectMedia>` donde `ProjectMedia = { layout: 'phones' | 'wide'; tile: ImageMetadata[]; gallery: { src: ImageMetadata; alt: Record<Lang, string> }[] }`; `<Frame image alt shape width? eager? class? />` con `shape: 'phone' | 'wide'`; `<Wall lang />`.

- [ ] **Paso 1: `src/data/projects.ts`**

```ts
import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/utils';
import rpyLogin from '../assets/projects/reportaya-login.webp';
import rpyFeed from '../assets/projects/reportaya-feed.webp';
import rpyGuides from '../assets/projects/reportaya-guides.webp';
import rpyMap from '../assets/projects/reportaya-map.webp';
import mvList from '../assets/projects/moviesapp-list.webp';
import mvMenu from '../assets/projects/moviesapp-menu.webp';
import mvDetail from '../assets/projects/moviesapp-detail.webp';
import mvFavorites from '../assets/projects/moviesapp-favorites.webp';
import zuliano from '../assets/projects/el-zuliano.webp';
import tienda from '../assets/projects/tienda-burgos.webp';

export type ProjectId = 'reportaya' | 'moviesapp' | 'el-zuliano' | 'tienda-burgos';
export type Shot = { src: ImageMetadata; alt: Record<Lang, string> };
export interface ProjectMedia {
  layout: 'phones' | 'wide';
  tile: ImageMetadata[];
  gallery: Shot[];
}

/** Orden en el muro (la cuadrícula coloca cada uno por nombre de clase). */
export const tileOrder: ProjectId[] = ['reportaya', 'el-zuliano', 'moviesapp', 'tienda-burgos'];
/** Orden para "siguiente proyecto" en las páginas de caso de estudio. */
export const projectOrder: ProjectId[] = ['reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos'];

export const projectMedia: Record<ProjectId, ProjectMedia> = {
  reportaya: {
    layout: 'phones',
    tile: [rpyFeed, rpyMap, rpyGuides],
    gallery: [
      { src: rpyLogin, alt: { es: 'ReportaYa: pantalla de inicio de sesión', en: 'ReportaYa: sign-in screen' } },
      { src: rpyFeed, alt: { es: 'ReportaYa: feed de reportes ciudadanos', en: 'ReportaYa: citizen reports feed' } },
      { src: rpyGuides, alt: { es: 'ReportaYa: guías urbanas con servicios municipales', en: 'ReportaYa: urban guides for municipal services' } },
      { src: rpyMap, alt: { es: 'ReportaYa: mapa de Maracaibo con reportes agrupados', en: 'ReportaYa: map of Maracaibo with clustered reports' } },
    ],
  },
  moviesapp: {
    layout: 'phones',
    tile: [mvList, mvDetail],
    gallery: [
      { src: mvList, alt: { es: 'MoviesApp: lista de películas populares', en: 'MoviesApp: list of popular movies' } },
      { src: mvMenu, alt: { es: 'MoviesApp: menú lateral', en: 'MoviesApp: side menu' } },
      { src: mvDetail, alt: { es: 'MoviesApp: detalle de película con reseñas', en: 'MoviesApp: movie detail with reviews' } },
      { src: mvFavorites, alt: { es: 'MoviesApp: pantalla de favoritos', en: 'MoviesApp: favorites screen' } },
    ],
  },
  'el-zuliano': {
    layout: 'wide',
    tile: [zuliano],
    gallery: [{ src: zuliano, alt: { es: 'El Zuliano: portada con artículos populares', en: 'El Zuliano: front page with popular articles' } }],
  },
  'tienda-burgos': {
    layout: 'wide',
    tile: [tienda],
    gallery: [{ src: tienda, alt: { es: 'Tienda Burgos: página de inicio con productos', en: 'Tienda Burgos: home page with products' } }],
  },
};
```

- [ ] **Paso 2: `src/components/Frame.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { ImageMetadata } from 'astro';

interface Props {
  image: ImageMetadata;
  alt: string;
  shape: 'phone' | 'wide';
  width?: number;
  eager?: boolean;
  class?: string;
}
const { image, alt, shape, width = shape === 'phone' ? 360 : 1100, eager = false, class: className = '' } = Astro.props;
---
<figure class:list={['frame', `frame--${shape}`, className]}>
  <Image src={image} alt={alt} width={width} loading={eager ? 'eager' : 'lazy'} decoding="async" />
</figure>

<style>
  .frame { margin: 0; overflow: hidden; background: var(--color-paper); border: 1px solid var(--color-line); box-shadow: var(--shadow-frame); flex: none; }
  .frame--phone { aspect-ratio: 9 / 19.5; border-radius: var(--radius-md); }
  .frame--wide { aspect-ratio: 2.17; border-radius: var(--radius-sm); }
  .frame :global(img) { width: 100%; height: 100%; object-fit: cover; object-position: top; }
</style>
```

- [ ] **Paso 3: `src/components/Wall.astro`**

```astro
---
import { getCollection } from 'astro:content';
import Frame from './Frame.astro';
import { projectMedia, tileOrder } from '../data/projects';
import { ui } from '../i18n/ui';
import { localePath, type Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
const entries = (await getCollection('proyectos')).filter((e) => e.id.startsWith(`${lang}/`));
const byProject = new Map(entries.map((e) => [e.data.project, e]));
const tiles = tileOrder.map((project, i) => ({ project, entry: byProject.get(project)!, media: projectMedia[project], i }));
---
<section id="work" class="wall container" aria-labelledby="work-title">
  <h2 id="work-title" class="sr-only">{t.work.title}</h2>
  <ul class="wall__grid">
    {tiles.map(({ project, entry, media, i }) => (
      <li class={`tile tile--${project}`} style={`--i:${i}`}>
        <a class="tile__link" href={localePath(lang, `proyectos/${project}/`)} aria-label={`${entry.data.title} — ${t.work.open}`}>
          <div class={`tile__media tile__media--${media.layout}`}>
            {media.tile.map((img) => (
              <Frame image={img} alt="" shape={media.layout === 'wide' ? 'wide' : 'phone'} eager={i === 0} />
            ))}
          </div>
          <div class="tile__cap">
            <strong>{entry.data.title}</strong>
            <span>{entry.data.kind}</span>
          </div>
        </a>
      </li>
    ))}
  </ul>
</section>

<style>
  .wall { padding-bottom: var(--space-3xl); }
  .wall__grid { display: grid; gap: var(--space-sm); grid-template-columns: minmax(0, 1fr); }

  .tile { position: relative; overflow: hidden; min-height: 20rem; border-radius: var(--radius-md); animation: rise var(--dur-slow) var(--ease-out) both; animation-delay: calc(var(--i) * 120ms); transition: transform var(--dur-base) var(--ease-out); }
  .tile:hover { transform: translateY(-4px); }
  .tile--reportaya { min-height: 26rem; background: var(--color-accent); color: var(--color-accent-ink); }
  .tile--el-zuliano { background: var(--color-tile-zuliano); color: var(--color-ink); }
  .tile--moviesapp { background: var(--color-tile-movies); color: var(--color-paper); }
  .tile--tienda-burgos { background: var(--color-tile-tienda); color: var(--color-ink); }

  .tile__link { position: absolute; inset: 0; display: block; color: inherit; text-decoration: none; }
  .tile__link:hover { color: inherit; }
  .tile__link:focus-visible { outline-offset: -6px; }

  .tile__media { position: absolute; inset: 0 0 3.75rem 0; overflow: hidden; }
  .tile__media--phones { display: flex; justify-content: center; align-items: flex-start; gap: 6%; padding-top: 6%; }
  .tile__media--phones :global(.frame) { height: 100%; width: auto; animation: float 8s var(--ease-in-out) infinite; }
  .tile__media--phones :global(.frame):nth-child(2) { margin-top: 7%; animation-delay: -4s; }
  .tile__media--phones :global(.frame):nth-child(3) { animation-delay: -2s; }
  .tile__media--wide { padding: 1.25rem 1.25rem 0; }
  .tile__media--wide :global(.frame) { width: 100%; transition: transform var(--dur-base) var(--ease-out); }
  .tile:hover .tile__media--wide :global(.frame) { transform: scale(1.03); }

  .tile__cap { position: absolute; left: 1.25rem; right: 1.25rem; bottom: 0.9rem; display: flex; flex-direction: column; gap: 0.1rem; line-height: 1.25; }
  .tile__cap strong { font-family: var(--font-display); font-size: var(--text-lg); }
  .tile__cap span { font-size: var(--text-sm); opacity: 0.8; }

  @media (min-width: 48rem) {
    .wall__grid { grid-template-columns: minmax(0, 1.25fr) minmax(0, 1.1fr) minmax(0, 1fr); grid-template-rows: repeat(2, minmax(17rem, 1fr)); min-height: 38rem; }
    .tile { min-height: 0; }
    .tile--reportaya { grid-row: 1 / 3; min-height: 0; }
    .tile--el-zuliano { grid-column: 2 / 4; }
  }
</style>
```

- [ ] **Paso 4: Comprobar en una página temporal**

Editar `src/pages/[lang]/index.astro` para renderizar `<Wall lang={lang} />` dentro de `<main id="main">`, luego:

```bash
npm run build 2>&1 | grep -iE "error|Complete"
grep -c 'class="tile ' dist/es/index.html
```
Esperado: `Complete!` y `4` (aprox.; las clases de Astro añaden hash, usar `grep -o 'tile--[a-z-]*' dist/es/index.html | sort -u` y ver las 4).

- [ ] **Paso 5: Verificar visualmente**

```bash
npm run preview &
```
Abrir `http://localhost:4321/es/` en Chrome, comprobar a 1280 px y a 375 px: el muro muestra las 4 tarjetas, los teléfonos de ReportaYa flotan, nada se sale del ancho. Detener con `kill %1`.

- [ ] **Paso 6: Commit**

```bash
git add -A
git commit -m "feat: add project media data, frame component and project wall

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Secciones del home y páginas por idioma

**Files:**
- Crear: `src/components/Home.astro`, `About.astro`, `Experience.astro`, `Stack.astro`, `Certs.astro`, `OtherProjects.astro`, `Contact.astro`, `src/pages/index.astro`
- Reemplazar: `src/pages/[lang]/index.astro`

**Interfaces:**
- Consume: `site`, `ui`, `Wall`, `Frame` (no), `jose-burgos.webp`.
- Produce: `<Home lang />` que renderiza hero + `Wall` + secciones con ids `work`, `about`, `experience`, `stack`, `contact`.

- [ ] **Paso 1: `src/components/Home.astro`**

```astro
---
import Wall from './Wall.astro';
import About from './About.astro';
import Experience from './Experience.astro';
import Stack from './Stack.astro';
import Certs from './Certs.astro';
import OtherProjects from './OtherProjects.astro';
import Contact from './Contact.astro';
import { ui } from '../i18n/ui';
import { site } from '../content/site';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<main id="main">
  <section class="hero container">
    <p class="hero__role">{t.hero.role}</p>
    <h1>{t.hero.title}</h1>
    <p class="hero__sub">{t.hero.sub}</p>
    <div class="hero__cta">
      <a class="btn btn--primary" href="#work">{t.hero.ctaWork}</a>
      <a class="btn" href={site.cv[lang]} download>{t.hero.ctaCv}</a>
    </div>
  </section>
  <Wall lang={lang} />
  <About lang={lang} />
  <Experience lang={lang} />
  <Stack lang={lang} />
  <Certs lang={lang} />
  <OtherProjects lang={lang} />
  <Contact lang={lang} />
</main>

<style>
  .hero { display: grid; gap: var(--space-lg); padding-block: var(--space-2xl) var(--space-xl); }
  .hero__role { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-accent); }
  .hero h1 { max-width: 14ch; }
  .hero__sub { font-size: var(--text-lg); color: var(--color-muted); }
  .hero__cta { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
</style>
```

- [ ] **Paso 2: `About.astro`**

```astro
---
import { Image } from 'astro:assets';
import portrait from '../assets/jose-burgos.webp';
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<section id="about" class="section container about" aria-labelledby="about-title">
  <figure class="about__photo">
    <Image src={portrait} alt={t.about.photoAlt} width={640} loading="lazy" />
  </figure>
  <div class="about__text">
    <h2 id="about-title">{t.about.title}</h2>
    {site.about[lang].map((p) => <p>{p}</p>)}
  </div>
</section>

<style>
  .about { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-xl); align-items: start; }
  .about__photo { margin: 0; overflow: hidden; border-radius: var(--radius-md); border: 1px solid var(--color-line); max-width: 22rem; }
  .about__photo :global(img) { width: 100%; aspect-ratio: 4 / 5; object-fit: cover; object-position: 50% 25%; }
  .about__text { display: grid; gap: var(--space-md); }
  .about__text h2 { margin-bottom: var(--space-sm); }
  @media (min-width: 48rem) { .about { grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr); gap: var(--space-2xl); } }
</style>
```

- [ ] **Paso 3: `Experience.astro`**

```astro
---
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
const edu = site.education;
---
<section id="experience" class="section container" aria-labelledby="exp-title">
  <h2 id="exp-title">{t.experience.title}</h2>
  <ol class="jobs">
    {site.experience.map((job) => (
      <li class="job">
        <h3>{job.role[lang]} · {job.org}</h3>
        <p class="job__meta">{job.period[lang]} · {job.place[lang]}</p>
        <p class="job__summary">{job.summary[lang]}</p>
        <ul class="job__list">
          {job.highlights[lang].map((h) => <li>{h}</li>)}
        </ul>
      </li>
    ))}
    <li class="job">
      <h3>{edu.school[lang]}</h3>
      <p class="job__meta">{edu.period} · {t.experience.education}</p>
      <p class="job__summary">{edu.degree[lang]}</p>
    </li>
  </ol>
</section>

<style>
  h2 { margin-bottom: var(--space-xl); }
  .jobs { display: grid; gap: var(--space-xl); }
  .job { display: grid; gap: var(--space-sm); padding-top: var(--space-lg); border-top: 1px solid var(--color-line); }
  .job__meta { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
  .job__list { display: grid; gap: var(--space-sm); margin-top: var(--space-sm); max-width: var(--measure); }
  .job__list li { position: relative; padding-left: 1.25rem; }
  .job__list li::before { content: ''; position: absolute; left: 0; top: 0.7em; width: 0.5rem; height: 2px; background: var(--color-accent); }
</style>
```

- [ ] **Paso 4: `Stack.astro`**

```astro
---
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<section id="stack" class="section container" aria-labelledby="stack-title">
  <h2 id="stack-title">{t.stack.title}</h2>
  <div class="groups">
    {site.stack.map((g) => (
      <div class="group">
        <h3>{g.label[lang]}</h3>
        <ul class="chips">
          {g.items.map((i) => <li>{i}</li>)}
        </ul>
      </div>
    ))}
  </div>
</section>

<style>
  h2 { margin-bottom: var(--space-xl); }
  .groups { display: grid; gap: var(--space-xl); grid-template-columns: minmax(0, 1fr); }
  .group { display: grid; gap: var(--space-md); align-content: start; }
  .chips { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
  .chips li { padding: 0.35rem 0.75rem; border: 1px solid var(--color-line); border-radius: 999px; font-family: var(--font-mono); font-size: var(--text-sm); }
  @media (min-width: 48rem) { .groups { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
</style>
```

- [ ] **Paso 5: `Certs.astro`**

```astro
---
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<section id="certs" class="section container" aria-labelledby="certs-title">
  <h2 id="certs-title">{t.certs.title}</h2>
  <ul class="certs">
    {site.certs.map((c) => (
      <li class="cert">
        <h3>{c.name[lang]}</h3>
        <p class="cert__meta">{c.issuer}{c.year ? ` · ${c.year}` : ''}</p>
        {c.detail && <p class="cert__detail">{c.detail[lang]}</p>}
      </li>
    ))}
  </ul>
</section>

<style>
  h2 { margin-bottom: var(--space-xl); }
  .certs { display: grid; gap: var(--space-lg); }
  .cert { display: grid; gap: var(--space-xs); padding-top: var(--space-md); border-top: 1px solid var(--color-line); }
  .cert__meta { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
  .cert__detail { color: var(--color-muted); }
</style>
```

- [ ] **Paso 6: `OtherProjects.astro`**

```astro
---
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<section id="other" class="section container" aria-labelledby="other-title">
  <h2 id="other-title">{t.other.title}</h2>
  <p class="intro">{t.other.intro}</p>
  <ul class="list">
    {site.otherProjects.map((p) => (
      <li class="row">
        <div>
          <h3>{p.name}</h3>
          <p>{p.description[lang]}</p>
        </div>
        <p class="row__tech">{p.tech}</p>
        <a href={p.href} target="_blank" rel="noopener noreferrer">{t.other.repo}</a>
      </li>
    ))}
  </ul>
</section>

<style>
  h2 { margin-bottom: var(--space-md); }
  .intro { color: var(--color-muted); margin-bottom: var(--space-xl); }
  .list { display: grid; gap: var(--space-lg); }
  .row { display: grid; gap: var(--space-sm); padding-top: var(--space-md); border-top: 1px solid var(--color-line); grid-template-columns: minmax(0, 1fr); }
  .row div { display: grid; gap: var(--space-xs); }
  .row__tech { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
  .row a { white-space: nowrap; }
  @media (min-width: 48rem) { .row { grid-template-columns: minmax(0, 1fr) 6rem auto; align-items: baseline; gap: var(--space-lg); } }
</style>
```

- [ ] **Paso 7: `Contact.astro`**

```astro
---
import { site } from '../content/site';
import { ui } from '../i18n/ui';
import type { Lang } from '../i18n/utils';

interface Props { lang: Lang }
const { lang } = Astro.props;
const t = ui[lang];
---
<section id="contact" class="section container contact" aria-labelledby="contact-title">
  <h2 id="contact-title">{t.contact.title}</h2>
  <p class="contact__lead">{t.contact.lead}</p>
  <a class="contact__mail" href={`mailto:${site.email}`}>{site.email}</a>
  <div class="contact__links">
    <a class="btn" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">{t.contact.linkedin}</a>
    <a class="btn" href={site.links.github} target="_blank" rel="noopener noreferrer">{t.contact.github}</a>
    <a class="btn btn--primary" href={site.cv.es} download>{t.contact.cvEs}</a>
    <a class="btn btn--primary" href={site.cv.en} download>{t.contact.cvEn}</a>
  </div>
</section>

<style>
  .contact { display: grid; gap: var(--space-lg); }
  .contact__lead { font-size: var(--text-lg); color: var(--color-muted); }
  .contact__mail { font-family: var(--font-display); font-size: var(--text-xl); font-weight: 700; overflow-wrap: anywhere; width: fit-content; }
  .contact__links { display: flex; flex-wrap: wrap; gap: var(--space-sm); }
</style>
```

- [ ] **Paso 8: Páginas**

`src/pages/[lang]/index.astro`:
```astro
---
import BaseLayout from '../../layouts/BaseLayout.astro';
import Home from '../../components/Home.astro';
import { ui } from '../../i18n/ui';
import { site } from '../../content/site';
import { locales, type Lang } from '../../i18n/utils';

export function getStaticPaths() {
  return locales.map((lang) => ({ params: { lang } }));
}
const lang = Astro.params.lang as Lang;
const t = ui[lang];
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  jobTitle: t.hero.role,
  url: new URL(`/${lang}/`, Astro.site).href,
  email: `mailto:${site.email}`,
  sameAs: [site.links.linkedin, site.links.github],
  address: { '@type': 'PostalAddress', addressLocality: 'Maracaibo', addressCountry: 'VE' },
};
---
<BaseLayout lang={lang} title={t.meta.homeTitle} description={t.meta.homeDescription} pathname={Astro.url.pathname} jsonLd={jsonLd}>
  <Home lang={lang} />
</BaseLayout>
```

`src/pages/index.astro` (raíz: redirige según el idioma del navegador):
```astro
---
---
<!doctype html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="refresh" content="0; url=/es/" />
    <link rel="canonical" href="https://jose-burgos-portfolio.vercel.app/es/" />
    <title>José Burgos</title>
    <script is:inline>
      var l = (navigator.language || 'es').toLowerCase().indexOf('en') === 0 ? 'en' : 'es';
      location.replace('/' + l + '/');
    </script>
  </head>
  <body>
    <p><a href="/es/">Español</a> · <a href="/en/">English</a></p>
  </body>
</html>
```

- [ ] **Paso 9: Build y comprobación**

```bash
npm run build 2>&1 | grep -iE "error|Complete"
for id in work about experience stack certs other contact; do printf "%s: " $id; grep -c "id=\"$id\"" dist/es/index.html; done
```
Esperado: `Complete!` y cada id con `1`.

- [ ] **Paso 10: Commit**

```bash
git add -A
git commit -m "feat: add home sections, per-language pages and root redirect

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 9: Páginas de caso de estudio

**Files:**
- Crear: `src/pages/[lang]/proyectos/[project].astro`

**Interfaces:**
- Consume: colección `proyectos`, `projectMedia`, `projectOrder`, `Frame`, `BaseLayout`, `ui`, `localePath`.
- Produce: rutas `/es/proyectos/<project>/` y `/en/proyectos/<project>/` para los 4 proyectos.

- [ ] **Paso 1: `src/pages/[lang]/proyectos/[project].astro`**

```astro
---
import { getCollection, render } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import Frame from '../../../components/Frame.astro';
import { projectMedia, projectOrder, type ProjectId } from '../../../data/projects';
import { ui } from '../../../i18n/ui';
import { localePath, type Lang } from '../../../i18n/utils';

export async function getStaticPaths() {
  const all = await getCollection('proyectos');
  return all.map((entry) => ({
    params: { lang: entry.id.split('/')[0], project: entry.data.project },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const lang = Astro.params.lang as Lang;
const t = ui[lang];
const id = entry.data.project as ProjectId;
const media = projectMedia[id];
const { Content } = await render(entry);
const nextId = projectOrder[(projectOrder.indexOf(id) + 1) % projectOrder.length];
const all = await getCollection('proyectos');
const next = all.find((e) => e.id === `${lang}/${nextId}`)!;
const phone = media.layout === 'phones';
---
<BaseLayout lang={lang} title={`${entry.data.title} — José Burgos`} description={entry.data.summary} pathname={Astro.url.pathname}>
  <main id="main" class="container case">
    <a class="case__back" href={`${localePath(lang)}#work`}>← {t.project.back}</a>

    <header class="case__head">
      <h1>{entry.data.title}</h1>
      <p class="case__summary">{entry.data.summary}</p>
      <dl class="case__meta">
        <div><dt>{t.project.kind}</dt><dd>{entry.data.kind}</dd></div>
        <div><dt>{t.project.status}</dt><dd>{entry.data.status}</dd></div>
      </dl>
      <ul class="chips" aria-label={t.project.stack}>
        {entry.data.stack.map((s) => <li>{s}</li>)}
      </ul>
      {entry.data.links.length > 0 && (
        <p class="case__links">
          {entry.data.links.map((l) => (
            <a class="btn btn--primary" href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
          ))}
        </p>
      )}
    </header>

    <section class={`gallery ${phone ? 'gallery--phones' : 'gallery--wide'}`} aria-label={t.project.gallery}>
      {media.gallery.map((shot, i) => (
        <Frame image={shot.src} alt={shot.alt[lang]} shape={phone ? 'phone' : 'wide'} eager={i === 0} width={phone ? 480 : 1400} />
      ))}
    </section>

    <article class="prose"><Content /></article>

    <nav class="case__next" aria-label={t.project.next}>
      <a class="btn" href={localePath(lang, `proyectos/${nextId}/`)}>{t.project.next}: {next.data.title} →</a>
    </nav>
  </main>
</BaseLayout>

<style>
  .case { display: grid; gap: var(--space-2xl); padding-block: var(--space-xl) var(--space-3xl); }
  .case__back { width: fit-content; white-space: nowrap; font-size: var(--text-sm); }
  .case__head { display: grid; gap: var(--space-lg); }
  .case__head h1 { font-size: var(--text-display); }
  .case__summary { font-size: var(--text-lg); color: var(--color-muted); }
  .case__meta { display: grid; gap: var(--space-md); margin: 0; }
  .case__meta div { display: grid; gap: 0.15rem; }
  .case__meta dt { font-family: var(--font-mono); font-size: var(--text-sm); color: var(--color-muted); }
  .case__meta dd { margin: 0; }
  .chips { display: flex; flex-wrap: wrap; gap: var(--space-xs); }
  .chips li { padding: 0.35rem 0.75rem; border: 1px solid var(--color-line); border-radius: 999px; font-family: var(--font-mono); font-size: var(--text-sm); }
  .case__links { display: flex; flex-wrap: wrap; gap: var(--space-sm); max-width: none; }

  .gallery { display: grid; gap: var(--space-md); }
  .gallery--phones { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .gallery--wide { grid-template-columns: minmax(0, 1fr); }
  @media (min-width: 48rem) {
    .gallery--phones { grid-template-columns: repeat(4, minmax(0, 1fr)); }
    .case__meta { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  }

  .prose { display: grid; gap: var(--space-md); max-width: var(--measure); }
  .prose :global(h2) { font-size: var(--text-xl); margin-top: var(--space-lg); }
  .case__next { padding-top: var(--space-xl); border-top: 1px solid var(--color-line); }
</style>
```

- [ ] **Paso 2: Build y comprobación**

```bash
npm run build 2>&1 | grep -iE "error|Complete"
find dist -path '*proyectos*' -name index.html | sort
```
Esperado: 8 archivos: `dist/{es,en}/proyectos/{reportaya,moviesapp,el-zuliano,tienda-burgos}/index.html`.

- [ ] **Paso 3: Commit**

```bash
git add -A
git commit -m "feat: add case study pages for all projects in both languages

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 10: Pruebas end-to-end (diseño, sin JS, movimiento, idioma, enlaces, accesibilidad)

**Files:**
- Crear: `tests/e2e/layout.spec.ts`, `nojs.spec.ts`, `motion.spec.ts`, `i18n.spec.ts`, `links.spec.ts`, `a11y.spec.ts`

**Interfaces:**
- Consume: sitio construido (`npm run build && npm run preview` lo levanta `playwright.config.ts`).

- [ ] **Paso 1: `tests/e2e/layout.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

const widths = [320, 375, 414, 768, 1280];
const pages = ['/es/', '/en/', '/es/proyectos/reportaya/', '/en/proyectos/el-zuliano/'];

for (const w of widths) {
  for (const p of pages) {
    test(`sin desborde horizontal: ${p} a ${w}px`, async ({ page }) => {
      await page.setViewportSize({ width: w, height: 800 });
      await page.goto(p);
      const offenders = await page.evaluate(() => {
        const vw = window.innerWidth;
        return [...document.querySelectorAll('body *')]
          .filter((el) => !el.closest('.tile'))
          .filter((el) => {
            const r = el.getBoundingClientRect();
            return r.width > 0 && r.right > vw + 1;
          })
          .map((el) => `${el.tagName.toLowerCase()}.${String(el.className)}`);
      });
      expect(offenders).toEqual([]);
    });
  }
}

test('titulares y botones en una sola línea a 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('/es/');
  const multiline = await page.evaluate(() =>
    [...document.querySelectorAll('.btn, .wordmark, nav a')]
      .filter((el) => {
        const r = el.getBoundingClientRect();
        const lh = parseFloat(getComputedStyle(el).lineHeight) || 24;
        return r.width > 0 && r.height > lh * 2.2;
      })
      .map((el) => el.textContent?.trim()),
  );
  expect(multiline).toEqual([]);
});
```

- [ ] **Paso 2: `tests/e2e/nojs.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test.use({ javaScriptEnabled: false, viewport: { width: 375, height: 800 } });

test('sin JavaScript la navegación móvil sigue siendo alcanzable', async ({ page }) => {
  await page.goto('/es/');
  await expect(page.locator('#site-nav a').first()).toBeVisible();
  await expect(page.locator('.nav-toggle')).toBeHidden();
});
```

- [ ] **Paso 3: `tests/e2e/motion.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('prefers-reduced-motion desactiva las animaciones', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/es/');
  const names = await page.evaluate(() =>
    [...document.querySelectorAll('.tile, .tile .frame')].map((el) => getComputedStyle(el).animationName),
  );
  expect(names.length).toBeGreaterThan(0);
  expect(names.every((n) => n === 'none')).toBe(true);
});

test('con movimiento normal el muro sí anima', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/es/');
  const name = await page.locator('.tile').first().evaluate((el) => getComputedStyle(el).animationName);
  expect(name).not.toBe('none');
});
```

- [ ] **Paso 4: `tests/e2e/i18n.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('el selector conserva el proyecto al cambiar de idioma', async ({ page }) => {
  await page.goto('/es/proyectos/reportaya/');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/en\/proyectos\/reportaya\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await page.locator('[data-lang-switch]').click();
  await expect(page).toHaveURL(/\/es\/proyectos\/reportaya\/$/);
});

test.describe('raíz según idioma del navegador', () => {
  test.describe('inglés', () => {
    test.use({ locale: 'en-US' });
    test('/ → /en/', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/en/');
    });
  });
  test.describe('español', () => {
    test.use({ locale: 'es-VE' });
    test('/ → /es/', async ({ page }) => {
      await page.goto('/');
      await page.waitForURL('**/es/');
    });
  });
});

test('hreflang y canonical apuntan a las dos versiones', async ({ page }) => {
  await page.goto('/en/proyectos/moviesapp/');
  await expect(page.locator('link[rel="alternate"][hreflang="es"]')).toHaveAttribute('href', /\/es\/proyectos\/moviesapp\/$/);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/en\/proyectos\/moviesapp\/$/);
});
```

- [ ] **Paso 5: `tests/e2e/links.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

const pages = ['/es/', '/en/', '/es/proyectos/reportaya/', '/en/proyectos/moviesapp/', '/es/proyectos/el-zuliano/', '/en/proyectos/tienda-burgos/'];

for (const p of pages) {
  test(`enlaces internos y descargas responden 200: ${p}`, async ({ page }) => {
    await page.goto(p);
    const hrefs = await page.$$eval('a[href]', (as) => as.map((a) => a.getAttribute('href') ?? ''));
    const internal = [...new Set(hrefs.filter((h) => h.startsWith('/')).map((h) => h.split('#')[0]))].filter(Boolean);
    expect(internal.length).toBeGreaterThan(0);
    for (const href of internal) {
      const res = await page.request.get(href);
      expect(res.status(), href).toBe(200);
    }
  });

  test(`todas las imágenes cargan: ${p}`, async ({ page }) => {
    await page.goto(p);
    await page.evaluate(() => document.querySelectorAll('img').forEach((i) => (i.loading = 'eager')));
    await page.waitForLoadState('networkidle');
    const broken = await page.$$eval('img', (imgs) =>
      imgs.filter((i) => !(i.complete && i.naturalWidth > 0)).map((i) => i.currentSrc || i.src),
    );
    expect(broken).toEqual([]);
  });
}

test('las descargas de CV existen en ambos idiomas', async ({ request }) => {
  for (const f of ['/cv/CV_Jose_Burgos_ES.pdf', '/cv/CV_Jose_Burgos_EN.pdf']) {
    const res = await request.get(f);
    expect(res.status(), f).toBe(200);
    expect(res.headers()['content-type']).toContain('pdf');
  }
});
```

- [ ] **Paso 6: `tests/e2e/a11y.spec.ts`**

```ts
import { expect, test } from '@playwright/test';

test('los titulares nunca van en cursiva', async ({ page }) => {
  for (const p of ['/es/', '/en/proyectos/reportaya/']) {
    await page.goto(p);
    const styles = await page.$$eval('h1, h2, h3', (hs) => hs.map((h) => getComputedStyle(h).fontStyle));
    expect(styles.every((s) => s === 'normal')).toBe(true);
  }
});

test('un único h1 por página y lang correcto', async ({ page }) => {
  for (const [p, lang] of [['/es/', 'es'], ['/en/', 'en']] as const) {
    await page.goto(p);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('html')).toHaveAttribute('lang', lang);
  }
});

test('el foco por teclado es visible', async ({ page }) => {
  await page.goto('/es/');
  await page.keyboard.press('Tab');
  const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
  expect(outline).not.toBe('none');
});

test('las imágenes informativas tienen alt y las decorativas lo dejan vacío', async ({ page }) => {
  await page.goto('/es/proyectos/reportaya/');
  const missing = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.hasAttribute('alt')).length);
  expect(missing).toBe(0);
  const empty = await page.$$eval('.gallery img', (imgs) => imgs.filter((i) => !(i.getAttribute('alt') ?? '').trim()).length);
  expect(empty).toBe(0);
});

test('el menú móvil se abre, se cierra con Escape y mantiene aria-expanded', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 800 });
  await page.goto('/es/');
  const toggle = page.locator('.nav-toggle');
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await toggle.click();
  await expect(toggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#site-nav')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(toggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#site-nav')).toBeHidden();
});
```

- [ ] **Paso 7: Ejecutar toda la batería**

```bash
npx vitest run
npx playwright test
```
Esperado: Vitest y Playwright en verde. Si falla una prueba de desborde, la salida lista el selector culpable: corregir ese componente (por ejemplo añadir `min-width: 0` o `overflow-wrap: anywhere`) y repetir. No relajar las pruebas.

- [ ] **Paso 8: Commit**

```bash
git add -A
git commit -m "test: add e2e coverage for layout, no-JS nav, motion, i18n, links and a11y

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 11: Licencia, README, prueba anti-plantilla y Lighthouse

**Files:**
- Crear: `LICENSE`, `README.md`, `tests/license.test.ts`

- [ ] **Paso 1: Prueba que falla**

`tests/license.test.ts`:
```ts
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

describe('licencia y ausencia de la plantilla', () => {
  it('LICENSE está a nombre de José Burgos', () => {
    const text = readFileSync('LICENSE', 'utf8');
    expect(text).toMatch(/José Andres Burgos Bolivar/);
    expect(text).not.toMatch(/Oscar Hernandez/);
  });
  it('ningún archivo versionado menciona a la plantilla original', () => {
    const files = execSync('git ls-files', { encoding: 'utf8' })
      .split('\n')
      .filter((f) => f && !f.startsWith('docs/') && !/\.(webp|png|jpg|pdf)$/.test(f) && f !== 'tests/license.test.ts');
    const hits = files.filter((f) => /Oscar Hernandez/i.test(readFileSync(f, 'utf8')));
    expect(hits).toEqual([]);
  });
});
```

- [ ] **Paso 2: Ejecutar y ver que falla**

Run: `npx vitest run tests/license.test.ts`
Expected: FAIL (no existe `LICENSE`).

- [ ] **Paso 3: `LICENSE` (MIT a nombre de José Burgos)**

```
MIT License

Copyright (c) 2026 José Andres Burgos Bolivar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Paso 4: `README.md`**

```markdown
# José Burgos — Portafolio

Sitio personal bilingüe (ES/EN) de José Burgos, desarrollador Full-Stack & Mobile.
En vivo: https://jose-burgos-portfolio.vercel.app

## Stack

Astro 7 · CSS propio con tokens OKLCH · una isla de React · MDX · Vitest · Playwright · Vercel.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build estático en `dist/` |
| `npm run preview` | sirve `dist/` en el puerto 4321 |
| `npm test` | pruebas unitarias y de contenido (Vitest) |
| `npm run test:e2e` | pruebas de diseño, enlaces y accesibilidad (Playwright) |
| `npm run assets` | regenera capturas y foto desde `assets-src/` |
| `npm run capture` | vuelve a capturar los sitios web desplegados |
| `npm run og` | regenera la imagen para redes (`public/og.png`) |

## Estructura

Contenido bilingüe en `src/content/` (`site.ts` y `proyectos/{es,en}/*.mdx`). Textos de interfaz en `src/i18n/ui.ts`. Diseño: tokens en `src/styles/tokens.css`.

## Licencia

MIT © José Andres Burgos Bolivar
```

- [ ] **Paso 5: Ejecutar pruebas**

Run: `npx vitest run`
Expected: todo PASS.

- [ ] **Paso 6: Lighthouse móvil**

```bash
npm run build && (npm run preview &) && sleep 4
for p in es en es/proyectos/reportaya; do
  n=$(echo $p | tr '/' '-')
  npx --yes lighthouse "http://localhost:4321/$p/" --only-categories=performance,accessibility,best-practices,seo \
    --chrome-flags="--headless=new" --output=json --output-path="./lh-$n.json" --quiet
  node -e "const r=require('./lh-$n.json');console.log('$p',Object.entries(r.categories).map(([k,v])=>k+':'+Math.round(v.score*100)).join(' '))"
done
```
Esperado: las cuatro categorías ≥ 95 en las 3 páginas. Si alguna baja, abrir el JSON (`audits` con `score < 1`), corregir la causa (típico: contraste, `alt`, tamaño de imágenes, `width/height` faltantes) y repetir. Detener el preview al terminar (`kill %1` o cerrar el proceso de `astro preview`).

- [ ] **Paso 7: Commit**

```bash
git add -A
git commit -m "docs: add MIT license for the new codebase, README and template-absence test

Co-Authored-By: Claude Sonnet 5.5 <noreply@anthropic.com>"
```

---

### Task 12: Vista previa en Vercel, revisión del usuario y publicación

**Files:** ninguno (operaciones de Git y Vercel).

- [ ] **Paso 1: Subir la rama de trabajo (sin tocar `main`)**

```bash
git push -u origin redesign
```
Esperado: rama `redesign` creada en `JoseBurgoss/JoseBurgos-Portfolio`.

- [ ] **Paso 2: Localizar la vista previa de Vercel**

```bash
sleep 60
gh api repos/JoseBurgoss/JoseBurgos-Portfolio/commits/redesign/status --jq '.statuses[] | [.context, .state, .target_url] | @tsv'
```
Esperado: un estado `Vercel` con `success` y una URL de vista previa. Si el estado es `failure`, abrir `target_url` y leer el log del build. Causa probable: versión de Node. Astro 7 exige Node ≥ 22.12; en Vercel → Project Settings → General → Node.js Version, elegir `22.x` y reintentar el despliegue (esto es un ajuste del usuario en el panel de Vercel; avisarle).

- [ ] **Paso 3: Revisión visual de la vista previa**

Abrir la URL de vista previa en Chrome (extensión Claude in Chrome) y comprobar, en `/es/` y `/en/`: muro con 4 tarjetas, secciones completas, foto, botones de CV descargan PDF, selector de idioma, una página de proyecto. Tomar una captura a 1280 px y otra a 375 px para el usuario.

- [ ] **Paso 4: Pedir aprobación al usuario**

Enviar al usuario la URL de vista previa y las capturas. **No continuar sin un "sí" explícito**: publicar reemplaza el sitio en vivo.

- [ ] **Paso 5: Publicar en `main` (solo tras la aprobación)**

```bash
git fetch origin
git log --oneline origin/main..redesign | wc -l
git push origin redesign:main
```
Esperado: avance rápido (fast-forward) sin `--force`. Si Git lo rechaza por no ser fast-forward, **detenerse y avisar**; no forzar.

- [ ] **Paso 6: Verificar producción**

```bash
sleep 90
curl -s -o /dev/null -w "%{http_code}\n" https://jose-burgos-portfolio.vercel.app/es/
curl -s https://jose-burgos-portfolio.vercel.app/es/ | grep -o "<title>[^<]*</title>"
curl -s -o /dev/null -w "%{http_code}\n" https://jose-burgos-portfolio.vercel.app/cv/CV_Jose_Burgos_EN.pdf
```
Esperado: `200`, el título nuevo (`José Burgos — Desarrollador Full-Stack & Mobile`) y `200` para el PDF.

- [ ] **Paso 7: Tareas posteriores (solo informar al usuario)**

El README del perfil de GitHub y LinkedIn ya apuntan a este dominio; no requieren cambios. Queda pendiente el post antiguo de LinkedIn que menciona IA (decisión del usuario).

---

## Auto-revisión del plan

**Cobertura de la especificación**

| Sección de la spec | Tarea |
| --- | --- |
| 1 Objetivo / criterios (sin plantilla, Lighthouse, 320 px) | 1, 10, 11 |
| 3 Sistema visual (tokens, tipografía, movimiento, capturas) | 2, 7, 10 |
| 4 Arquitectura (colección, i18n, islas) | 1, 3, 4, 5, 8, 9 |
| 5 Home: hero+muro, sobre mí, experiencia, stack, certificaciones, otros proyectos, contacto | 7, 8 |
| 6 Caso de estudio | 9 |
| 7 Contenido y activos (foto, CV, capturas) | 5, 6 |
| 8 Calidad (SEO, a11y, rendimiento, verificación) | 4, 10, 11 |
| 9 Despliegue y migración, LICENSE, README | 1, 11, 12 |
| 10 Fuera de alcance | respetado (sin blog, sin CMS, sin formulario) |

**Notas de decisión**
- El selector de idioma es un enlace normal (no isla): funciona sin JavaScript. La única isla es `MobileNav`, que solo se hidrata en pantallas ≤ 48 rem.
- Las tipografías quedaron elegidas: Schibsted Grotesk (títulos), Instrument Sans (texto) y JetBrains Mono (detalles).
- La certificación de Google se muestra como "cursos completados" (3), igual que en el CV, sin afirmar el certificado completo.
- Pendiente de revisión del usuario en la vista previa: calidad de las capturas de MoviesApp (app simple) y la cuarta pantalla de ReportaYa (recortada en el original).

**Consistencia de nombres:** `Lang`, `locales`, `localePath`, `switchLangPath` (Tarea 3) se usan igual en 4, 7, 8, 9. `projectMedia`, `tileOrder`, `projectOrder` (Tarea 7) se usan en 7 y 9. `site.cv[lang]` y `site.links` (Tarea 5) se usan en 8. Campo `project` en MDX y `entry.data.project` en 7 y 9.
