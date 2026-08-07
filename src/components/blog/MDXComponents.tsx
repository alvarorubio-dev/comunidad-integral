import type { ReactNode } from 'react';
import type { MDXComponents } from 'mdx/types';
import { getServicio } from '@/content/servicios';
import { getCiudad } from '@/content/ciudades';
import { slugify } from '@/lib/utils/slugify';
import { UmbralITEDiagram } from './UmbralITEDiagram';

function textContent(node: ReactNode): string {
  if (typeof node === 'string') return node;
  if (typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textContent).join('');
  if (node && typeof node === 'object' && 'props' in node) {
    return textContent((node as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

function PreciosTable({ servicio }: { servicio: string }) {
  const s = getServicio(servicio);
  if (!s) return null;
  return (
    <div className="mt-6 overflow-hidden border border-[var(--color-crema-200)]">
      <table className="w-full text-base">
        <tbody className="divide-y divide-[var(--color-crema-200)]">
          {s.preciosOrientativos.map((p) => (
            <tr key={p.concepto}>
              <td className="px-4 py-3 text-[var(--color-ink-soft)]">{p.concepto}</td>
              <td className="px-4 py-3 text-right font-mono text-[var(--color-ink)]">{p.desde}–{p.hasta} {p.unidad}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CiudadesPrecios({ servicio, ciudades }: { servicio: string; ciudades: string[] }) {
  const s = getServicio(servicio);
  if (!s) return null;
  const filas = ciudades
    .map((slug) => getCiudad(slug))
    .filter((c): c is NonNullable<typeof c> => Boolean(c))
    .map((ciudad) => ({ ciudad, local: ciudad.contenidoLocal[servicio] }))
    .filter((row): row is { ciudad: NonNullable<ReturnType<typeof getCiudad>>; local: NonNullable<typeof row.local> } => Boolean(row.local?.precioContexto));

  if (filas.length === 0) return null;
  return (
    <div className="mt-6 border-t border-[var(--color-crema-200)]">
      {filas.map(({ ciudad, local }) => (
        <div key={ciudad.slug} className="border-b border-[var(--color-crema-200)] py-4">
          <a href={`/servicios/${servicio}/${ciudad.slug}/`} className="font-[var(--font-display)] text-lg font-medium text-[var(--color-ink)] hover:text-[var(--color-oxido-600)]">
            {ciudad.nombre}
          </a>
          <p className="mt-1 text-base text-[var(--color-ink-soft)]">{local.precioContexto}</p>
        </div>
      ))}
    </div>
  );
}

function CTAPresupuesto({ servicio }: { servicio?: string }) {
  const s = servicio ? getServicio(servicio) : undefined;
  return (
    <div className="mt-10 bg-[var(--color-oxido-500)] p-8 text-center">
      <p className="font-[var(--font-display)] text-xl font-medium text-[var(--color-crema-50)]">
        {s ? `¿Necesitas ${s.nombreCorto.toLowerCase()} para tu comunidad?` : '¿Necesitas ayuda para tu comunidad?'}
      </p>
      <a href="/presupuesto/" className="mt-5 inline-flex items-center gap-2 bg-[var(--color-crema-50)] px-7 py-3 text-base font-medium text-[var(--color-oxido-600)] hover:bg-[var(--color-crema-100)]">
        Solicitar presupuesto <span aria-hidden="true">→</span>
      </a>
    </div>
  );
}

function FAQSection({ servicio, limit }: { servicio: string; limit?: number }) {
  const s = getServicio(servicio);
  if (!s) return null;
  const faqs = limit ? s.faqs.slice(0, limit) : s.faqs;
  return (
    <div className="mt-6 space-y-3">
      {faqs.map((faq) => (
        <details key={faq.pregunta} className="group border border-[var(--color-crema-200)] p-4">
          <summary className="cursor-pointer text-base font-medium text-[var(--color-ink)] group-open:mb-2">{faq.pregunta}</summary>
          <p className="text-base text-[var(--color-ink-soft)]">{faq.respuesta}</p>
        </details>
      ))}
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  h2: ({ children }) => {
    const id = slugify(textContent(children));
    return (
      <h2 id={id} className="mt-14 scroll-mt-28 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(textContent(children));
    return (
      <h3 id={id} className="mt-10 scroll-mt-28 font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)]">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">{children}</p>,
  a: ({ href, children }) => (
    <a href={href} className="text-[var(--color-oxido-600)] underline decoration-[var(--color-laton-400)] underline-offset-2 hover:text-[var(--color-oxido-700)]">
      {children}
    </a>
  ),
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-5 text-lg text-[var(--color-ink-soft)]">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-5 text-lg text-[var(--color-ink-soft)]">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-4 border-[var(--color-laton-500)] bg-[var(--color-crema-100)] py-3 pl-5 pr-4 text-lg italic text-[var(--color-ink-soft)]">
      {children}
    </blockquote>
  ),
  strong: ({ children }) => <strong className="font-semibold text-[var(--color-ink)]">{children}</strong>,
  code: ({ children }) => <code className="bg-[var(--color-crema-100)] px-1.5 py-0.5 font-mono text-base text-[var(--color-oxido-600)]">{children}</code>,
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto border border-[var(--color-crema-200)] bg-[var(--color-crema-100)] p-4 font-mono text-sm text-[var(--color-ink)]">
      {children}
    </pre>
  ),
  hr: () => <hr className="laton-rule mt-14" />,
  table: ({ children }) => (
    <div className="mt-6 overflow-x-auto border border-[var(--color-crema-200)]">
      <table className="w-full text-base">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[var(--color-crema-100)]">{children}</thead>,
  tbody: ({ children }) => <tbody className="divide-y divide-[var(--color-crema-200)]">{children}</tbody>,
  tr: ({ children }) => <tr>{children}</tr>,
  th: ({ children }) => <th className="px-4 py-3 text-left font-mono text-sm uppercase tracking-wide text-[var(--color-laton-600)]">{children}</th>,
  td: ({ children }) => <td className="px-4 py-3 text-[var(--color-ink-soft)]">{children}</td>,
  PreciosTable,
  CiudadesPrecios,
  CTAPresupuesto,
  FAQSection,
  UmbralITEDiagram,
};
