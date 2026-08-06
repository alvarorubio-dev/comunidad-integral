import { MetadataRoute } from 'next';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
const BASE_URL = 'https://comunidadintegral.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/servicios/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/presupuesto/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
  ];
  const pillarPages: MetadataRoute.Sitemap = SERVICIOS.map((s) => ({ url: `${BASE_URL}/servicios/${s.slug}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 }));
  const cityPages: MetadataRoute.Sitemap = SERVICIOS.flatMap((s) => CIUDADES.map((c) => ({ url: `${BASE_URL}/servicios/${s.slug}/${c.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })));
  return [...staticPages, ...pillarPages, ...cityPages];
}
