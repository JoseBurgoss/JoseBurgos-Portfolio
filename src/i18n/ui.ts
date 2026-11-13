import type { Lang } from './utils';

export interface Ui {
  meta: { homeTitle: string; homeDescription: string };
  nav: { label: string; skip: string; work: string; method: string; about: string; experience: string; stack: string; contact: string; menu: string; close: string; switchTo: string };
  hero: { role: string; title: string; sub: string; ctaWork: string; ctaCv: string; nowTitle: string; now: { name: string; text: string; path: string }[] };
  method: { title: string; lead: string; habitsLabel: string };
  work: { title: string; open: string; featuredTitle: string; featuredIntro: string; moreTitle: string; academic: string; protoTitle: string; protoIntro: string; protoOpen: string; protoExternal: string };
  about: { title: string; photoAlt: string; facts: string };
  experience: { title: string; education: string };
  stack: { title: string };
  certs: { title: string };
  other: { title: string; intro: string; repo: string };
  contact: { title: string; lead: string; linkedin: string; github: string; cvEs: string; cvEn: string; copy: string; copied: string };
  project: { back: string; kind: string; status: string; stack: string; links: string; gallery: string; next: string; academic: string };
  footer: { top: string; built: string; legalNav: string; privacy: string; terms: string; privacyUrl: string; termsUrl: string; notice: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    meta: {
      homeTitle: 'José Burgos — Desarrollador Full-Stack & Mobile',
      homeDescription: 'Ingeniero en Computación en Maracaibo. Apps móviles y web con React Native, TypeScript y Go. Abierto a oportunidades remotas y proyectos freelance.',
    },
    nav: { label: 'Principal', skip: 'Saltar al contenido', work: 'Proyectos', method: 'Cómo trabajo', about: 'Sobre mí', experience: 'Experiencia', stack: 'Stack', contact: 'Contacto', menu: 'Menú', close: 'Cerrar', switchTo: 'Cambiar a inglés' },
    hero: { role: 'Desarrollador Full-Stack & Mobile', title: 'Apps móviles y web que se sostienen.', sub: 'Ingeniero en Computación en Maracaibo. React Native, TypeScript y Go. Aquí: lo que construyo y cómo trabajo.', ctaWork: 'Ver proyectos', ctaCv: 'Descargar CV', nowTitle: 'Ahora estoy en', now: [{ name: 'Burgo', text: 'Seis apps propias: hoy PWA instalables, pronto en Google Play', path: 'proyectos/burgo/' }, { name: 'Sobre', text: 'Radar de precios y existencias de Pokémon TCG', path: 'proyectos/sobre/' }, { name: 'burgo.dev', text: 'El sitio de mi estudio y los manuales de cada app', path: 'proyectos/burgo-dev/' }, { name: 'Cabal', text: 'Gestión de negocio: clientes, cobros y conciliación de pagos. En construcción', path: 'proyectos/cabal/' }] },
    method: { title: 'Cómo trabajo', lead: 'Seis hábitos, cada uno con algo concreto detrás.', habitsLabel: 'Hábitos de trabajo' },
    work: {
      title: 'Proyectos',
      open: 'ver caso de estudio',
      featuredTitle: 'Trabajo actual',
      featuredIntro: 'Burgo es mi ecosistema de apps propio: lo diseño, lo programo y lo opero en mi servidor.',
      moreTitle: 'Proyectos anteriores',
      academic: 'Proyecto universitario',
      protoTitle: 'Prototipos «powered by Burgo»',
      protoIntro: 'Demos de comercios de Maracaibo hechas como propuesta: solo front-end y con datos de ejemplo. No son los sitios oficiales de esos negocios.',
      protoOpen: 'Ver demo',
      protoExternal: 'se abre en otra pestaña',
    },
    about: { title: 'Sobre mí', photoAlt: 'Retrato de José Burgos', facts: 'Datos rápidos' },
    experience: { title: 'Experiencia', education: 'Educación' },
    stack: { title: 'Stack' },
    certs: { title: 'Certificaciones' },
    other: { title: 'Otros proyectos', intro: 'Trabajos de la universidad y de práctica, con el código en GitHub.', repo: 'Ver en GitHub' },
    contact: { title: 'Hablemos.', lead: 'Estoy abierto a oportunidades remotas y a proyectos freelance de web y móvil.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV en español', cvEn: 'CV en inglés', copy: 'Copiar correo', copied: 'Copiado' },
    project: { back: 'Todos los proyectos', kind: 'Tipo', status: 'Estado', stack: 'Stack', links: 'Enlaces', gallery: 'Capturas', next: 'Siguiente proyecto', academic: 'Proyecto universitario' },
    footer: {
      top: 'Volver arriba',
      built: 'Hecho con Astro.',
      legalNav: 'Legal',
      privacy: 'Privacidad',
      terms: 'Términos',
      privacyUrl: 'https://burgo.dev/legal/privacidad/',
      termsUrl: 'https://burgo.dev/legal/terminos/',
      notice: 'Este sitio no usa cookies de terceros ni analítica de terceros. Las capturas de proyectos muestran datos de ejemplo; no hay clientes ni pagos reales en las demos.',
    },
  },
  en: {
    meta: {
      homeTitle: 'José Burgos — Full-Stack & Mobile Developer',
      homeDescription: 'Computer Engineer based in Maracaibo. Mobile and web apps with React Native, TypeScript and Go. Open to remote roles and freelance projects.',
    },
    nav: { label: 'Main', skip: 'Skip to content', work: 'Work', method: 'How I work', about: 'About', experience: 'Experience', stack: 'Stack', contact: 'Contact', menu: 'Menu', close: 'Close', switchTo: 'Switch to Spanish' },
    hero: { role: 'Full-Stack & Mobile Developer', title: 'Mobile and web apps that hold up.', sub: 'Computer Engineer in Maracaibo. React Native, TypeScript and Go. Here: what I build and how I work.', ctaWork: 'See projects', ctaCv: 'Download CV', nowTitle: 'Right now I am on', now: [{ name: 'Burgo', text: 'Six apps of my own: installable PWAs today, coming soon to Google Play', path: 'proyectos/burgo/' }, { name: 'Sobre', text: 'Pokémon TCG price and stock radar', path: 'proyectos/sobre/' }, { name: 'burgo.dev', text: 'My studio’s site and a manual for each app', path: 'proyectos/burgo-dev/' }, { name: 'Cabal', text: 'Business management: clients, billing and payment reconciliation. Under construction', path: 'proyectos/cabal/' }] },
    method: { title: 'How I work', lead: 'Six habits, each with something concrete behind it.', habitsLabel: 'Working habits' },
    work: {
      title: 'Work',
      open: 'view case study',
      featuredTitle: 'Current work',
      featuredIntro: 'Burgo is my own app ecosystem: I design it, build it and run it on my own server.',
      moreTitle: 'Earlier projects',
      academic: 'University project',
      protoTitle: 'Prototypes “powered by Burgo”',
      protoIntro: 'Demos for Maracaibo businesses, built as proposals: front-end only and with sample data. They are not those businesses’ official sites.',
      protoOpen: 'Open demo',
      protoExternal: 'opens in a new tab',
    },
    about: { title: 'About', photoAlt: 'Portrait of José Burgos', facts: 'Quick facts' },
    experience: { title: 'Experience', education: 'Education' },
    stack: { title: 'Stack' },
    certs: { title: 'Certifications' },
    other: { title: 'Other projects', intro: 'University and practice work, with the code on GitHub.', repo: 'View on GitHub' },
    contact: { title: "Let's talk.", lead: "I'm open to remote roles and freelance web and mobile projects.", linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV in Spanish', cvEn: 'CV in English', copy: 'Copy email', copied: 'Copied' },
    project: { back: 'All projects', kind: 'Type', status: 'Status', stack: 'Stack', links: 'Links', gallery: 'Screenshots', next: 'Next project', academic: 'University project' },
    footer: {
      top: 'Back to top',
      built: 'Built with Astro.',
      legalNav: 'Legal',
      privacy: 'Privacy',
      terms: 'Terms',
      privacyUrl: 'https://burgo.dev/en/legal/privacidad/',
      termsUrl: 'https://burgo.dev/en/legal/terminos/',
      notice: 'This site uses no third-party cookies or third-party analytics. Project screenshots show sample data; there are no real clients or payments in the demos.',
    },
  },
};
