import type { Lang } from '../i18n/utils';

export type L10n<T> = Record<Lang, T>;

export interface Experience {
  id: string;
  role: L10n<string>;
  org: string;
  period: L10n<string>;
  place: L10n<string>;
  summary: L10n<string>;
  highlights: L10n<string[]>;
}
export interface StackGroup { id: string; label: L10n<string>; items: string[] }
export interface Cert { name: L10n<string>; issuer: string; year?: string; detail?: L10n<string> }
export interface OtherProject { name: string; description: L10n<string>; tech: string; href: string }

export const site = {
  name: 'José Burgos',
  email: 'joseburgos153@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/jose-burgos-/',
    github: 'https://github.com/JoseBurgoss',
  },
  cv: { es: '/cv/CV_Jose_Burgos_ES.pdf', en: '/cv/CV_Jose_Burgos_EN.pdf' } as L10n<string>,

  about: {
    es: [
      'Soy Ingeniero en Computación (Universidad Rafael Urdaneta) y desarrollador Full-Stack & Mobile en Maracaibo. En la división de Innovación de ALKOSTO construyo aplicaciones de consumo y de operación con React Native, Expo, React/Next.js, TypeScript, Node.js y Go, incluyendo sistemas en tiempo real, geolocalización y notificaciones push.',
      'Me interesa entregar software confiable y mantenible: APIs REST, JWT/RBAC, PostgreSQL y MySQL, Docker, CI/CD y Sentry. También estudio ciberseguridad.',
    ],
    en: [
      "I'm a Computer Engineer (Rafael Urdaneta University) and a Full-Stack & Mobile developer based in Maracaibo. In ALKOSTO's Innovation division I build consumer and operational apps with React Native, Expo, React/Next.js, TypeScript, Node.js and Go, including real-time systems, geolocation and push notifications.",
      'I care about shipping reliable, maintainable software: REST APIs, JWT/RBAC, PostgreSQL and MySQL, Docker, CI/CD and Sentry. I also study cybersecurity.',
    ],
  } as L10n<string[]>,

  experience: [
    {
      id: 'alkosto',
      role: { es: 'Innovation Software Engineer', en: 'Innovation Software Engineer' },
      org: 'ALKOSTO',
      period: { es: 'Oct 2025 — Presente', en: 'Oct 2025 — Present' },
      place: { es: 'Maracaibo, Venezuela · Presencial', en: 'Maracaibo, Venezuela · On-site' },
      summary: {
        es: 'División de Innovación. Plataformas de consumo y operativas con React Native/Expo, React/Next.js, TypeScript, Node.js y Go.',
        en: 'Innovation division. Consumer and operational platforms with React Native/Expo, React/Next.js, TypeScript, Node.js and Go.',
      },
      highlights: {
        es: [
          'Capa de mapas y geolocalización de una plataforma de delivery en tiempo real: evalué Google Maps, primero entregué una solución open-source de menor costo (Leaflet + OSRM, reduciendo costos en más de 40%) y luego migré a Google Maps SDK + Navigation SDK por la funcionalidad y confiabilidad que exigía la escala.',
          'Arquitecturas de comunicación en tiempo real con WebSockets y SSE: sincronización de pedidos, notificaciones push, tracking de conductores y actualizaciones de inventario.',
          'Módulos de inventario con escaneo de códigos de barras, conteo cíclico y auditoría por ubicaciones, con dashboards en React Query + Zustand.',
          'Plataforma de beneficios corporativos (Next.js, TypeScript, shadcn/ui): tarjetas, bloqueo/desbloqueo, historial de consumos y roles RBAC.',
          'Gestor de proyectos interno estilo Notion: backend en Go (Gin/GORM), frontend en React + Zustand, tablero Kanban y documentos BlockNote.',
        ],
        en: [
          'Mapping and geolocation layer of a real-time delivery platform: evaluated Google Maps, first shipped a lower-cost open-source stack (Leaflet + OSRM, cutting costs by over 40%), then migrated to Google Maps SDK + Navigation SDK for the functionality and reliability required at scale.',
          'Real-time communication architectures with WebSockets and SSE: order synchronization, push notifications, driver tracking and inventory updates.',
          'Inventory modules with barcode scanning, cycle counts and location-based auditing, with dashboards built on React Query + Zustand.',
          'Corporate benefits platform (Next.js, TypeScript, shadcn/ui): benefit cards, lock/unlock, consumption history and RBAC roles.',
          'Internal Notion-style project manager: Go backend (Gin/GORM), React + Zustand frontend, Kanban boards and BlockNote documents.',
        ],
      },
    },
    {
      id: 'coolto',
      role: { es: 'Desarrollador Full-Stack (Pasantía)', en: 'Full-Stack Developer (Internship)' },
      org: 'Coolto Agency',
      period: { es: 'Jul 2025 — Sep 2025 · 240 horas', en: 'Jul 2025 — Sep 2025 · 240 hours' },
      place: { es: 'Maracaibo, Venezuela · Híbrido', en: 'Maracaibo, Venezuela · Hybrid' },
      summary: {
        es: 'Agencia de desarrollo ágil especializada en soluciones web y móviles modernas.',
        en: 'Agile software agency specializing in modern web and mobile solutions.',
      },
      highlights: {
        es: [
          'Ciclo completo de aplicaciones web con React 18, TypeScript, Node.js y PostgreSQL.',
          'APIs RESTful con autenticación JWT y manejo de errores; mejora de tiempos de carga en un 40% en componentes UI responsivos.',
          'Monitoreo con Sentry e internacionalización (i18n) en tres idiomas; trabajo con Agile/Scrum, Jest y Git Flow.',
        ],
        en: [
          'Full development cycle of web applications using React 18, TypeScript, Node.js and PostgreSQL.',
          'RESTful APIs with JWT authentication and error handling; 40% faster load times on responsive UI components.',
          'Monitoring with Sentry and internationalization (i18n) in three languages; Agile/Scrum, Jest and Git Flow.',
        ],
      },
    },
  ] as Experience[],

  education: {
    school: { es: 'Universidad Rafael Urdaneta', en: 'Rafael Urdaneta University' } as L10n<string>,
    degree: { es: 'Ingeniería en Computación (Graduado)', en: 'Computer Engineering (Graduated)' } as L10n<string>,
    period: '2021 — 2025',
  },

  stack: [
    { id: 'mobile', label: { es: 'Móvil', en: 'Mobile' }, items: ['React Native', 'Expo', 'Google Maps SDK', 'Push notifications', 'Android (Java)'] },
    { id: 'web', label: { es: 'Web', en: 'Web' }, items: ['React', 'Next.js', 'TypeScript', 'Astro', 'HTML & CSS', 'shadcn/ui'] },
    { id: 'backend', label: { es: 'Backend y datos', en: 'Backend & data' }, items: ['Node.js', 'Express', 'Go (Gin/GORM)', 'REST', 'WebSockets / SSE', 'JWT / RBAC', 'PostgreSQL', 'MySQL / MariaDB', 'Firebase'] },
    { id: 'tools', label: { es: 'Herramientas', en: 'Tooling' }, items: ['Docker', 'Git (Git Flow)', 'Jest', 'Sentry', 'Vite', 'CI/CD'] },
  ] as StackGroup[],

  certs: [
    { name: { es: 'EF SET English Certificate — C2 Proficient', en: 'EF SET English Certificate — C2 Proficient' }, issuer: 'EF SET', detail: { es: 'Puntaje 81/100', en: 'Score 81/100' } },
    {
      name: { es: 'Google Cybersecurity Professional Certificate', en: 'Google Cybersecurity Professional Certificate' },
      issuer: 'Google · Coursera',
      year: '2025',
      detail: {
        es: 'Cursos completados: Foundations of Cybersecurity, Connect and Protect, Play It Safe.',
        en: 'Completed courses: Foundations of Cybersecurity, Connect and Protect, Play It Safe.',
      },
    },
    { name: { es: 'Introducción a la Ciberseguridad', en: 'Introduction to Cybersecurity' }, issuer: 'Cisco', year: '2025' },
  ] as Cert[],

  otherProjects: [
    {
      name: 'Hash-Evaluator',
      description: {
        es: 'Prueba hashes MD5, SHA-1 y SHA-256 buscando prefijos de ceros, con visualización.',
        en: 'Tests MD5, SHA-1 and SHA-256 hashes for zero prefixes, with visualization.',
      },
      tech: 'Python',
      href: 'https://github.com/JoseBurgoss/Hash-Evaluator',
    },
    {
      name: 'Analizador Semántico',
      description: {
        es: 'Analizador sintáctico y semántico para Pascal: verifica estructura y detecta errores de tipo.',
        en: 'Syntactic and semantic analyzer for Pascal: checks structure and detects type errors.',
      },
      tech: 'C',
      href: 'https://github.com/JoseBurgoss/Analizador_Semantico',
    },
    {
      name: 'Analizador Sintáctico',
      description: { es: 'Analizador sintáctico (parser) escrito en C.', en: 'Syntactic analyzer (parser) written in C.' },
      tech: 'C',
      href: 'https://github.com/JoseBurgoss/Analizador_Sintactico',
    },
  ] as OtherProject[],
};
