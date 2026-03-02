import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import WhyUs from '@/components/landing/WhyUs';
import CTASection from '@/components/landing/CTASection';
import RecentProjects from '@/components/landing/RecentProjects';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/layout/Footer';
import ScrollToTop from '@/components/ui/ScrollToTop';

const SITE_URL = 'https://boxpro.ro';

function ProductJsonLd({ locale }: { locale: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name:
      locale === 'ro'
        ? 'Containere Modulare BOXPRO'
        : 'BOXPRO Modular Containers',
    description:
      locale === 'ro'
        ? 'Containere modulare de calitate premium pentru locuinte, birouri si depozite. Personalizabile, eficiente energetic, livrare rapida.'
        : 'Premium quality modular containers for housing, offices and storage. Customizable, energy efficient, fast delivery.',
    brand: { '@type': 'Brand', name: 'BOXPRO' },
    category:
      locale === 'ro' ? 'Containere Modulare' : 'Modular Containers',
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '8000',
      highPrice: '85000',
      offerCount: '4',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <ProductJsonLd locale={locale} />
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyUs />
        <CTASection />
        <RecentProjects />
        <HowItWorks />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
