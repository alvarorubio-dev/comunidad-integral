import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { CVForm } from '@/components/forms/CVForm';

export const metadata: Metadata = createMetadata({
  title: 'Empleo — Trabaja con nosotros',
  description: 'Buscamos personal de limpieza, mantenimiento, conserjería, jardinería, socorrismo y reformas para comunidades de vecinos en toda España.',
  path: '/empleo/',
});

const PUESTOS = [
  { n: '01', puesto: 'Personal de limpieza', desc: 'Portales, escaleras, garajes y zonas comunes.' },
  { n: '02', puesto: 'Mantenimiento y oficios varios', desc: 'Electricidad, fontanería y mantenimiento preventivo.' },
  { n: '03', puesto: 'Conserjería', desc: 'Control de acceso, paquetería y atención a vecinos.' },
  { n: '04', puesto: 'Jardinería', desc: 'Poda, riego y cuidado de zonas verdes comunitarias.' },
  { n: '05', puesto: 'Socorrismo y mantenimiento de piscinas', desc: 'Tratamiento de agua y vigilancia en temporada.' },
  { n: '06', puesto: 'Oficiales de reformas', desc: 'Fachadas, cubiertas e instalaciones de comunidades.' },
];

export default function EmpleoPage() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Empleo</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">Trabaja con nosotros</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Únete al equipo de Comunidad Integral</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Ampliamos equipo en toda España. Envíanos tu candidatura y te contactaremos cuando tengamos una vacante que encaje contigo.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Perfiles que buscamos</h2>
        <div className="mt-6 border-t border-[var(--color-crema-200)]">
          {PUESTOS.map((p) => (
            <div key={p.n} className="flex gap-6 border-b border-[var(--color-crema-200)] py-5">
              <span className="font-mono text-base text-[var(--color-laton-600)]">{p.n}</span>
              <div>
                <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">{p.puesto}</h3>
                <p className="mt-1 text-base text-[var(--color-ink-soft)]">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Envía tu candidatura</h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--color-ink-soft)]">
            Aunque no veas tu perfil arriba, envíanos tu CV: revisamos todas las candidaturas.
          </p>
          <div className="mt-6">
            <CVForm />
          </div>
        </div>
      </div>
    </>
  );
}
