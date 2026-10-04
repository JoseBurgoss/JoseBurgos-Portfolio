import type { Lang } from './utils';

export interface Ui {
  meta: { homeTitle: string; homeDescription: string };
  nav: { label: string; skip: string; work: string; about: string; experience: string; stack: string; contact: string; menu: string; close: string; switchTo: string };
  hero: { role: string; title: string; sub: string; ctaWork: string; ctaCv: string };
  work: { title: string; open: string };
  about: { title: string; photoAlt: string; facts: string };
  experience: { title: string; education: string };
  stack: { title: string };
  certs: { title: string };
  other: { title: string; intro: string; repo: string };
  contact: { title: string; lead: string; linkedin: string; github: string; cvEs: string; cvEn: string; copy: string; copied: string };
  project: { back: string; kind: string; status: string; stack: string; links: string; gallery: string; next: string };
  footer: { built: string };
}

export const ui: Record<Lang, Ui> = {
  es: {
    meta: {
      homeTitle: 'José Burgos — Desarrollador Full-Stack & Mobile',
      homeDescription: 'Ingeniero en Computación en Maracaibo. Apps móviles y web con React Native, TypeScript y Go. Abierto a oportunidades remotas y proyectos freelance.',
    },
    nav: { label: 'Principal', skip: 'Saltar al contenido', work: 'Proyectos', about: 'Sobre mí', experience: 'Experiencia', stack: 'Stack', contact: 'Contacto', menu: 'Menú', close: 'Cerrar', switchTo: 'Cambiar a inglés' },
    hero: { role: 'Desarrollador Full-Stack & Mobile', title: 'Apps móviles y web que funcionan.', sub: 'Ingeniero en Computación en Maracaibo. React Native, TypeScript y Go.', ctaWork: 'Ver proyectos', ctaCv: 'Descargar CV' },
    work: { title: 'Proyectos', open: 'ver caso de estudio' },
    about: { title: 'Sobre mí', photoAlt: 'Retrato de José Burgos', facts: 'Datos rápidos' },
    experience: { title: 'Experiencia', education: 'Educación' },
    stack: { title: 'Stack' },
    certs: { title: 'Certificaciones' },
    other: { title: 'Otros proyectos', intro: 'Trabajos de la universidad y de práctica, con el código en GitHub.', repo: 'Ver en GitHub' },
    contact: { title: 'Hablemos.', lead: 'Estoy abierto a oportunidades remotas y a proyectos freelance de web y móvil.', linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV en español', cvEn: 'CV en inglés', copy: 'Copiar correo', copied: 'Copiado' },
    project: { back: 'Todos los proyectos', kind: 'Tipo', status: 'Estado', stack: 'Stack', links: 'Enlaces', gallery: 'Capturas', next: 'Siguiente proyecto' },
    footer: { built: 'Hecho con Astro. Código propio.' },
  },
  en: {
    meta: {
      homeTitle: 'José Burgos — Full-Stack & Mobile Developer',
      homeDescription: 'Computer Engineer based in Maracaibo. Mobile and web apps with React Native, TypeScript and Go. Open to remote roles and freelance projects.',
    },
    nav: { label: 'Main', skip: 'Skip to content', work: 'Work', about: 'About', experience: 'Experience', stack: 'Stack', contact: 'Contact', menu: 'Menu', close: 'Close', switchTo: 'Switch to Spanish' },
    hero: { role: 'Full-Stack & Mobile Developer', title: 'Mobile and web apps that work.', sub: 'Computer Engineer in Maracaibo. React Native, TypeScript and Go.', ctaWork: 'See projects', ctaCv: 'Download CV' },
    work: { title: 'Work', open: 'view case study' },
    about: { title: 'About', photoAlt: 'Portrait of José Burgos', facts: 'Quick facts' },
    experience: { title: 'Experience', education: 'Education' },
    stack: { title: 'Stack' },
    certs: { title: 'Certifications' },
    other: { title: 'Other projects', intro: 'University and practice work, with the code on GitHub.', repo: 'View on GitHub' },
    contact: { title: "Let's talk.", lead: "I'm open to remote roles and freelance web and mobile projects.", linkedin: 'LinkedIn', github: 'GitHub', cvEs: 'CV in Spanish', cvEn: 'CV in English', copy: 'Copy email', copied: 'Copied' },
    project: { back: 'All projects', kind: 'Type', status: 'Status', stack: 'Stack', links: 'Links', gallery: 'Screenshots', next: 'Next project' },
    footer: { built: 'Built with Astro. Hand-written code.' },
  },
};
