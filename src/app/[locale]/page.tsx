import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/landing/Hero';
import WhyUs from '@/components/landing/WhyUs';
import Offers from '@/components/landing/Offers';
import RecentProjects from '@/components/landing/RecentProjects';
import HowItWorks from '@/components/landing/HowItWorks';
import Footer from '@/components/layout/Footer';
import MobileCallButton from '@/components/layout/MobileCallButton';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <WhyUs />
        <Offers />
        <RecentProjects />
        <HowItWorks />
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
