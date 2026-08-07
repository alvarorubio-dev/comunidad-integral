-- ============================================================================
-- Comunidad Integral — Schema de empresas (registro desde /empresas/)
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
-- Tabla: empresas (registro desde /empresas/)
-- ---------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  cif TEXT,
  email TEXT NOT NULL,
  telefono TEXT,
  servicios TEXT[] DEFAULT '{}',
  ciudades TEXT[] DEFAULT '{}',
  descripcion TEXT,
  verificada BOOLEAN DEFAULT false,
  estado TEXT DEFAULT 'pendiente'
);

ALTER TABLE empresas ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede insertar" ON empresas;

CREATE POLICY "Cualquiera puede insertar"
  ON empresas
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- El proyecto tiene desactivada la opción "exponer automáticamente nuevas
-- tablas" en Supabase, así que la política RLS de arriba NO basta por sí
-- sola: sin este GRANT explícito, el rol anon recibe 42501 "permission
-- denied for table empresas" al insertar aunque la policy sea correcta.
GRANT INSERT ON public.empresas TO anon;

-- ============================================================================
-- Nota: no se crea política de SELECT/UPDATE/DELETE para el rol "anon" a
-- propósito. Esto significa que desde el navegador (clave anon) cualquiera
-- puede ENVIAR el formulario de registro, pero NADIE puede leer, modificar
-- ni borrar los datos de otras empresas. Para consultar o verificar estos
-- registros hay que usar el Table Editor del Dashboard o la service_role
-- key desde el backend.
-- ============================================================================
