import type { Metadata } from 'next';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';

// Datos en vivo desde Supabase (incluidos signed URLs de CV con vida de 1h):
// esta página nunca debe servirse cacheada/estática.
export const dynamic = 'force-dynamic';

// Ruta interna: no pasa por createMetadata() (no necesita OG/Twitter/canonical
// público). Redundante con el layout de /admin/ a propósito — dos capas.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const CV_BUCKET = 'cvs';
const CV_SIGNED_URL_TTL_SECONDS = 60 * 60; // 1h

const servicioNombrePorSlug = new Map(SERVICIOS.map((s) => [s.slug, s.nombreCorto]));
const ciudadNombrePorSlug = new Map(CIUDADES.map((c) => [c.slug, c.nombre]));

function nombreServicio(slug: string) {
  return servicioNombrePorSlug.get(slug) ?? slug;
}

function nombreCiudad(slug: string) {
  return ciudadNombrePorSlug.get(slug) ?? slug;
}

function formatFecha(iso: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso));
}

interface Lead {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string | null;
  comunidad: string | null;
  ciudad: string | null;
  servicios: string[];
  descripcion: string | null;
  urgencia: string;
  estado: string;
}

interface Candidato {
  id: string;
  created_at: string;
  nombre: string;
  email: string;
  telefono: string | null;
  puesto: string;
  experiencia: string | null;
  zona: string | null;
  disponibilidad: string | null;
  cv_url: string | null;
}

interface CandidatoConCv extends Candidato {
  cvSignedUrl: string | null;
}

interface Empresa {
  id: string;
  created_at: string;
  nombre: string;
  cif: string | null;
  email: string;
  telefono: string | null;
  servicios: string[];
  ciudades: string[];
  verificada: boolean;
  estado: string;
}

async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('id, created_at, nombre, email, telefono, comunidad, ciudad, servicios, descripcion, urgencia, estado')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('No se pudieron cargar los leads', error);
    return [];
  }
  return data ?? [];
}

async function getCandidatos(): Promise<CandidatoConCv[]> {
  const { data, error } = await supabaseAdmin
    .from('candidatos')
    .select('id, created_at, nombre, email, telefono, puesto, experiencia, zona, disponibilidad, cv_url')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('No se pudieron cargar los candidatos', error);
    return [];
  }

  return Promise.all(
    (data ?? []).map(async (candidato) => {
      if (!candidato.cv_url) return { ...candidato, cvSignedUrl: null };

      const { data: signed, error: signError } = await supabaseAdmin.storage
        .from(CV_BUCKET)
        .createSignedUrl(candidato.cv_url, CV_SIGNED_URL_TTL_SECONDS);

      if (signError) {
        console.error('No se pudo generar el signed URL del CV', candidato.cv_url, signError);
        return { ...candidato, cvSignedUrl: null };
      }
      return { ...candidato, cvSignedUrl: signed?.signedUrl ?? null };
    })
  );
}

async function getEmpresas(): Promise<Empresa[]> {
  const { data, error } = await supabaseAdmin
    .from('empresas')
    .select('id, created_at, nombre, cif, email, telefono, servicios, ciudades, verificada, estado')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('No se pudieron cargar las empresas', error);
    return [];
  }
  return data ?? [];
}

const URGENCIA_CLASS: Record<string, string> = {
  alta: 'bg-[var(--color-oxido-500)] text-[var(--color-crema-50)]',
  media: 'bg-[var(--color-laton-500)] text-[var(--color-crema-50)]',
  baja: 'bg-[var(--color-verde-600)] text-[var(--color-crema-50)]',
};

const BADGE_OK = 'bg-[var(--color-verde-600)] text-[var(--color-crema-50)]';
const BADGE_DEFAULT = 'bg-[var(--color-crema-200)] text-[var(--color-ink)]';

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-block px-2 py-0.5 text-xs font-medium uppercase tracking-wide ${className ?? BADGE_DEFAULT}`}>
      {children}
    </span>
  );
}

const th = 'px-3 py-2';
const thead = 'border-b border-[var(--color-crema-200)] bg-[var(--color-crema-100)] text-left text-xs uppercase tracking-wide text-[var(--color-ink-soft)]';
const td = 'px-3 py-2 text-[var(--color-ink-soft)]';
const tr = 'border-b border-[var(--color-crema-200)] align-top last:border-0';

export default async function AdminPage() {
  const [leads, candidatos, empresas] = await Promise.all([getLeads(), getCandidatos(), getEmpresas()]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-[var(--color-crema-200)] pb-6">
        <div>
          <p className="font-mono text-base uppercase tracking-[0.15em] text-[var(--color-oxido-500)]">Panel interno</p>
          <h1 className="mt-1 font-[var(--font-display)] text-3xl font-medium text-[var(--color-ink)]">Comunidad Integral — Admin</h1>
        </div>
        <form action="/api/admin/logout/" method="POST">
          <button type="submit" className="text-base font-medium text-[var(--color-ink-soft)] hover:text-[var(--color-oxido-600)]">
            Cerrar sesión
          </button>
        </form>
      </div>

      <nav className="mt-6 flex gap-6 font-mono text-base uppercase tracking-[0.1em] text-[var(--color-laton-600)]">
        <a href="#leads" className="hover:text-[var(--color-oxido-500)]">Leads ({leads.length})</a>
        <a href="#candidatos" className="hover:text-[var(--color-oxido-500)]">Candidatos ({candidatos.length})</a>
        <a href="#empresas" className="hover:text-[var(--color-oxido-500)]">Empresas ({empresas.length})</a>
      </nav>

      <section id="leads" className="mt-12 scroll-mt-8">
        <h2 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)]">Leads</h2>
        <div className="mt-4 overflow-x-auto border border-[var(--color-crema-200)]">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className={thead}>
                <th className={th}>Fecha</th>
                <th className={th}>Nombre</th>
                <th className={th}>Contacto</th>
                <th className={th}>Comunidad / Ciudad</th>
                <th className={th}>Servicios</th>
                <th className={th}>Urgencia</th>
                <th className={th}>Estado</th>
                <th className={th}>Descripción</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-6 text-center text-[var(--color-ink-soft)]">Sin leads todavía.</td></tr>
              )}
              {leads.map((lead) => (
                <tr key={lead.id} className={tr}>
                  <td className={`whitespace-nowrap ${td}`}>{formatFecha(lead.created_at)}</td>
                  <td className="px-3 py-2 font-medium text-[var(--color-ink)]">{lead.nombre}</td>
                  <td className={td}>
                    <div>{lead.email}</div>
                    {lead.telefono && <div>{lead.telefono}</div>}
                  </td>
                  <td className={td}>
                    <div>{lead.comunidad ?? '—'}</div>
                    <div>{lead.ciudad ? nombreCiudad(lead.ciudad) : '—'}</div>
                  </td>
                  <td className={td}>{lead.servicios.map(nombreServicio).join(', ') || '—'}</td>
                  <td className="px-3 py-2"><Badge className={URGENCIA_CLASS[lead.urgencia]}>{lead.urgencia}</Badge></td>
                  <td className="px-3 py-2"><Badge>{lead.estado}</Badge></td>
                  <td className={`max-w-xs whitespace-pre-wrap ${td}`}>{lead.descripcion ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="candidatos" className="mt-16 scroll-mt-8">
        <h2 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)]">Candidatos</h2>
        <p className="mt-1 text-sm text-[var(--color-ink-soft)]">Los enlaces de CV son temporales (1 hora) y se generan al cargar esta página.</p>
        <div className="mt-4 overflow-x-auto border border-[var(--color-crema-200)]">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className={thead}>
                <th className={th}>Fecha</th>
                <th className={th}>Nombre</th>
                <th className={th}>Contacto</th>
                <th className={th}>Puesto</th>
                <th className={th}>Experiencia</th>
                <th className={th}>Zona</th>
                <th className={th}>Disponibilidad</th>
                <th className={th}>CV</th>
              </tr>
            </thead>
            <tbody>
              {candidatos.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-6 text-center text-[var(--color-ink-soft)]">Sin candidaturas todavía.</td></tr>
              )}
              {candidatos.map((c) => (
                <tr key={c.id} className={tr}>
                  <td className={`whitespace-nowrap ${td}`}>{formatFecha(c.created_at)}</td>
                  <td className="px-3 py-2 font-medium text-[var(--color-ink)]">{c.nombre}</td>
                  <td className={td}>
                    <div>{c.email}</div>
                    {c.telefono && <div>{c.telefono}</div>}
                  </td>
                  <td className={td}>{c.puesto}</td>
                  <td className={td}>{c.experiencia ?? '—'}</td>
                  <td className={td}>{c.zona ?? '—'}</td>
                  <td className={td}>{c.disponibilidad ?? '—'}</td>
                  <td className="px-3 py-2">
                    {c.cvSignedUrl ? (
                      <a href={c.cvSignedUrl} className="font-medium text-[var(--color-oxido-500)] hover:underline">Descargar</a>
                    ) : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section id="empresas" className="mt-16 scroll-mt-8 pb-24">
        <h2 className="font-[var(--font-display)] text-xl font-medium text-[var(--color-ink)]">Empresas</h2>
        <div className="mt-4 overflow-x-auto border border-[var(--color-crema-200)]">
          <table className="w-full min-w-[900px] border-collapse text-sm">
            <thead>
              <tr className={thead}>
                <th className={th}>Fecha</th>
                <th className={th}>Nombre</th>
                <th className={th}>CIF</th>
                <th className={th}>Contacto</th>
                <th className={th}>Servicios</th>
                <th className={th}>Ciudades</th>
                <th className={th}>Estado</th>
                <th className={th}>Verificada</th>
              </tr>
            </thead>
            <tbody>
              {empresas.length === 0 && (
                <tr><td colSpan={8} className="px-3 py-6 text-center text-[var(--color-ink-soft)]">Sin empresas registradas todavía.</td></tr>
              )}
              {empresas.map((empresa) => (
                <tr key={empresa.id} className={tr}>
                  <td className={`whitespace-nowrap ${td}`}>{formatFecha(empresa.created_at)}</td>
                  <td className="px-3 py-2 font-medium text-[var(--color-ink)]">{empresa.nombre}</td>
                  <td className={td}>{empresa.cif ?? '—'}</td>
                  <td className={td}>
                    <div>{empresa.email}</div>
                    {empresa.telefono && <div>{empresa.telefono}</div>}
                  </td>
                  <td className={td}>{empresa.servicios.map(nombreServicio).join(', ') || '—'}</td>
                  <td className={td}>{empresa.ciudades.map(nombreCiudad).join(', ') || '—'}</td>
                  <td className="px-3 py-2"><Badge>{empresa.estado}</Badge></td>
                  <td className="px-3 py-2"><Badge className={empresa.verificada ? BADGE_OK : undefined}>{empresa.verificada ? 'Sí' : 'No'}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
