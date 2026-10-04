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
