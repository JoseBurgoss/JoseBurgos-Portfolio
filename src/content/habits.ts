import type { L10n } from './site';

/**
 * Cómo trabajo: hábitos con algo concreto detrás.
 * Todo lo que se afirma aquí se comprobó contra los repos (hashes, PRs, pruebas) el 2026-10-26.
 */

export interface Habit { id: string; title: L10n<string>; text: L10n<string>; proof?: { label: L10n<string>; href?: string } }

export const habits: Habit[] = [
  {
    id: 'causa',
    title: { es: 'La causa antes que el parche', en: 'The cause before the patch' },
    text: {
      es: 'Un arreglo que no explica por qué falló vuelve a romperse. Busco el mecanismo y lo dejo escrito en el commit.',
      en: 'A fix that cannot explain why it broke will break again. I look for the mechanism and write it into the commit.',
    },
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
