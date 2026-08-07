interface FAQ {
  pregunta: string;
  respuesta: string;
}

interface FAQSectionProps {
  faqs: FAQ[];
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="mt-14">
      <h2 className="font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Preguntas frecuentes</h2>
      <div className="mt-6 space-y-3">
        {faqs.map((faq) => (
          <details key={faq.pregunta} className="group border border-[var(--color-crema-200)] p-4">
            <summary className="cursor-pointer text-base font-medium text-[var(--color-ink)] group-open:mb-2">{faq.pregunta}</summary>
            <p className="text-base text-[var(--color-ink-soft)]">{faq.respuesta}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
