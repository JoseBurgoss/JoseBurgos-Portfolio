import type { L10n } from './site';

/**
 * Cómo trabajo: hábitos con algo concreto detrás.
 * Cada afirmación se comprobó contra los repos y el registro de cambios (CI, flujo de ramas, scripts de despliegue,
 * pruebas de guardia, OpenAPI, borrado de cuenta, manuales) el 2026-10-27.
 */

export interface Habit { id: string; title: L10n<string>; text: L10n<string>; proof?: { label: L10n<string>; href?: string } }

export const habits: Habit[] = [
  {
    id: 'camino',
    title: { es: 'Un solo camino a producción', en: 'One path to production' },
    text: {
      es: 'Rama de trabajo, PR a develop, PR a main, commits convencionales. Solo se fusiona con la integración continua en verde, y nunca hay commits directos a esas ramas.',
      en: 'Working branch, PR into develop, PR into main, conventional commits. Nothing merges unless continuous integration is green, and nothing is committed straight to those branches.',
    },
  },
  {
    id: 'volver',
    title: { es: 'Probar antes, poder volver atrás', en: 'Test first, be able to go back' },
    text: {
      es: 'Todo pasa por el entorno de pruebas antes de producción. Antes de publicar hago copia de seguridad y reviso que ningún sitio se pierda; el script conserva las últimas cinco versiones para volver a una de ellas.',
      en: 'Everything goes through the test environment before production. Before publishing I take a backup and check that no site gets lost; the script keeps the last five releases so I can return to one.',
    },
  },
  {
    id: 'pruebas',
    title: { es: 'Lo importante lleva una prueba', en: 'What matters gets a test' },
    text: {
      es: 'Una prueba de guardia vigila el contraste AA de los estados de cada app, y un barrido revisa de 360 a 414 px que nada se desborde y que los botones midan al menos 44 px.',
      en: 'A guard test watches the AA contrast of every app’s states, and a sweep from 360 to 414 px checks that nothing overflows and that buttons are at least 44 px tall.',
    },
  },
  {
    id: 'contrato',
    title: { es: 'La API como contrato', en: 'The API as a contract' },
    text: {
      es: 'La API se documenta en OpenAPI y una prueba falla si queda una ruta sin documentar. El cliente del frontend se genera desde ese contrato, no se escribe a mano.',
      en: 'The API is documented in OpenAPI and a test fails if a route is left undocumented. The front-end client is generated from that contract, not written by hand.',
    },
  },
  {
    id: 'escrito',
    title: { es: 'Decisiones y manuales por escrito', en: 'Decisions and manuals in writing' },
    text: {
      es: 'Las decisiones de producto quedan numeradas (D-1, D-2…) con su motivo, y cada app tiene su manual en PDF.',
      en: 'Product decisions are numbered (D-1, D-2…) with their reasons, and every app has its PDF manual.',
    },
    proof: { label: { es: 'Ver un manual (PDF)', en: 'See a manual (PDF)' }, href: 'https://burgo.dev/manuales/cancha.pdf' },
  },
  {
    id: 'datos',
    title: { es: 'Cuidar los datos y respetar los límites', en: 'Care with data, respect for limits' },
    text: {
      es: 'Borrar la cuenta da 30 días de gracia y luego cada módulo elimina sus datos. Con las fuentes de terceros respeto sus condiciones: no evado bloqueos ni CAPTCHAs.',
      en: 'Deleting an account gives a 30-day grace period, then every module removes its data. With third-party sources I respect their terms: I do not evade blocks or CAPTCHAs.',
    },
  },
];
