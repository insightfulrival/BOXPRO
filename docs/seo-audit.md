# BOXPRO SEO Audit & Implementation Guide

## Current State Summary

### Issues Found
1. **No robots.txt** - Search engines have no crawling guidance
2. **No sitemap.xml** - Search engines cannot discover all pages
3. **Minimal metadata** - Only root layout has basic title/description; no per-page metadata
4. **No Open Graph / Twitter cards** - No social media previews
5. **No structured data (JSON-LD)** - No rich snippets in search results
6. **No hreflang tags** - Google cannot associate RO/EN page versions
7. **No canonical URLs** - Risk of duplicate content issues
8. **Missing alt texts** - Video has no accessible alternative; SVG icons have no labels
9. **Heading hierarchy is acceptable** - H1 on homepage, H2 for sections, H3 for cards (good)
10. **No page-level metadata** - Gallery page has no title/description

---

## PRIORITY 1: Critical (Implement First)

### 1.1 Per-Page Metadata

#### Homepage (`src/app/[locale]/page.tsx`)

Add a `generateMetadata` function. Since this is the locale-aware page, metadata should be locale-specific.

Create a new file `src/app/[locale]/metadata.ts` OR add directly to `src/app/[locale]/layout.tsx`:

```typescript
// src/app/[locale]/layout.tsx - ADD this export
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    ro: {
      title: 'BOXPRO | Containere Modulare Premium in Romania - Locuinte, Birouri, Depozite',
      description: 'BOXPRO - Producator de containere modulare de calitate premium in Romania. Locuinte modulare, birouri container, depozite si solutii custom. Livrare rapida, preturi competitive. Suna acum!',
      keywords: 'containere modulare, case modulare, container birou, container locuibil, containere modulare Romania, case container, containere de locuit, containere modulare pret, container modular birou, depozit container, containere personalizate, BOXPRO',
    },
    en: {
      title: 'BOXPRO | Premium Modular Containers in Romania - Housing, Offices, Storage',
      description: 'BOXPRO - Premium modular container manufacturer in Romania. Modular homes, container offices, storage units and custom solutions. Fast delivery, competitive prices. Call now!',
      keywords: 'modular containers, modular homes, container office, container housing, modular containers Romania, container homes, shipping container buildings, modular container price, custom containers, BOXPRO',
    },
  };

  const m = meta[locale as 'ro' | 'en'] || meta.ro;
  const baseUrl = 'https://boxpro.ro';
  const url = locale === 'ro' ? baseUrl : `${baseUrl}/en`;

  return {
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    alternates: {
      canonical: url,
      languages: {
        'ro': baseUrl,
        'en': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: 'BOXPRO',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: locale === 'ro' ? 'BOXPRO - Containere Modulare Premium' : 'BOXPRO - Premium Modular Containers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${baseUrl}/og-image.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
```

#### Gallery Page (`src/app/[locale]/gallery/page.tsx`)

Add at the top of the file:

```typescript
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;

  const meta = {
    ro: {
      title: 'Galerie Proiecte | BOXPRO - Containere Modulare Finalizate',
      description: 'Descopera proiectele BOXPRO finalizate: containere modulare transformate in locuinte moderne, birouri profesionale si depozite. Vezi portofoliul nostru complet.',
    },
    en: {
      title: 'Project Gallery | BOXPRO - Completed Modular Containers',
      description: 'Discover completed BOXPRO projects: modular containers transformed into modern homes, professional offices and storage units. View our complete portfolio.',
    },
  };

  const m = meta[locale as 'ro' | 'en'] || meta.ro;
  const baseUrl = 'https://boxpro.ro';

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${baseUrl}/${locale}/gallery`,
      languages: {
        'ro': `${baseUrl}/ro/gallery`,
        'en': `${baseUrl}/en/gallery`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${baseUrl}/${locale}/gallery`,
      siteName: 'BOXPRO',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
  };
}
```

#### Root Layout (`src/app/layout.tsx`)

Update the root layout metadata to be a sensible fallback:

```typescript
import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://boxpro.ro'),
  title: {
    default: 'BOXPRO | Containere Modulare Premium',
    template: '%s | BOXPRO',
  },
  description: 'Containere modulare de calitate premium. Locuinte, birouri, depozite.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};
```

### 1.2 JSON-LD Structured Data

Create a new component at `src/components/seo/JsonLd.tsx`:

```typescript
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'BOXPRO',
    description: 'Producator de containere modulare de calitate premium in Romania. Locuinte modulare, birouri container, depozite si solutii custom.',
    url: 'https://boxpro.ro',
    logo: 'https://boxpro.ro/logo.png',
    image: 'https://boxpro.ro/og-image.jpg',
    telephone: '+40740000000',
    email: 'contact@boxpro.ro',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
      addressLocality: 'Romania', // UPDATE with actual city
    },
    areaServed: {
      '@type': 'Country',
      name: 'Romania',
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
    sameAs: [
      // Add social media URLs when available
      // 'https://www.facebook.com/boxpro',
      // 'https://www.instagram.com/boxpro',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WebSiteJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BOXPRO',
    url: 'https://boxpro.ro',
    inLanguage: ['ro', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'BOXPRO',
      logo: {
        '@type': 'ImageObject',
        url: 'https://boxpro.ro/logo.png',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function ProductJsonLd({ locale }: { locale: string }) {
  const products = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: locale === 'ro' ? 'Container Modular Locuinta' : 'Modular Container Home',
      description: locale === 'ro'
        ? 'Containere modulare transformate in case moderne si confortabile. Personalizabile, eficiente energetic.'
        : 'Modular containers transformed into modern, comfortable homes. Customizable, energy efficient.',
      brand: { '@type': 'Brand', name: 'BOXPRO' },
      category: locale === 'ro' ? 'Containere Modulare' : 'Modular Containers',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'EUR',
        lowPrice: '8000',
        highPrice: '85000',
        offerCount: '4',
        availability: 'https://schema.org/InStock',
      },
    },
  ];

  return (
    <>
      {products.map((product, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
        />
      ))}
    </>
  );
}

export function BreadcrumbJsonLd({ items }: { items: { name: string; url: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

Add to the homepage (`src/app/[locale]/page.tsx`):

```typescript
import { OrganizationJsonLd, WebSiteJsonLd, ProductJsonLd } from '@/components/seo/JsonLd';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  return (
    <>
      <OrganizationJsonLd />
      <WebSiteJsonLd />
      <ProductJsonLd locale={locale} />
      <Navbar />
      <main>
        {/* ... existing sections */}
      </main>
      <Footer />
      <MobileCallButton />
      <ScrollToTop />
    </>
  );
}
```

### 1.3 robots.txt

Create `src/app/robots.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
    ],
    sitemap: 'https://boxpro.ro/sitemap.xml',
  };
}
```

### 1.4 sitemap.xml

Create `src/app/sitemap.ts`:

```typescript
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boxpro.ro';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ro: `${baseUrl}/ro`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/ro/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          ro: `${baseUrl}/ro/gallery`,
          en: `${baseUrl}/en/gallery`,
        },
      },
    },
  ];
}
```

### 1.5 Open Graph Image

Create or place an OG image at `public/og-image.jpg` (1200x630px). This should show:
- BOXPRO logo
- A hero image of a modular container
- Tagline: "Containere Modulare Premium"

---

## PRIORITY 2: Important

### 2.1 Target Keywords

#### Primary Keywords (RO) - High Intent:
| Keyword | Search Intent | Priority |
|---------|--------------|----------|
| containere modulare | Informational / Commercial | Very High |
| case modulare | Commercial | Very High |
| container birou | Commercial | High |
| container locuibil | Commercial | High |
| containere modulare pret | Transactional | Very High |
| case din containere | Informational / Commercial | High |
| containere de locuit | Commercial | High |
| container modular de vanzare | Transactional | High |

#### Secondary Keywords (RO):
| Keyword | Search Intent | Priority |
|---------|--------------|----------|
| containere modulare birou | Commercial | Medium |
| containere personalizate | Commercial | Medium |
| container depozitare | Commercial | Medium |
| case modulare pret Romania | Transactional | Medium |
| containere modulare locuinte | Commercial | Medium |
| containere santier | Commercial | Medium |
| container modular izolat | Informational | Medium |

#### Long-tail Keywords (RO):
| Keyword | Search Intent | Priority |
|---------|--------------|----------|
| containere modulare de locuit pret | Transactional | Medium |
| case din containere maritime | Informational | Medium |
| container birou modular de vanzare | Transactional | Medium |
| cat costa un container modular | Informational | High |
| containere modulare pentru turism | Commercial | Medium |
| container modular cu baie si bucatarie | Commercial | Medium |

#### English Keywords:
| Keyword | Search Intent | Priority |
|---------|--------------|----------|
| modular containers Romania | Commercial | High |
| container homes Romania | Commercial | High |
| prefabricated buildings Romania | Commercial | Medium |
| modular office containers | Commercial | Medium |
| shipping container conversion Romania | Commercial | Medium |

### 2.2 Heading Hierarchy Fixes

Current heading structure is mostly correct:
- **Homepage**: H1 ("Containere Modulare") -> H2 per section -> H3 for cards -- GOOD
- **Gallery**: H1 ("Galeria Noastra") -- GOOD

Minor improvements:
- The Stats section has no heading - consider adding a visually hidden H2 for accessibility
- Footer uses H4 which is fine for footer navigation

### 2.3 Image Alt Text Improvements

**Navbar logo** (`Navbar.tsx` line 60):
- Current: `alt="BOXPRO - Containere Modulare"` -- GOOD

**Footer logo** (`Footer.tsx` line 19):
- Current: `alt="BOXPRO"`
- Change to: `alt="BOXPRO - Containere Modulare Premium Romania"`

**ProjectCard images** (`ProjectCard.tsx` line 71):
- Current: `alt={photo.alt || title}` -- GOOD (uses project title as fallback)

**Hero video** (`Hero.tsx` line 124-134):
- Missing: No `<track>` element or fallback text for accessibility
- Add after the `<video>` tag: a visually hidden paragraph describing the video content

### 2.4 Canonical URLs and hreflang

Already handled in the metadata `alternates` field above (Section 1.1). The key configuration:

```typescript
alternates: {
  canonical: url,
  languages: {
    'ro': 'https://boxpro.ro',       // or /ro for non-default
    'en': 'https://boxpro.ro/en',
  },
},
```

Next.js will automatically generate the correct `<link rel="canonical">` and `<link rel="alternate" hreflang="...">` tags from this configuration.

### 2.5 Performance Optimizations

1. **Hero video**: Add `preload="metadata"` to the video tag to avoid loading the entire video file upfront. Consider also providing a poster image.

```tsx
<video
  ref={videoRef}
  src={VIDEO_URL}
  autoPlay
  muted
  loop
  playsInline
  preload="metadata"
  poster="/hero-poster.jpg"
  // ... rest of props
/>
```

2. **Font optimization**: Already using `next/font` -- GOOD
3. **Image optimization**: Already using `next/image` with proper `sizes` -- GOOD
4. **Consider adding `loading="lazy"`** to below-the-fold images (Next.js Image does this by default for non-priority images -- ALREADY GOOD)

---

## PRIORITY 3: Nice to Have

### 3.1 New Pages Recommendations

#### FAQ Page (`src/app/[locale]/faq/page.tsx`)
Create a FAQ page with common questions. Add these to `ro.json` and `en.json`:

**Romanian FAQs:**
1. "Cat costa un container modular?" - "Preturile variaza intre 8.000 EUR si 85.000 EUR in functie de dimensiune, finisaje si destinatie. Contactati-ne pentru o oferta personalizata."
2. "Cat dureaza livrarea unui container modular?" - "Timpul mediu de livrare este de 3-6 saptamani de la confirmarea comenzii."
3. "Se pot conecta containerele modulare?" - "Da, containerele noastre pot fi conectate pentru a crea spatii mai mari. Putem uni 2, 3 sau mai multe module."
4. "Containerele modulare au nevoie de autorizatie de constructie?" - "In functie de dimensiune si destinatie, poate fi necesara o autorizatie. Va ajutam cu intreaga documentatie."
5. "Ce garantie oferiti?" - "Oferim garantie de 2 ani pentru structura si 1 an pentru finisaje."
6. "Containerele sunt izolate termic?" - "Da, toate containerele noastre sunt izolate termic cu materiale de calitate, asigurand confort in orice anotimp."

This page would generate FAQPage rich snippets in Google search results using the `FAQJsonLd` component.

#### About Page (`src/app/[locale]/about/page.tsx`)
- Company story, mission, values
- Team photos
- Certifications and awards
- Builds trust and provides E-E-A-T signals (Experience, Expertise, Authoritativeness, Trustworthiness)

#### Services/Products Page (`src/app/[locale]/services/page.tsx`)
Dedicated pages for each service type:
- `/services/locuinte` - Container homes
- `/services/birouri` - Container offices
- `/services/depozite` - Storage containers
- `/services/custom` - Custom projects

Each with dedicated keywords, descriptions, pricing ranges, and project examples.

### 3.2 Content Strategy Suggestions

1. **Blog section** (`/blog`) with articles targeting long-tail keywords:
   - "Cat costa un container modular in 2026?" (targets high-intent price queries)
   - "Container modular vs casa traditionala - comparatie completa"
   - "Containere modulare pentru turism si glamping - ghid complet"
   - "Avantajele containerelor modulare pentru birouri"
   - "Procesul de transformare a unui container in locuinta"

2. **Case studies** for completed projects with:
   - Before/after photos
   - Client testimonials
   - Project specifications and timeline
   - Cost breakdown

### 3.3 Local SEO Recommendations

1. **Google Business Profile**:
   - Create and verify a Google Business Profile for BOXPRO
   - Category: "Modular home builder" or "Construction company"
   - Add photos, business hours, phone number, address
   - Encourage customer reviews
   - Post regular updates about projects

2. **NAP Consistency** (Name, Address, Phone):
   - Ensure the same business name, address, and phone number across all online listings
   - Add address to the website footer
   - Register on Romanian business directories (listafirme.ro, cylex.ro, romanianyellowpages.com)

3. **Romanian domain**: If not already using boxpro.ro, consider securing it - .ro domains get a ranking boost for Romanian searches.

### 3.4 Internal Linking Strategy

1. **From homepage sections to relevant pages**:
   - "Ce Oferim" cards should link to dedicated service pages (when created)
   - "Proiecte Recente" should link to individual project pages
   - Add a link from gallery back to homepage CTA

2. **Breadcrumb navigation**:
   - Implement breadcrumbs on Gallery and inner pages
   - Use the `BreadcrumbJsonLd` component for structured data

3. **Footer links**: Add links to FAQ, About, and Service pages when created

### 3.5 Additional Technical SEO

1. **Favicon set**: Ensure you have:
   - `/public/favicon.ico`
   - `/public/apple-touch-icon.png` (180x180)
   - `/public/favicon-32x32.png`
   - `/public/favicon-16x16.png`

2. **manifest.json** (`src/app/manifest.ts`):
```typescript
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BOXPRO - Containere Modulare Premium',
    short_name: 'BOXPRO',
    description: 'Containere modulare de calitate premium in Romania',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#F5A623',
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
```

---

## Implementation Checklist

### Phase 1 - Critical (Do Now)
- [ ] Add `generateMetadata` to `src/app/[locale]/layout.tsx` with full meta tags
- [ ] Add `generateMetadata` to `src/app/[locale]/gallery/page.tsx`
- [ ] Update root `src/app/layout.tsx` metadata with `metadataBase` and template
- [ ] Create `src/app/robots.ts`
- [ ] Create `src/app/sitemap.ts`
- [ ] Create `src/components/seo/JsonLd.tsx` with all schemas
- [ ] Add JSON-LD components to homepage
- [ ] Create/place `public/og-image.jpg` (1200x630)

### Phase 2 - Important (Do Soon)
- [ ] Update Footer logo alt text
- [ ] Add video poster image and preload attribute to Hero
- [ ] Verify canonical and hreflang tags render correctly
- [ ] Submit sitemap to Google Search Console
- [ ] Test structured data with Google Rich Results Test

### Phase 3 - Growth (Plan For)
- [ ] Create FAQ page with FAQPage schema
- [ ] Create About page
- [ ] Create individual service pages
- [ ] Set up Google Business Profile
- [ ] Register on Romanian business directories
- [ ] Plan blog content calendar
- [ ] Create internal linking between pages

---

## Competitor Analysis Notes

Key competitors identified:
- **rainzcube.ro** - Strong brand, investing 500K EUR in expansion, focuses on container homes and offices
- **containerul.ro** - Broad product range, good SEO with keyword-rich domain
- **casute-modulare.ro** - Targets geographic keywords (city names), good local SEO
- **containere-fdc.ro** - Manufacturing focus, good content depth
- **bogaxa.ro** - Price-focused messaging, targets "containere modulare preturi"
- **casa-modulara.ro** - Strong blog/content strategy with educational articles

### Differentiation Strategy for BOXPRO:
1. Focus on "premium quality" positioning - differentiate from budget competitors
2. Target "containere modulare premium" and quality-related keywords
3. Showcase completed projects with professional photography
4. Build trust through detailed case studies and certifications
5. Target the tourism/glamping niche which is rapidly growing
