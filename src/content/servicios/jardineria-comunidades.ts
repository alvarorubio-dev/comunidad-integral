import { Servicio } from '@/types/servicio';
export const jardineriaComunidades: Servicio = {
  slug: 'jardineria-comunidades', nombre: 'Jardinería para comunidades', nombreCorto: 'Jardinería',
  descripcion: 'Servicios de jardinería y mantenimiento de zonas verdes para comunidades y urbanizaciones.',
  icono: 'trees', keywordPrincipal: 'jardinería comunidades',
  keywordsSecundarias: ['mantenimiento jardines comunidad'],
  metaTitle: 'Jardinería para comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Mantenimiento de jardines y zonas verdes para comunidades. Poda, riego, césped, control de plagas.',
  intro: 'El mantenimiento de jardines y zonas verdes es fundamental en comunidades de vecinos que cuentan con áreas ajardinadas.',
  tipos: [
    { nombre: 'Mantenimiento de jardines', descripcion: 'Siega, poda, desbroce, abonado y tratamientos fitosanitarios.' },
    { nombre: 'Diseño y creación de jardines', descripcion: 'Proyectos de jardinería y riego automático.' },
    { nombre: 'Mantenimiento de riego', descripcion: 'Revisión y reparación de sistemas de riego automático.' },
    { nombre: 'Control de plagas', descripcion: 'Tratamientos preventivos contra plagas y enfermedades.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento básico (visita semanal)', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Instalación de riego automático', desde: 1500, hasta: 5000, unidad: '€' },
  ],
  faqs: [
    { pregunta: '¿Cuánto cuesta el mantenimiento del jardín de una comunidad?', respuesta: 'Un mantenimiento básico semanal oscila entre 200€ y 500€ al mes.' },
    { pregunta: '¿Con qué frecuencia se debe segar el césped?', respuesta: 'En primavera y verano, siega semanal. En invierno, quincenal.' },
    { pregunta: '¿Es necesario un contrato anual?', respuesta: 'Es lo recomendable para planificar los trabajos estacionales.' },
    { pregunta: '¿Quién paga la jardinería en una comunidad?', respuesta: 'Se paga con los fondos comunes, repartido según coeficiente de participación.' },
  ],
};
