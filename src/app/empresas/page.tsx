import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = createMetadata({
  title: 'Para empresas — Recibe leads verificados',
  description: 'Únete a la red de empresas de Comunidad Integral y recibe solicitudes de presupuesto de comunidades de vecinos en tu zona.',
  path: '/empresas/',
});

const PASOS = [
  { n: '01', titulo: 'Regístrate', desc: 'Cuéntanos qué servicios ofreces y en qué ciudades trabajas.' },
  { n: '02', titulo: 'Recibe leads verificados', desc: 'Te avisamos cuando una comunidad de tu zona pide presupuesto.' },
  { n: '03', titulo: 'Cierra el servicio', desc: 'Contacta directamente con la comunidad y presenta tu propuesta.' },
];

export default function EmpresasPage() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Para empresas</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">Marketplace de servicios</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Recibe leads de comunidades en tu zona</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Conectamos comunidades de vecinos con empresas verificadas de limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas.
          </p>
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Quiero unirme como empresa')}`}
            target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)]">
            Quiero recibir leads <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Cómo funciona</h2>
        <div className="mt-6 border-t border-[var(--color-crema-200)]">
          {PASOS.map((p) => (
            <div key={p.n} className="flex gap-6 border-b border-[var(--color-crema-200)] py-5">
              <span className="font-mono text-base text-[var(--color-laton-600)]">{p.n}</span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">{p.titulo}</h3>
                <p className="mt-1 text-base text-[var(--color-ink-soft)]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-16 bg-[var(--color-oxido-500)] p-10 text-center">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-crema-50)]">¿Tu empresa quiere formar parte de la red?</h2>
          <p className="mt-3 text-base text-[var(--color-crema-100)]">Escríbenos y te damos acceso al registro de empresas.</p>
          <a href={`mailto:${SITE.email}?subject=${encodeURIComponent('Quiero unirme como empresa')}`}
            target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-8 py-3.5 text-base font-medium text-[var(--color-oxido-600)]">
            Contactar <span aria-hidden="true">→</span>
          </a>
        </section>
      </div>
    </>
  );
}
