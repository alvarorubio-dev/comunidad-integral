import { Servicio } from '@/types/servicio';

export const jardineriaComunidades: Servicio = {
  slug: 'jardineria-comunidades',
  nombre: 'Jardinería para comunidades',
  nombreCorto: 'Jardinería',
  descripcion: 'Servicios de jardinería y mantenimiento de zonas verdes para comunidades de vecinos y urbanizaciones.',
  icono: 'trees',
  keywordPrincipal: 'jardinería comunidades',
  keywordsSecundarias: ['mantenimiento jardines comunidad', 'jardinería urbanizaciones', 'empresa jardinería comunidades', 'mantenimiento zonas verdes'],
  metaTitle: 'Jardinería para comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Mantenimiento de jardines y zonas verdes para comunidades. Poda, riego, césped, control de plagas. Presupuesto gratis en toda España.',
  intro: 'El mantenimiento de jardines y zonas verdes es fundamental en comunidades de vecinos que cuentan con áreas ajardinadas. Un servicio profesional de jardinería garantiza el buen aspecto de la urbanización durante todo el año.',
  tipos: [
    { nombre: 'Mantenimiento de jardines', descripcion: 'Siega de césped, poda de setos y arbustos, desbroce, abonado, tratamientos fitosanitarios y limpieza de zonas ajardinadas.' },
    { nombre: 'Diseño y creación de jardines', descripcion: 'Proyectos de jardinería, plantación de nuevas especies, instalación de riego automático, creación de rocallas y decoración vegetal.' },
    { nombre: 'Mantenimiento de riego', descripcion: 'Revisión y reparación de sistemas de riego automático, programación de riegos, detección de fugas y optimización del consumo de agua.' },
    { nombre: 'Control de plagas y enfermedades', descripcion: 'Tratamientos preventivos y curativos contra plagas, hongos y enfermedades de plantas, césped y árboles.' },
  ],
  preciosOrientativos: [
    { concepto: 'Mantenimiento básico (visita semanal)', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Mantenimiento completo (2 visitas/semana)', desde: 400, hasta: 1000, unidad: '€/mes' },
    { concepto: 'Poda de árboles (por unidad)', desde: 50, hasta: 300, unidad: '€/árbol' },
    { concepto: 'Instalación de riego automático', desde: 1500, hasta: 5000, unidad: '€' },
  ],
  faqs: [
    { pregunta: '¿Cuánto cuesta el mantenimiento del jardín de una comunidad?', respuesta: 'El precio depende de la superficie ajardinada y la frecuencia del servicio. Un mantenimiento básico con una visita semanal oscila entre 200€ y 500€ al mes. Las urbanizaciones grandes con amplias zonas verdes pueden superar los 1.000€ mensuales.' },
    { pregunta: '¿Con qué frecuencia se debe segar el césped?', respuesta: 'En primavera y verano, lo ideal es una siega semanal. En otoño e invierno se puede reducir a quincenal. La frecuencia exacta depende de la variedad de césped y las condiciones climáticas de la zona.' },
    { pregunta: '¿Es necesario un contrato anual de jardinería?', respuesta: 'Es lo más recomendable. Un contrato anual permite planificar los trabajos estacionales (poda invernal, abonado primaveral, riego veraniego) y suele resultar más económico que contratar servicios puntuales.' },
    { pregunta: '¿Quién paga la jardinería en una comunidad?', respuesta: 'El mantenimiento de zonas ajardinadas comunes se paga con los fondos de la comunidad, repartiéndose entre los propietarios según su coeficiente de participación.' },
  ],
};
