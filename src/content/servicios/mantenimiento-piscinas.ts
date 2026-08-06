import { Servicio } from '@/types/servicio';

export const mantenimientoPiscinas: Servicio = {
  slug: 'mantenimiento-piscinas',
  nombre: 'Mantenimiento de piscinas',
  nombreCorto: 'Piscinas',
  descripcion: 'Servicios de mantenimiento y tratamiento de piscinas comunitarias, incluyendo socorrismo, limpieza y puesta a punto.',
  icono: 'droplets',
  keywordPrincipal: 'mantenimiento piscinas comunidad',
  keywordsSecundarias: ['mantenimiento piscinas comunitarias', 'limpieza piscina comunidad', 'tratamiento agua piscina', 'socorrista comunidad'],
  metaTitle: 'Mantenimiento de piscinas comunitarias | Presupuesto gratis',
  metaDescription: 'Mantenimiento profesional de piscinas comunitarias. Tratamiento de agua, limpieza, socorrismo, puesta a punto. Presupuesto gratis en toda España.',
  intro: 'El mantenimiento de piscinas comunitarias requiere profesionales cualificados que garanticen la calidad del agua, el correcto funcionamiento de los equipos y el cumplimiento de la normativa sanitaria vigente.',
  tipos: [
    { nombre: 'Mantenimiento del agua', descripcion: 'Control de pH, cloro, alcalinidad, tratamientos de choque, eliminación de algas y análisis periódicos del agua según normativa sanitaria.' },
    { nombre: 'Limpieza de la piscina', descripcion: 'Limpieza de fondo, paredes, skimmers, rebosaderos, rejillas y limpiafondos. Aspiración de sedimentos y retirada de hojas.' },
    { nombre: 'Puesta a punto y apertura', descripcion: 'Preparación de la piscina para la temporada de baño: llenado, tratamiento inicial, revisión de depuradora, bombas y sistema de filtración.' },
    { nombre: 'Socorrismo', descripcion: 'Servicio de socorristas titulados para la temporada de verano, cumpliendo la normativa autonómica de piscinas comunitarias.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento agua (temporada)', desde: 150, hasta: 400, unidad: '€/mes' },
    { concepto: 'Mantenimiento integral piscina', desde: 300, hasta: 800, unidad: '€/mes' },
    { concepto: 'Puesta a punto / apertura', desde: 300, hasta: 800, unidad: '€' },
    { concepto: 'Socorrista (temporada verano)', desde: 1200, hasta: 2500, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Cuánto cuesta el mantenimiento de una piscina comunitaria?', respuesta: 'El coste varía según el tamaño de la piscina y los servicios incluidos. El mantenimiento del agua oscila entre 150€ y 400€ al mes en temporada. El mantenimiento integral (agua + limpieza + equipos) puede alcanzar los 800€ mensuales.' },
    { pregunta: '¿Es obligatorio tener socorrista en la piscina comunitaria?', respuesta: 'Depende de la normativa de cada comunidad autónoma. En general, las piscinas comunitarias de uso colectivo con cierto aforo están obligadas a contar con socorrista titulado durante el horario de baño en temporada de verano.' },
    { pregunta: '¿Cuándo se debe hacer la puesta a punto de la piscina?', respuesta: 'Lo ideal es comenzar la puesta a punto entre 4 y 6 semanas antes de la apertura. En la mayoría de España, esto significa empezar en abril o mayo para abrir en junio.' },
    { pregunta: '¿Cada cuánto hay que analizar el agua de la piscina?', respuesta: 'La normativa exige análisis diarios de cloro y pH durante la temporada de baño. Además, se deben realizar análisis microbiológicos periódicos según la normativa autonómica.' },
  ],
};
