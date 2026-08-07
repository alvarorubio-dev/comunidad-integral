import { Metadata } from 'next';
import { createMetadata } from '@/lib/seo/metadata';
import { breadcrumbSchema } from '@/lib/seo/schemas';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = createMetadata({
  title: 'Aviso legal',
  description: 'Aviso legal de Comunidad Integral: identificación del titular, condiciones de uso del sitio web y régimen de responsabilidad.',
  path: '/aviso-legal/',
});

export default function AvisoLegalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema([
        { name: 'Inicio', url: SITE.url }, { name: 'Aviso legal', url: `${SITE.url}/aviso-legal/` },
      ])) }} />

      <section className="tile-pattern">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <nav className="font-mono text-base text-[var(--color-laton-400)]">
            <a href="/" className="hover:text-white">Inicio</a> / <span className="text-white">Aviso legal</span>
          </nav>
          <h1 className="mt-6 font-[var(--font-display)] text-4xl font-medium text-[var(--color-crema-50)] sm:text-5xl">Aviso legal</h1>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8">
        <p className="text-base text-[var(--color-ink-soft)]">Última actualización: 7 de agosto de 2026.</p>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">1. Identificación del titular</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            En cumplimiento del deber de información recogido en el artículo 10 de la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de los siguientes datos: el titular de este sitio web ({SITE.url}) es {SITE.name}, cuyo titular es <strong>Ivan Stefchev Mikinski</strong>, con NIF <strong>02413564J</strong>, en calidad de empresario individual (autónomo).
          </p>
          <ul className="mt-4 space-y-2 text-base text-[var(--color-ink-soft)]">
            <li><strong className="text-[var(--color-ink)]">Domicilio:</strong> {SITE.address}</li>
            <li><strong className="text-[var(--color-ink)]">Email:</strong> <a href={`mailto:${SITE.email}`} className="text-[var(--color-oxido-600)] hover:underline">{SITE.email}</a></li>
            <li><strong className="text-[var(--color-ink)]">Teléfono:</strong> <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="text-[var(--color-oxido-600)] hover:underline">{SITE.phone}</a></li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">2. Objeto</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} es una plataforma web cuyo objeto es la intermediación entre comunidades de propietarios y empresas de servicios de mantenimiento, limpieza y conserjería en España. A través del sitio web, las comunidades de vecinos pueden solicitar presupuestos gratuitos que son remitidos a empresas colaboradoras verificadas, y estas empresas pueden registrarse para recibir dichas solicitudes. El sitio incluye además una bolsa de empleo del sector, a través de la cual las personas interesadas pueden enviar su candidatura para puestos relacionados con la limpieza, el mantenimiento y la conserjería de comunidades.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} actúa como intermediario y no presta directamente los servicios de mantenimiento, limpieza, conserjería, reformas, jardinería o piscinas solicitados a través del sitio web, salvo que se indique expresamente lo contrario en la comunicación con el usuario.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">3. Condiciones generales de uso</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            El acceso y uso de este sitio web atribuye la condición de usuario e implica la aceptación plena de las condiciones incluidas en este Aviso Legal. El usuario se compromete a hacer un uso adecuado y lícito del sitio web, de conformidad con la legislación aplicable, la buena fe, el orden público y el presente Aviso Legal, absteniéndose de utilizarlo de cualquier forma que pueda impedir, dañar o deteriorar el normal funcionamiento del sitio, los bienes o derechos de {SITE.name}, de sus proveedores, de otros usuarios o, en general, de cualquier tercero.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            La información y los precios orientativos publicados en el sitio web tienen carácter informativo y no constituyen una oferta vinculante. Los presupuestos definitivos son elaborados y comunicados directamente por las empresas colaboradoras a cada comunidad de propietarios.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">4. Propiedad intelectual e industrial</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Todos los contenidos del sitio web, incluyendo, sin carácter limitativo, textos, fotografías, gráficos, imágenes, iconos, tecnología, diseño y demás contenidos gráficos, así como su código fuente, son propiedad de {SITE.name} o, en su caso, dispone de licencia o autorización expresa por parte de los autores para su uso. Queda prohibida la reproducción, distribución, comunicación pública y transformación, total o parcial, de los contenidos de este sitio web sin la autorización expresa y por escrito del titular.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">5. Exclusión de responsabilidad</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} no garantiza la disponibilidad, continuidad ni infalibilidad del funcionamiento del sitio web, y en consecuencia excluye, en la medida en que lo permita el ordenamiento jurídico, cualquier responsabilidad por los daños y perjuicios que puedan derivarse de la falta de disponibilidad o continuidad del sitio web, así como de posibles errores en los contenidos, sin perjuicio de que se adoptarán las medidas razonables para evitarlos y, en su caso, subsanarlos.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            {SITE.name} no se hace responsable de la calidad, plazos ni ejecución de los servicios finalmente contratados entre una comunidad de propietarios y una empresa colaboradora a través del sitio web, dado su papel de intermediario. Cualquier controversia relativa a la prestación de dichos servicios deberá dirimirse entre las partes contratantes.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">6. Legislación aplicable y fuero</h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink-soft)]">
            Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia que pudiera derivarse del acceso o uso de este sitio web, el usuario y {SITE.name} se someten a los Juzgados y Tribunales que resulten competentes conforme a la normativa aplicable, y en el caso de consumidores, a los del domicilio del usuario.
          </p>
        </section>
      </div>
    </>
  );
}
