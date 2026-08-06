import { Ciudad } from '@/types/ciudad';

export const CIUDADES: Ciudad[] = [
  { slug: 'madrid', nombre: 'Madrid', comunidad: 'Comunidad de Madrid', poblacion: 3400000, lat: 40.4168, lng: -3.7038, zonas: ['Centro', 'Chamberí', 'Salamanca', 'Retiro', 'Arganzuela', 'Carabanchel'], contenidoLocal: {
    'limpieza-comunidades': { intro: 'Madrid es la ciudad con mayor número de comunidades de propietarios de España.', datoRelevante: 'El convenio colectivo de limpieza de la Comunidad de Madrid establece la subrogación obligatoria.', precioContexto: 'Un portal con escalera ronda los 250-450€/mes.' },
  } },
  { slug: 'barcelona', nombre: 'Barcelona', comunidad: 'Cataluña', poblacion: 1660000, lat: 41.3851, lng: 2.1734, zonas: ['Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Sant Martí'], contenidoLocal: {
    'limpieza-comunidades': { intro: 'Barcelona cuenta con más de 70.000 comunidades de propietarios.', datoRelevante: 'El convenio catalán establece condiciones específicas de subrogación.', precioContexto: 'Precios un 10-15% superiores a la media nacional.' },
  } },
  { slug: 'valencia', nombre: 'Valencia', comunidad: 'Comunitat Valenciana', poblacion: 800000, lat: 39.4699, lng: -0.3763, zonas: ["Ciutat Vella", "L'Eixample", 'Extramurs'], contenidoLocal: {
    'limpieza-comunidades': { intro: 'Valencia cuenta con un parque inmobiliario muy diverso.', datoRelevante: 'El convenio valenciano regula subrogación y jornada.', precioContexto: 'Precios 15-20% inferiores a Madrid y Barcelona.' },
  } },
  { slug: 'sevilla', nombre: 'Sevilla', comunidad: 'Andalucía', poblacion: 685000, lat: 37.3891, lng: -5.9845, zonas: ['Triana', 'Nervión', 'Macarena'], contenidoLocal: {} },
  { slug: 'malaga', nombre: 'Málaga', comunidad: 'Andalucía', poblacion: 580000, lat: 36.7213, lng: -4.4214, zonas: ['Centro', 'Teatinos', 'El Palo'], contenidoLocal: {} },
  { slug: 'zaragoza', nombre: 'Zaragoza', comunidad: 'Aragón', poblacion: 675000, lat: 41.6488, lng: -0.8891, zonas: ['Centro', 'Delicias', 'Actur'], contenidoLocal: {} },
  { slug: 'bilbao', nombre: 'Bilbao', comunidad: 'País Vasco', poblacion: 347000, lat: 43.2630, lng: -2.9350, zonas: ['Abando', 'Deusto', 'Indautxu'], contenidoLocal: {} },
  { slug: 'alicante', nombre: 'Alicante', comunidad: 'Comunitat Valenciana', poblacion: 337000, lat: 38.3452, lng: -0.4810, zonas: ['Centro', 'Playa de San Juan'], contenidoLocal: {} },
  { slug: 'murcia', nombre: 'Murcia', comunidad: 'Región de Murcia', poblacion: 460000, lat: 37.9922, lng: -1.1307, zonas: ['Centro', 'El Carmen'], contenidoLocal: {} },
  { slug: 'palma-de-mallorca', nombre: 'Palma de Mallorca', comunidad: 'Islas Baleares', poblacion: 420000, lat: 39.5696, lng: 2.6502, zonas: ['Centro', 'Santa Catalina'], contenidoLocal: {} },
  { slug: 'las-palmas', nombre: 'Las Palmas de Gran Canaria', comunidad: 'Canarias', poblacion: 380000, lat: 28.1235, lng: -15.4363, zonas: ['Vegueta', 'Triana'], contenidoLocal: {} },
  { slug: 'valladolid', nombre: 'Valladolid', comunidad: 'Castilla y León', poblacion: 300000, lat: 41.6523, lng: -4.7245, zonas: ['Centro', 'Parquesol'], contenidoLocal: {} },
  { slug: 'cordoba', nombre: 'Córdoba', comunidad: 'Andalucía', poblacion: 325000, lat: 37.8882, lng: -4.7794, zonas: ['Centro', 'Levante'], contenidoLocal: {} },
  { slug: 'granada', nombre: 'Granada', comunidad: 'Andalucía', poblacion: 232000, lat: 37.1773, lng: -3.5986, zonas: ['Centro', 'Zaidín', 'Albaicín'], contenidoLocal: {} },
];

export function getCiudad(slug: string) { return CIUDADES.find((c) => c.slug === slug); }
export function getCiudadSlugs() { return CIUDADES.map((c) => c.slug); }
