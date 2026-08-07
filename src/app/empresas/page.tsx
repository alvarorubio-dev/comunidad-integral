import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { organizationSchema, faqSchema, breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';
import { EmpresaForm } from '@/components/forms/EmpresaForm';
import { FAQSection } from '@/components/servicios/FAQSection';

export const metadata: Metadata = createMetadata({
  title: 'Para empresas — Recibe leads verificados',
  description: 'Únete a la red de empresas de Comunidad Integral y recibe solicitudes de presupuesto de comunidades de vecinos en tu zona.',
  path: '/empresas/',
});

const PASOS = [
  { n: '01', titulo: 'Regístrate', desc: 'Cuéntanos qué servicios ofreces y en qué ciudades trabajas.' },
  { n: '02', titulo: 'Revisamos tu registro', desc: 'Comprobamos manualmente que tu empresa cumple los requisitos antes de activarla.' },
  { n: '03', titulo: 'Recibe leads de tu zona', desc: 'Cuando una comunidad de una de tus ciudades pide presupuesto para un servicio que ofreces, te lo enviamos.' },
  { n: '04', titulo: 'Tú decides', desc: 'Contacta con la comunidad y presenta tu propuesta si te interesa. No hay obligación de aceptar un lead.' },
];

const REQUISITOS = [
  'Alta fiscal en regla (autónomo o sociedad) para operar como empresa de servicios.',
  'Prestar servicio en al menos una de las 14 ciudades donde tenemos presencia.',
  'Ofrecer al menos uno de nuestros 6 servicios: limpieza, mantenimiento, conserjería, reformas, jardinería o mantenimiento de piscinas.',
];

const FAQS = [
  {
    pregunta: '¿Cuesta algo registrarse?',
    respuesta: 'El registro y el plan básico son gratuitos: solo pagas por cada lead que recibes. También existen planes Pro y Premium con una cuota mensual que dan acceso a más leads y mejor visibilidad. Te detallamos las condiciones exactas cuando revisamos tu registro.',
  },
  {
    pregunta: '¿Cómo se verifica mi empresa?',
    respuesta: 'Hoy la revisión es manual: comprobamos los datos que nos envías en el formulario (servicios, ciudades, alta fiscal) antes de activar tu cuenta. Te avisamos por email en cuanto tu empresa quede verificada.',
  },
  {
    pregunta: '¿En cuánto tiempo recibo el primer lead?',
    respuesta: 'Depende de la demanda en tu zona y servicios. Una vez verificada tu empresa, recibirás una notificación en cuanto llegue una solicitud de presupuesto que encaje con lo que ofreces.',
  },
  {
    pregunta: '¿Puedo darme de baja?',
    respuesta: 'Sí, puedes solicitar la baja de tu empresa de la red cuando quieras escribiéndonos a servicios@comunidadintegral.com.',
  },
];

export default function EmpresasPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema()) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema(FAQS)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Para empresas', url: `${SITE.url}/empresas/` },
      ])) }} />

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
          <a href="#registro"
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

        <section className="mt-14">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Requisitos para unirte</h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--color-ink-soft)]">
            Esto es una guía orientativa nuestra, no una lista de obligaciones legales. La usamos como criterio a la hora de revisar cada registro.
          </p>
          <div className="mt-6 border-t border-[var(--color-crema-200)]">
            {REQUISITOS.map((req, i) => (
              <div key={req} className="flex gap-6 border-b border-[var(--color-crema-200)] py-5">
                <span className="font-mono text-base text-[var(--color-laton-600)]">0{i + 1}</span>
                <p className="text-base text-[var(--color-ink-soft)]">{req}</p>
              </div>
            ))}
          </div>
        </section>

        <FAQSection faqs={FAQS} />

        <div id="registro" className="mt-16 scroll-mt-8">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Registra tu empresa</h2>
          <p className="mt-2 max-w-2xl text-base text-[var(--color-ink-soft)]">
            Cuéntanos qué servicios ofreces y en qué ciudades trabajas. Revisamos cada registro manualmente antes de activarlo.
          </p>
          <div className="mt-6">
            <EmpresaForm />
          </div>
        </div>
      </div>
    </>
  );
}
