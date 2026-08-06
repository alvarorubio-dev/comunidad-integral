import { SITE } from '@/lib/constants';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/logo.svg`,
    description: SITE.description,
    areaServed: { '@type': 'Country', name: 'España' },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.phone,
      email: SITE.email,
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
  };
}

export function serviceSchema(name: string, description: string, areaServed?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: { '@type': 'Organization', name: SITE.name },
    areaServed: areaServed
      ? { '@type': 'City', name: areaServed }
      : { '@type': 'Country', name: 'España' },
    serviceType: name,
  };
}

export function localBusinessSchema(serviceName: string, city: string, lat: number, lng: number) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `${SITE.name} — ${serviceName} en ${city}`,
    description: `${serviceName} para comunidades de vecinos en ${city}`,
    url: SITE.url,
    telephone: SITE.phone,
    email: SITE.email,
    areaServed: { '@type': 'City', name: city },
    address: {
      '@type': 'PostalAddress',
      addressLocality: city,
      addressCountry: 'ES',
    },
    geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
  };
}

export function faqSchema(faqs: Array<{ pregunta: string; respuesta: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.respuesta,
      },
    })),
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
