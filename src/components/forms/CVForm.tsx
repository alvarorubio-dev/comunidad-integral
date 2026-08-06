'use client';

import { useState } from 'react';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { FormField, fieldInputClass } from './FormField';

const EXPERIENCIAS = ['Sin experiencia', 'Menos de 1 año', '1-3 años', '3-5 años', 'Más de 5 años'];
const DISPONIBILIDADES = ['Inmediata', '1-2 semanas', '1 mes', 'A convenir'];

export function CVForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('submitting');
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch('/api/cv', { method: 'POST', body: formData });
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
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Candidatura recibida</p>
        <h2 className="mt-3 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Gracias por tu interés.</h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">
          Hemos recibido tu candidatura. Si tu perfil encaja con una vacante disponible, te contactaremos.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormField label="Nombre y apellidos" htmlFor="cv-nombre" required>
        <input id="cv-nombre" name="nombre" type="text" required className={fieldInputClass} placeholder="Juan Pérez" />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Email" htmlFor="cv-email" required>
          <input id="cv-email" name="email" type="email" required className={fieldInputClass} placeholder="juan@ejemplo.com" />
        </FormField>
        <FormField label="Teléfono" htmlFor="cv-telefono">
          <input id="cv-telefono" name="telefono" type="tel" className={fieldInputClass} placeholder="600 000 000" />
        </FormField>
      </div>

      <FormField label="Puesto deseado" htmlFor="cv-puesto" required>
        <select id="cv-puesto" name="puesto" required defaultValue="" className={fieldInputClass}>
          <option value="" disabled>Selecciona un puesto</option>
          {SERVICIOS.map((s) => <option key={s.slug} value={s.nombreCorto}>{s.nombreCorto}</option>)}
          <option value="Otro">Otro</option>
        </select>
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Experiencia" htmlFor="cv-experiencia">
          <select id="cv-experiencia" name="experiencia" defaultValue="" className={fieldInputClass}>
            <option value="" disabled>Selecciona un rango</option>
            {EXPERIENCIAS.map((e) => <option key={e} value={e}>{e}</option>)}
          </select>
        </FormField>
        <FormField label="Zona" htmlFor="cv-zona">
          <select id="cv-zona" name="zona" defaultValue="" className={fieldInputClass}>
            <option value="" disabled>Selecciona una ciudad</option>
            {CIUDADES.map((c) => <option key={c.slug} value={c.nombre}>{c.nombre}</option>)}
          </select>
        </FormField>
      </div>

      <FormField label="Disponibilidad" htmlFor="cv-disponibilidad">
        <select id="cv-disponibilidad" name="disponibilidad" defaultValue="" className={fieldInputClass}>
          <option value="" disabled>Selecciona una opción</option>
          {DISPONIBILIDADES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </FormField>

      <FormField label="Cuéntanos algo más (opcional)" htmlFor="cv-descripcion">
        <textarea id="cv-descripcion" name="descripcion" rows={3} className={fieldInputClass} placeholder="Certificados, disponibilidad de vehículo propio..." />
      </FormField>

      <FormField label="Sube tu CV" htmlFor="cv-archivo" required hint="Formatos aceptados: PDF, DOC, DOCX. Máximo 5 MB.">
        <input id="cv-archivo" name="cv" type="file" required accept=".pdf,.doc,.docx"
          className="w-full border border-[var(--color-crema-200)] bg-[var(--color-crema-50)] px-4 py-3 text-base text-[var(--color-ink-soft)] file:mr-4 file:border-0 file:bg-[var(--color-verde-700)] file:px-4 file:py-2 file:text-base file:font-medium file:text-[var(--color-crema-50)]" />
      </FormField>

      {status === 'error' && (
        <p className="text-base text-[var(--color-oxido-600)]">No hemos podido enviar tu candidatura. Inténtalo de nuevo.</p>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)] disabled:opacity-60">
        {status === 'submitting' ? 'Enviando...' : 'Enviar candidatura'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
