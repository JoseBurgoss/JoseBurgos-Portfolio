import type { Lang } from './utils';

export interface Ui {
  meta: { homeTitle: string; homeDescription: string };
  nav: { label: string; skip: string; work: string; method: string; about: string; experience: string; stack: string; contact: string; menu: string; close: string; switchTo: string };
  hero: { role: string; title: string; sub: string; ctaWork: string; ctaCv: string; teaserLabel: string; teaserTitle: string; teaserText: string; teaserCta: string };
  method: { title: string; lead: string; habitsLabel: string; stepsLabel: string };
  work: { title: string; open: string; featuredTitle: string; featuredIntro: string; moreTitle: string; academic: string; protoTitle: string; protoIntro: string; protoOpen: string };
  about: { title: string; photoAlt: string; facts: string };
  experience: { title: string; education: string };
  stack: { title: string };
  certs: { title: string };
  other: { title: string; intro: string; repo: string };
  contact: { title: string; lead: string; linkedin: string; github: string; cvEs: string; cvEn: string; copy: string; copied: string };
  project: { back: string; kind: string; status: string; stack: string; links: string; gallery: string; next: string; academic: string };
  footer: { built: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    meta: {
      homeTitle: 'José Burgos — Desarrollador Full-Stack & Mobile',
      homeDescription: 'Ingeniero en Computación en Maracaibo. Apps móviles y web con React Native, TypeScript y Go. Abierto a oportunidades remotas y proyectos freelance.',
    },
    nav: { label: 'Principal', skip: 'Saltar al contenido', work: 'Proyectos', method: 'Cómo trabajo', about: 'Sobre mí', experience: 'Experiencia', stack: 'Stack', contact: 'Contacto', menu: 'Menú', close: 'Cerrar', switchTo: 'Cambiar a inglés' },
    hero: { role: 'Desarrollador Full-Stack & Mobile', title: 'Apps móviles y web que se sostienen.', sub: 'Ingeniero en Computación en Maracaibo. React Native, TypeScript y Go. Aquí: lo que construyo y cómo trabajo.', ctaWork: 'Ver proyectos', ctaCv: 'Descargar CV', teaserLabel: 'Un momento real', teaserTitle: 'Dos bordes donde debía haber uno', teaserText: 'Un fallo de foco en Sobre: causa, prueba y producción. Sin el arreglo, 3 pruebas fallan; con él, pasan.', teaserCta: 'Leer el caso' },
    method: { title: 'Cómo trabajo', lead: 'Cinco hábitos, cada uno con algo concreto detrás, y un momento real que los junta.', habitsLabel: 'Hábitos de trabajo', stepsLabel: 'Pasos del caso' },
    work: {
      title: 'Proyectos',
      open: 'ver caso de estudio',
      featuredTitle: 'Trabajo actual',
      featuredIntro: 'Burgo es mi ecosistema de apps propio: lo diseño, lo programo y lo opero en mi servidor.',
      moreTitle: 'Proyectos anteriores',
      academic: 'Proyecto universitario',
      protoTitle: 'Prototipos «powered by Burgo»',
      protoIntro: 'Demos de producto sobre la misma base, solo front-end y con datos ficticios.',
      protoOpen: 'Ver demo',
    },
    about: { title: 'Sobre mí', photoAlt: 'Retrato de José Burgos', facts: 'Datos rápidos' },
    experience: { title: 'Experiencia', education: 'Educación' },
    stack: { title: 'Stack' },
    certs: { title: 'Certificaciones' },
    other: { title: 'Otros proyectos', intro: 'Trabajos de la universidad y de práctica, con el código en GitHub.', repo: 'Ver en GitHub' },
    contact: { title: 'Hablemos.', lead: 'Estoy abierto a oportunidades remotas y a proyectos freelance de web y móvil.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV en español', cvEn: 'CV en inglés', copy: 'Copiar correo', copied: 'Copiado' },
    project: { back: 'Todos los proyectos', kind: 'Tipo', status: 'Estado', stack: 'Stack', links: 'Enlaces', gallery: 'Capturas', next: 'Siguiente proyecto', academic: 'Proyecto universitario' },
    footer: { built: 'Hecho con Astro.' },
  },
  en: {
    meta: {
      homeTitle: 'José Burgos — Full-Stack & Mobile Developer',
      homeDescription: 'Computer Engineer based in Maracaibo. Mobile and web apps with React Native, TypeScript and Go. Open to remote roles and freelance projects.',
    },
    nav: { label: 'Main', skip: 'Skip to content', work: 'Work', method: 'How I work', about: 'About', experience: 'Experience', stack: 'Stack', contact: 'Contact', menu: 'Menu', close: 'Close', switchTo: 'Switch to Spanish' },
    hero: { role: 'Full-Stack & Mobile Developer', title: 'Mobile and web apps that hold up.', sub: 'Computer Engineer in Maracaibo. React Native, TypeScript and Go. Here: what I build and how I work.', ctaWork: 'See projects', ctaCv: 'Download CV', teaserLabel: 'A real moment', teaserTitle: 'Two borders where there should be one', teaserText: 'A focus bug in Sobre: cause, test and production. Without the fix, 3 tests fail; with it, they pass.', teaserCta: 'Read the case' },
    method: { title: 'How I work', lead: 'Five habits, each with something concrete behind it, and one real moment that ties them together.', habitsLabel: 'Working habits', stepsLabel: 'Case steps' },
    work: {
      title: 'Work',
      open: 'view case study',
      featuredTitle: 'Current work',
      featuredIntro: 'Burgo is my own app ecosystem: I design it, build it and run it on my own server.',
      moreTitle: 'Earlier projects',
      academic: 'University project',
      protoTitle: 'Prototypes “powered by Burgo”',
      protoIntro: 'Product demos built on the same foundation, front-end only and with fictitious data.',
      protoOpen: 'Open demo',
    },
    about: { title: 'About', photoAlt: 'Portrait of José Burgos', facts: 'Quick facts' },
    experience: { title: 'Experience', education: 'Education' },
    stack: { title: 'Stack' },
    certs: { title: 'Certifications' },
    other: { title: 'Other projects', intro: 'University and practice work, with the code on GitHub.', repo: 'View on GitHub' },
    contact: { title: "Let's talk.", lead: "I'm open to remote roles and freelance web and mobile projects.", linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV in Spanish', cvEn: 'CV in English', copy: 'Copy email', copied: 'Copied' },
    project: { back: 'All projects', kind: 'Type', status: 'Status', stack: 'Stack', links: 'Links', gallery: 'Screenshots', next: 'Next project', academic: 'University project' },
    footer: { built: 'Built with Astro.' },
  },
};
