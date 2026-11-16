# José Burgos — Portafolio

Sitio personal bilingüe (EN por defecto, ES) de José Burgos, desarrollador Full-Stack & Mobile. Identidad «Catatumbo»: tinta sobre papel (día) o tormenta (noche) y un solo amarillo; Mona Sans + Martian Mono autoalojadas.
En vivo: https://jose.burgo.dev

## Stack

Astro 7 · CSS propio con tokens OKLCH · una isla de React · MDX · Vitest · Playwright · Caddy en VPS propio.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `npm run dev` | servidor de desarrollo |
| `npm run build` | build estático en `dist/` |
| `npm run preview` | sirve `dist/` en el puerto 4321 |
| `npm test` | pruebas unitarias y de contenido (Vitest) |
| `npm run test:e2e` | pruebas de diseño, enlaces y accesibilidad (Playwright) |
| `npm run assets` | regenera capturas y foto desde `assets-src/` (o `ASSETS_SRC=<carpeta>`). `npm run assets -- --only cabal` regenera solo lo que empieza por `cabal` |
| `npm run capture` | vuelve a capturar los sitios web desplegados |
| `npm run og` | regenera la imagen para redes (`public/og.png`) |

## Reemplazar las capturas de un proyecto (p. ej. Cabal)

1. Guardar las capturas nuevas en `assets-src/` con los mismos nombres (`cabal-resumen.png`, `cabal-pagos.png`, `cabal-portal.png`, `cabal-pagos-en.png`, `cabal-escritorio.png`, `cabal-pagos-escritorio.png`, `cabal-landing-escritorio.png`): teléfono a 390 px y escritorio a 1440 px, ambos a 2x.
2. `npm run assets -- --only cabal` (recorta, reescala y escribe los `.webp` en `src/assets/projects/`).
3. `npm test` (comprueba proporciones) y `npm run build`.

## Estructura

Contenido bilingüe en `src/content/` (`site.ts`, `habits.ts` con «Cómo trabajo», y `proyectos/{es,en}/*.mdx`). Textos de interfaz en `src/i18n/ui.ts`. Diseño: tokens (día y noche, con contraste AA probado) en `src/styles/tokens.css`. Cada caso de estudio se lee en cuatro movimientos (Problema · Decisiones · Pantallas · Lo que sigue): el plugin `src/lib/rehype-movements.mjs` agrupa las secciones `##` del MDX y la galería ocupa el tercero.

## Licencia

MIT © José Andres Burgos Bolivar
