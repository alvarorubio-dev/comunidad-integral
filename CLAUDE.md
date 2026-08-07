# CLAUDE.md — Comunidad Integral

## Proyecto

Migrar comunidadintegral.com de WordPress a Next.js con MDX. Expandir de Madrid a toda España.
Construir ecosistema: web pública + marketplace + SaaS CRM con IA.

## Stack

- Next.js 14+ (App Router, `trailingSlash: true` obligatorio)
- MDX (contenido de servicios y blog)
- Tailwind CSS v3
- Supabase (PostgreSQL + Auth + Storage)
- Vercel (hosting + CI/CD)
- TypeScript estricto

## Identidad visual

```
Primario:     #1B5E20  (verde oscuro, logo)
Secundario:   #FF6F00  (naranja, CTAs)
Fondo:        #FFFFFF / #F8F9FA
Texto:        #1A1A1A / #6B7280
Acento:       #0D47A1  (azul, enlaces)
Success:      #16A34A
Warning:      #EAB308
Error:        #DC2626

Tipografía:
  Display + Body: Inter (font-sans)
  Mono:           JetBrains Mono (datos/código)
  Weights:        400 (regular), 500 (medium), 600 (semibold), 700 (bold headings)
```

---

## Estructura del proyecto Next.js

```
comunidad-integral/
├── CLAUDE.md                          ← Este archivo
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
│
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   ├── og-image.png
│   ├── robots.txt
│   └── images/
│       ├── servicios/                 ← Imágenes por servicio
│       └── ciudades/                  ← Imágenes por ciudad
│
├── src/
│   ├── app/
│   │   ├── layout.tsx                 ← Root layout (nav + footer + metadata global)
│   │   ├── page.tsx                   ← Home (hero + servicios + formulario + testimonios)
│   │   ├── globals.css
│   │   │
│   │   ├── sobre-nosotros/
│   │   │   └── page.mdx              ← Sobre nosotros (mantener URL)
│   │   │
│   │   ├── contacto-mantenimiento-comunidades/
│   │   │   └── page.tsx              ← Contacto con formulario dinámico (mantener URL)
│   │   │
│   │   ├── servicios/                 ← NUEVO: Pillar pages nacionales
│   │   │   ├── page.tsx              ← Índice de servicios
│   │   │   ├── [servicio]/
│   │   │   │   ├── page.tsx          ← Pillar page nacional (generada dinámicamente)
│   │   │   │   └── [ciudad]/
│   │   │   │       └── page.tsx      ← Landing local por ciudad (generada dinámicamente)
│   │   │   └── layout.tsx            ← Layout compartido servicios (breadcrumbs)
│   │   │
│   │   ├── empleo/                    ← NUEVO: Bolsa de trabajo
│   │   │   ├── page.tsx              ← Listado ofertas + formulario CV
│   │   │   └── [slug]/
│   │   │       └── page.tsx          ← Detalle oferta individual
│   │   │
│   │   ├── empresas/                  ← NUEVO: Marketplace para empresas
│   │   │   ├── page.tsx              ← Landing "Recibe leads" para empresas
│   │   │   ├── registro/
│   │   │   │   └── page.tsx          ← Registro empresa
│   │   │   └── dashboard/
│   │   │       └── page.tsx          ← Dashboard empresa (protegido)
│   │   │
│   │   ├── blog/                      ← Blog (nueva URL, redirect desde la antigua)
│   │   │   ├── page.tsx              ← Listado de artículos con paginación
│   │   │   └── [slug]/
│   │   │       └── page.mdx          ← Artículo individual MDX
│   │   │
│   │   ├── presupuesto/               ← NUEVO: Formulario de presupuesto multi-paso
│   │   │   └── page.tsx
│   │   │
│   │   │── (legacy)/                  ← URLs antiguas con redirect 301
│   │   │   ├── empresa-mantenimiento-comunidades-madrid/
│   │   │   ├── empresa-limpieza-madrid/
│   │   │   ├── empresa-conserjes-madrid/
│   │   │   ├── empresa-reformas-madrid/
│   │   │   └── blog-facility-services/
│   │   │
│   │   ├── api/
│   │   │   ├── leads/
│   │   │   │   └── route.ts          ← POST lead desde formulario
│   │   │   ├── cv/
│   │   │   │   └── route.ts          ← POST CV desde formulario empleo
│   │   │   ├── contact/
│   │   │   │   └── route.ts          ← POST contacto genérico
│   │   │   ├── webhook/
│   │   │   │   └── email/
│   │   │   │       └── route.ts      ← Webhook recepción emails (SaaS)
│   │   │   └── sitemap/
│   │   │       └── route.ts          ← Sitemap XML dinámico
│   │   │
│   │   ├── sitemap.ts                 ← Generador de sitemap Next.js
│   │   └── robots.ts                  ← Generador de robots.txt
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   └── Breadcrumbs.tsx
│   │   ├── home/
│   │   │   ├── Hero.tsx
│   │   │   ├── ServiciosGrid.tsx
│   │   │   ├── Testimonios.tsx
│   │   │   └── CTAPresupuesto.tsx
│   │   ├── servicios/
│   │   │   ├── PillarHero.tsx        ← Hero de pillar page
│   │   │   ├── ServicioCard.tsx
│   │   │   ├── CiudadesGrid.tsx      ← Grid de ciudades disponibles
│   │   │   ├── FAQSection.tsx         ← Preguntas frecuentes (Schema FAQPage)
│   │   │   └── PreciosEstimados.tsx   ← Tabla de precios orientativos
│   │   ├── forms/
│   │   │   ├── PresupuestoForm.tsx    ← Formulario multi-paso
│   │   │   ├── CVForm.tsx            ← Formulario envío CV
│   │   │   ├── ContactForm.tsx
│   │   │   └── FormField.tsx
│   │   ├── blog/
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── ArticleList.tsx
│   │   │   ├── TableOfContents.tsx
│   │   │   └── MDXComponents.tsx     ← Componentes custom para MDX
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   └── Input.tsx
│   │   └── seo/
│   │       ├── JsonLd.tsx            ← Schema.org genérico
│   │       ├── LocalBusinessSchema.tsx
│   │       ├── ServiceSchema.tsx
│   │       └── FAQSchema.tsx
│   │
│   ├── content/
│   │   ├── servicios/                 ← Datos de los servicios
│   │   │   ├── index.ts              ← Exporta array SERVICIOS
│   │   │   ├── limpieza-comunidades.ts
│   │   │   ├── mantenimiento-comunidades.ts
│   │   │   ├── conserjeria-comunidades.ts
│   │   │   ├── reformas-comunidades.ts
│   │   │   ├── jardineria-comunidades.ts
│   │   │   └── mantenimiento-piscinas.ts
│   │   ├── ciudades/                  ← Datos de las ciudades
│   │   │   ├── index.ts              ← Exporta array CIUDADES
│   │   │   ├── madrid.ts
│   │   │   ├── barcelona.ts
│   │   │   ├── valencia.ts
│   │   │   ├── sevilla.ts
│   │   │   ├── malaga.ts
│   │   │   ├── zaragoza.ts
│   │   │   ├── bilbao.ts
│   │   │   ├── alicante.ts
│   │   │   ├── murcia.ts
│   │   │   ├── palma-de-mallorca.ts
│   │   │   ├── las-palmas.ts
│   │   │   ├── valladolid.ts
│   │   │   ├── cordoba.ts
│   │   │   └── granada.ts
│   │   └── blog/                      ← Artículos MDX
│   │       ├── guia-mantenimiento-comunidades.mdx
│   │       ├── precios-limpieza-comunidades-2026.mdx
│   │       ├── como-elegir-empresa-conserjeria.mdx
│   │       └── ...
│   │
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts             ← Cliente Supabase browser
│   │   │   ├── server.ts             ← Cliente Supabase server
│   │   │   └── types.ts              ← Tipos generados de la DB
│   │   ├── seo/
│   │   │   ├── metadata.ts           ← Generador de metadata por página
│   │   │   └── schemas.ts            ← Generadores de Schema.org JSON-LD
│   │   ├── utils/
│   │   │   ├── slugify.ts
│   │   │   ├── formatPrice.ts
│   │   │   └── cn.ts                 ← clsx + tailwind-merge
│   │   └── constants.ts              ← Constantes globales
│   │
│   └── types/
│       ├── servicio.ts
│       ├── ciudad.ts
│       ├── lead.ts
│       └── blog.ts
│
└── supabase/
    ├── migrations/
    │   └── 001_initial_schema.sql     ← Schema inicial
    └── seed.sql                       ← Datos iniciales
```

---

## Configuración crítica: next.config.ts

```typescript
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,    // OBLIGATORIO: preservar URLs con barra final

  async redirects() {
    return [
      // URLs antiguas WordPress → nuevas URLs de servicio por ciudad
      {
        source: '/empresa-mantenimiento-comunidades-madrid/',
        destination: '/servicios/mantenimiento-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-limpieza-madrid/',
        destination: '/servicios/limpieza-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-conserjes-madrid/',
        destination: '/servicios/conserjeria-comunidades/madrid/',
        permanent: true,
      },
      {
        source: '/empresa-reformas-madrid/',
        destination: '/servicios/reformas-comunidades/madrid/',
        permanent: true,
      },
      // Blog URL antigua → nueva
      {
        source: '/blog-facility-services/',
        destination: '/blog/',
        permanent: true,
      },
      {
        source: '/blog-facility-services/:slug/',
        destination: '/blog/:slug/',
        permanent: true,
      },
      // Contacto viejo (si existe doble)
      {
        source: '/contacto/',
        destination: '/contacto-mantenimiento-comunidades/',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Robots-Tag', value: 'index, follow' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

---

## Arquitectura de contenido: 3 capas SEO

### Capa 1 — Pillar pages nacionales (6 páginas)

Son las páginas de servicio principales. Atacan keywords genéricas de alto volumen
sin mención a ninguna ciudad. Son el nodo central de toda la arquitectura de enlaces.

Cada pillar page se genera dinámicamente desde `src/content/servicios/`.

| Slug | Keyword principal | Vol/mes | SD | URL |
|------|-------------------|---------|-----|-----|
| `limpieza-comunidades` | limpieza de comunidades | 720 | 10 | `/servicios/limpieza-comunidades/` |
| `mantenimiento-comunidades` | mantenimiento de comunidades | 480 | 7 | `/servicios/mantenimiento-comunidades/` |
| `conserjeria-comunidades` | conserjería comunidades | 110 | 7 | `/servicios/conserjeria-comunidades/` |
| `reformas-comunidades` | reformas comunidades | 170 | 11 | `/servicios/reformas-comunidades/` |
| `jardineria-comunidades` | jardinería comunidades | 90 | 8 | `/servicios/jardineria-comunidades/` |
| `mantenimiento-piscinas` | mantenimiento piscinas comunidad | 260 | 12 | `/servicios/mantenimiento-piscinas/` |

#### Estructura de una pillar page

```
/servicios/limpieza-comunidades/

H1: Limpieza de comunidades de vecinos en España
   └─ keyword principal en H1, sin ciudad

Meta title: Limpieza de comunidades de vecinos | Presupuesto gratis — Comunidad Integral
Meta description: Encuentra la mejor empresa de limpieza de comunidades. Compara presupuestos
   gratis de empresas verificadas en toda España. Portales, garajes, zonas comunes.

SECCIONES:
1. Hero — propuesta de valor + CTA presupuesto + badge "Toda España"
2. ¿Qué incluye la limpieza de comunidades? — párrafos explicativos con H2/H3
3. Tipos de limpieza — portales, garajes, zonas comunes, cristales, fachadas
4. ¿Cuánto cuesta? — tabla de precios orientativos por tamaño de comunidad
5. Ciudades disponibles — grid de enlaces a landings locales (Capa 2)
6. Preguntas frecuentes — FAQ con Schema FAQPage
7. Formulario de presupuesto inline
8. Artículos relacionados del blog (Capa 3)

SCHEMA JSON-LD:
- Service (serviceType: "Limpieza de comunidades")
- FAQPage (preguntas frecuentes)
- BreadcrumbList

INTERNAL LINKS:
- Enlaza a TODAS las landing pages de ciudades de ese servicio
- Enlaza a 2-3 artículos del blog relacionados
- Enlaza a otras pillar pages hermanas ("¿Necesitas también conserjería?")
```

#### Archivo de datos de servicio: ejemplo

```typescript
// src/content/servicios/limpieza-comunidades.ts

import { Servicio } from '@/types/servicio';

export const limpiezaComunidades: Servicio = {
  slug: 'limpieza-comunidades',
  nombre: 'Limpieza de comunidades',
  nombreCorto: 'Limpieza',
  descripcion: 'Servicios profesionales de limpieza para comunidades de vecinos, urbanizaciones y edificios residenciales.',
  icono: 'sparkles', // lucide icon name
  keywordPrincipal: 'limpieza de comunidades',
  keywordsSecundarias: [
    'limpieza comunidades de vecinos',
    'empresa limpieza comunidades',
    'limpieza portales',
    'limpieza garajes comunitarios',
    'limpieza zonas comunes',
  ],
  metaTitle: 'Limpieza de comunidades de vecinos | Presupuesto gratis',
  metaDescription: 'Encuentra la mejor empresa de limpieza de comunidades. Compara presupuestos gratis de empresas verificadas en toda España. Portales, garajes, zonas comunes.',

  // Contenido de la pillar page
  intro: `La limpieza de comunidades de vecinos es uno de los servicios más demandados...`,

  tipos: [
    {
      nombre: 'Limpieza de portales y escaleras',
      descripcion: 'Fregado de suelos, limpieza de barandillas, cristales de entrada, buzones...',
    },
    {
      nombre: 'Limpieza de garajes',
      descripcion: 'Barrido mecánico, fregado, eliminación de manchas de aceite...',
    },
    {
      nombre: 'Limpieza de zonas comunes',
      descripcion: 'Piscinas, jardines, salones sociales, ascensores...',
    },
    {
      nombre: 'Limpieza de fachadas',
      descripcion: 'Limpieza con agua a presión, tratamientos antigraffiti...',
    },
  ],

  preciosOrientativos: [
    { concepto: 'Portal y escalera (1 vez/semana)', desde: 150, hasta: 300, unidad: '€/mes' },
    { concepto: 'Portal y escalera (3 veces/semana)', desde: 300, hasta: 600, unidad: '€/mes' },
    { concepto: 'Garaje comunitario', desde: 80, hasta: 250, unidad: '€/mes' },
    { concepto: 'Zonas comunes y jardines', desde: 200, hasta: 500, unidad: '€/mes' },
    { concepto: 'Limpieza integral completa', desde: 500, hasta: 1500, unidad: '€/mes' },
  ],

  faqs: [
    {
      pregunta: '¿Cuánto cuesta la limpieza de una comunidad de vecinos?',
      respuesta: 'El precio depende del tamaño de la comunidad, la frecuencia del servicio y los espacios a limpiar. Para un portal con escalera, el coste suele oscilar entre 150€ y 600€ al mes. Solicita presupuesto gratuito para tu comunidad.',
    },
    {
      pregunta: '¿Con qué frecuencia se debe limpiar una comunidad?',
      respuesta: 'Lo habitual es entre 2 y 5 días por semana, dependiendo del tránsito de vecinos y las zonas comunes disponibles. Las comunidades grandes suelen necesitar limpieza diaria.',
    },
    {
      pregunta: '¿Qué incluye un servicio de limpieza de comunidades?',
      respuesta: 'Normalmente incluye fregado de suelos, limpieza de cristales de entrada, barandillas, ascensores, buzones y eliminación de polvo. Servicios adicionales como garajes o fachadas se presupuestan aparte.',
    },
    {
      pregunta: '¿Se necesita subrogación al cambiar de empresa de limpieza?',
      respuesta: 'Sí, según el convenio colectivo del sector, la nueva empresa debe subrogar a los trabajadores que estaban asignados a esa comunidad. Esto garantiza la continuidad del servicio.',
    },
  ],
};
```

---

### Capa 2 — Landing pages por ciudad (6 servicios × 14 ciudades = 84 páginas)

Cada landing hereda el contenido de la pillar page y lo personaliza con datos locales.
Se generan dinámicamente con `generateStaticParams()` en Next.js.

#### Ciudades objetivo (14 iniciales, ampliable)

```typescript
// src/content/ciudades/index.ts

export const CIUDADES: Ciudad[] = [
  { slug: 'madrid', nombre: 'Madrid', comunidad: 'Comunidad de Madrid', poblacion: 3400000, zonas: ['Centro', 'Chamberí', 'Salamanca', 'Retiro', 'Arganzuela', 'Carabanchel', 'Vallecas', 'Hortaleza', 'Fuencarral', 'Moncloa'] },
  { slug: 'barcelona', nombre: 'Barcelona', comunidad: 'Cataluña', poblacion: 1660000, zonas: ['Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Sant Martí', 'Sants-Montjuïc', 'Les Corts', 'Horta-Guinardó', 'Ciutat Vella'] },
  { slug: 'valencia', nombre: 'Valencia', comunidad: 'Comunitat Valenciana', poblacion: 800000, zonas: ['Ciutat Vella', 'L\'Eixample', 'Extramurs', 'Campanar', 'Benimaclet', 'Rascanya', 'Poblats Marítims'] },
  { slug: 'sevilla', nombre: 'Sevilla', comunidad: 'Andalucía', poblacion: 685000, zonas: ['Triana', 'Nervión', 'Macarena', 'Los Remedios', 'Cerro Amate', 'Este-Alcosa-Torreblanca'] },
  { slug: 'malaga', nombre: 'Málaga', comunidad: 'Andalucía', poblacion: 580000, zonas: ['Centro', 'Carretera de Cádiz', 'Cruz de Humilladero', 'Teatinos', 'El Palo', 'Huelin'] },
  { slug: 'zaragoza', nombre: 'Zaragoza', comunidad: 'Aragón', poblacion: 675000, zonas: ['Centro', 'Delicias', 'Universidad', 'San José', 'Las Fuentes', 'Actur'] },
  { slug: 'bilbao', nombre: 'Bilbao', comunidad: 'País Vasco', poblacion: 347000, zonas: ['Abando', 'Deusto', 'Indautxu', 'San Ignacio', 'Santutxu', 'Rekalde'] },
  { slug: 'alicante', nombre: 'Alicante', comunidad: 'Comunitat Valenciana', poblacion: 337000, zonas: ['Centro', 'Playa de San Juan', 'Carolinas', 'Campoamor', 'San Blas'] },
  { slug: 'murcia', nombre: 'Murcia', comunidad: 'Región de Murcia', poblacion: 460000, zonas: ['Centro', 'El Carmen', 'Infante Juan Manuel', 'San Andrés', 'Vistabella'] },
  { slug: 'palma-de-mallorca', nombre: 'Palma de Mallorca', comunidad: 'Islas Baleares', poblacion: 420000, zonas: ['Centro', 'El Terreno', 'Son Espanyolet', 'Santa Catalina', 'El Molinar'] },
  { slug: 'las-palmas', nombre: 'Las Palmas de Gran Canaria', comunidad: 'Canarias', poblacion: 380000, zonas: ['Vegueta', 'Triana', 'Ciudad Jardín', 'Guanarteme', 'Alcaravaneras'] },
  { slug: 'valladolid', nombre: 'Valladolid', comunidad: 'Castilla y León', poblacion: 300000, zonas: ['Centro', 'Delicias', 'Parquesol', 'Huerta del Rey', 'La Victoria'] },
  { slug: 'cordoba', nombre: 'Córdoba', comunidad: 'Andalucía', poblacion: 325000, zonas: ['Centro', 'Levante', 'Poniente-Sur', 'Norte-Sierra', 'Fuensanta'] },
  { slug: 'granada', nombre: 'Granada', comunidad: 'Andalucía', poblacion: 232000, zonas: ['Centro', 'Zaidín', 'Chana', 'Albaicín', 'Ronda', 'Genil'] },
];
```

#### Estructura de una landing por ciudad

```
/servicios/limpieza-comunidades/barcelona/

H1: Limpieza de comunidades en Barcelona
   └─ keyword local en H1

Meta title: Limpieza de comunidades en Barcelona | Presupuesto gratis — Comunidad Integral
Meta description: Empresas de limpieza de comunidades en Barcelona. Compara presupuestos gratis.
   Servicio en Eixample, Gràcia, Sarrià, Sant Martí y toda Barcelona.

SECCIONES:
1. Hero — "Limpieza de comunidades en Barcelona" + CTA + mención barrios
2. ¿Por qué contratar limpieza profesional en [ciudad]? — contenido localizado
3. Zonas donde operamos — lista de barrios/distritos con mención SEO
4. Precios en [ciudad] — misma tabla que pillar pero con contexto local
5. Preguntas frecuentes locales — FAQ adaptadas (normativa local, convenio, etc.)
6. Formulario de presupuesto (ciudad pre-seleccionada)
7. Enlace de vuelta a pillar: "Ver más sobre limpieza de comunidades en España"

SCHEMA JSON-LD:
- LocalBusiness (con geo y areaServed)
- Service
- FAQPage
- BreadcrumbList: Inicio > Servicios > Limpieza comunidades > Barcelona

INTERNAL LINKS:
- Enlaza a pillar page padre (limpieza-comunidades)
- Enlaza a otras ciudades del mismo servicio ("También en Madrid, Valencia...")
- Enlaza a otros servicios en la misma ciudad ("¿Necesitas conserjería en Barcelona?")
- Enlaza a artículos de blog relevantes
```

#### Generación dinámica con generateStaticParams

```typescript
// src/app/servicios/[servicio]/[ciudad]/page.tsx

import { SERVICIOS } from '@/content/servicios';
import { CIUDADES } from '@/content/ciudades';

export async function generateStaticParams() {
  const params = [];
  for (const servicio of SERVICIOS) {
    for (const ciudad of CIUDADES) {
      params.push({
        servicio: servicio.slug,
        ciudad: ciudad.slug,
      });
    }
  }
  return params;
}

export async function generateMetadata({ params }) {
  const servicio = SERVICIOS.find(s => s.slug === params.servicio);
  const ciudad = CIUDADES.find(c => c.slug === params.ciudad);

  return {
    title: `${servicio.nombre} en ${ciudad.nombre} | Presupuesto gratis — Comunidad Integral`,
    description: `Empresas de ${servicio.nombre.toLowerCase()} en ${ciudad.nombre}. Compara presupuestos gratis. Servicio en ${ciudad.zonas.slice(0, 4).join(', ')} y toda ${ciudad.nombre}.`,
    alternates: {
      canonical: `https://comunidadintegral.com/servicios/${servicio.slug}/${ciudad.slug}/`,
    },
  };
}
```

#### Archivo de datos de ciudad: ejemplo

```typescript
// src/content/ciudades/barcelona.ts

import { Ciudad } from '@/types/ciudad';

export const barcelona: Ciudad = {
  slug: 'barcelona',
  nombre: 'Barcelona',
  comunidad: 'Cataluña',
  poblacion: 1660000,
  zonas: ['Eixample', 'Gràcia', 'Sarrià-Sant Gervasi', 'Sant Martí', 'Sants-Montjuïc', 'Les Corts', 'Horta-Guinardó', 'Ciutat Vella'],

  // Contenido localizado por servicio
  contenidoLocal: {
    'limpieza-comunidades': {
      intro: 'Barcelona cuenta con más de 70.000 comunidades de propietarios, desde fincas históricas del Eixample hasta edificios modernos del Poblenou. El clima mediterráneo y la cercanía al mar aceleran el desgaste de las zonas comunes, haciendo imprescindible un servicio de limpieza profesional y constante.',
      datoRelevante: 'El convenio colectivo de limpieza de edificios y locales de Catalunya establece condiciones específicas para la subrogación de personal.',
      precioContexto: 'Los precios en Barcelona tienden a ser un 10-15% superiores a la media nacional debido al coste de vida y los convenios autonómicos.',
    },
    'mantenimiento-comunidades': {
      intro: 'El parque inmobiliario de Barcelona incluye edificios con más de 100 años de antigüedad que requieren un mantenimiento preventivo especializado...',
      datoRelevante: 'La ITE (Inspección Técnica de Edificios) es obligatoria en Barcelona para edificios de más de 45 años.',
      precioContexto: 'El mantenimiento integral en Barcelona oscila entre 800€ y 3.000€/mes dependiendo del tamaño y antigüedad del edificio.',
    },
    // ... resto de servicios
  },
};
```

---

### Capa 3 — Blog (artículos MDX informativos)

Los artículos atacan keywords informacionales de cola larga, generan backlinks
naturales y enlazan internamente a pillar pages y landings locales.

#### Calendario editorial (revisado con datos reales de Ubersuggest — agosto 2026)

Publicar 2 artículos por semana, 1.500-2.500 palabras. Ordenado por prioridad real
(volumen de búsqueda × dificultad SEO), no por el orden intuitivo original que se
usó al planificar el proyecto por primera vez.

**Hallazgo clave:** la gran mayoría de estas keywords tienen un pico de búsqueda muy
fuerte en septiembre (x3-x8 el volumen normal) — las comunidades renuevan contratos
justo después del verano. Conviene publicar en julio/agosto para llegar indexados a tiempo.

| # | Título | Keyword principal | Vol/mes | SD | Nota |
|---|--------|-------------------|---------|-----|------|
| 1 | ITE: qué es y cuándo es obligatoria pasarla | ITE inspección técnica de edificios | 1.900 | 12 | ⭐ Máxima prioridad — volumen alto y constante todo el año, sin estacionalidad |
| 2 | ¿Qué es el Facility Services? Guía para comunidades | facility services | 1.000 | 11 | ⭐ Migración de post WordPress (antes "beneficios empresa servicios integrales...") |
| 3 | Mantenimiento de ascensores: normativa y obligaciones | mantenimiento de ascensores | 590 | 11 | ⭐ CPC alto (4,72€), señal de intención comercial fuerte |
| 4 | Mantenimiento de jardines en comunidades de vecinos | mantenimiento de jardines | 1.900 | 8 | ⭐ Migración de post WordPress (antes "riego por goteo automático", pivotado por bajo volumen/intención transaccional de la keyword original) |
| 5 | Guía completa de mantenimiento de comunidades | mantenimiento de comunidades | 390 | 8 | Incluye sección sobre presupuestos (fusiona el antiguo artículo "presupuesto de mantenimiento") |
| 6 | Cómo elegir empresa de conserjería para tu comunidad | empresa de conserjería | 480 | 10 | Pico en septiembre: 1.600. Incluye sección sobre contratación de servicios (fusiona el antiguo "cómo funciona la contratación...") |
| 7 | Convenio colectivo de limpieza de comunidades | convenio colectivo limpieza de edificios y locales | 320 | 16 | Estable todo el año |
| 8 | Limpieza de garajes comunitarios: normativa y precios | limpieza de garajes | 320 | 9 | Pico en septiembre: 1.300 |
| 9 | Limpieza de fachadas en comunidades: métodos y precios | limpieza de fachadas | 320 | 9 | Pico en septiembre: 1.000 |
| 10 | Limpieza de portales: frecuencia recomendada | limpieza de portales | 210 | 8 | Estable todo el año |
| 11 | ¿Qué hace un conserje de comunidad? Funciones | funciones de un conserje | 210 | 9 | Estable todo el año |
| 12 | Control de plagas en tu comunidad: obligaciones | control de plagas | 4.400 | 16 | Término amplio dominado por empresas de fumigación — mencionar como oportunidad secundaria dentro del artículo, no competir de frente por el término genérico |
| 13 | Presupuesto de limpieza para tu comunidad | presupuesto limpieza comunidad | 70 | 23 | Pico en septiembre: 390 |
| 14 | Gastos de la comunidad: cómo se reparten | gastos comunidad de propietarios | 30 | 6 | Volumen bajo pero dificultad mínima |
| 15 | Reformas en comunidades: permisos y mayorías necesarias | reformas comunidades | 40 | 25 | Volumen bajo, dificultad media |
| 16 | Mantenimiento de piscinas comunitarias: guía completa | mantenimiento de piscinas comunitarias | 40 | 14 | El término amplio "mantenimiento de piscinas" tiene 2.400 vol pero SD 26 (dominado por piscinas privadas) — quedarnos en el nicho específico por ahora |
| 17 | Eficiencia energética en tu comunidad | eficiencia energética edificios | 260 | 41 | Dificultad alta, prioridad baja — dominado por certificadoras y administraciones |
| 18 | Certificado energético en comunidades de propietarios | certificado energético edificio | 110 | 39 | Dificultad alta — fusionar contenido con el #17 si el ritmo de publicación lo requiere |

**Artículos descartados del calendario original** (0 volumen de búsqueda sin sustituto viable):
- "Presupuesto de mantenimiento para comunidades" → contenido fusionado en el artículo #5
- "¿Cómo funciona la contratación de servicios en una comunidad?" → contenido fusionado en el artículo #6

**Nota sobre "riego por goteo automático":** la keyword literal casi no tiene volumen
(210 búsquedas) y su intención es transaccional (la gente busca comprar un kit en
tiendas como Leroy Merlín, no contratar un servicio) — mal encaje para este negocio.
Por eso el artículo de migración del post antiguo de WordPress sobre este tema se
reenfocó hacia "mantenimiento de jardines" (1.900 vol, intención informacional
correcta), incluyendo el riego automático como una sección dentro del artículo en
vez de como el tema central. Slug actualizado en next.config.ts:
`/beneficios-riego-goteo-automatico/` → `/blog/mantenimiento-jardines-comunidades/`

#### Estructura de artículo MDX

```mdx
---
title: "¿Cuánto cuesta la limpieza de una comunidad de vecinos? Precios 2026"
description: "Guía de precios actualizada para la limpieza de comunidades en España. Portales, escaleras, garajes, zonas comunes. Compara y ahorra."
date: "2026-08-10"
author: "Comunidad Integral"
category: "limpieza"
tags: ["limpieza", "precios", "comunidades", "presupuestos"]
keywordPrincipal: "precio limpieza comunidad vecinos"
pillarRelacionada: "limpieza-comunidades"
ciudadesRelacionadas: ["madrid", "barcelona", "valencia"]
readingTime: 8
---

# ¿Cuánto cuesta la limpieza de una comunidad de vecinos?

El coste de la limpieza de una comunidad de vecinos depende de varios factores...

## Factores que influyen en el precio

### Tamaño de la comunidad
...

### Frecuencia del servicio
...

## Tabla de precios orientativos 2026

<PreciosTable servicio="limpieza-comunidades" />

## Precios por ciudad

<CiudadesPrecios servicio="limpieza-comunidades" ciudades={["madrid", "barcelona", "valencia", "sevilla"]} />

## Cómo solicitar presupuesto

<CTAPresupuesto servicio="limpieza-comunidades" />

## Preguntas frecuentes

<FAQSection servicio="limpieza-comunidades" limit={3} />
```

---

## Mapa de enlaces internos (critical)

La clave del SEO es el internal linking entre las 3 capas. Cada página debe enlazar
a sus vecinas formando una malla densa.

```
                         HOME
                          │
              ┌───────────┼───────────┐
              │           │           │
         /servicios/    /blog/     /empleo/
              │           │
    ┌────┬────┼────┬────┐ │
    │    │    │    │    │ │
  limp mant cons ref  jar│
    │    │    │    │    │ │
    │    │    │    │    │ │    ← Pillar pages se enlazan ENTRE SÍ
    │    │    │    │    │ │       ("¿Necesitas también conserjería?")
    │    │    │    │    │ │
    │    ├────┼────┤    │ │
    │    │    │    │    │ │
  ┌─┼──┬─┼──┬─┼──┬─┼──┬─┼─┐
  │mad│bcn│vlc│sev│mlg│... │  ← Landings ciudades enlazan a pillar padre
  └───┴───┴───┴───┴───┴───┘      y a otras ciudades del mismo servicio
                                 y a otros servicios en la misma ciudad
                          │
                     /blog/articulo
                          │
                 Artículos enlazan a:
                 - Pillar page del servicio mencionado
                 - Landing de ciudad si mencionan una
                 - Formulario de presupuesto
                 - Otros artículos relacionados
```

### Reglas de enlazado interno

1. Cada pillar page enlaza a TODAS sus landings de ciudad (grid al final)
2. Cada pillar page enlaza a las otras 5 pillar pages ("Otros servicios")
3. Cada landing de ciudad enlaza a su pillar page padre
4. Cada landing de ciudad enlaza a 3-4 otras ciudades del mismo servicio
5. Cada landing de ciudad enlaza a otros servicios en la misma ciudad
6. Cada artículo del blog enlaza a 1-2 pillar pages relevantes
7. Cada artículo del blog enlaza a 1-2 landings de ciudad si es pertinente
8. El footer tiene enlaces a todas las pillar pages
9. El formulario de presupuesto aparece en toda página de servicio

---

## Schema.org JSON-LD por tipo de página

### Home

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Comunidad Integral",
  "url": "https://comunidadintegral.com",
  "logo": "https://comunidadintegral.com/logo.svg",
  "description": "Servicios integrales de mantenimiento, limpieza y conserjería para comunidades de vecinos en España.",
  "areaServed": { "@type": "Country", "name": "España" },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-605-201-872",
    "email": "servicios@comunidadintegral.com",
    "contactType": "customer service",
    "availableLanguage": "Spanish"
  }
}
```

### Pillar page (servicio nacional)

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Limpieza de comunidades de vecinos",
  "description": "...",
  "provider": { "@type": "Organization", "name": "Comunidad Integral" },
  "areaServed": { "@type": "Country", "name": "España" },
  "serviceType": "Limpieza de comunidades"
}
```

### Landing page por ciudad

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Comunidad Integral — Limpieza de comunidades en Barcelona",
  "description": "...",
  "areaServed": { "@type": "City", "name": "Barcelona" },
  "address": { "@type": "PostalAddress", "addressLocality": "Barcelona", "addressCountry": "ES" },
  "geo": { "@type": "GeoCoordinates", "latitude": 41.3851, "longitude": 2.1734 }
}
```

---

## Base de datos Supabase (schema inicial)

```sql
-- Leads (solicitudes de presupuesto)
CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  comunidad TEXT,
  direccion TEXT,
  ciudad TEXT,
  servicios TEXT[] DEFAULT '{}',
  descripcion TEXT,
  urgencia TEXT DEFAULT 'media',
  documento_url TEXT,
  fuente TEXT DEFAULT 'web',
  estado TEXT DEFAULT 'nuevo',
  valor_estimado NUMERIC,
  notas TEXT
);

-- CVs (candidatos)
CREATE TABLE candidatos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  email TEXT NOT NULL,
  telefono TEXT,
  puesto TEXT,
  experiencia TEXT,
  zona TEXT,
  disponibilidad TEXT,
  cv_url TEXT,
  descripcion TEXT,
  activo BOOLEAN DEFAULT true
);

-- Empresas (marketplace)
CREATE TABLE empresas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  nombre TEXT NOT NULL,
  cif TEXT,
  email TEXT NOT NULL,
  telefono TEXT,
  servicios TEXT[] DEFAULT '{}',
  ciudades TEXT[] DEFAULT '{}',
  verificada BOOLEAN DEFAULT false,
  plan TEXT DEFAULT 'basico',
  descripcion TEXT,
  logo_url TEXT
);

-- Blog (metadatos, el contenido está en MDX)
CREATE TABLE blog_views (
  slug TEXT PRIMARY KEY,
  views INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

---

## SEO técnico checklist

- [ ] `trailingSlash: true` en next.config.ts
- [ ] Google Search Console verificado (meta tag: `M6h6EK7Z9tk7-x1cFqpvIWtl5Yt3RVHIDhpOeEaBRxE`)
- [ ] Sitemap XML dinámico con TODAS las URLs (pillar + ciudad + blog)
- [ ] robots.txt permitiendo todo excepto /api/ y /empresas/dashboard/
- [ ] Canonical URLs en cada página
- [ ] Open Graph image por defecto y por página
- [ ] Schema.org JSON-LD en cada tipo de página
- [ ] H1 único por página con keyword principal
- [ ] Meta title ≤ 60 chars, meta description ≤ 155 chars
- [ ] Alt text en todas las imágenes
- [ ] Breadcrumbs con BreadcrumbList schema
- [ ] Internal links siguiendo las reglas del mapa de enlaces
- [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms
- [ ] Imágenes next/image con lazy loading y formatos modernos (WebP/AVIF)
- [ ] 301 redirects de todas las URLs antiguas de WordPress
- [ ] hreflang solo si se expande a otros idiomas (no necesario aún)

---

## Orden de ejecución paso a paso

### Paso 1: Setup del proyecto (día 1-2)

```bash
npx create-next-app@latest comunidad-integral --typescript --tailwind --app --src-dir
cd comunidad-integral
npm install @supabase/supabase-js @supabase/ssr
npm install @next/mdx @mdx-js/loader @mdx-js/react
npm install lucide-react clsx tailwind-merge
npm install next-sitemap          # para generar sitemap
```

Crear estructura de carpetas como se indica arriba.
Configurar `next.config.ts` con `trailingSlash` y redirects.
Configurar Tailwind con la paleta de colores del proyecto.
Configurar MDX en `next.config.ts`.

### Paso 2: Layout global y componentes base (día 2-4)

Implementar `Header`, `Footer`, `MobileMenu`.
Crear componentes UI base: `Button`, `Card`, `Badge`, `Input`.
Implementar `Breadcrumbs` dinámicos.
Crear layout responsive (mobile-first).

### Paso 3: Home page (día 4-6)

Implementar Hero con CTA prominente.
Grid de servicios con iconos y enlaces a pillar pages.
Sección de testimonios (reusar los 3 que ya existen en WordPress).
Formulario de presupuesto rápido inline.
Schema.org Organization.

### Paso 4: Pillar pages de servicios (día 6-10)

Crear archivos de datos en `src/content/servicios/`.
Implementar `src/app/servicios/[servicio]/page.tsx`.
Implementar componentes: `PillarHero`, `FAQSection`, `PreciosEstimados`, `CiudadesGrid`.
Schema.org Service + FAQPage.
Probar las 6 pillar pages.

### Paso 5: Landing pages por ciudad (día 10-14)

Crear archivos de datos en `src/content/ciudades/`.
Implementar `src/app/servicios/[servicio]/[ciudad]/page.tsx`.
Implementar `generateStaticParams()` para las 84 combinaciones.
Contenido localizado para las ciudades principales (Madrid, Barcelona, Valencia, Sevilla).
Contenido genérico para el resto (se mejora iterativamente).
Schema.org LocalBusiness.

### Paso 6: Blog (día 14-18)

Configurar MDX pipeline completo.
Crear componentes MDX custom (`MDXComponents.tsx`).
Escribir primeros 5 artículos.
Implementar listado con paginación.
Schema.org Article + BreadcrumbList.

### Paso 7: Formularios y API (día 18-22)

Implementar formulario de presupuesto multi-paso.
Implementar formulario de CV para empleo.
Crear API routes en Next.js para leads y CVs.
Conectar con Supabase para persistir datos.
Email de confirmación automático con Resend.

### Paso 8: Redirects y verificación SEO (día 22-24)

Verificar TODOS los 301 redirects desde URLs de WordPress.
Generar sitemap XML con todas las URLs nuevas.
Enviar sitemap a Google Search Console.
Verificar Schema.org con Google Rich Results Test.
Verificar Core Web Vitals con Lighthouse.

### Paso 9: Páginas complementarias (día 24-28)

Página de empleo (`/empleo/`).
Página "Para empresas" (`/empresas/`).
Página de presupuesto dedicada (`/presupuesto/`).
Política de privacidad, aviso legal, cookies.

### Paso 10: Deploy y monitorización (día 28-30)

Deploy en Vercel conectado al dominio `comunidadintegral.com`.
Configurar DNS en Hostinger → Vercel.
Verificar que NO hay errores 404 en URLs antiguas.
Monitorizar Google Search Console diariamente durante 2 semanas.
Monitorizar Core Web Vitals en producción.

---

## Nota sobre el SaaS (fase posterior)

El SaaS CRM con IA se implementa DESPUÉS de que la web pública esté
funcionando y generando leads. Compartirá el mismo monorepo Next.js pero
vivirá bajo rutas protegidas (`/app/` o similar) con autenticación Supabase.

La prioridad es: web → leads → marketplace → SaaS.
Cada fase se alimenta de la anterior.
