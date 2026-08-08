// Firma y verificación de la cookie de sesión del panel /admin/.
//
// Se importa tanto desde src/middleware.ts (Edge runtime) como desde las API
// routes de login/logout (Node runtime), así que usa exclusivamente Web Crypto
// (globalThis.crypto.subtle): es la única API criptográfica disponible en ambos
// entornos (el módulo `crypto` de Node no existe en Edge).
//
// La cookie no es solo un marcador ("admin_session=1"): es "<expiraEn>.<firma>",
// donde la firma es un HMAC-SHA256 de la marca de tiempo usando ADMIN_PASSWORD
// como clave. Así, alguien no puede falsificar una sesión válida simplemente
// creando la cookie a mano en las devtools del navegador.

export const ADMIN_SESSION_COOKIE = 'admin_session';
export const ADMIN_SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24h

function bytesToHex(bytes: ArrayBuffer): string {
  return Array.from(new Uint8Array(bytes))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function sign(value: string, secret: string): Promise<string> {
  const key = await hmacKey(secret);
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return bytesToHex(signature);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

/** Compara la contraseña recibida en el login con ADMIN_PASSWORD, en tiempo constante. */
export function timingSafeEqualPassword(received: string, expected: string): boolean {
  const maxLength = Math.max(received.length, expected.length);
  let mismatch = received.length === expected.length ? 0 : 1;
  for (let i = 0; i < maxLength; i++) {
    const a = i < received.length ? received.charCodeAt(i) : 0;
    const b = i < expected.length ? expected.charCodeAt(i) : 0;
    mismatch |= a ^ b;
  }
  return mismatch === 0;
}

export async function createSessionToken(secret: string): Promise<string> {
  const expiresAt = Date.now() + ADMIN_SESSION_DURATION_SECONDS * 1000;
  const signature = await sign(String(expiresAt), secret);
  return `${expiresAt}.${signature}`;
}

export async function isValidSessionToken(
  token: string | undefined,
  secret: string
): Promise<boolean> {
  if (!token) return false;
  const [expiresAtRaw, signature] = token.split('.');
  if (!expiresAtRaw || !signature) return false;

  const expiresAt = Number(expiresAtRaw);
  if (!Number.isFinite(expiresAt) || Date.now() > expiresAt) return false;

  const expectedSignature = await sign(expiresAtRaw, secret);
  return timingSafeEqual(signature, expectedSignature);
}
