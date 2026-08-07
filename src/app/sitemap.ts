import { MetadataRoute } from 'next';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { getBlogPosts } from '@/lib/blog';
const BASE_URL = 'https://comunidadintegral.com';
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/servicios/`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog/`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${BASE_URL}/presupuesto/`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/sobre-nosotros/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/contacto-mantenimiento-comunidades/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/empleo/`, lastModified: now, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${BASE_URL}/empresas/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
  ];
  const pillarPages: MetadataRoute.Sitemap = SERVICIOS.map((s) => ({ url: `${BASE_URL}/servicios/${s.slug}/`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 }));
  const cityPages: MetadataRoute.Sitemap = SERVICIOS.flatMap((s) => CIUDADES.map((c) => ({ url: `${BASE_URL}/servicios/${s.slug}/${c.slug}/`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 })));
  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}/`,
    lastModified: new Date(post.frontmatter.lastUpdated ?? post.frontmatter.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));
  return [...staticPages, ...pillarPages, ...cityPages, ...blogPages];
}
