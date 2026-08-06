import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICIOS, getServicio } from '@/content/servicios';
import { CIUDADES, getCiudad } from '@/content/ciudades';
import { createMetadata } from '@/lib/seo/metadata';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

interface Props { params: Promise<{ servicio: string; ciudad: string }>; }

export async function generateStaticParams() {
  const params = [];
  for (const servicio of SERVICIOS) for (const ciudad of CIUDADES) params.push({ servicio: servicio.slug, ciudad: ciudad.slug });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio: sSlug, ciudad: cSlug } = await params;
  const servicio = getServicio(sSlug);
  const ciudad = getCiudad(cSlug);
  if (!servicio || !ciudad) return {};
  return createMetadata({
    title: `${servicio.nombre} en ${ciudad.nombre} | Presupuesto gratis`,
    description: `Empresas de ${servicio.nombre.toLowerCase()} en ${ciudad.nombre}. Compara presupuestos gratis.`,
    path: `/servicios/${sSlug}/${cSlug}/`,
  });
}

export default async function CiudadPage({ params }: Props) {
  const { servicio: sSlug, ciudad: cSlug } = await params;
  const servicio = getServicio(sSlug);
  const ciudad = getCiudad(cSlug);
  if (!servicio || !ciudad) notFound();

  const contenidoLocal = ciudad.contenidoLocal[servicio.slug];
  const otrasCiudades = CIUDADES.filter((c) => c.slug !== cSlug).slice(0, 6);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema(servicio.nombre, ciudad.nombre, ciudad.lat, ciudad.lng)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(servicio.faqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Servicios', url: `${SITE.url}/servicios/` },
        { name: servicio.nombre, url: `${SITE.url}/servicios/${sSlug}/` }, { name: ciudad.nombre, url: `${SITE.url}/servicios/${sSlug}/${cSlug}/` },
      ])) }} />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <a href={`/servicios/${sSlug}/`} className="hover:text-white">{servicio.nombre}</a> / <span className="text-white">{ciudad.nombre}</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">{servicio.nombre} en {ciudad.nombre}</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">Servicio en {ciudad.zonas.slice(0, 4).join(', ')} y toda {ciudad.nombre}.</p>
          <a href="/presupuesto/" className="mt-8 inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)]">
            Pedir presupuesto en {ciudad.nombre} <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
          {contenidoLocal?.intro ?? servicio.intro}
        </p>
        {contenidoLocal?.datoRelevante && (
          <div className="mt-6 border-l-4 border-[var(--color-laton-500)] bg-[var(--color-crema-100)] p-4">
            <p className="font-mono text-base text-[var(--color-ink-soft)]">{contenidoLocal.datoRelevante}</p>
          </div>
        )}

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Precios en {ciudad.nombre}</h2>
          {contenidoLocal?.precioContexto && <p className="mt-2 text-base text-[var(--color-ink-soft)]">{contenidoLocal.precioContexto}</p>}
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
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-3">
            {servicio.faqs.map((faq) => (
              <details key={faq.pregunta} className="group border border-[var(--color-crema-200)] p-4">
                <summary className="cursor-pointer text-base font-medium text-[var(--color-ink)] group-open:mb-2">{faq.pregunta}</summary>
                <p className="text-base text-[var(--color-ink-soft)]">{faq.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">{servicio.nombreCorto} en otras ciudades</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otrasCiudades.map((c) => (
              <a key={c.slug} href={`/servicios/${sSlug}/${c.slug}/`} className="border border-[var(--color-crema-200)] px-4 py-2 text-base text-[var(--color-ink-soft)] hover:border-[var(--color-oxido-500)] hover:text-[var(--color-oxido-600)]">{c.nombre}</a>
            ))}
          </div>
        </section>

        <div className="mt-8">
          <a href={`/servicios/${sSlug}/`} className="text-base font-medium text-[var(--color-oxido-600)] hover:underline">← Ver {servicio.nombre.toLowerCase()} en toda España</a>
        </div>

        <section className="mt-16 bg-[var(--color-oxido-500)] p-10 text-center">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-crema-50)]">¿Necesitas {servicio.nombreCorto.toLowerCase()} en {ciudad.nombre}?</h2>
          <a href="/presupuesto/" className="mt-6 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-8 py-3.5 text-base font-medium text-[var(--color-oxido-600)]">Solicitar presupuesto <span aria-hidden="true">→</span></a>
        </section>
      </div>
    </>
  );
}
