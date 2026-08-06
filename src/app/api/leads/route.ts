import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { LeadPayload } from '@/types/lead';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as LeadPayload;

  if (!body.nombre?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 });
  }

  const lead = {
    nombre: body.nombre,
    email: body.email,
    telefono: body.telefono ?? null,
    comunidad: body.comunidad ?? null,
    direccion: body.direccion ?? null,
    ciudad: body.ciudad ?? null,
    servicios: body.servicios ?? [],
    descripcion: body.descripcion ?? null,
    urgencia: body.urgencia ?? 'media',
    fuente: body.fuente ?? 'web',
  };

  const { data, error } = await supabase.from('leads').insert(lead).select('id').single();

  if (error) {
    console.error('No se pudo guardar el lead en Supabase', error);
    return NextResponse.json({ error: 'No se pudo guardar la solicitud.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
