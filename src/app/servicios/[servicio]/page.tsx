import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICIOS, getServicio } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { createMetadata } from '@/lib/seo/metadata';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';
import { FAQSection } from '@/components/servicios/FAQSection';

interface Props { params: Promise<{ servicio: string }>; }

export async function generateStaticParams() {
  return SERVICIOS.map((s) => ({ servicio: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio: slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};
  return createMetadata({ title: servicio.metaTitle, description: servicio.metaDescription, path: `/servicios/${slug}/` });
}

export default async function PillarPage({ params }: Props) {
  const { servicio: slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();
  const otrosServicios = SERVICIOS.filter((s) => s.slug !== slug);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(servicio.nombre, servicio.descripcion)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(servicio.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Servicios', url: `${SITE.url}/servicios/` }, { name: servicio.nombre, url: `${SITE.url}/servicios/${slug}/` },
      ])) }} />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <a href="/servicios/" className="hover:text-white">Servicios</a> / <span className="text-white">{servicio.nombre}</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">Toda España</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">{servicio.nombre} de vecinos</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">{servicio.descripcion}</p>
          <a href="/presupuesto/" className="mt-8 inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)]">
            Pedir presupuesto <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">{servicio.intro}</p>

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Tipos de {servicio.nombreCorto.toLowerCase()}</h2>
          <div className="mt-6 border-t border-[var(--color-crema-200)]">
            {servicio.tipos.map((tipo, i) => (
              <div key={tipo.nombre} className="flex gap-6 border-b border-[var(--color-crema-200)] py-5">
                <span className="font-mono text-base text-[var(--color-laton-600)]">0{i + 1}</span>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">{tipo.nombre}</h3>
                  <p className="mt-1 text-base text-[var(--color-ink-soft)]">{tipo.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Precios orientativos</h2>
          <div className="mt-6 overflow-hidden border border-[var(--color-crema-200)]">
            <table className="w-full text-base">
              <tbody className="divide-y divide-[var(--color-crema-200)]">
                {servicio.preciosOrientativos.map((p) => (
                  <tr key={p.concepto}>
                    <td className="px-4 py-3 text-[var(--color-ink-soft)]">{p.concepto}</td>
                    <td className="px-4 py-3 text-right font-mono text-[var(--color-ink)]">{p.desde}–{p.hasta} {p.unidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">{servicio.nombre} por ciudad</h2>
          <div className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {CIUDADES.map((ciudad) => (
              <a key={ciudad.slug} href={`/servicios/${slug}/${ciudad.slug}/`} className="border border-[var(--color-crema-200)] px-4 py-3 text-base text-[var(--color-ink-soft)] hover:border-[var(--color-oxido-500)] hover:text-[var(--color-oxido-600)]">
                {servicio.nombreCorto} en {ciudad.nombre}
              </a>
            ))}
          </div>
        </section>

        <FAQSection faqs={servicio.faqs} />

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Otros servicios</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otrosServicios.map((s) => (
              <a key={s.slug} href={`/servicios/${s.slug}/`} className="border border-[var(--color-crema-200)] px-4 py-2 text-base text-[var(--color-ink-soft)] hover:border-[var(--color-oxido-500)] hover:text-[var(--color-oxido-600)]">{s.nombre}</a>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-[var(--color-oxido-500)] p-10 text-center">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-crema-50)]">¿Necesitas {servicio.nombreCorto.toLowerCase()} para tu comunidad?</h2>
          <a href="/presupuesto/" className="mt-6 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-8 py-3.5 text-base font-medium text-[var(--color-oxido-600)]">Solicitar presupuesto <span aria-hidden="true">→</span></a>
        </section>
      </div>
    </>
  );
}
