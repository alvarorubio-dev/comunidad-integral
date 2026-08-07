import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { SITE } from '@/lib/constants';
import { ContactForm } from '@/components/forms/ContactForm';

export const metadata: Metadata = createMetadata({
  title: 'Contacto',
  description: 'Ponte en contacto con Comunidad Integral. Resolvemos tus dudas sobre mantenimiento, limpieza, conserjería y reformas de comunidades.',
  path: '/contacto-mantenimiento-comunidades/',
});

const DATOS = [
  { n: '01', label: 'Teléfono', valor: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, '')}` },
  { n: '02', label: 'Email', valor: SITE.email, href: `mailto:${SITE.email}` },
  { n: '03', label: 'Dirección', valor: SITE.address, href: undefined },
];

export default function ContactoPage() {
  return (
    <>
      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Contacto</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Hablemos de tu comunidad</h1>
          <p className="mt-4 max-w-xl text-lg text-[var(--color-crema-200)]">
            Escríbenos o llámanos. Respondemos consultas de vecinos, presidentes de comunidad y administradores de fincas.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8">
        <div className="grid gap-16 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Datos de contacto</h2>
            <div className="mt-6 border-t border-[var(--color-crema-200)]">
              {DATOS.map((d) => (
                <div key={d.n} className="flex gap-4 border-b border-[var(--color-crema-200)] py-5">
                  <span className="font-mono text-base text-[var(--color-laton-600)]">{d.n}</span>
                  <div>
                    <p className="font-mono text-base uppercase tracking-[0.1em] text-[var(--color-ink-soft)]">{d.label}</p>
                    {d.href ? (
                      <a href={d.href} {...(d.href.startsWith('mailto:') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="mt-1 block text-base text-[var(--color-ink)] hover:text-[var(--color-oxido-600)]">{d.valor}</a>
                    ) : (
                      <p className="mt-1 text-base text-[var(--color-ink)]">{d.valor}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Envíanos un mensaje</h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
