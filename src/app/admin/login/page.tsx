import type { Metadata } from 'next';
import { AdminLoginForm } from '@/components/admin/AdminLoginForm';

// Ruta interna: no pasa por createMetadata() (no necesita OG/Twitter/canonical
// público). Redundante con el layout de /admin/ a propósito — dos capas.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return <AdminLoginForm />;
}
