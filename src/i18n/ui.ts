import type { Lang } from './utils';
import { movements } from './movements.mjs';

export interface Ui {
  meta: { homeTitle: string; homeDescription: string };
  nav: { label: string; skip: string; work: string; method: string; about: string; stack: string; contact: string; menu: string; close: string; switchTo: string; home: string; toDay: string; toNight: string };
  hero: { role: string; where: string; titleLines: string[]; sub: string; ctaWork: string; ctaCv: string; nowTitle: string; live: string; build: string; now: { name: string; text: string; path: string; status: 'live' | 'build' }[] };
  ficha: { items: { k: string; v: string }[] };
  method: { kicker: string; title: string; lead: string; habitsLabel: string };
  work: {
    kicker: string; title: string; intro: string; open: string; caseCta: string; academic: string;
    archiveKicker: string; archiveTitle: string; archiveIntro: string; filterLabel: string;
    filters: { all: string; app: string; web: string; proto: string; code: string };
    kinds: { app: string; web: string; proto: string; code: string };
    protoOpen: string; protoExternal: string; repoOpen: string;
  };
  about: { kicker: string; title: string; photoAlt: string; facts: string };
  experience: { kicker: string; title: string; education: string; certsTitle: string };
  stack: { kicker: string; title: string };
  contact: { title: string; lead: string; linkedin: string; github: string; cvEs: string; cvEn: string; copy: string; copied: string };
  project: {
    back: string; kind: string; status: string; stack: string; link: string; gallery: string; next: string; academic: string; toc: string;
    mov: { problem: string; decisions: string; screens: string; next: string };
    phone: string; desktop: string; sample: string;
  };
  plan: { kicker: string; label: string; steps: { pct: string; name: string; note: string }[] };
  footer: { top: string; built: string; legalNav: string; privacy: string; terms: string; privacyUrl: string; termsUrl: string; notice: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    meta: {
      homeTitle: 'José Burgos — Desarrollador Full-Stack & Mobile',
      homeDescription: 'Ingeniero en Computación en Maracaibo. Apps móviles y web con React Native, TypeScript y Go. Abierto a oportunidades remotas y proyectos freelance.',
    },
    nav: { label: 'Principal', skip: 'Saltar al contenido', work: 'Trabajo', method: 'Método', about: 'Sobre mí', stack: 'Stack', contact: 'Contacto', menu: 'Menú', close: 'Cerrar', switchTo: 'Cambiar a inglés', home: 'José Burgos, inicio', toDay: 'Cambiar a modo día', toNight: 'Cambiar a modo noche' },
    hero: {
      role: 'Desarrollador Full-Stack & Mobile',
      where: 'Maracaibo',
      titleLines: ['Apps que', 'aguantan'],
      sub: 'Ingeniero en Computación. Diseño, construyo y sostengo en producción apps móviles y web con React Native, TypeScript y Go.',
      ctaWork: 'Ver trabajo',
      ctaCv: 'Descargar CV',
      nowTitle: 'Ahora mismo',
      live: 'En línea',
      build: 'En obra',
      now: [
        { name: 'Burgo', text: 'Seis apps propias: PWAs instalables hoy, pronto en Google Play.', path: 'proyectos/burgo/', status: 'live' },
        { name: 'Sobre', text: 'Radar de precios y existencias de Pokémon TCG.', path: 'proyectos/sobre/', status: 'live' },
        { name: 'burgo.dev', text: 'El sitio de mi estudio y un manual por cada app.', path: 'proyectos/burgo-dev/', status: 'live' },
        { name: 'Cabal', text: 'Gestión de negocios: clientes, cobros y conciliación de pagos.', path: 'proyectos/cabal/', status: 'build' },
      ],
    },
    ficha: {
      items: [
        { k: 'Formación', v: 'Ing. en Computación' },
        { k: 'Hoy en', v: 'ALKOSTO · Innovación' },
        { k: 'Demos en producción', v: '{n} prototipos' },
        { k: 'Disponible para', v: 'Remoto y freelance' },
      ],
    },
    method: { kicker: 'Método', title: 'Seis hábitos, con pruebas detrás.', lead: 'No es una lista de valores: cada hábito tiene algo concreto que puedes revisar.', habitsLabel: 'Hábitos de trabajo' },
    work: {
      kicker: 'Trabajo',
      title: 'En curso, en producción.',
      intro: 'Burgo es mi propio ecosistema: lo diseño, lo programo y lo opero en mi servidor. Cada pieza lleva capturas reales.',
      open: 'ver caso de estudio',
      caseCta: 'Ver caso →',
      academic: 'Proyecto universitario',
      archiveKicker: 'Archivo',
      archiveTitle: 'Lo anterior y los prototipos.',
      archiveIntro: 'Demos para negocios de Maracaibo hechas como propuesta: solo front-end y con datos de ejemplo. No son los sitios oficiales de esos negocios.',
      filterLabel: 'Filtrar archivo',
      filters: { all: 'Todo', app: 'Apps', web: 'Web', proto: 'Prototipos', code: 'Código' },
      kinds: { app: 'App', web: 'Web', proto: 'Prototipo', code: 'Código' },
      protoOpen: 'Ver demo',
      protoExternal: 'se abre en otra pestaña',
      repoOpen: 'Ver en GitHub',
    },
    about: { kicker: 'Sobre mí', title: 'Código que se queda en pie.', photoAlt: 'Retrato de José Burgos', facts: 'Datos rápidos' },
    experience: { kicker: 'Experiencia', title: 'Dónde he trabajado.', education: 'Educación', certsTitle: 'Certificaciones' },
    stack: { kicker: 'Stack', title: 'Con qué trabajo.' },
    contact: { title: 'Hablemos', lead: 'Estoy abierto a oportunidades remotas y a proyectos freelance de web y móvil.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV en español', cvEn: 'CV en inglés', copy: 'Copiar correo', copied: 'Copiado' },
    project: {
      back: 'Trabajo', kind: 'Tipo', status: 'Estado', stack: 'Stack', link: 'Enlace', gallery: 'Capturas', next: 'Siguiente caso', academic: 'Proyecto universitario', toc: 'En esta página',
      mov: movements.es,
      phone: 'Teléfono', desktop: 'Escritorio', sample: 'datos de ejemplo',
    },
    plan: {
      kicker: 'Plan de pagos por defecto · toca un tramo',
      label: 'Tramos del plan 40/20/20/20',
      steps: [
        { pct: '40%', name: 'Inicio', note: 'Al empezar: el 40 % activa el proyecto.' },
        { pct: '20%', name: 'Hito 1', note: 'Hito intermedio: se cobra al cumplir la fase acordada.' },
        { pct: '20%', name: 'Hito 2', note: 'Hito intermedio: segunda fase, con su porcentaje ponderado de avance.' },
        { pct: '20%', name: 'Entrega', note: 'Entrega: este pago cierra el proyecto y arranca la garantía de 3 meses.' },
      ],
    },
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
    nav: { label: 'Main', skip: 'Skip to content', work: 'Work', method: 'Method', about: 'About', stack: 'Stack', contact: 'Contact', menu: 'Menu', close: 'Close', switchTo: 'Switch to Spanish', home: 'José Burgos, home', toDay: 'Switch to day mode', toNight: 'Switch to night mode' },
    hero: {
      role: 'Full-Stack & Mobile Developer',
      where: 'Maracaibo',
      titleLines: ['Apps that', 'hold up'],
      sub: 'Computer Engineer. I design, build and keep mobile and web apps running in production, with React Native, TypeScript and Go.',
      ctaWork: 'See work',
      ctaCv: 'Download CV',
      nowTitle: 'Right now',
      live: 'Live',
      build: 'In progress',
      now: [
        { name: 'Burgo', text: 'Six apps of my own: installable PWAs today, coming soon to Google Play.', path: 'proyectos/burgo/', status: 'live' },
        { name: 'Sobre', text: 'Pokémon TCG price and stock radar.', path: 'proyectos/sobre/', status: 'live' },
        { name: 'burgo.dev', text: 'My studio’s site and a manual for each app.', path: 'proyectos/burgo-dev/', status: 'live' },
        { name: 'Cabal', text: 'Business management: clients, billing and payment reconciliation.', path: 'proyectos/cabal/', status: 'build' },
      ],
    },
    ficha: {
      items: [
        { k: 'Education', v: 'Computer Engineering' },
        { k: 'Today at', v: 'ALKOSTO · Innovation' },
        { k: 'Demos in production', v: '{n} prototypes' },
        { k: 'Available for', v: 'Remote and freelance' },
      ],
    },
    method: { kicker: 'Method', title: 'Six habits, with tests behind them.', lead: 'Not a list of values: every habit has something concrete you can check.', habitsLabel: 'Working habits' },
    work: {
      kicker: 'Work',
      title: 'In progress, in production.',
      intro: 'Burgo is my own ecosystem: I design it, build it and run it on my own server. Every piece comes with real screenshots.',
      open: 'view case study',
      caseCta: 'View case →',
      academic: 'University project',
      archiveKicker: 'Archive',
      archiveTitle: 'Earlier work and prototypes.',
      archiveIntro: 'Demos for Maracaibo businesses, built as proposals: front-end only and with sample data. They are not those businesses’ official sites.',
      filterLabel: 'Filter the archive',
      filters: { all: 'All', app: 'Apps', web: 'Web', proto: 'Prototypes', code: 'Code' },
      kinds: { app: 'App', web: 'Web', proto: 'Prototype', code: 'Code' },
      protoOpen: 'Open demo',
      protoExternal: 'opens in a new tab',
      repoOpen: 'View on GitHub',
    },
    about: { kicker: 'About', title: 'Code that stays standing.', photoAlt: 'Portrait of José Burgos', facts: 'Quick facts' },
    experience: { kicker: 'Experience', title: 'Where I have worked.', education: 'Education', certsTitle: 'Certifications' },
    stack: { kicker: 'Stack', title: 'What I work with.' },
    contact: { title: 'Let’s talk', lead: 'I’m open to remote roles and freelance web and mobile projects.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV in Spanish', cvEn: 'CV in English', copy: 'Copy email', copied: 'Copied' },
    project: {
      back: 'Work', kind: 'Type', status: 'Status', stack: 'Stack', link: 'Link', gallery: 'Screenshots', next: 'Next case', academic: 'University project', toc: 'On this page',
      mov: movements.en,
      phone: 'Phone', desktop: 'Desktop', sample: 'sample data',
    },
    plan: {
      kicker: 'Default payment plan · tap a stage',
      label: 'Stages of the 40/20/20/20 plan',
      steps: [
        { pct: '40%', name: 'Start', note: 'At the start: the 40 % activates the project.' },
        { pct: '20%', name: 'Milestone 1', note: 'Intermediate milestone: collected when the agreed phase is done.' },
        { pct: '20%', name: 'Milestone 2', note: 'Intermediate milestone: second phase, with its weighted share of progress.' },
        { pct: '20%', name: 'Delivery', note: 'Delivery: this payment closes the project and starts the 3-month warranty.' },
      ],
    },
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
