import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Sobre nosotros',
  description: 'Comunidad Integral: servicios de limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas para comunidades de vecinos en toda España.',
  path: '/sobre-nosotros/',
});

const COMPROMISOS = [
  { n: '01', titulo: 'Un solo interlocutor', desc: 'Un único punto de contacto para todos los servicios de tu comunidad, sin llamar a tres empresas distintas.' },
  { n: '02', titulo: 'Presupuesto claro', desc: 'Precios orientativos desde el primer contacto, sin letra pequeña ni sorpresas en la factura.' },
  { n: '03', titulo: 'Personal verificado', desc: 'Equipos con experiencia contrastada y cumplimiento del convenio colectivo correspondiente.' },
  { n: '04', titulo: 'Respuesta rápida', desc: 'Contestamos toda solicitud de presupuesto en menos de 24 horas.' },
];

const CIFRAS = [
  { valor: '14', label: 'ciudades' },
  { valor: '6', label: 'servicios' },
  { valor: '24h', label: 'tiempo de respuesta' },
];

export default function SobreNosotrosPage() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Sobre nosotros</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">
            Desde el portal hasta la azotea
          </h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Comunidad Integral nace para resolver un problema muy concreto: gestionar una comunidad de vecinos exige llamar a demasiadas empresas distintas. Nosotros lo simplificamos.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
          Empezamos dando servicio a comunidades de Madrid y, con el tiempo, hemos ampliado nuestra red de equipos y empresas colaboradoras a toda España. Limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas: los seis servicios que más solicita cualquier comunidad de propietarios, bajo un mismo contrato y un mismo interlocutor.
        </p>

        <div className="laton-rule my-14" />

        <div className="grid grid-cols-3 gap-6 sm:max-w-md">
          {CIFRAS.map((c) => (
            <div key={c.label}>
              <p className="font-[var(--font-display)] text-3xl font-medium text-[var(--color-oxido-500)]">{c.valor}</p>
              <p className="mt-1 text-base text-[var(--color-ink-soft)]">{c.label}</p>
            </div>
          ))}
        </div>

        <section className="mt-16">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Nuestros compromisos</h2>
          <div className="mt-6 border-t border-[var(--color-crema-200)]">
            {COMPROMISOS.map((c) => (
              <div key={c.n} className="flex gap-6 border-b border-[var(--color-crema-200)] py-5">
                <span className="font-mono text-base text-[var(--color-laton-600)]">{c.n}</span>
                <div>
                  <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">{c.titulo}</h3>
                  <p className="mt-1 text-base text-[var(--color-ink-soft)]">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 bg-[var(--color-oxido-500)] p-10 text-center">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-crema-50)]">¿Hablamos de tu comunidad?</h2>
          <a href="/presupuesto/" className="mt-6 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-8 py-3.5 text-base font-medium text-[var(--color-oxido-600)]">
            Solicitar presupuesto <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </>
  );
}
