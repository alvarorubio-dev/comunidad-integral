import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_SESSION_COOKIE, isValidSessionToken } from '@/lib/admin/session';

export async function proxy(request: NextRequest) {
  // La página de login debe quedar accesible sin sesión; el resto de /admin/ no.
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    return NextResponse.next();
  }

  const adminPassword = process.env.ADMIN_PASSWORD;
  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  const hasValidSession = adminPassword ? await isValidSessionToken(token, adminPassword) : false;

  if (!hasValidSession) {
    return NextResponse.redirect(new URL('/admin/login/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
