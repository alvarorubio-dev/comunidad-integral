import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = createMetadata({
  title: 'Política de privacidad',
  description: 'Política de privacidad de Comunidad Integral: responsable del tratamiento, finalidades, base jurídica, destinatarios y derechos de los usuarios.',
  path: '/privacidad/',
});

const TRATAMIENTOS = [
  {
    n: '01',
    titulo: 'Formulario de solicitud de presupuesto',
    donde: 'Formulario de presupuesto (/presupuesto/) y formularios de presupuesto embebidos en las páginas de servicio',
    finalidad: 'Gestionar la solicitud de presupuesto y trasladarla a las empresas colaboradoras verificadas que operan en la ciudad y ofrecen el servicio solicitado, para que puedan contactar con el interesado.',
    datos: 'Nombre y apellidos, email, teléfono (opcional), nombre de la comunidad o finca, dirección (opcional), ciudad, servicios solicitados, descripción de la necesidad (opcional) y nivel de urgencia.',
    destinatarios: 'Además de Supabase como encargado del tratamiento, los datos de esta solicitud se comunican a la empresa o empresas colaboradoras de la red de Comunidad Integral que correspondan a la ciudad y el servicio solicitados, con la única finalidad de que puedan elaborar y remitir su presupuesto.',
  },
  {
    n: '02',
    titulo: 'Formulario de contacto',
    donde: 'Página de contacto (/contacto-mantenimiento-comunidades/)',
    finalidad: 'Atender y responder las consultas generales planteadas por el usuario a través del formulario de contacto.',
    datos: 'Nombre y apellidos, email, teléfono (opcional) y el mensaje escrito por el usuario.',
    destinatarios: 'Supabase, como encargado del tratamiento. Estos datos no se comparten con empresas colaboradoras.',
  },
  {
    n: '03',
    titulo: 'Formulario de candidatura (bolsa de empleo)',
    donde: 'Página de empleo (/empleo/)',
    finalidad: 'Gestionar la bolsa de empleo del sector y valorar la candidatura del interesado para puestos de limpieza, mantenimiento o conserjería de comunidades.',
    datos: 'Nombre y apellidos, email, teléfono (opcional), puesto deseado, experiencia (opcional), zona de interés (opcional), disponibilidad (opcional), descripción adicional (opcional) y el archivo del currículum (CV) adjuntado.',
    destinatarios: 'Supabase, como encargado del tratamiento. Estos datos no se comparten con empresas colaboradoras salvo que el candidato sea informado y dé su consentimiento expreso para un proceso de selección concreto.',
  },
  {
    n: '04',
    titulo: 'Formulario de registro de empresas',
    donde: 'Página para empresas (/empresas/)',
    finalidad: 'Gestionar el alta y la verificación de la empresa en la red de empresas colaboradoras de Comunidad Integral, para poder recibir solicitudes de presupuesto (leads) de comunidades de vecinos.',
    datos: 'Nombre de la empresa, CIF (opcional), email, teléfono (opcional), servicios ofrecidos, ciudades donde presta servicio y descripción de la empresa (opcional).',
    destinatarios: 'Supabase, como encargado del tratamiento.',
  },
];

export default function PrivacidadPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Privacidad', url: `${SITE.url}/privacidad/` },
      ])) }} />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Privacidad</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Política de privacidad</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <p className="text-base text-[var(--color-ink-soft)]">Última actualización: 7 de agosto de 2026.</p>
        <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
          Esta política de privacidad se redacta en cumplimiento del artículo 13 del Reglamento (UE) 2016/679 (RGPD) y de la Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD).
        </p>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">1. Responsable del tratamiento</h2>
          <ul className="mt-4 space-y-2 text-base text-[var(--color-ink-soft)]">
            <li><strong className="text-[var(--color-ink)]">Titular:</strong> Ivan Stefchev Mikinski (autónomo)</li>
            <li><strong className="text-[var(--color-ink)]">NIF:</strong> 02413564J</li>
            <li><strong className="text-[var(--color-ink)]">Domicilio:</strong> {SITE.address}</li>
            <li><strong className="text-[var(--color-ink)]">Email:</strong> <a href={`mailto:${SITE.email}`} className="text-[var(--color-oxido-600)] hover:underline">{SITE.email}</a></li>
            <li><strong className="text-[var(--color-ink)]">Teléfono:</strong> <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-[var(--color-oxido-600)] hover:underline">{SITE.phone}</a></li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">2. Tratamientos de datos que realizamos</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} trata los datos personales facilitados a través de los siguientes formularios del sitio web. En todos los casos, la base jurídica del tratamiento es el <strong className="text-[var(--color-ink)]">consentimiento del interesado</strong> (artículo 6.1.a RGPD), prestado expresamente al marcar la casilla de aceptación de esta política de privacidad antes de enviar cada formulario.
          </p>

          <div className="mt-8 space-y-10">
            {TRATAMIENTOS.map((t) => (
              <div key={t.n} className="border-t border-[var(--color-crema-200)] pt-6">
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-base text-[var(--color-laton-600)]">{t.n}</span>
                  <h3 className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)]">{t.titulo}</h3>
                </div>
                <dl className="mt-4 space-y-3 pl-9 text-base text-[var(--color-ink-soft)]">
                  <div>
                    <dt className="font-medium text-[var(--color-ink)]">Dónde se recoge</dt>
                    <dd className="mt-1 leading-relaxed">{t.donde}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[var(--color-ink)]">Finalidad</dt>
                    <dd className="mt-1 leading-relaxed">{t.finalidad}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[var(--color-ink)]">Base jurídica</dt>
                    <dd className="mt-1 leading-relaxed">Consentimiento del interesado (art. 6.1.a RGPD).</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[var(--color-ink)]">Datos recogidos</dt>
                    <dd className="mt-1 leading-relaxed">{t.datos}</dd>
                  </div>
                  <div>
                    <dt className="font-medium text-[var(--color-ink)]">Destinatarios</dt>
                    <dd className="mt-1 leading-relaxed">{t.destinatarios}</dd>
                  </div>
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">3. Encargados del tratamiento y transferencias internacionales</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Los datos personales recogidos a través de los formularios de este sitio web se almacenan y procesan mediante <strong className="text-[var(--color-ink)]">Supabase</strong>, que actúa como encargado del tratamiento. Los datos se almacenan en servidores ubicados en la región de la Unión Europea (Irlanda), por lo que no se realiza ninguna transferencia internacional de datos fuera del Espacio Económico Europeo (EEE).
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">4. Plazo de conservación</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Los datos personales se conservarán mientras exista una relación comercial activa o mientras sean necesarios para la finalidad para la que fueron recabados, y en todo caso hasta que el interesado solicite su supresión o revoque su consentimiento.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">5. Derechos del interesado</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            El interesado tiene derecho a obtener confirmación sobre si en {SITE.name} estamos tratando sus datos personales, y en consecuencia tiene derecho a:
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-[var(--color-ink-soft)]">
            <li><strong className="text-[var(--color-ink)]">Acceso</strong> a sus datos personales.</li>
            <li><strong className="text-[var(--color-ink)]">Rectificación</strong> de los datos inexactos.</li>
            <li><strong className="text-[var(--color-ink)]">Supresión</strong> de sus datos.</li>
            <li><strong className="text-[var(--color-ink)]">Portabilidad</strong> de sus datos.</li>
            <li><strong className="text-[var(--color-ink)]">Limitación</strong> u <strong className="text-[var(--color-ink)]">oposición</strong> a su tratamiento.</li>
          </ul>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Puede ejercer estos derechos escribiendo a <a href={`mailto:${SITE.email}`} className="text-[var(--color-oxido-600)] hover:underline">{SITE.email}</a>, adjuntando copia de un documento que acredite su identidad. Asimismo, si considera que el tratamiento de sus datos personales vulnera la normativa, tiene derecho a presentar una reclamación ante la Agencia Española de Protección de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer" className="text-[var(--color-oxido-600)] hover:underline">agpd.es</a>).
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">6. Medidas de seguridad</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} aplica las medidas técnicas y organizativas necesarias para garantizar la seguridad de los datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado. En particular, el acceso a los datos almacenados en la base de datos está protegido mediante políticas de Row Level Security (RLS) de Supabase, que restringen qué usuarios y procesos pueden leer o modificar cada registro.
          </p>
        </section>
      </div>
    </>
  );
}
