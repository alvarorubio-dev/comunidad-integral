import { Servicio } from '@/types/servicio';
export const mantenimientoComunidades: Servicio = {
  slug: 'mantenimiento-comunidades', nombre: 'Mantenimiento de comunidades', nombreCorto: 'Mantenimiento',
  descripcion: 'Servicios integrales de mantenimiento preventivo y correctivo para comunidades de propietarios.',
  icono: 'wrench', keywordPrincipal: 'mantenimiento de comunidades',
  keywordsSecundarias: ['mantenimiento comunidades de vecinos', 'facility services'],
  metaTitle: 'Mantenimiento de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Servicio integral de mantenimiento para comunidades. Preventivo, correctivo, electricidad, fontanería.',
  intro: 'El mantenimiento de comunidades de vecinos engloba todas las tareas necesarias para conservar en buen estado las instalaciones y elementos comunes de un edificio residencial.',
  tipos: [
    { nombre: 'Mantenimiento preventivo', descripcion: 'Revisiones periódicas de instalaciones eléctricas, fontanería y ascensores.' },
    { nombre: 'Mantenimiento correctivo', descripcion: 'Reparación de averías y solución de incidencias.' },
    { nombre: 'Mantenimiento de instalaciones', descripcion: 'Electricidad, fontanería, climatización y porteros automáticos.' },
    { nombre: 'Mantenimiento integral (Facility Services)', descripcion: 'Servicio completo en un único contrato.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento básico', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Mantenimiento integral completo', desde: 1000, hasta: 3000, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Qué incluye el mantenimiento de una comunidad de vecinos?', respuesta: 'Incluye revisiones periódicas, reparación de averías, mantenimiento de ascensores y gestión de proveedores.' },
    { pregunta: '¿Cuánto cuesta el mantenimiento de una comunidad?', respuesta: 'Un mantenimiento básico cuesta entre 200€ y 500€ al mes. El integral oscila entre 1.000€ y 3.000€.' },
    { pregunta: '¿Qué es el Facility Services?', respuesta: 'Es un servicio que agrupa limpieza, conserjería, jardinería y mantenimiento en un único contrato.' },
    { pregunta: '¿Es obligatorio el mantenimiento preventivo?', respuesta: 'Algunas instalaciones tienen mantenimiento obligatorio: ascensores, incendios, gas y la ITE.' },
  ],
};
