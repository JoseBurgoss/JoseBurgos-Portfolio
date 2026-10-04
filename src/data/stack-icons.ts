import {
  siAndroid, siAstro, siDocker, siExpo, siExpress, siFirebase, siGit, siGo, siGooglemaps, siHtml5, siJest,
  siJsonwebtokens, siMysql, siNextdotjs, siNodedotjs, siPostgresql, siReact, siSentry, siShadcnui, siTypescript, siVite,
} from 'simple-icons';

type Icon = { title: string; path: string };

/** Ícono monocromo (Simple Icons) por nombre tal como aparece en `site.stack`. */
const icons: Record<string, Icon> = {
  'React Native': siReact,
  Expo: siExpo,
  'Google Maps SDK': siGooglemaps,
  'Android (Java)': siAndroid,
  React: siReact,
  'Next.js': siNextdotjs,
  TypeScript: siTypescript,
  Astro: siAstro,
  'HTML & CSS': siHtml5,
  'shadcn/ui': siShadcnui,
  'Node.js': siNodedotjs,
  Express: siExpress,
  'Go (Gin/GORM)': siGo,
  'JWT / RBAC': siJsonwebtokens,
  PostgreSQL: siPostgresql,
  'MySQL / MariaDB': siMysql,
  Firebase: siFirebase,
  Docker: siDocker,
  'Git (Git Flow)': siGit,
  Jest: siJest,
  Sentry: siSentry,
  Vite: siVite,
};

/** Conceptos sin marca propia: se muestran con un punto en vez de ícono. */
export const noIcon = ['Push notifications', 'REST', 'WebSockets / SSE', 'CI/CD'];

export function iconFor(name: string): Icon | undefined {
  return icons[name];
}
