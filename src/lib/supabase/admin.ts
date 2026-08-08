// ⚠️ SOLO SERVIDOR. Cliente Supabase con la service_role key: se salta Row Level
// Security (RLS) por completo y puede leer/escribir cualquier tabla o bucket.
//
// El import 'server-only' de abajo hace que `next build` falle si este archivo
// llega a importarse (directa o transitivamente) desde un componente 'use client'
// o desde cualquier código que se empaquete para el navegador.
//
// Úsalo únicamente desde Server Components, Route Handlers o Middleware —
// nunca desde src/lib/supabase/client.ts ni desde código con 'use client'.
import 'server-only';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error(
    'Faltan variables de entorno de Supabase admin: define NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en .env.local'
  );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});
