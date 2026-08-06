import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { PresupuestoForm } from '@/components/forms/PresupuestoForm';

export const metadata: Metadata = createMetadata({
  title: 'Solicita presupuesto gratis',
  description: 'Pide presupuesto gratuito para tu comunidad de vecinos. Limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas en toda España.',
  path: '/presupuesto/',
});

export default function PresupuestoPage() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Presupuesto</span>
          </nav>
          <p className="mt-6 font-mono text-base uppercase tracking-[0.15em] text-[var(--color-laton-400)]">Gratis y sin compromiso</p>
          <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Pide presupuesto para tu comunidad</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Cuéntanos qué necesita tu comunidad. Respondemos en menos de 24 horas con un presupuesto claro, sin sorpresas.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-2xl px-6 py-16 sm:px-8">
        <PresupuestoForm />
      </div>
    </>
  );
}
