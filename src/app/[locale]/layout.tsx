import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Space_Grotesk } from 'next/font/google';
import { routing } from '@/i18n/routing';
import type { Metadata } from 'next';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

const SITE_URL = 'https://boxpro.ro';

const localeMeta = {
  ro: {
    title: 'BOXPRO | Containere Modulare Premium in Romania - Locuinte, Birouri, Depozite',
    description:
      'BOXPRO - Producator de containere modulare de calitate premium in Romania. Locuinte modulare, birouri container, depozite si solutii custom. Livrare rapida, preturi competitive. Suna acum!',
    keywords:
      'containere modulare, case modulare, container birou, container locuibil, containere modulare Romania, case container, containere de locuit, containere modulare pret, container modular birou, depozit container, containere personalizate, BOXPRO',
  },
  en: {
    title: 'BOXPRO | Premium Modular Containers in Romania - Housing, Offices, Storage',
    description:
      'BOXPRO - Premium modular container manufacturer in Romania. Modular homes, container offices, storage units and custom solutions. Fast delivery, competitive prices. Call now!',
    keywords:
      'modular containers, modular homes, container office, container housing, modular containers Romania, container homes, shipping container buildings, modular container price, custom containers, BOXPRO',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = localeMeta[locale as keyof typeof localeMeta] || localeMeta.ro;

  const alternateLanguages: Record<string, string> = {};
  for (const loc of routing.locales) {
    alternateLanguages[loc] = `${SITE_URL}/${loc}`;
  }

  return {
    title: {
      default: m.title,
      template: `%s | BOXPRO`,
    },
    description: m.description,
    keywords: m.keywords,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: `${SITE_URL}/${locale}`,
      languages: alternateLanguages,
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${locale}`,
      siteName: 'BOXPRO',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt:
            locale === 'ro'
              ? 'BOXPRO - Containere Modulare Premium'
              : 'BOXPRO - Premium Modular Containers',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: [`${SITE_URL}/og-image.png`],
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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'BOXPRO',
    description:
      locale === 'ro'
        ? 'Producator de containere modulare de calitate premium in Romania. Locuinte modulare, birouri container, depozite si solutii custom.'
        : 'Premium modular container manufacturer in Romania. Modular homes, container offices, storage units and custom solutions.',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-image.png`,
    telephone: '+40740000000',
    email: 'contact@boxpro.ro',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'RO',
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
  };

  const webSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'BOXPRO',
    url: SITE_URL,
    inLanguage: ['ro', 'en'],
    publisher: {
      '@type': 'Organization',
      name: 'BOXPRO',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  return (
    <html lang={locale} className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
      </head>
      <body className="bg-dark text-foreground font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
