import { Servicio } from '@/types/servicio';
export const mantenimientoPiscinas: Servicio = {
  slug: 'mantenimiento-piscinas', nombre: 'Mantenimiento de piscinas', nombreCorto: 'Piscinas',
  descripcion: 'Servicios de mantenimiento y tratamiento de piscinas comunitarias.',
  icono: 'droplets', keywordPrincipal: 'mantenimiento piscinas comunidad',
  keywordsSecundarias: ['mantenimiento piscinas comunitarias'],
  metaTitle: 'Mantenimiento de piscinas comunitarias | Presupuesto gratis',
  metaDescription: 'Mantenimiento profesional de piscinas comunitarias. Tratamiento de agua, limpieza, socorrismo.',
  intro: 'El mantenimiento de piscinas comunitarias requiere profesionales cualificados que garanticen la calidad del agua y el cumplimiento normativo.',
  tipos: [
    { nombre: 'Mantenimiento del agua', descripcion: 'Control de pH, cloro y tratamientos de choque.' },
    { nombre: 'Limpieza de la piscina', descripcion: 'Limpieza de fondo, paredes y skimmers.' },
    { nombre: 'Puesta a punto y apertura', descripcion: 'Preparación para la temporada de baño.' },
    { nombre: 'Socorrismo', descripcion: 'Socorristas titulados para la temporada de verano.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento integral piscina', desde: 300, hasta: 800, unidad: '€/mes' },
    { concepto: 'Socorrista (temporada verano)', desde: 1200, hasta: 2500, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Cuánto cuesta el mantenimiento de una piscina comunitaria?', respuesta: 'El mantenimiento integral oscila entre 300€ y 800€ al mes en temporada.' },
    { pregunta: '¿Es obligatorio tener socorrista?', respuesta: 'Depende de la normativa autonómica y el aforo de la piscina.' },
    { pregunta: '¿Cuándo se debe hacer la puesta a punto?', respuesta: 'Entre 4 y 6 semanas antes de la apertura, normalmente abril-mayo.' },
    { pregunta: '¿Cada cuánto hay que analizar el agua?', respuesta: 'La normativa exige análisis diarios de cloro y pH en temporada de baño.' },
  ],
};
