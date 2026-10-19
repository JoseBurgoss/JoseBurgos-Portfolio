import type { ImageMetadata } from 'astro';
import type { Lang } from '../i18n/utils';
import rpyLogin from '../assets/projects/reportaya-login.webp';
import rpyFeed from '../assets/projects/reportaya-feed.webp';
import rpyGuides from '../assets/projects/reportaya-guides.webp';
import rpyMap from '../assets/projects/reportaya-map.webp';
import mvList from '../assets/projects/moviesapp-list.webp';
import mvMenu from '../assets/projects/moviesapp-menu.webp';
import mvDetail from '../assets/projects/moviesapp-detail.webp';
import mvFavorites from '../assets/projects/moviesapp-favorites.webp';
import zuliano from '../assets/projects/el-zuliano.webp';
import tienda from '../assets/projects/tienda-burgos.webp';
import bgCancha from '../assets/projects/burgo-cancha.webp';
import bgFase from '../assets/projects/burgo-fase.webp';
import bgCuadre from '../assets/projects/burgo-cuadre.webp';
import bgBrio from '../assets/projects/burgo-brio.webp';
import bgCuenta from '../assets/projects/burgo-cuenta.webp';
import sobreEntrar from '../assets/projects/sobre-entrar.webp';

export type ProjectId = 'burgo' | 'sobre' | 'reportaya' | 'moviesapp' | 'el-zuliano' | 'tienda-burgos';
export type Shot = { src: ImageMetadata; alt: Record<Lang, string> };
export interface ProjectMedia {
  layout: 'phones' | 'wide';
  tile: ImageMetadata[];
  gallery: Shot[];
}

/** Trabajo actual, destacado arriba del muro. */
export const featuredOrder: ProjectId[] = ['burgo', 'sobre'];
/** Orden en el muro (la cuadrícula coloca cada uno por nombre de clase). */
export const tileOrder: ProjectId[] = ['reportaya', 'el-zuliano', 'moviesapp', 'tienda-burgos'];
/** Orden para "siguiente proyecto" en las páginas de caso de estudio. */
export const projectOrder: ProjectId[] = ['burgo', 'sobre', 'reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos'];

export const projectMedia: Record<ProjectId, ProjectMedia> = {
  burgo: {
    layout: 'phones',
    tile: [bgCancha, bgFase, bgCuadre],
    gallery: [
      { src: bgCancha, alt: { es: 'Cancha: equipos de un partido con balance automático', en: 'Cancha: match teams with automatic balancing' } },
      { src: bgFase, alt: { es: 'Fase: mapa de bloques por parroquia con reportes de luz', en: 'Fase: block map by parish with power reports' } },
      { src: bgCuadre, alt: { es: 'Cuadre: resumen mensual de gastos en dólares y bolívares', en: 'Cuadre: monthly spending summary in dollars and bolívares' } },
      { src: bgBrio, alt: { es: 'Brío: calorías y macros del día', en: 'Brío: daily calories and macros' } },
    ],
  },
  sobre: {
    layout: 'phones',
    tile: [sobreEntrar, bgCuenta],
    gallery: [
      { src: sobreEntrar, alt: { es: 'Sobre: pantalla de entrada con la cuenta Burgo', en: 'Sobre: sign-in screen with the Burgo account' } },
      { src: bgCuenta, alt: { es: 'Cuenta Burgo: inicio de sesión único para todas las apps', en: 'Burgo Account: single sign-on for every app' } },
    ],
  },
  reportaya: {
    layout: 'phones',
    tile: [rpyFeed, rpyMap, rpyGuides],
    gallery: [
      { src: rpyLogin, alt: { es: 'ReportaYa: pantalla de inicio de sesión', en: 'ReportaYa: sign-in screen' } },
      { src: rpyFeed, alt: { es: 'ReportaYa: feed de reportes ciudadanos', en: 'ReportaYa: citizen reports feed' } },
      { src: rpyGuides, alt: { es: 'ReportaYa: guías urbanas con servicios municipales', en: 'ReportaYa: urban guides for municipal services' } },
      { src: rpyMap, alt: { es: 'ReportaYa: mapa de Maracaibo con reportes agrupados', en: 'ReportaYa: map of Maracaibo with clustered reports' } },
    ],
  },
  moviesapp: {
    layout: 'phones',
    tile: [mvList, mvDetail],
    gallery: [
      { src: mvList, alt: { es: 'MoviesApp: lista de películas populares', en: 'MoviesApp: list of popular movies' } },
      { src: mvMenu, alt: { es: 'MoviesApp: menú lateral', en: 'MoviesApp: side menu' } },
      { src: mvDetail, alt: { es: 'MoviesApp: detalle de película con reseñas', en: 'MoviesApp: movie detail with reviews' } },
      { src: mvFavorites, alt: { es: 'MoviesApp: pantalla de favoritos', en: 'MoviesApp: favorites screen' } },
    ],
  },
  'el-zuliano': {
    layout: 'wide',
    tile: [zuliano],
    gallery: [{ src: zuliano, alt: { es: 'El Zuliano: portada con artículos populares', en: 'El Zuliano: front page with popular articles' } }],
  },
  'tienda-burgos': {
    layout: 'wide',
    tile: [tienda],
    gallery: [{ src: tienda, alt: { es: 'Tienda Burgos: página de inicio', en: 'Tienda Burgos: home page' } }],
  },
};
