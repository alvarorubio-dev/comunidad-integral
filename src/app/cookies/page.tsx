import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = createMetadata({
  title: 'Política de cookies',
  description: 'Política de cookies de Comunidad Integral: qué cookies utiliza el sitio web y su base legal.',
  path: '/cookies/',
});

export default function CookiesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Cookies', url: `${SITE.url}/cookies/` },
      ])) }} />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Cookies</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Política de cookies</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <p className="text-base text-[var(--color-ink-soft)]">Última actualización: 7 de agosto de 2026.</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
          En cumplimiento del artículo 22.2 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), esta página informa sobre el uso de cookies y tecnologías similares en {SITE.url}.
        </p>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">1. Este sitio no usa cookies de analítica ni de publicidad</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Actualmente {SITE.name} no instala cookies de analítica (como Google Analytics), de publicidad ni de seguimiento de ningún tipo. No se recopila información sobre la navegación del usuario con fines estadísticos o publicitarios.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">2. Tipografías autoalojadas</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Las fuentes tipográficas del sitio (Fraunces e Inter) están autoalojadas en nuestro propio dominio mediante el sistema de fuentes de Next.js, que las descarga en el momento de generar el sitio. Esto significa que el navegador no realiza ninguna petición a servidores de Google Fonts ni a ningún otro proveedor externo de tipografías, y por tanto no se comparte información con terceros por este motivo.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">3. Cookies técnicas de funcionamiento</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Hemos revisado el código del sitio web para comprobar si se establece alguna cookie técnica: no existe middleware ni código de servidor que fije cookies, no se utiliza gestión de sesión de usuario (el cliente de Supabase se emplea únicamente en el servidor para guardar los formularios, sin autenticación de usuarios ni cookies de sesión), y no hay instalado ningún paquete de analítica de Vercel (Web Analytics o Speed Insights). En su configuración estándar de producción, el hosting en Vercel no establece cookies de seguimiento en este sitio.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Vercel, como proveedor de hosting, puede establecer alguna cookie estrictamente técnica en escenarios concretos que hoy no están activos en este sitio (por ejemplo, si se activara la protección por contraseña en despliegues de vista previa, o su sistema de mitigación de ataques automatizados). Si en el futuro se activara alguno de estos mecanismos, la cookie correspondiente tendría carácter técnico o de seguridad, necesaria para el funcionamiento del sitio, y por tanto estaría exenta del deber de obtener consentimiento conforme al artículo 22.2 LSSI-CE.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">4. Cambios futuros</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Tenemos previsto incorporar en el futuro una herramienta de analítica web respetuosa con la privacidad (como Plausible o Umami), pendiente de implementación en el momento de publicar esta política. En caso de instalarse, esta página se actualizará para informar de las cookies o tecnologías equivalentes utilizadas y, si fuera necesario, se solicitará el consentimiento del usuario mediante un panel de configuración de cookies.
          </p>
        </section>
      </div>
    </>
  );
}
