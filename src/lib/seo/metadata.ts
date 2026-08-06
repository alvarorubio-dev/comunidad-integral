import { Metadata } from 'next';
import { SITE } from '@/lib/constants';

interface PageMetadataProps {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}

export function createMetadata({ title, description, path, noIndex }: PageMetadataProps): Metadata {
  const url = `${SITE.url}${path}`;
  const fullTitle = `${title} — ${SITE.name}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE.name,
      locale: 'es_ES',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
  };
}
