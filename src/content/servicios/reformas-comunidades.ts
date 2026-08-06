import { Servicio } from '@/types/servicio';
export const reformasComunidades: Servicio = {
  slug: 'reformas-comunidades', nombre: 'Reformas de comunidades', nombreCorto: 'Reformas',
  descripcion: 'Reformas integrales y parciales para comunidades de vecinos: fachadas, portales, cubiertas e instalaciones.',
  icono: 'hammer', keywordPrincipal: 'reformas comunidades',
  keywordsSecundarias: ['reformas comunidades vecinos', 'reformas fachadas'],
  metaTitle: 'Reformas de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Reformas integrales para comunidades. Fachadas, portales, cubiertas, zonas comunes.',
  intro: 'Las reformas en comunidades de vecinos son inversiones que mejoran la calidad de vida de los residentes y aumentan el valor de las propiedades.',
  tipos: [
    { nombre: 'Reforma de fachadas', descripcion: 'Rehabilitación, pintura, aislamiento térmico y tratamiento de humedades.' },
    { nombre: 'Reforma de portales', descripcion: 'Modernización, cambio de suelos, iluminación y accesibilidad.' },
    { nombre: 'Reforma de cubiertas', descripcion: 'Impermeabilización, reparación de goteras y aislamiento.' },
    { nombre: 'Reformas de instalaciones', descripcion: 'Actualización eléctrica, fontanería, gas y ascensores.' },
  ],
  preciosOrientativos: [
    { concepto: 'Reforma de portal completo', desde: 5000, hasta: 25000, unidad: '€' },
    { concepto: 'Reforma de fachada (por m²)', desde: 40, hasta: 120, unidad: '€/m²' },
  ],
  faqs: [
    { pregunta: '¿Qué mayoría se necesita para aprobar reformas?', respuesta: 'Las obras necesarias se aprueban por mayoría simple. Las mejoras requieren tres quintos.' },
    { pregunta: '¿Existen subvenciones para reformas?', respuesta: 'Sí, existen ayudas para rehabilitación energética y accesibilidad según la comunidad autónoma.' },
    { pregunta: '¿Es obligatorio reformar la fachada?', respuesta: 'Puede serlo si hay riesgo de seguridad o el edificio no supera la ITE.' },
    { pregunta: '¿Cuánto tarda una reforma de fachada?', respuesta: 'Un edificio de 4-6 plantas suele tardar entre 2 y 4 meses.' },
  ],
};
