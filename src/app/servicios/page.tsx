import { Metadata } from 'next';
import { SERVICIOS } from '@/content/servicios';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Servicios para comunidades de vecinos',
  description: 'Todos nuestros servicios para comunidades: limpieza, mantenimiento, conserjería, reformas, jardinería y piscinas. Presupuesto gratis en toda España.',
  path: '/servicios/',
});

export default function ServiciosPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900">
        Servicios para comunidades de vecinos
      </h1>
      <p className="mt-3 max-w-3xl text-gray-600">
        Ofrecemos todos los servicios que tu comunidad de propietarios necesita. Compara presupuestos gratis de empresas verificadas en toda España.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICIOS.map((servicio) => (
          <a
            key={servicio.slug}
            href={`/servicios/${servicio.slug}/`}
            className="group flex flex-col rounded-xl border border-gray-200 p-6 transition-all hover:border-brand-green-600 hover:shadow-lg"
          >
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-brand-green-700">
              {servicio.nombre}
            </h2>
            <p className="mt-2 flex-1 text-sm text-gray-600">{servicio.descripcion}</p>
            <div className="mt-4 space-y-1">
              {servicio.tipos.slice(0, 3).map((tipo) => (
                <p key={tipo.nombre} className="text-xs text-gray-500">• {tipo.nombre}</p>
              ))}
            </div>
            <span className="mt-4 text-sm font-medium text-brand-green-700">
              Ver precios y detalles →
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
