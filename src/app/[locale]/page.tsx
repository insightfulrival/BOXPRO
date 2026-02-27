import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import WhyUs from '@/components/landing/WhyUs';
import Offers from '@/components/landing/Offers';
import CTASection from '@/components/landing/CTASection';
import RecentProjects from '@/components/landing/RecentProjects';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/layout/Footer';
import MobileCallButton from '@/components/layout/MobileCallButton';
import ScrollToTop from '@/components/ui/ScrollToTop';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <WhyUs />
        <Offers />
        <CTASection />
        <RecentProjects />
        <HowItWorks />
      </main>
      <Footer />
      <MobileCallButton />
      <ScrollToTop />
    </>
  );
}
