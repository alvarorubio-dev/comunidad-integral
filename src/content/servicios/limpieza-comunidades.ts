import { Servicio } from '@/types/servicio';

export const limpiezaComunidades: Servicio = {
  slug: 'limpieza-comunidades',
  nombre: 'Limpieza de comunidades',
  nombreCorto: 'Limpieza',
  descripcion: 'Servicios profesionales de limpieza para comunidades de vecinos, urbanizaciones y edificios residenciales en toda España.',
  icono: 'sparkles',
  keywordPrincipal: 'limpieza de comunidades',
  keywordsSecundarias: ['limpieza comunidades de vecinos', 'empresa limpieza comunidades', 'limpieza portales', 'limpieza garajes comunitarios', 'limpieza zonas comunes'],
  metaTitle: 'Limpieza de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Encuentra la mejor empresa de limpieza de comunidades. Compara presupuestos gratis de empresas verificadas en toda España. Portales, garajes, zonas comunes.',
  intro: 'La limpieza de comunidades de vecinos es uno de los servicios más demandados por las comunidades de propietarios en España. Un servicio profesional de limpieza garantiza que las zonas comunes del edificio se mantengan en perfectas condiciones de higiene y presentación, contribuyendo al bienestar de todos los vecinos y al mantenimiento del valor de las propiedades.',
  tipos: [
    { nombre: 'Limpieza de portales y escaleras', descripcion: 'Fregado de suelos, limpieza de barandillas, cristales de entrada, buzones, espejos y elementos decorativos del portal.' },
    { nombre: 'Limpieza de garajes', descripcion: 'Barrido mecánico, fregado industrial, eliminación de manchas de aceite y limpieza de plazas de aparcamiento.' },
    { nombre: 'Limpieza de zonas comunes', descripcion: 'Mantenimiento de salones sociales, salas de reuniones, ascensores, trasteros comunes y áreas recreativas.' },
    { nombre: 'Limpieza de fachadas y cristales', descripcion: 'Limpieza con agua a presión, tratamientos antigraffiti, limpieza de ventanas y cristaleras de zonas comunes.' },
  ],
  preciosOrientativos: [
    { concepto: 'Portal y escalera (1 vez/semana)', desde: 150, hasta: 300, unidad: '€/mes' },
    { concepto: 'Portal y escalera (3 veces/semana)', desde: 300, hasta: 600, unidad: '€/mes' },
    { concepto: 'Portal y escalera (diario)', desde: 500, hasta: 900, unidad: '€/mes' },
    { concepto: 'Garaje comunitario', desde: 80, hasta: 250, unidad: '€/mes' },
    { concepto: 'Zonas comunes y jardines', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Limpieza integral completa', desde: 500, hasta: 1500, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Cuánto cuesta la limpieza de una comunidad de vecinos?', respuesta: 'El precio depende del tamaño de la comunidad, la frecuencia del servicio y los espacios a limpiar. Para un portal con escalera, el coste suele oscilar entre 150€ y 600€ al mes. Solicita presupuesto gratuito para tu comunidad.' },
    { pregunta: '¿Con qué frecuencia se debe limpiar una comunidad?', respuesta: 'Lo habitual es entre 2 y 5 días por semana, dependiendo del tránsito de vecinos y las zonas comunes disponibles. Las comunidades grandes suelen necesitar limpieza diaria.' },
    { pregunta: '¿Qué incluye un servicio de limpieza de comunidades?', respuesta: 'Normalmente incluye fregado de suelos, limpieza de cristales de entrada, barandillas, ascensores, buzones y eliminación de polvo. Servicios adicionales como garajes o fachadas se presupuestan aparte.' },
    { pregunta: '¿Se necesita subrogación al cambiar de empresa de limpieza?', respuesta: 'Sí, según el convenio colectivo del sector, la nueva empresa debe subrogar a los trabajadores que estaban asignados a esa comunidad. Esto garantiza la continuidad del servicio y protege los derechos laborales.' },
  ],
};
