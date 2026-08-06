import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase/client';

const CV_BUCKET = 'cvs';
const MAX_SIZE = 5 * 1024 * 1024;

export async function POST(request: NextRequest) {
  const formData = await request.formData();

  const nombre = formData.get('nombre')?.toString().trim() ?? '';
  const email = formData.get('email')?.toString().trim() ?? '';
  const puesto = formData.get('puesto')?.toString().trim() ?? '';
  const telefono = formData.get('telefono')?.toString().trim() || null;
  const experiencia = formData.get('experiencia')?.toString().trim() || null;
  const zona = formData.get('zona')?.toString().trim() || null;
  const disponibilidad = formData.get('disponibilidad')?.toString().trim() || null;
  const descripcion = formData.get('descripcion')?.toString().trim() || null;
  const cv = formData.get('cv');

  if (!nombre || !email || !puesto) {
    return NextResponse.json({ error: 'Nombre, email y puesto son obligatorios.' }, { status: 400 });
  }

  if (!(cv instanceof File) || cv.size === 0) {
    return NextResponse.json({ error: 'Debes adjuntar tu CV.' }, { status: 400 });
  }

  if (cv.size > MAX_SIZE) {
    return NextResponse.json({ error: 'El CV no puede superar los 5 MB.' }, { status: 400 });
  }

  const cvFilename = `${Date.now()}-${cv.name}`;

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from(CV_BUCKET)
    .upload(cvFilename, cv, { contentType: cv.type || 'application/octet-stream' });

  if (uploadError) {
    console.error('No se pudo subir el CV a Supabase Storage', uploadError);
    return NextResponse.json({ error: 'No se pudo subir el CV.' }, { status: 500 });
  }

  const candidato = {
    nombre,
    email,
    telefono,
    puesto,
    experiencia,
    zona,
    disponibilidad,
    descripcion,
    cv_url: uploadData.path,
  };

  const { data, error } = await supabase.from('candidatos').insert(candidato).select('id').single();

  if (error) {
    console.error('No se pudo guardar el candidato en Supabase', error);
    return NextResponse.json({ error: 'No se pudo guardar tu candidatura.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, id: data.id });
}
