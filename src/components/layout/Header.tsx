'use client';

import { useState, useEffect } from 'react';
import { NAV_LINKS, SITE } from '@/lib/constants';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-[var(--color-crema-50)] transition-shadow ${
          scrolled ? 'shadow-[0_1px_0_var(--color-crema-200)]' : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <a href="/" className="font-[var(--font-display)] text-xl font-semibold italic text-[var(--color-verde-700)]">
            Comunidad Integral
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base text-[var(--color-ink-soft)] transition-colors hover:text-[var(--color-oxido-600)]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/presupuesto/"
              className="bg-[var(--color-oxido-500)] px-5 py-2.5 text-base font-medium text-[var(--color-crema-50)] transition-colors hover:bg-[var(--color-oxido-600)]"
            >
              Presupuesto
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span className={`h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-6 bg-[var(--color-ink)] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-6 bg-[var(--color-ink)] transition-transform ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
        <div className="laton-rule" />
      </header>

      {/* Mobile menu overlay - echoes the hero tile pattern */}
      {open && (
        <div className="tile-pattern fixed inset-0 top-[73px] z-40 lg:hidden">
          <nav className="flex h-full flex-col gap-2 px-6 py-10 sm:px-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-[var(--color-verde-600)] py-4 font-[var(--font-display)] text-2xl text-[var(--color-crema-50)]"
              >
                <span className="mr-3 font-mono text-base text-[var(--color-laton-400)]">
                  0{i + 1}
                </span>
                {link.label}
              </a>
            ))}
            <a
              href="/presupuesto/"
              onClick={() => setOpen(false)}
              className="mt-8 inline-flex w-fit items-center gap-2 bg-[var(--color-oxido-500)] px-6 py-3.5 text-base font-medium text-[var(--color-crema-50)]"
            >
              Pedir presupuesto
              <span aria-hidden="true">→</span>
            </a>
            <a href={`tel:${SITE.phone.replace(/\s/g, '')}`} className="mt-auto text-base text-[var(--color-crema-200)]">
              {SITE.phone}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
