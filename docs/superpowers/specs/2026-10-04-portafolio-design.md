# Portafolio José Burgos — diseño

Fecha: 2026-10-04 · Estado: pendiente de revisión del usuario

## 1. Objetivo

Reemplazar el portafolio actual (plantilla de terceros, `JoseBurgos-Portfolio`, MIT © Oscar Hernandez) por un sitio de **código propio**, elegante y profesional, que presente a José Burgos como Full-Stack & Mobile Developer para oportunidades remotas/internacionales y proyectos freelance.

**Criterios de éxito**
- Ningún archivo de la plantilla original permanece; `LICENSE` pasa a nombre de José Burgos.
- Se ve diseñado, no generado: sin degradados en texto, sin grillas decorativas, sin cursivas en titulares, sin ventanas/teléfonos dibujados, sin cifras ni testimonios inventados.
- Bilingüe ES/EN con selector; páginas de caso de estudio por proyecto.
- Lighthouse ≥ 95 en Performance, Accessibility, Best Practices y SEO (móvil).
- Funciona sin horizontal scroll en 320 / 375 / 414 / 768 px.

## 2. Decisiones tomadas

| Tema | Decisión |
|---|---|
| Dirección visual | Opción B "muro asimétrico": fondo oscuro tinta, bloques por proyecto con color propio, capturas reales con marco de borde fino, animación sutil |
| Idiomas | Español e inglés, selector, rutas `/es` y `/en` |
| Estructura | Home de una página + una página de caso de estudio por proyecto |
| Tecnología | Astro + CSS propio + islas de React; hosting Vercel |
| Secciones opcionales | Certificaciones, descarga de CV (ES/EN), otros proyectos (lista de texto), foto en Sobre mí |
| ReportaYa | Se queda como proyecto principal (tesis); se presenta como "reconstrucción planificada", sin prometer fecha ni publicación en tiendas |

## 3. Sistema visual

- **Color:** tinta `#14161b` como fondo; papel cálido para texto; un acento naranja (`#F86F15`, el de ReportaYa) usado en su bloque y en estados de foco/enlace. Cada bloque de proyecto tiene su propio tono (naranja, papel, pizarra, arena). Todo definido como tokens en `src/styles/tokens.css`; ningún color suelto en componentes.
- **Tipografía:** una familia para titulares (romana, sin cursiva), una para texto y una mono solo para detalles técnicos. Máximo 2+1. Se eligen en la construcción evitando las tipografías sobreusadas; fuentes autoalojadas, `font-display: swap`.
- **Movimiento:** solo `transform` y `opacity`. Entrada escalonada del muro (≤ 800 ms), flotación lenta de teléfonos, elevación en hover, subrayado dibujado en enlaces. `prefers-reduced-motion: reduce` colapsa todo a un fundido ≤ 150 ms. Cinta/marquee pausable.
- **Imágenes:** capturas reales, WebP/AVIF con `srcset`; marco = borde 1 px + radio. Sin chrome dibujado.
- **Forma:** layout asimétrico, `minmax(0,1fr)` en pistas con imágenes, overflow-x `clip` en `html` y `body`.

## 4. Arquitectura

```
Portafolio/
  src/
    pages/           es/index.astro, en/index.astro, es|en/proyectos/[slug].astro
    content/         proyectos/*.mdx (es y en), site.json (bio, experiencia, stack, certs)
    components/      Wall, ProjectTile, Experience, Stack, Certs, OtherProjects, Contact, LangSwitch…
    islands/         LangSwitch.tsx, MobileNav.tsx, WallMotion.tsx (solo lo interactivo)
    styles/          tokens.css, base.css, componentes
    i18n/            strings es/en
  public/            cv/CV_Jose_Burgos_{ES,EN}.pdf, fonts/, og/
  docs/superpowers/  specs/, plans/
```

- Colección de contenido tipada (Zod) para proyectos; un MDX por idioma y proyecto.
- i18n con rutas explícitas y `hreflang`; redirección `/` → idioma del navegador (por defecto `/es`).
- Casi todo se renderiza estático; JS solo en islas.

## 5. Home (orden)

1. **Hero + muro de proyectos** (opción B): titular, línea de stack y bloques ReportaYa (3 pantallas), El Zuliano (ancho), MoviesApp (2 pantallas), Tienda Burgos (ancho).
2. **Sobre mí:** foto + bio corta.
3. **Experiencia:** ALKOSTO (con el relato de mapas: evaluó Google Maps → solución open-source de menor costo → migración a Google Maps SDK por funcionalidad y escala), Coolto, Universidad Rafael Urdaneta (graduado).
4. **Stack:** Mobile, Web, Backend/DB, Herramientas.
5. **Certificaciones:** EF SET C2 (81/100), Google Cybersecurity, Cisco (2025).
6. **Otros proyectos:** lista de texto (Hash-Evaluator, Analizador Semántico, Analizador Sintáctico) con enlace a GitHub.
7. **Contacto:** correo, LinkedIn, GitHub y botones de CV (ES/EN).

## 6. Caso de estudio

Cabecera (nombre, rol, año, estado) → problema → solución → stack → galería de capturas reales → enlaces (demo, GitHub si es público). ReportaYa incluye el contexto de tesis, Android nativo (Java, Firebase) y la reconstrucción planificada (React Native/Expo, PostgreSQL, API propia).

## 7. Contenido y activos

- **Foto:** `C:\Users\Alkosto\Burgos\CVS\foto-jose-burgos.jpg` (original en Descargas).
- **CVs:** actualizados ES/EN en `C:\Users\Alkosto\Burgos\CVS\actualizados\` (docx + pdf); los originales en `originales\`. Los PDF se copian a `public/cv/`.
- **Capturas:** ReportaYa (tira de 4 pantallas del repo), MoviesApp (`DemoImages`), El Zuliano y Tienda Burgos (capturas del sitio desplegado). Se toman capturas nuevas y limpias de Tienda Burgos (con productos cargados) y de MoviesApp si es posible.
- **Textos:** honestos y verificables; sin métricas inventadas. Cifra "−40 % de costos" solo en el relato de mapas de ALKOSTO, tal como está en LinkedIn y el CV.

## 8. Calidad

- **SEO:** metadatos por idioma, Open Graph con imagen propia, `sitemap`, `robots`, JSON-LD `Person`.
- **Accesibilidad:** contraste ≥ 4.5:1, foco visible, navegación por teclado, `alt` útil, selector de idioma accesible.
- **Rendimiento:** imágenes responsivas con dimensiones fijas, fuentes autoalojadas, sin librerías de animación pesadas.
- **Verificación:** build limpio, Lighthouse móvil, revisión visual a 320/375/414/768/1280 px, enlaces sin 404.

## 9. Despliegue y migración

1. Rama `redesign` en `JoseBurgoss/JoseBurgos-Portfolio` con el sitio nuevo; Vercel genera preview.
2. Revisión del usuario sobre el preview.
3. Merge a `main`; el dominio `jose-burgos-portfolio.vercel.app` se actualiza solo.
4. Se reemplaza `LICENSE`; el README del repo se reescribe.
5. Se actualizan los enlaces que apunten al portafolio viejo (README del perfil, LinkedIn).

El historial de git de la plantilla queda en la rama anterior; el código del sitio nuevo no reutiliza archivos suyos.

## 10. Fuera de alcance

Blog, modo claro/oscuro conmutable, CMS, formulario con backend (el contacto es `mailto` y enlaces), el GitHub profesional y la mejora de los demás repos (sub-proyectos aparte).

## 11. Pendientes por definir

- Elección final de tipografías (durante la construcción, con las reglas de la sección 3).
- Texto final de cada caso de estudio (borrador mío, revisión del usuario).
- Capturas nuevas de Tienda Burgos y MoviesApp.
