export const SITE = {
  name: 'Comunidad Integral',
  url: 'https://comunidadintegral.com',
  description: 'Servicios integrales de mantenimiento, limpieza y conserjería para comunidades de vecinos en España.',
  phone: '+34 605 20 18 72',
  email: 'servicios@comunidadintegral.com',
  address: 'Avd. de Nísperos 25, 28350 Ciempozuelos, Madrid',
  googleVerification: 'M6h6EK7Z9tk7-x1cFqpvIWtl5Yt3RVHIDhpOeEaBRxE',
} as const;

export const NAV_LINKS = [
  { href: '/servicios/', label: 'Servicios' },
  { href: '/empleo/', label: 'Empleo' },
  { href: '/empresas/', label: 'Para empresas' },
  { href: '/blog/', label: 'Blog' },
  { href: '/contacto-mantenimiento-comunidades/', label: 'Contacto' },
] as const;
