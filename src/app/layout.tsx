import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Comunidad Integral',
  description: 'Servicios integrales para comunidades de vecinos en España.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <main>{children}</main>
      </body>
    </html>
  );
}
