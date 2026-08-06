import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SERVICIOS, getServicio } from '@/content/servicios';
import { CIUDADES, getCiudad } from '@/content/ciudades';
import { createMetadata } from '@/lib/seo/metadata';
import { localBusinessSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

interface Props {
  params: Promise<{ servicio: string; ciudad: string }>;
}

export async function generateStaticParams() {
  const params = [];
  for (const servicio of SERVICIOS) {
    for (const ciudad of CIUDADES) {
      params.push({ servicio: servicio.slug, ciudad: ciudad.slug });
    }
  }
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { servicio: sSlug, ciudad: cSlug } = await params;
  const servicio = getServicio(sSlug);
  const ciudad = getCiudad(cSlug);
  if (!servicio || !ciudad) return {};

  const zonasText = ciudad.zonas.slice(0, 4).join(', ');

  return createMetadata({
    title: `${servicio.nombre} en ${ciudad.nombre} | Presupuesto gratis`,
    description: `Empresas de ${servicio.nombre.toLowerCase()} en ${ciudad.nombre}. Compara presupuestos gratis. Servicio en ${zonasText} y toda ${ciudad.nombre}.`,
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
  const otrosServicios = SERVICIOS.filter((s) => s.slug !== sSlug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            localBusinessSchema(servicio.nombre, ciudad.nombre, ciudad.lat, ciudad.lng)
          ),
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
              { name: servicio.nombre, url: `${SITE.url}/servicios/${sSlug}/` },
              { name: ciudad.nombre, url: `${SITE.url}/servicios/${sSlug}/${cSlug}/` },
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
            <a href={`/servicios/${sSlug}/`} className="hover:text-white">{servicio.nombre}</a>
            <span className="mx-2">›</span>
            <span className="text-white">{ciudad.nombre}</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {servicio.nombre} en {ciudad.nombre}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-green-100">
            Encuentra las mejores empresas de {servicio.nombreCorto.toLowerCase()} para comunidades
            de vecinos en {ciudad.nombre}. Servicio en {ciudad.zonas.slice(0, 5).join(', ')} y toda {ciudad.nombre}.
          </p>
          <a
            href="/presupuesto/"
            className="mt-6 inline-block rounded-lg bg-brand-orange-500 px-6 py-3 font-semibold text-white hover:bg-brand-orange-600 transition-colors"
          >
            Pedir presupuesto gratis en {ciudad.nombre}
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Local content */}
        {contenidoLocal ? (
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">{contenidoLocal.intro}</p>
            {contenidoLocal.datoRelevante && (
              <div className="mt-6 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <p className="text-sm font-medium text-blue-900">Dato relevante</p>
                <p className="mt-1 text-sm text-blue-800">{contenidoLocal.datoRelevante}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl">
            <p className="text-lg text-gray-700 leading-relaxed">{servicio.intro}</p>
          </div>
        )}

        {/* Zones */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Zonas con servicio en {ciudad.nombre}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {ciudad.zonas.map((zona) => (
              <span
                key={zona}
                className="rounded-full bg-gray-100 px-4 py-2 text-sm text-gray-700"
              >
                {zona}
              </span>
            ))}
          </div>
        </section>

        {/* Prices */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Precios de {servicio.nombreCorto.toLowerCase()} en {ciudad.nombre}
          </h2>
          {contenidoLocal?.precioContexto && (
            <p className="mt-2 text-sm text-gray-600">{contenidoLocal.precioContexto}</p>
          )}
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

        {/* FAQs */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">Preguntas frecuentes</h2>
          <div className="mt-6 space-y-4">
            {servicio.faqs.map((faq) => (
              <details key={faq.pregunta} className="group rounded-lg border border-gray-200 p-4">
                <summary className="cursor-pointer font-medium text-gray-900 group-open:mb-2">
                  {faq.pregunta}
                </summary>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.respuesta}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Other cities */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            {servicio.nombreCorto} en otras ciudades
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otrasCiudades.map((c) => (
              <a
                key={c.slug}
                href={`/servicios/${sSlug}/${c.slug}/`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-green-600 hover:text-brand-green-700 transition-colors"
              >
                {c.nombre}
              </a>
            ))}
            <a
              href={`/servicios/${sSlug}/`}
              className="rounded-lg border border-brand-green-600 px-4 py-2 text-sm font-medium text-brand-green-700 hover:bg-brand-green-50 transition-colors"
            >
              Ver todas las ciudades →
            </a>
          </div>
        </section>

        {/* Other services in this city */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900">
            Otros servicios en {ciudad.nombre}
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {otrosServicios.map((s) => (
              <a
                key={s.slug}
                href={`/servicios/${s.slug}/${cSlug}/`}
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:border-brand-green-600 hover:text-brand-green-700 transition-colors"
              >
                {s.nombreCorto} en {ciudad.nombre}
              </a>
            ))}
          </div>
        </section>

        {/* Back to pillar */}
        <div className="mt-8">
          <a
            href={`/servicios/${sSlug}/`}
            className="text-sm font-medium text-brand-green-700 hover:underline"
          >
            ← Ver más sobre {servicio.nombre.toLowerCase()} en toda España
          </a>
        </div>

        {/* CTA */}
        <section className="mt-16 rounded-xl bg-brand-green-700 p-8 text-center text-white">
          <h2 className="text-2xl font-bold">
            ¿Necesitas {servicio.nombreCorto.toLowerCase()} en {ciudad.nombre}?
          </h2>
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
