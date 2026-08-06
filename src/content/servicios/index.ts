import { limpiezaComunidades } from './limpieza-comunidades';
import { mantenimientoComunidades } from './mantenimiento-comunidades';
import { conserjeriaComunidades } from './conserjeria-comunidades';
import { reformasComunidades } from './reformas-comunidades';
import { jardineriaComunidades } from './jardineria-comunidades';
import { mantenimientoPiscinas } from './mantenimiento-piscinas';

export const SERVICIOS = [
  limpiezaComunidades,
  mantenimientoComunidades,
  conserjeriaComunidades,
  reformasComunidades,
  jardineriaComunidades,
  mantenimientoPiscinas,
] as const;

export function getServicio(slug: string) {
  return SERVICIOS.find((s) => s.slug === slug);
}

export function getServicioSlugs() {
  return SERVICIOS.map((s) => s.slug);
}
