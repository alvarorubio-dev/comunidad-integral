import { Servicio } from '@/types/servicio';

export const mantenimientoComunidades: Servicio = {
  slug: 'mantenimiento-comunidades',
  nombre: 'Mantenimiento de comunidades',
  nombreCorto: 'Mantenimiento',
  descripcion: 'Servicios integrales de mantenimiento preventivo y correctivo para comunidades de propietarios y edificios residenciales.',
  icono: 'wrench',
  keywordPrincipal: 'mantenimiento de comunidades',
  keywordsSecundarias: ['mantenimiento comunidades de vecinos', 'empresa mantenimiento comunidades', 'mantenimiento integral', 'mantenimiento edificios', 'facility services'],
  metaTitle: 'Mantenimiento de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Servicio integral de mantenimiento para comunidades. Preventivo, correctivo, electricidad, fontanería, cerrajería. Presupuesto gratis en toda España.',
  intro: 'El mantenimiento de comunidades de vecinos engloba todas las tareas necesarias para conservar en buen estado las instalaciones y elementos comunes de un edificio residencial. Un buen plan de mantenimiento preventivo evita averías costosas y garantiza la seguridad de los vecinos.',
  tipos: [
    { nombre: 'Mantenimiento preventivo', descripcion: 'Revisiones periódicas de instalaciones eléctricas, fontanería, ascensores, sistemas contra incendios y elementos estructurales.' },
    { nombre: 'Mantenimiento correctivo', descripcion: 'Reparación de averías, sustitución de elementos dañados, arreglos de urgencia y solución de incidencias.' },
    { nombre: 'Mantenimiento de instalaciones', descripcion: 'Electricidad, fontanería, climatización, sistemas de seguridad, antenas, porteros automáticos y videoporteros.' },
    { nombre: 'Mantenimiento integral (Facility Services)', descripcion: 'Servicio completo que incluye limpieza, conserjería, jardinería, mantenimiento técnico y gestión de proveedores en un único contrato.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento básico (visitas mensuales)', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Mantenimiento intermedio (visitas semanales)', desde: 500, hasta: 1200, unidad: '€/mes' },
    { concepto: 'Mantenimiento integral completo', desde: 1000, hasta: 3000, unidad: '€/mes' },
    { concepto: 'Servicio de urgencias 24h', desde: 50, hasta: 150, unidad: '€/intervención' },
  ],
  faqs: [
    { pregunta: '¿Qué incluye el mantenimiento de una comunidad de vecinos?', respuesta: 'Incluye revisiones periódicas de instalaciones, reparación de averías en zonas comunes, mantenimiento de ascensores, electricidad, fontanería, cerrajería y gestión de proveedores especializados.' },
    { pregunta: '¿Cuánto cuesta el mantenimiento de una comunidad?', respuesta: 'Depende del tamaño del edificio y los servicios incluidos. Un mantenimiento básico con visitas mensuales puede costar entre 200€ y 500€ al mes. El mantenimiento integral completo oscila entre 1.000€ y 3.000€ mensuales.' },
    { pregunta: '¿Qué es el mantenimiento integral o Facility Services?', respuesta: 'Es un servicio que agrupa en un único contrato y proveedor todos los servicios que necesita una comunidad: limpieza, conserjería, jardinería, mantenimiento técnico y gestión de incidencias. Simplifica la gestión y suele resultar más económico que contratar cada servicio por separado.' },
    { pregunta: '¿Es obligatorio el mantenimiento preventivo en comunidades?', respuesta: 'Algunas instalaciones tienen mantenimiento obligatorio por ley: ascensores, sistemas contra incendios, instalaciones eléctricas y de gas. La ITE (Inspección Técnica de Edificios) también es obligatoria en edificios antiguos según la normativa de cada comunidad autónoma.' },
  ],
};
