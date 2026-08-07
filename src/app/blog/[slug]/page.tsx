import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { getBlogPost, getBlogSlugs } from '@/lib/blog';
import { createMetadata } from '@/lib/seo/metadata';
import { articleSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { mdxComponents } from '@/components/blog/MDXComponents';
import { SITE } from '@/lib/constants';

interface Props { params: Promise<{ slug: string }>; }

const CATEGORY_LABELS: Record<string, string> = {
  limpieza: 'Limpieza', mantenimiento: 'Mantenimiento', conserjeria: 'Conserjería',
  reformas: 'Reformas', jardineria: 'Jardinería', piscinas: 'Piscinas',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export async function generateStaticParams() {
  return getBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return createMetadata({ title: post.frontmatter.title, description: post.frontmatter.description, path: `/blog/${slug}/` });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE.url}/blog/${slug}/`;
  const showToc = post.headings.length >= 3;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleSchema({
              title: post.frontmatter.title,
              description: post.frontmatter.description,
              datePublished: post.frontmatter.date,
              dateModified: post.frontmatter.lastUpdated,
              url,
            })
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Inicio', url: SITE.url },
              { name: 'Blog', url: `${SITE.url}/blog/` },
              { name: post.frontmatter.title, url },
            ])
          ),
        }}
      />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <a href="/blog/" className="hover:text-white">Blog</a> / <span className="text-white">{post.frontmatter.title}</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">
            {CATEGORY_LABELS[post.frontmatter.category] ?? post.frontmatter.category}
          </p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">{post.frontmatter.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">{post.frontmatter.description}</p>
          <p className="mt-6 font-mono text-sm text-[var(--color-crema-200)]">
            Publicado el {formatDate(post.frontmatter.date)}
            {post.frontmatter.lastUpdated && ` · Actualizado el ${formatDate(post.frontmatter.lastUpdated)}`}
            {' · '}{post.readingTime} min de lectura
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        {showToc && (
          <nav aria-label="Tabla de contenidos" className="mb-12 border border-[var(--color-crema-200)] p-6">
            <p className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-laton-600)]">En este artículo</p>
            <ul className="mt-3 space-y-2">
              {post.headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className="text-base text-[var(--color-ink-soft)] hover:text-[var(--color-oxido-600)]">
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <article>
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
          />
        </article>

        <div className="mt-16 border-t border-[var(--color-crema-200)] pt-8">
          <a href="/blog/" className="text-base font-medium text-[var(--color-oxido-600)] hover:underline">← Volver al blog</a>
        </div>
      </div>
    </>
  );
}
