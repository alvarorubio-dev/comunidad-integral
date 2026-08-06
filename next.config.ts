import type { NextConfig } from 'next';
import createMDX from '@next/mdx';

const nextConfig: NextConfig = {
  trailingSlash: true,
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],

  images: {
    formats: ['image/avif', 'image/webp'],
  },

  async redirects() {
    return [
      {
        source: '/empresa-mantenimiento-comunidades-madrid/',
        destination: '/servicios/mantenimiento-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-limpieza-madrid/',
        destination: '/servicios/limpieza-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-conserjes-madrid/',
        destination: '/servicios/conserjeria-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-reformas-madrid/',
        destination: '/servicios/reformas-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/blog-facility-services/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog-facility-services/:slug/',
        destination: '/blog/:slug/',
        permanent: true,
      },
      {
        source: '/contacto/',
        destination: '/contacto-mantenimiento-comunidades/',
        permanent: true,
      },
      {
        source: '/beneficios-empresa-servicios-integrales-mantenimiento-comunidades-madrid/',
        destination: '/blog/beneficios-servicios-integrales/',
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {},
});

export default withMDX(nextConfig);
