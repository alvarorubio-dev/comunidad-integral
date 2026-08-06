import { Servicio } from '@/types/servicio';
export const conserjeriaComunidades: Servicio = {
  slug: 'conserjeria-comunidades', nombre: 'Conserjería para comunidades', nombreCorto: 'Conserjería',
  descripcion: 'Servicios de conserjería profesional para comunidades de vecinos y edificios residenciales.',
  icono: 'shield-check', keywordPrincipal: 'conserjería comunidades',
  keywordsSecundarias: ['conserjes comunidades', 'portero comunidad'],
  metaTitle: 'Conserjería para comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Servicio de conserjería profesional para comunidades. Conserjes diurnos y nocturnos, control de acceso.',
  intro: 'La conserjería para comunidades de propietarios es un servicio esencial que mejora la seguridad, el orden y la calidad de vida en edificios residenciales.',
  tipos: [
    { nombre: 'Conserjería diurna', descripcion: 'Control de acceso, atención a vecinos y recepción de paquetes.' },
    { nombre: 'Conserjería nocturna', descripcion: 'Vigilancia y control de acceso durante la noche.' },
    { nombre: 'Conserje polivalente', descripcion: 'Combina portería con mantenimiento básico y limpieza.' },
    { nombre: 'Control de accesos', descripcion: 'Gestión de entradas y supervisión de cámaras.' },
  ],
  preciosOrientativos: [
    { concepto: 'Conserjería diurna (turno completo)', desde: 1200, hasta: 1800, unidad: '€/mes' },
    { concepto: 'Conserjería nocturna', desde: 1400, hasta: 2200, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Qué funciones tiene un conserje de comunidad?', respuesta: 'Control de acceso, recepción de paquetería, atención a vecinos y mantenimiento básico.' },
    { pregunta: '¿Cuánto cuesta un conserje para una comunidad?', respuesta: 'Una conserjería diurna a tiempo completo cuesta entre 1.200€ y 1.800€ al mes.' },
    { pregunta: '¿Se puede contratar un conserje polivalente?', respuesta: 'Sí, combina funciones de portería con mantenimiento básico y limpieza.' },
    { pregunta: '¿Qué pasa con el conserje si cambio de empresa?', respuesta: 'La nueva empresa está obligada a subrogar al conserje asignado a esa comunidad.' },
  ],
};
