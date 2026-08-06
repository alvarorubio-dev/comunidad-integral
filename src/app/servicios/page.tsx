import { Metadata } from 'next';
import { SERVICIOS } from '@/content/servicios';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Servicios para comunidades de vecinos',
  description: 'Todos nuestros servicios para comunidades: limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas.',
  path: '/servicios/',
});

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
      <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Qué hacemos</p>
      <h1 className="mt-3 font-[var(--font-display)] text-4xl font-medium text-[var(--color-ink)]">Servicios para comunidades de vecinos</h1>
      <p className="mt-4 max-w-2xl text-lg text-[var(--color-ink-soft)]">
        Ofrecemos todos los servicios que tu comunidad de propietarios necesita. Compara presupuestos gratis en toda España.
      </p>
      <div className="mt-12 border-t border-[var(--color-crema-200)]">
        {SERVICIOS.map((servicio, i) => (
          <a key={servicio.slug} href={`/servicios/${servicio.slug}/`} className="group flex items-baseline gap-6 border-b border-[var(--color-crema-200)] py-6 hover:bg-[var(--color-crema-100)]">
            <span className="font-mono text-base text-[var(--color-laton-600)]">0{i + 1}</span>
            <div className="flex-1">
              <h2 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)] group-hover:text-[var(--color-oxido-600)]">{servicio.nombre}</h2>
              <p className="mt-1 text-base text-[var(--color-ink-soft)]">{servicio.descripcion}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
