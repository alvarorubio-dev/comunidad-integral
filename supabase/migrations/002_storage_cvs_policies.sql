-- ============================================================================
-- Comunidad Integral — Políticas de Storage para el bucket "cvs"
--
-- REQUISITO PREVIO: el bucket "cvs" debe existir ya (creado manualmente
-- desde el Dashboard, ver instrucciones del asistente). Este script solo
-- añade las políticas de acceso sobre storage.objects para ese bucket.
--
-- Cómo ejecutar: Supabase Dashboard → SQL Editor → New query → pegar → Run.
-- ============================================================================

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Cualquiera puede subir CVs" ON storage.objects;

CREATE POLICY "Cualquiera puede subir CVs"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'cvs');

-- ============================================================================
-- A propósito NO se crean políticas de SELECT/UPDATE/DELETE para "anon":
-- el bucket es privado y nadie puede listar, leer, sobrescribir ni borrar
-- los CVs de otros candidatos desde el navegador. Para acceder a un CV ya
-- subido hay que generar una signed URL desde el backend (con la
-- service_role key) o descargarlo desde el Dashboard → Storage.
-- ============================================================================
