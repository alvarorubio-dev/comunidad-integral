import { NextRequest, NextResponse } from 'next/server';
import { appendFile, mkdir, writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

const LOG_FILE = path.join(os.tmpdir(), 'comunidad-integral-candidatos.jsonl');
const CV_DIR = path.join(os.tmpdir(), 'comunidad-integral-cvs');
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

  await mkdir(CV_DIR, { recursive: true });
  const cvFilename = `${Date.now()}-${cv.name}`;
  const cvPath = path.join(CV_DIR, cvFilename);
  await writeFile(cvPath, Buffer.from(await cv.arrayBuffer()));

  const candidato = {
    nombre, email, telefono, puesto, experiencia, zona, disponibilidad, descripcion,
    cv: { nombre: cv.name, tamano: cv.size, rutaTemporal: cvPath },
    creadoEn: new Date().toISOString(),
  };

  console.log('[candidato]', candidato);

  try {
    await appendFile(LOG_FILE, `${JSON.stringify(candidato)}\n`, 'utf-8');
  } catch (error) {
    console.error('No se pudo escribir el archivo temporal de candidatos', error);
  }

  return NextResponse.json({ ok: true });
}
