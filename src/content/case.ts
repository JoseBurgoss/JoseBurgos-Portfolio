import type { L10n } from './site';

/**
 * Cómo trabajo: hábitos con algo concreto detrás y UN momento real.
 * Todo lo que se afirma aquí se comprobó contra los repos (hashes, PRs, pruebas) el 2026-10-26.
 * Texto entre `comillas invertidas` se pinta como código.
 */

export interface Habit { id: string; title: L10n<string>; text: L10n<string>; proof?: { label: L10n<string>; href?: string } }
export interface Step { id: string; title: L10n<string>; text: L10n<string> }
export interface Evidence { id: string; code: string; label: L10n<string>; href?: string }

export const habits: Habit[] = [
  {
    id: 'causa',
    title: { es: 'La causa antes que el parche', en: 'The cause before the patch' },
    text: {
      es: 'Un arreglo que no explica por qué falló vuelve a romperse. Busco el mecanismo y lo dejo escrito en el commit.',
      en: 'A fix that cannot explain why it broke will break again. I look for the mechanism and write it into the commit.',
    },
    proof: { label: { es: 'El caso de abajo', en: 'The case below' } },
  },
  {
    id: 'prueba',
    title: { es: 'Todo fallo deja una prueba', en: 'Every bug leaves a test' },
    text: {
      es: 'Si logro reproducirlo, lo convierto en una prueba que falla sin el arreglo. En Burgo, una prueba de guardia vigila el contraste AA de los estados de cada app.',
      en: 'If I can reproduce it, I turn it into a test that fails without the fix. In Burgo, a guard test watches the AA contrast of every app’s states.',
    },
  },
  {
    id: 'camino',
    title: { es: 'Un solo camino a producción', en: 'One path to production' },
    text: {
      es: 'Rama de trabajo, PR a develop, PR a main, commits convencionales y CI en verde. Antes de tocar producción: copia de seguridad y estado de cada sitio; después, la misma revisión.',
      en: 'Working branch, PR into develop, PR into main, conventional commits and green CI. Before touching production: a backup and the state of every site; afterwards, the same check.',
    },
  },
  {
    id: 'limites',
    title: { es: 'Frenar cuando toca', en: 'Stop when it is time to stop' },
    text: {
      es: 'El radar de Sobre no evade CAPTCHA ni sistemas anti-bot: ante un 403 o un 429 la tienda se frena sola. Las condiciones de uso de cada fuente están documentadas.',
      en: 'The Sobre radar does not evade CAPTCHAs or anti-bot systems: on a 403 or 429 the store backs off on its own. Each source’s terms of use are documented.',
    },
  },
  {
    id: 'explicado',
    title: { es: 'Lo dejo explicado', en: 'I leave it explained' },
    text: {
      es: 'Cada app de Burgo tiene su manual en PDF, y las decisiones de producto quedan numeradas (D-1 a D-13) para no discutirlas dos veces.',
      en: 'Every Burgo app has its PDF manual, and product decisions are numbered (D-1 to D-13) so they are never argued twice.',
    },
    proof: { label: { es: 'Ver un manual (PDF)', en: 'See a manual (PDF)' }, href: 'https://burgo.dev/manuales/sobre.pdf' },
  },
];

export const moment = {
  kicker: { es: 'Un momento real', en: 'A real moment' },
  meta: { es: 'Sobre · 25 y 26 de octubre de 2026', en: 'Sobre · October 25–26, 2026' },
  title: { es: 'Dos bordes donde debía haber uno', en: 'Two borders where there should be one' },
  lede: {
    es: 'En Sobre, el campo del código de seguridad de 6 dígitos dibujaba dos aros de foco a la vez. Es un detalle chico, pero en la pantalla de verificación en dos pasos es lo único que el usuario mira. Así lo cerré.',
    en: 'In Sobre, the 6-digit security-code field drew two focus rings at once. It is a small detail, but on the two-step verification screen it is the only thing the user is looking at. Here is how I closed it.',
  },
  steps: [
    {
      id: 'visto',
      title: { es: 'Lo vi y lo anoté', en: 'I saw it and wrote it down' },
      text: {
        es: 'El 25 de octubre, revisando el login de Sobre, confirmé el fallo: al enfocar el campo se veían juntos el borde del contenedor y el del input. No lo despaché como «cosmético»: quedó en mis notas de traspaso como fallo conocido, con su descripción.',
        en: 'On October 25, reviewing Sobre’s login, I confirmed the flaw: focusing the field showed the container’s border and the input’s border together. I did not wave it off as cosmetic: it went into my handoff notes as a known issue, described.',
      },
    },
    {
      id: 'causa',
      title: { es: 'Busqué la causa, no el parche', en: 'I looked for the cause, not a patch' },
      text: {
        es: 'No era una rareza del navegador. La regla global del tema, `[data-style=\'moderna\'] :focus-visible` (especificidad 0,2,0), le ganaba a `.sb-inp input` (0,1,1): un contorno global se sumaba al aro del contenedor.',
        en: 'It was not a browser quirk. The theme’s global rule, `[data-style=\'moderna\'] :focus-visible` (specificity 0,2,0), beat `.sb-inp input` (0,1,1): a global outline stacked on top of the container’s ring.',
      },
    },
    {
      id: 'prueba',
      title: { es: 'El arreglo trae su prueba', en: 'The fix ships with its test' },
      text: {
        es: 'Un bloque de 7 líneas de CSS (comentario incluido) y una prueba de 51 líneas, en el mismo commit. jsdom no resuelve la especificidad, así que la prueba lee el CSS y compara los selectores. Sin el arreglo, 3 de sus 4 comprobaciones fallan; con él, pasan las 4. Lo verifiqué ejecutándola contra el CSS anterior.',
        en: 'A 7-line CSS block (comment included) and a 51-line test, in the same commit. jsdom does not resolve specificity, so the test reads the CSS and compares the selectors. Without the fix, 3 of its 4 checks fail; with it, all 4 pass. I confirmed it by running it against the previous CSS.',
      },
    },
    {
      id: 'vuelta',
      title: { es: 'Segunda vuelta, 31 minutos después', en: 'Second pass, 31 minutes later' },
      text: {
        es: 'El aro del contenedor usaba `focus-within`, que también se encendía al enfocar el botón «Mostrar» de la contraseña. Lo cambié a `:has(> input:focus-visible)` y la prueba lo exige. Hoy el archivo tiene 5 comprobaciones.',
        en: 'The container ring used `focus-within`, which also lit up when the password’s “Show” button took focus. I switched to `:has(> input:focus-visible)` and the test now requires it. Today the file has 5 checks.',
      },
    },
    {
      id: 'prod',
      title: { es: 'A producción por el camino de siempre', en: 'To production the usual way' },
      text: {
        es: 'PR #15 a develop y PR #16 a main, con CI en verde en ambos. Hoy, 26 de octubre, el CSS que sirve sobre.burgo.dev contiene la regla.',
        en: 'PR #15 into develop and PR #16 into main, CI green on both. Today, October 26, the CSS served by sobre.burgo.dev contains the rule.',
      },
    },
  ] as Step[],
  demo: {
    title: { es: 'La causa, reproducida aquí', en: 'The cause, reproduced here' },
    intro: {
      es: 'Mismas reglas de especificidad, escritas de nuevo para esta página. Haz clic o usa Tab en cada campo.',
      en: 'Same specificity rules, rewritten for this page. Click or Tab into each field.',
    },
    before: { es: 'Antes', en: 'Before' },
    after: { es: 'Después', en: 'After' },
    beforeLabel: { es: 'Antes del arreglo: campo con doble borde', en: 'Before the fix: field with a double border' },
    afterLabel: { es: 'Después del arreglo: campo con un solo borde', en: 'After the fix: field with a single border' },
    beforeNote: { es: 'Dos aros', en: 'Two rings' },
    afterNote: { es: 'Un aro', en: 'One ring' },
  },
  shot: {
    alt: {
      es: 'Captura de Sobre en el entorno de pruebas: pantalla «Verificación en dos pasos» con tres casillas del código llenas y la cuarta enfocada con un solo aro.',
      en: 'Screenshot of Sobre in the test environment: the “Two-step verification” screen with three code boxes filled and the fourth focused with a single ring.',
    },
    caption: {
      es: 'Captura real del entorno de pruebas (390 px), tras el segundo ajuste: un solo aro, en la casilla activa.',
      en: 'Real capture from the test environment (390 px), after the second pass: a single ring, on the active box.',
    },
  },
  evidenceTitle: { es: 'Evidencia', en: 'Evidence' },
  evidenceNote: {
    es: 'El repositorio es privado; el historial se puede revisar bajo petición.',
    en: 'The repository is private; the history can be reviewed on request.',
  },
  evidence: [
    { id: 'fix', code: 'c0ffe60', label: { es: 'fix(web): un solo aro de foco en los campos · +7 líneas de CSS, +51 de prueba', en: 'fix(web): a single focus ring on fields · +7 lines of CSS, +51 of test' } },
    { id: 'vuelta', code: 'b0bf918', label: { es: 'login «A · Sellado»: incluye el ajuste a :has y la prueba ampliada', en: 'login “A · Sellado”: includes the :has adjustment and the extended test' } },
    { id: 'prs', code: 'PR #15 · #16', label: { es: 'develop y main, CI en verde (radar, web y admin)', en: 'develop and main, CI green (radar, web and admin)' } },
    { id: 'test', code: 'focus-ring.test.ts', label: { es: 'la prueba de regresión, en web/src', en: 'the regression test, in web/src' } },
    { id: 'live', code: 'sobre.burgo.dev', label: { es: 'la app en producción', en: 'the app in production' }, href: 'https://sobre.burgo.dev' },
  ] as Evidence[],
};
