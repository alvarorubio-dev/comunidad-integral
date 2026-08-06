import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { SITE } from '@/lib/constants';

export function Footer() {
  const ciudadesDestacadas = CIUDADES.slice(0, 6);

  return (
    <footer className="tile-pattern">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-[var(--font-display)] text-xl font-semibold italic text-[var(--color-crema-50)]">
              Comunidad Integral
            </p>
            <p className="mt-3 text-base leading-relaxed text-[var(--color-crema-200)]">
              Servicios para comunidades de vecinos, desde el portal hasta la azotea.
            </p>
            <p className="mt-4 font-mono text-base text-[var(--color-laton-400)]">
              {SITE.phone}
            </p>
          </div>

          {/* Servicios */}
          <div>
            <p className="font-mono text-base uppercase tracking-[0.1em] text-[var(--color-laton-400)]">
              Servicios
            </p>
            <ul className="mt-4 space-y-2.5">
              {SERVICIOS.map((s) => (
                <li key={s.slug}>
                  <a href={`/servicios/${s.slug}/`} className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">
                    {s.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Ciudades */}
          <div>
            <p className="font-mono text-base uppercase tracking-[0.1em] text-[var(--color-laton-400)]">
              Ciudades
            </p>
            <ul className="mt-4 space-y-2.5">
              {ciudadesDestacadas.map((c) => (
                <li key={c.slug}>
                  <a href={`/servicios/limpieza-comunidades/${c.slug}/`} className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">
                    {c.nombre}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="font-mono text-base uppercase tracking-[0.1em] text-[var(--color-laton-400)]">
              Empresa
            </p>
            <ul className="mt-4 space-y-2.5">
              <li><a href="/sobre-nosotros/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Sobre nosotros</a></li>
              <li><a href="/empresas/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Para empresas</a></li>
              <li><a href="/empleo/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Empleo</a></li>
              <li><a href="/blog/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Blog</a></li>
              <li><a href="/contacto-mantenimiento-comunidades/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Contacto</a></li>
            </ul>
          </div>
        </div>

        <div className="laton-rule mt-14" />

        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-base text-[var(--color-crema-200)]">
            © {new Date().getFullYear()} Comunidad Integral. {SITE.address}
          </p>
          <div className="flex gap-6">
            <a href="/privacidad/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Privacidad</a>
            <a href="/aviso-legal/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Aviso legal</a>
            <a href="/cookies/" className="text-base text-[var(--color-crema-200)] hover:text-[var(--color-crema-50)]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
