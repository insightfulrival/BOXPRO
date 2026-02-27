import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark-lighter border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <span className="text-primary font-heading text-2xl font-bold">
              BOXPRO
            </span>
            <p className="text-gray-medium mt-3 text-sm leading-relaxed">
              Containere modulare de calitate premium.
            </p>
          </div>

          {/* Phone */}
          <div>
            <h4 className="font-heading text-white font-bold mb-3">
              {t('phone')}
            </h4>
            <a
              href="tel:+40700000000"
              className="text-gray-medium hover:text-primary transition-colors"
            >
              +40 700 000 000
            </a>
          </div>

          {/* Email */}
          <div>
            <h4 className="font-heading text-white font-bold mb-3">
              {t('email')}
            </h4>
            <a
              href="mailto:contact@boxpro.ro"
              className="text-gray-medium hover:text-primary transition-colors"
            >
              contact@boxpro.ro
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 pt-6 border-t border-white/10 text-center text-gray-medium text-sm">
          &copy; {year} BOXPRO. {t('rights')}.
        </div>
      </div>
    </footer>
  );
}
