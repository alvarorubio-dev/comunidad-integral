import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICIOS, getServicio } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { createMetadata } from '@/lib/seo/metadata';
import { serviceSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

interface Props {
  params: Promise<{ servicio: string }>;
}

export async function generateStaticParams() {
  return SERVICIOS.map((s) => ({ servicio: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio: slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) return {};

  return createMetadata({
    title: servicio.metaTitle,
    description: servicio.metaDescription,
    path: `/servicios/${slug}/`,
  });
}

export default async function PillarPage({ params }: Props) {
  const { servicio: slug } = await params;
  const servicio = getServicio(slug);
  if (!servicio) notFound();

  const otrosServicios = SERVICIOS.filter((s) => s.slug !== slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema(servicio.nombre, servicio.descripcion)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema(servicio.faqs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { name: 'Inicio', url: SITE.url },
              { name: 'Servicios', url: `${SITE.url}/servicios/` },
              { name: servicio.nombre, url: `${SITE.url}/servicios/${slug}/` },
            ])
          ),
        }}
      />

      {/* Hero */}
      <section className="bg-brand-green-700 text-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-green-200">
            <a href="/" className="hover:text-white">Inicio</a>
            <span className="mx-2">›</span>
            <a href="/servicios/" className="hover:text-white">Servicios</a>
            <span className="mx-2">›</span>
            <span className="text-white">{servicio.nombre}</span>
          </nav>
          <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
            Toda España
          </span>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {servicio.nombre} de vecinos en España
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-green-100">
            {servicio.descripcion}
          </p>
          <a
            href="/presupuesto/"
            className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white hover:bg-brand-orange-600 transition-colors"
          >
            Pedir presupuesto gratis
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Intro */}
        <div className="max-w-3xl">
          <p className="text-lg text-gray-700 leading-relaxed">{servicio.intro}</p>
        </div>

        {/* Service types */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Tipos de {servicio.nombreCorto.toLowerCase()}
          </h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {servicio.tipos.map((tipo) => (
              <div key={tipo.nombre} className="rounded-lg border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">{tipo.nombre}</h3>
                <p className="mt-2 text-sm text-gray-600">{tipo.descripcion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Prices */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Precios orientativos
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Los precios varían según la ciudad, el tamaño de la comunidad y la frecuencia del servicio.
          </p>
          <div className="mt-6 overflow-hidden rounded-lg border border-gray-200">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500">Concepto</th>
                  <th className="px-4 py-3 text-right font-medium text-gray-500">Precio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {servicio.preciosOrientativos.map((p) => (
                  <tr key={p.concepto}>
                    <td className="px-4 py-3 text-gray-700">{p.concepto}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">
                      {p.desde}–{p.hasta} {p.unidad}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Cities grid */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            {servicio.nombre} por ciudad
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Encuentra empresas verificadas en tu ciudad
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CIUDADES.map((ciudad) => (
              <a
                key={ciudad.slug}
                href={`/servicios/${slug}/${ciudad.slug}/`}
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-brand-green-600 hover:text-brand-green-700 transition-colors"
              >
                {servicio.nombreCorto} en {ciudad.nombre}
              </a>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-4">
            {servicio.faqs.map((faq) => (
              <details
                key={faq.pregunta}
                className="group rounded-lg border border-gray-200 p-4"
              >
                <summary className="cursor-pointer font-medium text-gray-900 group-open:mb-2">
                  {faq.pregunta}
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other services */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Otros servicios</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otrosServicios.map((s) => (
              <a
                key={s.slug}
                href={`/servicios/${s.slug}/`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-green-600 hover:text-brand-green-700 transition-colors"
              >
                {s.nombre}
              </a>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="mt-16 rounded-xl bg-brand-green-700 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">¿Necesitas {servicio.nombreCorto.toLowerCase()} para tu comunidad?</h2>
          <p className="mt-2 text-green-100">Presupuesto gratuito y sin compromiso</p>
          <a
            href="/presupuesto/"
            className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-8 py-3 font-semibold text-white hover:bg-brand-orange-600 transition-colors"
          >
            Solicitar presupuesto gratis
          </a>
        </section>
      </div>
    </>
  );
}
