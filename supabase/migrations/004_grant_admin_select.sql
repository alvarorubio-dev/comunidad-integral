-- ============================================================================
-- Comunidad Integral — GRANT SELECT para el panel /admin/ (service_role)
--
-- IMPORTANTE: este proyecto NO tiene la Supabase CLI vinculada (linked) al
-- proyecto remoto, por lo que este archivo NO se aplica automáticamente con
-- `supabase db push`. Debes copiar y pegar TODO el contenido de este
-- archivo manualmente en:
--
--   Supabase Dashboard → SQL Editor → New query → pegar → Run
-- ============================================================================

-- 001_initial_schema.sql y 003_empresas.sql solo le dieron INSERT al rol
-- "anon" (a propósito: el público solo debe poder enviar formularios, nunca
-- leer datos ajenos). El panel /admin/ lee estas tablas con la service_role
-- key (src/lib/supabase/admin.ts): ese rol se salta las políticas RLS, pero
-- sigue necesitando el GRANT SELECT a nivel de tabla — sin él, Postgres
-- devuelve 42501 "permission denied for table X" igualmente.
GRANT SELECT ON public.leads TO service_role;
GRANT SELECT ON public.candidatos TO service_role;
GRANT SELECT ON public.empresas TO service_role;
