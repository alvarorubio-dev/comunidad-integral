'use client';

import { useState } from 'react';
import { LeadPayload } from '@/types/lead';
import { FormField, fieldInputClass } from './FormField';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload: LeadPayload = {
      nombre: String(formData.get('nombre') ?? ''),
      email: String(formData.get('email') ?? ''),
      telefono: String(formData.get('telefono') ?? '') || undefined,
      descripcion: String(formData.get('mensaje') ?? '') || undefined,
      fuente: 'contacto',
    };

    try {
      const res = await fetch('/api/leads/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[var(--color-crema-200)] p-8 text-center">
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Mensaje recibido</p>
        <h2 className="mt-3 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Gracias por escribirnos.</h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">Te responderemos en menos de 24 horas.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Nombre y apellidos" htmlFor="contacto-nombre" required>
          <input id="contacto-nombre" name="nombre" type="text" required className={fieldInputClass} placeholder="María García" />
        </FormField>
        <FormField label="Teléfono" htmlFor="contacto-telefono">
          <input id="contacto-telefono" name="telefono" type="tel" className={fieldInputClass} placeholder="600 000 000" />
        </FormField>
      </div>
      <FormField label="Email" htmlFor="contacto-email" required>
        <input id="contacto-email" name="email" type="email" required className={fieldInputClass} placeholder="maria@ejemplo.com" />
      </FormField>
      <FormField label="Mensaje" htmlFor="contacto-mensaje" required>
        <textarea id="contacto-mensaje" name="mensaje" rows={5} required className={fieldInputClass} placeholder="¿En qué podemos ayudarte?" />
      </FormField>

      {status === 'error' && (
        <p className="text-base text-[var(--color-oxido-600)]">No hemos podido enviar tu mensaje. Inténtalo de nuevo.</p>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)] disabled:opacity-60">
        {status === 'submitting' ? 'Enviando...' : 'Enviar mensaje'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
