'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? 'No se pudo iniciar sesión.');
        setLoading(false);
        return;
      }

      router.replace('/admin/');
      router.refresh();
    } catch {
      setError('No se pudo iniciar sesión.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-[var(--color-verde-900)] px-6 py-20">
      <form onSubmit={handleSubmit} className="w-full max-w-sm border border-[var(--color-laton-600)] bg-[var(--color-crema-50)] p-8">
        <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Panel interno</p>
        <h1 className="mt-2 font-[var(--font-display)] text-2xl font-medium text-[var(--color-ink)]">Acceso administración</h1>

        <div className="mt-6">
          <label htmlFor="admin-password" className="block text-base font-medium text-[var(--color-ink)]">
            Contraseña
          </label>
          <input
            id="admin-password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full border border-[var(--color-crema-200)] bg-white px-4 py-3 text-base text-[var(--color-ink)] focus:border-[var(--color-oxido-500)] focus:outline-none"
          />
        </div>

        {error && <p className="mt-3 text-base text-[var(--color-oxido-600)]">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full bg-[var(--color-oxido-500)] px-6 py-3 text-base font-medium text-[var(--color-crema-50)] hover:bg-[var(--color-oxido-600)] disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
