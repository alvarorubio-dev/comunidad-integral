import type { Metadata } from 'next';

// Refuerzo del disallow de robots.ts: aunque algo enlazara a /admin/, no debe indexarse.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
