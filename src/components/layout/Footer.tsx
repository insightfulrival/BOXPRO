import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/5" style={{ background: '#080808' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Image
              src="/logo.png"
              alt="BOXPRO - Containere Modulare Premium Romania"
              width={200}
              height={55}
              className="h-12 w-auto"
            />
            <p className="text-gray-medium mt-4 text-sm leading-relaxed max-w-sm">
              {t('tagline')}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-white font-bold text-sm uppercase tracking-[0.15em] mb-4">
              {t('navigation')}
            </h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-gray-medium hover:text-primary transition-colors text-sm">
                {tNav('home')}
              </Link>
              <Link href="/gallery" className="text-gray-medium hover:text-primary transition-colors text-sm">
                {tNav('gallery')}
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-white font-bold text-sm uppercase tracking-[0.15em] mb-4">
              {t('contact')}
            </h4>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+40700000000"
                className="text-gray-medium hover:text-primary transition-colors text-sm"
              >
                +40 700 000 000
              </a>
              <a
                href="mailto:contact@boxpro.ro"
                className="text-gray-medium hover:text-primary transition-colors text-sm"
              >
                contact@boxpro.ro
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-6 border-t border-white/5 text-center">
          <p className="text-xs" style={{ color: 'rgba(136, 136, 136, 0.5)' }}>
            &copy; {year} BOXPRO. {t('rights')}.
          </p>
        </div>
      </div>
    </footer>
  );
}
