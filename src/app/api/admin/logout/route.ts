import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE } from '@/lib/admin/session';

export async function POST(request: NextRequest) {
  // 303 (no 307/308): fuerza GET en el redirect sea cual sea el método
  // original de la petición, evitando que el navegador repita el POST del
  // formulario de logout contra /admin/login/ (que solo acepta GET) y
  // termine en 405.
  const response = NextResponse.redirect(new URL('/admin/login/', request.url), 303);
  response.cookies.delete(ADMIN_SESSION_COOKIE);
  return response;
}
