import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';
import { EmpresaPayload } from '@/types/empresa';

export async function POST(request: NextRequest) {
  const body = (await request.json()) as EmpresaPayload;

  if (!body.nombre?.trim() || !body.email?.trim()) {
    return NextResponse.json({ error: 'Nombre y email son obligatorios.' }, { status: 400 });
  }

  const empresa = {
    nombre: body.nombre,
    cif: body.cif ?? null,
    email: body.email,
    telefono: body.telefono ?? null,
    servicios: body.servicios ?? [],
    ciudades: body.ciudades ?? [],
    descripcion: body.descripcion ?? null,
  };

  // Sin .select() a propósito: el rol anon no tiene permiso SELECT sobre empresas
  // (para que nadie pueda leer registros ajenos desde el navegador). Encadenar
  // .select('id') aquí falla con 42501 "permission denied for table empresas".
  const { error } = await supabase.from('empresas').insert(empresa);

  if (error) {
    console.error('No se pudo guardar la empresa en Supabase', error);
    return NextResponse.json({ error: 'No se pudo guardar el registro.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
