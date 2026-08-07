'use client';

import { useState } from 'react';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';
import { EmpresaPayload } from '@/types/empresa';
import { FormField, fieldInputClass } from './FormField';
import { ConsentCheckbox } from './ConsentCheckbox';

interface FormState {
  nombre: string;
  cif: string;
  email: string;
  telefono: string;
  servicios: string[];
  ciudades: string[];
  descripcion: string;
  consentimiento: boolean;
}

const INITIAL_STATE: FormState = {
  nombre: '', cif: '', email: '', telefono: '',
  servicios: [], ciudades: [], descripcion: '',
  consentimiento: false,
};

export function EmpresaForm() {
  const [data, setData] = useState<FormState>(INITIAL_STATE);
  const [showError, setShowError] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function toggleServicio(slug: string) {
    setData((d) => ({
      ...d,
      servicios: d.servicios.includes(slug) ? d.servicios.filter((s) => s !== slug) : [...d.servicios, slug],
    }));
  }

  function toggleCiudad(slug: string) {
    setData((d) => ({
      ...d,
      ciudades: d.ciudades.includes(slug) ? d.ciudades.filter((c) => c !== slug) : [...d.ciudades, slug],
    }));
  }

  function isValid() {
    return (
      data.nombre.trim() !== '' &&
      /\S+@\S+\.\S+/.test(data.email) &&
      data.servicios.length > 0 &&
      data.ciudades.length > 0 &&
      data.consentimiento
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid()) { setShowError(true); return; }

    setStatus('submitting');
    const payload: EmpresaPayload = {
      nombre: data.nombre,
      cif: data.cif || undefined,
      email: data.email,
      telefono: data.telefono || undefined,
      servicios: data.servicios,
      ciudades: data.ciudades,
      descripcion: data.descripcion || undefined,
    };

    try {
      const res = await fetch('/api/empresas/', {
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
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Registro recibido</p>
        <h2 className="mt-3 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Gracias, {data.nombre}.</h2>
        <p className="mt-3 text-base leading-relaxed text-[var(--color-ink-soft)]">
          Hemos recibido los datos de tu empresa. Revisamos cada registro manualmente antes de activarlo: te avisaremos por email en cuanto esté verificado y empieces a recibir leads.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Nombre de la empresa" htmlFor="empresa-nombre" required>
          <input id="empresa-nombre" type="text" required className={fieldInputClass} value={data.nombre}
            onChange={(e) => setData((d) => ({ ...d, nombre: e.target.value }))} placeholder="Limpiezas García S.L." />
        </FormField>
        <FormField label="CIF (opcional)" htmlFor="empresa-cif">
          <input id="empresa-cif" type="text" className={fieldInputClass} value={data.cif}
            onChange={(e) => setData((d) => ({ ...d, cif: e.target.value }))} placeholder="B12345678" />
        </FormField>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField label="Email" htmlFor="empresa-email" required>
          <input id="empresa-email" type="email" required className={fieldInputClass} value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))} placeholder="contacto@tuempresa.com" />
        </FormField>
        <FormField label="Teléfono" htmlFor="empresa-telefono">
          <input id="empresa-telefono" type="tel" className={fieldInputClass} value={data.telefono}
            onChange={(e) => setData((d) => ({ ...d, telefono: e.target.value }))} placeholder="600 000 000" />
        </FormField>
      </div>

      <fieldset>
        <legend className="text-base font-medium text-[var(--color-ink)]">
          ¿Qué servicios ofreces? <span className="text-[var(--color-oxido-500)]">*</span>
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

      <fieldset>
        <legend className="text-base font-medium text-[var(--color-ink)]">
          ¿En qué ciudades trabajas? <span className="text-[var(--color-oxido-500)]">*</span>
        </legend>
        <div className="mt-3 grid grid-cols-2 gap-x-6 border-t border-[var(--color-crema-200)] sm:grid-cols-3">
          {CIUDADES.map((c) => (
            <label key={c.slug} className="flex cursor-pointer items-center gap-3 border-b border-[var(--color-crema-200)] py-3">
              <input type="checkbox" className="h-5 w-5 accent-[var(--color-oxido-500)]"
                checked={data.ciudades.includes(c.slug)} onChange={() => toggleCiudad(c.slug)} />
              <span className="text-base text-[var(--color-ink)]">{c.nombre}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <FormField label="Cuéntanos algo más sobre tu empresa (opcional)" htmlFor="empresa-descripcion">
        <textarea id="empresa-descripcion" rows={4} className={fieldInputClass} value={data.descripcion}
          onChange={(e) => setData((d) => ({ ...d, descripcion: e.target.value }))}
          placeholder="Años de experiencia, tamaño del equipo, certificaciones..." />
      </FormField>

      <ConsentCheckbox
        id="empresa-consentimiento"
        checked={data.consentimiento}
        onChange={(checked) => setData((d) => ({ ...d, consentimiento: checked }))}
      />

      {showError && (
        <p className="text-base text-[var(--color-oxido-600)]">Completa los campos obligatorios: nombre, email, al menos un servicio, una ciudad, y acepta la Política de Privacidad.</p>
      )}
      {status === 'error' && (
        <p className="text-base text-[var(--color-oxido-600)]">No hemos podido enviar el registro. Inténtalo de nuevo.</p>
      )}

      <button type="submit" disabled={status === 'submitting'}
        className="inline-flex items-center gap-2 bg-[var(--color-oxido-500)] px-7 py-3.5 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)] disabled:opacity-60">
        {status === 'submitting' ? 'Enviando...' : 'Registrar mi empresa'}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}
