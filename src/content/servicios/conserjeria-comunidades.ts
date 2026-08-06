import { Servicio } from '@/types/servicio';

export const conserjeriaComunidades: Servicio = {
  slug: 'conserjeria-comunidades',
  nombre: 'Conserjería para comunidades',
  nombreCorto: 'Conserjería',
  descripcion: 'Servicios de conserjería profesional para comunidades de vecinos, edificios residenciales y empresas.',
  icono: 'shield-check',
  keywordPrincipal: 'conserjería comunidades',
  keywordsSecundarias: ['conserjes comunidades', 'empresa conserjería', 'portero comunidad', 'conserje edificio', 'servicios conserjería'],
  metaTitle: 'Conserjería para comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Servicio de conserjería profesional para comunidades. Conserjes diurnos y nocturnos, control de acceso, recepción de paquetes. Presupuesto gratis.',
  intro: 'La conserjería para comunidades de propietarios es un servicio esencial que mejora la seguridad, el orden y la calidad de vida en edificios residenciales. Un conserje profesional se encarga del control de acceso, la recepción de paquetes, el mantenimiento básico y la atención a los vecinos.',
  tipos: [
    { nombre: 'Conserjería diurna', descripcion: 'Servicio de conserje en horario de mañana y/o tarde. Control de acceso, atención a vecinos, recepción de paquetes y gestión de incidencias.' },
    { nombre: 'Conserjería nocturna', descripcion: 'Vigilancia y control de acceso durante la noche. Seguridad del edificio y atención de emergencias fuera de horario habitual.' },
    { nombre: 'Conserje polivalente', descripcion: 'Conserje que combina funciones de portería con tareas de mantenimiento básico, limpieza de zonas comunes y jardinería ligera.' },
    { nombre: 'Control de accesos', descripcion: 'Servicio focalizado en la seguridad: gestión de entradas, control de visitantes, supervisión de cámaras y coordinación con empresas de seguridad.' },
  ],
  preciosOrientativos: [
    { concepto: 'Conserjería diurna (medio turno)', desde: 800, hasta: 1200, unidad: '€/mes' },
    { concepto: 'Conserjería diurna (turno completo)', desde: 1200, hasta: 1800, unidad: '€/mes' },
    { concepto: 'Conserjería nocturna', desde: 1400, hasta: 2200, unidad: '€/mes' },
    { concepto: 'Conserje polivalente', desde: 1000, hasta: 1600, unidad: '€/mes' },
  ],
  faqs: [
    { pregunta: '¿Qué funciones tiene un conserje de comunidad?', respuesta: 'Las funciones principales son: control de acceso al edificio, recepción de paquetería, atención a vecinos y proveedores, supervisión del mantenimiento, gestión de llaves, comunicación de incidencias y mantenimiento básico de zonas comunes.' },
    { pregunta: '¿Cuánto cuesta un conserje para una comunidad?', respuesta: 'El coste depende del horario y las funciones. Una conserjería diurna a tiempo completo cuesta entre 1.200€ y 1.800€ al mes. La conserjería nocturna oscila entre 1.400€ y 2.200€ mensuales.' },
    { pregunta: '¿Se puede contratar un conserje polivalente?', respuesta: 'Sí, un conserje polivalente combina funciones de portería con tareas de mantenimiento básico y limpieza. Es una opción muy popular en comunidades medianas que no necesitan servicios separados.' },
    { pregunta: '¿Qué pasa con el conserje si cambio de empresa?', respuesta: 'Según el convenio del sector, la nueva empresa está obligada a subrogar al conserje que estaba asignado a esa comunidad, manteniendo sus condiciones laborales.' },
  ],
};
