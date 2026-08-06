-- ============================================================================
-- Comunidad Integral — Schema inicial (leads + candidatos)
--
-- IMPORTANTE: este proyecto NO tiene la Supabase CLI vinculada (linked) al
-- proyecto remoto, por lo que este archivo NO se aplica automáticamente con
-- `supabase db push`. Debes copiar y pegar TODO el contenido de este
-- archivo manualmente en:
--
--   Supabase Dashboard → SQL Editor → New query → pegar → Run
--
-- Ejecuta este script UNA sola vez. Es seguro volver a intentarlo si algo
-- falla a mitad de camino: usa CREATE TABLE IF NOT EXISTS y DROP POLICY IF
-- EXISTS antes de crear las políticas para evitar errores de "ya existe".
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tabla: leads (solicitudes de presupuesto)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  comunidad TEXT,
  direccion TEXT,
  ciudad TEXT,
  servicios TEXT[] DEFAULT '{}',
  descripcion TEXT,
  urgencia TEXT DEFAULT 'media',
  fuente TEXT DEFAULT 'web',
  estado TEXT DEFAULT 'nuevo'
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede insertar" ON leads;

CREATE POLICY "Cualquiera puede insertar"
  ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ---------------------------------------------------------------------------
-- Tabla: candidatos (CVs recibidos desde /empleo/)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS candidatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  puesto TEXT NOT NULL,
  experiencia TEXT,
  zona TEXT,
  disponibilidad TEXT,
  descripcion TEXT,
  cv_url TEXT
);

ALTER TABLE candidatos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede insertar" ON candidatos;

CREATE POLICY "Cualquiera puede insertar"
  ON candidatos
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- ============================================================================
-- Nota: no se crean políticas de SELECT/UPDATE/DELETE para el rol "anon" a
-- propósito. Esto significa que desde el navegador (clave anon) cualquiera
-- puede ENVIAR un formulario, pero NADIE puede leer, modificar ni borrar los
-- leads o candidatos de otras personas. Para consultar estos datos hay que
-- usar el Table Editor del Dashboard o la service_role key desde el backend.
-- ============================================================================
