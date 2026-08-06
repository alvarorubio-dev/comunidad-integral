import { Servicio } from '@/types/servicio';

export const reformasComunidades: Servicio = {
  slug: 'reformas-comunidades',
  nombre: 'Reformas de comunidades',
  nombreCorto: 'Reformas',
  descripcion: 'Reformas integrales y parciales para comunidades de vecinos: fachadas, portales, cubiertas, instalaciones y zonas comunes.',
  icono: 'hammer',
  keywordPrincipal: 'reformas comunidades',
  keywordsSecundarias: ['reformas comunidades vecinos', 'reformas fachadas', 'reformas portales', 'rehabilitación edificios', 'reformas zonas comunes'],
  metaTitle: 'Reformas de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Reformas integrales para comunidades. Fachadas, portales, cubiertas, zonas comunes. Presupuesto gratis sin compromiso en toda España.',
  intro: 'Las reformas en comunidades de vecinos son inversiones que mejoran la calidad de vida de los residentes, aumentan el valor de las propiedades y en muchos casos son obligatorias para cumplir la normativa vigente.',
  tipos: [
    { nombre: 'Reforma de fachadas', descripcion: 'Rehabilitación, pintura, aislamiento térmico (SATE), reparación de grietas, limpieza y tratamiento de humedades.' },
    { nombre: 'Reforma de portales', descripcion: 'Modernización del portal, cambio de suelos, pintura, iluminación, buzones, accesibilidad y eliminación de barreras arquitectónicas.' },
    { nombre: 'Reforma de cubiertas y tejados', descripcion: 'Impermeabilización, reparación de goteras, sustitución de tejas, aislamiento y mantenimiento de canalones.' },
    { nombre: 'Reformas de instalaciones', descripcion: 'Actualización de instalaciones eléctricas, fontanería, gas, ascensores, telecomunicaciones y sistemas de climatización.' },
  ],
  preciosOrientativos: [
    { concepto: 'Reforma de portal completo', desde: 5000, hasta: 25000, unidad: '€' },
    { concepto: 'Reforma de fachada (por m²)', desde: 40, hasta: 120, unidad: '€/m²' },
    { concepto: 'Impermeabilización cubierta', desde: 3000, hasta: 15000, unidad: '€' },
    { concepto: 'Instalación ascensor', desde: 30000, hasta: 80000, unidad: '€' },
  ],
  faqs: [
    { pregunta: '¿Qué mayoría se necesita para aprobar reformas en una comunidad?', respuesta: 'Depende del tipo de reforma. Las obras necesarias o de conservación se aprueban por mayoría simple. Las mejoras o innovaciones requieren tres quintos de los propietarios. Las que implican nuevos servicios, mayoría de tres quintos o unanimidad según el caso.' },
    { pregunta: '¿Existen subvenciones para reformas de comunidades?', respuesta: 'Sí, existen programas de ayudas para rehabilitación energética de edificios, eliminación de barreras arquitectónicas y mejora de accesibilidad. Las condiciones varían según la comunidad autónoma y el tipo de obra.' },
    { pregunta: '¿Es obligatorio reformar la fachada?', respuesta: 'Puede serlo si la fachada presenta riesgo para la seguridad, si el edificio no supera la ITE (Inspección Técnica de Edificios) o si el ayuntamiento ordena la rehabilitación por razones de conservación.' },
    { pregunta: '¿Cuánto tarda una reforma de fachada?', respuesta: 'Una reforma de fachada de un edificio de 4-6 plantas suele tardar entre 2 y 4 meses, incluyendo montaje de andamios, trabajos de albañilería, pintura y retirada de andamios.' },
  ],
};
