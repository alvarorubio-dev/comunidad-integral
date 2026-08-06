'use client';

import { useState } from 'react';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { LeadPayload } from '@/types/lead';
import { FormField, fieldInputClass } from './FormField';

const PASOS = [
  { n: '01', titulo: 'Contacto' },
  { n: '02', titulo: 'Tu comunidad' },
  { n: '03', titulo: 'Servicios' },
];

const URGENCIAS: Array<{ valor: LeadPayload['urgencia']; label: string }> = [
  { valor: 'baja', label: 'Sin prisa' },
  { valor: 'media', label: 'En las próximas semanas' },
  { valor: 'alta', label: 'Lo antes posible' },
];

interface FormState {
  nombre: string;
  email: string;
  telefono: string;
  comunidad: string;
  direccion: string;
  ciudad: string;
  servicios: string[];
  descripcion: string;
  urgencia: LeadPayload['urgencia'];
}

const INITIAL_STATE: FormState = {
  nombre: '', email: '', telefono: '',
  comunidad: '', direccion: '', ciudad: '',
  servicios: [], descripcion: '', urgencia: 'media',
};

export function PresupuestoForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(INITIAL_STATE);
  const [showError, setShowError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function isStepValid(s: number) {
    if (s === 0) return data.nombre.trim() !== '' && /\S+@\S+\.\S+/.test(data.email);
    if (s === 1) return data.comunidad.trim() !== '' && data.ciudad !== '';
    if (s === 2) return data.servicios.length > 0;
    return true;
  }

  function toggleServicio(slug: string) {
    setData((d) => ({
      ...d,
      servicios: d.servicios.includes(slug) ? d.servicios.filter((s) => s !== slug) : [...d.servicios, slug],
    }));
  }

  function goNext() {
    if (!isStepValid(step)) { setShowError(true); return; }
    setShowError(false);
    setStep((s) => s + 1);
  }

  function goBack() {
    setShowError(false);
    setStep((s) => s - 1);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isStepValid(2)) { setShowError(true); return; }

    setStatus('submitting');
    const payload: LeadPayload = {
      nombre: data.nombre, email: data.email, telefono: data.telefono || undefined,
      comunidad: data.comunidad, direccion: data.direccion || undefined, ciudad: data.ciudad,
      servicios: data.servicios, descripcion: data.descripcion || undefined,
      urgencia: data.urgencia, fuente: 'presupuesto',
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-[var(--color-crema-200)] p-8 text-center">
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Solicitud recibida</p>
        <h2 className="mt-3 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Gracias, {data.nombre.split(' ')[0]}.</h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">
          Hemos anotado la solicitud de tu comunidad. Te contactaremos en menos de 24 horas con un presupuesto claro.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Step indicator - directory style */}
      <div className="flex items-baseline gap-6">
        {PASOS.map((p, i) => (
          <div key={p.n} className="flex items-baseline gap-2">
            <span className={`font-mono text-base ${i === step ? 'text-[var(--color-oxido-500)]' : 'text-[var(--color-laton-600)]'}`}>{p.n}</span>
            <span className={`text-base ${i === step ? 'font-medium text-[var(--color-ink)]' : 'text-[var(--color-ink-soft)]'}`}>{p.titulo}</span>
          </div>
        ))}
      </div>
      <div className="laton-rule mt-4 mb-10" />

      {step === 0 && (
        <div className="space-y-6">
          <FormField label="Nombre y apellidos" htmlFor="nombre" required>
            <input id="nombre" type="text" required className={fieldInputClass} value={data.nombre}
              onChange={(e) => setData((d) => ({ ...d, nombre: e.target.value }))} placeholder="María García" />
          </FormField>
          <FormField label="Email" htmlFor="email" required>
            <input id="email" type="email" required className={fieldInputClass} value={data.email}
              onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} placeholder="maria@ejemplo.com" />
          </FormField>
          <FormField label="Teléfono" htmlFor="telefono">
            <input id="telefono" type="tel" className={fieldInputClass} value={data.telefono}
              onChange={(e) => setData((d) => ({ ...d, telefono: e.target.value }))} placeholder="600 000 000" />
          </FormField>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-6">
          <FormField label="Nombre de la comunidad o finca" htmlFor="comunidad" required>
            <input id="comunidad" type="text" required className={fieldInputClass} value={data.comunidad}
              onChange={(e) => setData((d) => ({ ...d, comunidad: e.target.value }))} placeholder="CP Los Álamos" />
          </FormField>
          <FormField label="Dirección" htmlFor="direccion">
            <input id="direccion" type="text" className={fieldInputClass} value={data.direccion}
              onChange={(e) => setData((d) => ({ ...d, direccion: e.target.value }))} placeholder="Calle Mayor 12" />
          </FormField>
          <FormField label="Ciudad" htmlFor="ciudad" required>
            <select id="ciudad" required className={fieldInputClass} value={data.ciudad}
              onChange={(e) => setData((d) => ({ ...d, ciudad: e.target.value }))}>
              <option value="">Selecciona una ciudad</option>
              {CIUDADES.map((c) => <option key={c.slug} value={c.slug}>{c.nombre}</option>)}
            </select>
          </FormField>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-8">
          <fieldset>
            <legend className="text-base font-medium text-[var(--color-ink)]">
              ¿Qué servicios necesitas? <span className="text-[var(--color-oxido-500)]">*</span>
            </legend>
            <div className="mt-3 border-t border-[var(--color-crema-200)]">
              {SERVICIOS.map((s, i) => (
                <label key={s.slug} className="flex cursor-pointer items-center gap-4 border-b border-[var(--color-crema-200)] py-3">
                  <span className="font-mono text-base text-[var(--color-laton-600)]">0{i + 1}</span>
                  <input type="checkbox" className="h-5 w-5 accent-[var(--color-oxido-500)]"
                    checked={data.servicios.includes(s.slug)} onChange={() => toggleServicio(s.slug)} />
                  <span className="text-base text-[var(--color-ink)]">{s.nombre}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <FormField label="Cuéntanos más (opcional)" htmlFor="descripcion">
            <textarea id="descripcion" rows={4} className={fieldInputClass} value={data.descripcion}
              onChange={(e) => setData((d) => ({ ...d, descripcion: e.target.value }))}
              placeholder="Ej: portal con escalera, garaje de 20 plazas, jardín pequeño..." />
          </FormField>

          <fieldset>
            <legend className="text-base font-medium text-[var(--color-ink)]">Urgencia</legend>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:gap-6">
              {URGENCIAS.map((u) => (
                <label key={u.valor} className="flex items-center gap-2 text-base text-[var(--color-ink)]">
                  <input type="radio" name="urgencia" className="h-5 w-5 accent-[var(--color-oxido-500)]"
                    checked={data.urgencia === u.valor} onChange={() => setData((d) => ({ ...d, urgencia: u.valor }))} />
                  {u.label}
                </label>
              ))}
            </div>
          </fieldset>
        </div>
      )}

      {showError && (
        <p className="mt-4 text-base text-[var(--color-oxido-600)]">Completa los campos obligatorios antes de continuar.</p>
      )}
      {status === 'error' && (
        <p className="mt-4 text-base text-[var(--color-oxido-600)]">No hemos podido enviar la solicitud. Inténtalo de nuevo.</p>
      )}

      <div className="mt-10 flex items-center justify-between">
        {step > 0 ? (
          <button type="button" onClick={goBack} className="text-base font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]">
            ← Atrás
          </button>
        ) : <span />}

        {step < PASOS.length - 1 ? (
          <button type="button" onClick={goNext}
            className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)]">
            Continuar <span aria-hidden="true">→</span>
          </button>
        ) : (
          <button type="submit" disabled={status === 'submitting'}
            className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)] disabled:opacity-60">
            {status === 'submitting' ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        )}
      </div>
    </form>
  );
}
