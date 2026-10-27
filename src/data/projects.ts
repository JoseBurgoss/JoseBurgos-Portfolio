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
import bgCuenta from '../assets/projects/burgo-cuenta.webp';
import bgCuentaEntrar from '../assets/projects/burgo-cuenta-entrar.webp';
import bgCancha from '../assets/projects/burgo-cancha.webp';
import bgCuadre from '../assets/projects/burgo-cuadre.webp';
import bgFase from '../assets/projects/burgo-fase.webp';
import bgPique from '../assets/projects/burgo-pique.webp';
import bgBrio from '../assets/projects/burgo-brio.webp';
import bgAdmin from '../assets/projects/burgo-admin.webp';
import bgCuentaDesk from '../assets/projects/burgo-cuenta-escritorio.webp';
import bgAdminDesk from '../assets/projects/burgo-admin-escritorio.webp';
import sobreEntrar from '../assets/projects/sobre-entrar.webp';
import sobreInicio from '../assets/projects/sobre-inicio.webp';
import sobreProductos from '../assets/projects/sobre-productos.webp';
import sobreComunidad from '../assets/projects/sobre-comunidad.webp';
import sobreDeskInicio from '../assets/projects/sobre-escritorio-inicio.webp';
import sobreDeskEntrar from '../assets/projects/sobre-escritorio-entrar.webp';
import marcaInicio from '../assets/projects/burgo-dev-inicio.webp';
import marcaEncargo from '../assets/projects/burgo-dev-encargo.webp';
import marcaVilla from '../assets/projects/burgo-dev-villa.webp';
import marcaInicioEn from '../assets/projects/burgo-dev-inicio-en.webp';
import marcaDesk from '../assets/projects/burgo-dev-escritorio.webp';
import marcaVillaDesk from '../assets/projects/burgo-dev-villa-escritorio.webp';

export type ProjectId = 'burgo' | 'sobre' | 'burgo-dev' | 'reportaya' | 'moviesapp' | 'el-zuliano' | 'tienda-burgos';
/** `shape` por captura: la galería puede mezclar teléfono y escritorio. Por defecto, el de la tarjeta. */
export type Shot = { src: ImageMetadata; alt: Record<Lang, string>; shape?: 'phone' | 'wide' };
export interface ProjectMedia {
  layout: 'phones' | 'wide';
  tile: ImageMetadata[];
  gallery: Shot[];
}

/** Trabajo actual, destacado arriba del muro. */
export const featuredOrder: ProjectId[] = ['burgo', 'sobre', 'burgo-dev'];
/** Orden en el muro (la cuadrícula coloca cada uno por nombre de clase). */
export const tileOrder: ProjectId[] = ['reportaya', 'el-zuliano', 'moviesapp', 'tienda-burgos'];
/** Orden para "siguiente proyecto" en las páginas de caso de estudio. */
export const projectOrder: ProjectId[] = ['burgo', 'sobre', 'burgo-dev', 'reportaya', 'moviesapp', 'el-zuliano', 'tienda-burgos'];

export const projectMedia: Record<ProjectId, ProjectMedia> = {
  burgo: {
    layout: 'phones',
    tile: [bgCancha, bgPique, bgBrio],
    gallery: [
      { src: bgCuenta, alt: { es: 'Cuenta, tema «Credencial»: La villa, con la credencial del usuario y una tarjeta por app', en: 'Account, “Credencial” theme: the village, with the user’s credential card and one card per app' } },
      { src: bgCuentaEntrar, alt: { es: 'Cuenta: pantalla de entrada, con la credencial arriba del formulario', en: 'Account: sign-in screen, with the credential card above the form' } },
      { src: bgCancha, alt: { es: 'Cancha, tema «Dorsal»: un partido con camiseta numerada, cupos y lista de confirmados', en: 'Cancha, “Dorsal” theme: a match with a numbered jersey, spots and the confirmed list' } },
      { src: bgCuadre, alt: { es: 'Cuadre, tema «Libreta»: saldo del día en dólares y bolívares sobre papel cuadriculado', en: 'Cuadre, “Libreta” theme: today’s balance in dollars and bolívares on grid paper' } },
      { src: bgFase, alt: { es: 'Fase, tema «Esfera»: reloj de la luz de un sector con los botones «Se fue» y «Volvió»', en: 'Fase, “Esfera” theme: a sector’s power clock with the “It went out” and “It’s back” buttons' } },
      { src: bgPique, alt: { es: 'Pique, tema «Capicúa»: inicio de la trivia en vivo con un pack de preguntas por elegir', en: 'Pique, “Capicúa” theme: live trivia home with a question pack to choose' } },
      { src: bgBrio, alt: { es: 'Brío, tema «Romana»: calorías del día en un indicador de aguja', en: 'Brío, “Romana” theme: the day’s calories on a needle gauge' } },
      { src: bgAdmin, alt: { es: 'Admin, tema «Torre»: lista de usuarios con las secciones del panel arriba', en: 'Admin, “Torre” theme: user list with the panel sections on top' } },
      { src: bgCuentaDesk, shape: 'wide', alt: { es: 'Cuenta en escritorio: La villa con la credencial a un lado y las tarjetas de cada app', en: 'Account on desktop: the village with the credential card to one side and a card per app' } },
      { src: bgAdminDesk, shape: 'wide', alt: { es: 'Admin en escritorio: riel oscuro de secciones y tabla de usuarios', en: 'Admin on desktop: dark section rail and users table' } },
    ],
  },
  sobre: {
    layout: 'phones',
    tile: [sobreInicio, sobreProductos],
    gallery: [
      { src: sobreEntrar, alt: { es: 'Sobre: pantalla de entrada con el sobre azul y el formulario de correo y contraseña', en: 'Sobre: sign-in screen with the blue pack and the email and password form' } },
      { src: sobreInicio, alt: { es: 'Sobre: inicio con lo que está en stock y los avisos recientes', en: 'Sobre: home with what is in stock and recent alerts' } },
      { src: sobreProductos, alt: { es: 'Sobre: lista de productos con filtros por tienda y estado', en: 'Sobre: product list with store and status filters' } },
      { src: sobreComunidad, alt: { es: 'Sobre: pestaña Comunidad con señales de redes marcadas «Sin verificar»', en: 'Sobre: Community tab with social signals labeled “Unverified”' } },
      { src: sobreDeskInicio, shape: 'wide', alt: { es: 'Sobre en escritorio: menú lateral, productos en stock y avisos', en: 'Sobre on desktop: side menu, products in stock and alerts' } },
      { src: sobreDeskEntrar, shape: 'wide', alt: { es: 'Sobre en escritorio: entrada con el sobre azul a un lado del formulario', en: 'Sobre on desktop: sign-in with the blue pack beside the form' } },
    ],
  },
  'burgo-dev': {
    layout: 'wide',
    tile: [marcaDesk],
    gallery: [
      { src: marcaInicio, shape: 'phone', alt: { es: 'burgo.dev en teléfono: titular «Diseñamos y construimos software a medida» y dibujo de la villa', en: 'burgo.dev on phone: headline “We design and build custom software” and the village drawing' } },
      { src: marcaEncargo, shape: 'phone', alt: { es: 'burgo.dev en teléfono: sección «Software por encargo» con cuatro servicios ilustrados', en: 'burgo.dev on phone: “Software made to order” section with four illustrated services' } },
      { src: marcaVilla, shape: 'phone', alt: { es: 'burgo.dev en teléfono: sección «La villa» con las apps como edificios dibujados', en: 'burgo.dev on phone: “The village” section with the apps as drawn buildings' } },
      { src: marcaInicioEn, shape: 'phone', alt: { es: 'burgo.dev en inglés, en teléfono: «We design and build custom software»', en: 'burgo.dev in English, on phone: “We design and build custom software”' } },
      { src: marcaDesk, shape: 'wide', alt: { es: 'burgo.dev en escritorio: índice lateral, titular y plano dibujado de la villa', en: 'burgo.dev on desktop: side index, headline and drawn plan of the village' } },
      { src: marcaVillaDesk, shape: 'wide', alt: { es: 'burgo.dev en escritorio: la calle de la villa con cada app y su dirección', en: 'burgo.dev on desktop: the village street with each app and its address' } },
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
