import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Página no encontrada',
  description: 'La página que buscas no existe o se ha movido.',
  robots: { index: false, follow: true },
};

const ACCESOS = [
  { n: '01', titulo: 'Servicios', desc: 'Limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas.', href: '/servicios/' },
  { n: '02', titulo: 'Blog', desc: 'Guías y artículos sobre la gestión de comunidades de vecinos.', href: '/blog/' },
  { n: '03', titulo: 'Contacto', desc: 'Escríbenos o llámanos si tienes cualquier duda.', href: '/contacto-mantenimiento-comunidades/' },
];

export default function NotFound() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-32">
          <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">
            Error 404
          </p>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">
            Esta página <span className="italic text-[var(--color-laton-400)]">no existe.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-[var(--color-crema-200)]">
            El enlace puede estar roto o la página puede haberse movido. Prueba a volver al inicio o revisa nuestros servicios.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <a
              href="/"
              className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 font-medium text-[var(--color-crema-50)] transition-colors hover:bg-[var(--color-oxido-600)]"
            >
              Volver al inicio
              <span aria-hidden="true">→</span>
            </a>
            <a href="/servicios/" className="text-base font-medium text-[var(--color-crema-100)] underline decoration-[var(--color-laton-500)] decoration-2 underline-offset-4 hover:text-white">
              Ver los 6 servicios
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">
          ¿Buscabas algo en concreto?
        </p>
        <h2 className="mt-3 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">
          Accesos rápidos
        </h2>
        <div className="mt-8 border-t border-[var(--color-crema-200)]">
          {ACCESOS.map((a) => (
            <a
              key={a.href}
              href={a.href}
              className="group flex items-baseline gap-6 border-b border-[var(--color-crema-200)] py-6 transition-colors hover:bg-[var(--color-crema-100)]"
            >
              <span className="font-mono text-base text-[var(--color-laton-600)]">{a.n}</span>
              <div className="flex-1">
                <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-oxido-600)]">
                  {a.titulo}
                </h3>
                <p className="mt-1 text-base text-[var(--color-ink-soft)]">{a.desc}</p>
              </div>
              <span className="font-mono text-base text-[var(--color-ink-soft)] opacity-0 transition-opacity group-hover:opacity-100">
                ver →
              </span>
            </a>
          ))}
        </div>
      </section>

      <section className="bg-[var(--color-oxido-500)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
          <h2 className="font-[var(--font-display)] text-3xl font-medium text-[var(--color-crema-50)] sm:text-4xl">
            Ya que estás aquí, pide presupuesto
          </h2>
          <p className="mt-3 text-[var(--color-crema-100)]">
            Gratis, sin compromiso. Respuesta en menos de 24 horas.
          </p>
          <a
            href="/presupuesto/"
            className="mt-8 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-8 py-3.5 font-medium text-[var(--color-oxido-600)] transition-transform hover:-translate-y-0.5"
          >
            Solicitar presupuesto
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </>
  );
}
