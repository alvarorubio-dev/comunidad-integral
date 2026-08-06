import { NextRequest, NextResponse } from 'next/server';
import { appendFile } from 'fs/promises';
import path from 'path';
import os from 'os';
import { LeadPayload } from '@/types/lead';

const LOG_FILE = path.join(os.tmpdir(), 'comunidad-integral-leads.jsonl');

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
    creadoEn: new Date().toISOString(),
  };

  console.log('[lead]', lead);

  try {
    await appendFile(LOG_FILE, `${JSON.stringify(lead)}\n`, 'utf-8');
  } catch (error) {
    console.error('No se pudo escribir el archivo temporal de leads', error);
  }

  return NextResponse.json({ ok: true });
}
