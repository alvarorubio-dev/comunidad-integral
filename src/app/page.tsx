const SERVICIOS = [
  { n: '01', nombre: 'Limpieza de comunidades', desc: 'Portales, escaleras, garajes y zonas comunes.', slug: 'limpieza-comunidades' },
  { n: '02', nombre: 'Mantenimiento integral', desc: 'Preventivo, correctivo, electricidad y fontanería.', slug: 'mantenimiento-comunidades' },
  { n: '03', nombre: 'Conserjería', desc: 'Control de acceso, paquetería y atención a vecinos.', slug: 'conserjeria-comunidades' },
  { n: '04', nombre: 'Reformas', desc: 'Fachadas, portales, cubiertas e instalaciones.', slug: 'reformas-comunidades' },
  { n: '05', nombre: 'Jardinería', desc: 'Poda, riego y mantenimiento de zonas verdes.', slug: 'jardineria-comunidades' },
  { n: '06', nombre: 'Piscinas', desc: 'Tratamiento de agua, socorrismo y puesta a punto.', slug: 'mantenimiento-piscinas' },
];

const ACTAS = [
  { texto: 'Desde que contratamos el servicio integral, no hemos vuelto a tener que llamar a tres empresas distintas para cada avería. Todo funciona.', firma: 'P.J.R.', cargo: 'Presidente, CP Los Álamos — Pozuelo' },
  { texto: 'La limpieza del portal ha cambiado por completo. Puntuales, sin excusas, y el garaje por fin se puede pisar sin mancharse los zapatos.', firma: 'M.R.S.', cargo: 'Vecina, CP San Agustín de Guadalix' },
  { texto: 'El conserje conoce a todos los vecinos por nombre. Eso, hoy en día, no tiene precio.', firma: 'J.P.', cargo: 'Presidente, CP García Noblejas' },
];

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="tile-pattern relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 lg:px-12 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-5 lg:items-end">
            {/* Left: headline */}
            <div className="lg:col-span-3">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-laton-400)]">
                Comunidad Integral — desde el portal hasta la azotea
              </p>
              <h1 className="mt-6 font-[var(--font-display)] text-5xl font-medium leading-[1.05] text-[var(--color-crema-50)] sm:text-6xl lg:text-7xl">
                Tu comunidad,{' '}
                <span className="italic text-[var(--color-laton-400)]">bien llevada.</span>
              </h1>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-[var(--color-crema-200)]">
                Limpieza, mantenimiento, conserjería y reformas para comunidades
                de vecinos. Un solo interlocutor, presupuesto claro, sin sorpresas.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <a
                  href="/presupuesto/"
                  className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 font-medium text-[var(--color-crema-50)] transition-colors hover:bg-[var(--color-oxido-600)]"
                >
                  Pedir presupuesto
                  <span aria-hidden="true">→</span>
                </a>
                <a href="/servicios/" className="text-sm font-medium text-[var(--color-crema-100)] underline decoration-[var(--color-laton-500)] decoration-2 underline-offset-4 hover:text-white">
                  Ver los 6 servicios
                </a>
              </div>
            </div>

            {/* Right: floating directory card - the "tablon" */}
            <div className="lg:col-span-2">
              <div className="rotate-1 bg-[var(--color-crema-50)] p-6 shadow-2xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--color-ink-soft)]">
                  Tablón de servicios
                </p>
                <div className="laton-rule mt-3" />
                <ul className="mt-4 space-y-3">
                  {SERVICIOS.slice(0, 4).map((s) => (
                    <li key={s.n} className="flex items-baseline gap-3 text-sm">
                      <span className="font-mono text-xs text-[var(--color-oxido-500)]">{s.n}</span>
                      <span className="text-[var(--color-ink)]">{s.nombre}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 font-mono text-[10px] text-[var(--color-ink-soft)]">
                  + 2 servicios más abajo ↓
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICIOS - directory board style, not cards */}
      <section className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-oxido-500)]">
          Qué hacemos
        </p>
        <h2 className="mt-3 font-[var(--font-display)] text-3xl font-medium text-[var(--color-ink)] sm:text-4xl">
          Seis servicios, un único contrato
        </h2>

        <div className="mt-12 border-t border-[var(--color-crema-200)]">
          {SERVICIOS.map((s) => (
            <a
              key={s.slug}
              href={`/servicios/${s.slug}/`}
              className="group flex items-baseline gap-6 border-b border-[var(--color-crema-200)] py-6 transition-colors hover:bg-[var(--color-crema-100)]"
            >
              <span className="font-mono text-sm text-[var(--color-laton-600)]">{s.n}</span>
              <div className="flex-1">
                <h3 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-oxido-600)]">
                  {s.nombre}
                </h3>
                <p className="mt-1 text-sm text-[var(--color-ink-soft)]">{s.desc}</p>
              </div>
              <span className="font-mono text-sm text-[var(--color-ink-soft)] opacity-0 transition-opacity group-hover:opacity-100">
                ver →
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* LIBRO DE ACTAS - testimonials as meeting minutes */}
      <section className="libro-actas border-y border-[var(--color-crema-200)] py-24">
        <div className="mx-auto max-w-4xl px-6 sm:px-8">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--color-oxido-500)]">
            Del libro de actas
          </p>
          <h2 className="mt-3 font-[var(--font-display)] text-3xl font-medium text-[var(--color-ink)] sm:text-4xl">
            Lo que consta en acta
          </h2>

          <div className="mt-12 space-y-10">
            {ACTAS.map((a, i) => (
              <div key={i} className="flex gap-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-[var(--color-oxido-500)] font-[var(--font-display)] text-sm font-semibold text-[var(--color-oxido-600)]">
                  {a.firma.split('.')[0]}
                </div>
                <div>
                  <p className="font-[var(--font-display)] text-lg italic leading-relaxed text-[var(--color-ink)]">
                    &ldquo;{a.texto}&rdquo;
                  </p>
                  <p className="mt-2 font-mono text-xs text-[var(--color-ink-soft)]">
                    {a.firma} — {a.cargo}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-oxido-500)]">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:px-8">
          <h2 className="font-[var(--font-display)] text-3xl font-medium text-[var(--color-crema-50)] sm:text-4xl">
            ¿Le pedimos presupuesto a tu comunidad?
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
