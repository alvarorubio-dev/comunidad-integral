import { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/empresas/dashboard/'] }], sitemap: 'https://comunidadintegral.com/sitemap.xml' };
}
