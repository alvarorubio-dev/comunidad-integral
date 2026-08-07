import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { getBlogPosts } from '@/lib/blog';

const POSTS_PER_PAGE = 9;

const CATEGORY_LABELS: Record<string, string> = {
  limpieza: 'Limpieza', mantenimiento: 'Mantenimiento', conserjeria: 'Conserjería',
  reformas: 'Reformas', jardineria: 'Jardinería', piscinas: 'Piscinas',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const metadata: Metadata = createMetadata({
  title: 'Blog — Guías para comunidades de vecinos',
  description: 'Artículos y guías sobre limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas para comunidades de vecinos en España.',
  path: '/blog/',
});

interface Props { searchParams: Promise<{ page?: string }>; }

export default async function BlogPage({ searchParams }: Props) {
  const { page: pageParam } = await searchParams;
  const posts = getBlogPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPage = Math.min(Math.max(1, Number(pageParam) || 1), totalPages);
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Blog</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">Guías y recursos</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Blog de Comunidad Integral</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Guías prácticas sobre limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas para comunidades de vecinos.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        {pagePosts.length === 0 ? (
          <p className="text-lg text-[var(--color-ink-soft)]">Todavía no hay artículos publicados. Vuelve pronto.</p>
        ) : (
          <div className="border-t border-[var(--color-crema-200)]">
            {pagePosts.map((post, i) => (
              <a
                key={post.slug}
                href={`/blog/${post.slug}/`}
                className="group flex items-baseline gap-6 border-b border-[var(--color-crema-200)] py-6 hover:bg-[var(--color-crema-100)]"
              >
                <span className="font-mono text-base text-[var(--color-laton-600)]">{String(start + i + 1).padStart(2, '0')}</span>
                <div className="flex-1">
                  <p className="font-mono text-sm uppercase tracking-[0.1em] text-[var(--color-oxido-500)]">
                    {CATEGORY_LABELS[post.frontmatter.category] ?? post.frontmatter.category} · {formatDate(post.frontmatter.date)}
                  </p>
                  <h2 className="mt-1 font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-oxido-600)]">
                    {post.frontmatter.title}
                  </h2>
                  <p className="mt-1 text-base text-[var(--color-ink-soft)]">{post.frontmatter.description}</p>
                </div>
              </a>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-between" aria-label="Paginación de artículos">
            {currentPage > 1 ? (
              <a href={currentPage - 1 === 1 ? '/blog/' : `/blog/?page=${currentPage - 1}`} className="text-base font-medium text-[var(--color-oxido-600)] hover:underline">
                ← Anteriores
              </a>
            ) : (
              <span className="text-base font-medium text-[var(--color-ink-soft)] opacity-40">← Anteriores</span>
            )}
            <span className="font-mono text-base text-[var(--color-ink-soft)]">Página {currentPage} de {totalPages}</span>
            {currentPage < totalPages ? (
              <a href={`/blog/?page=${currentPage + 1}`} className="text-base font-medium text-[var(--color-oxido-600)] hover:underline">
                Siguientes →
              </a>
            ) : (
              <span className="text-base font-medium text-[var(--color-ink-soft)] opacity-40">Siguientes →</span>
            )}
          </nav>
        )}
      </div>
    </>
  );
}
