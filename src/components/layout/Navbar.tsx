'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Button from '@/components/ui/Button';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const links = [
    { href: '/' as const, label: t('home') },
    { href: '/gallery' as const, label: t('gallery') },
  ];

  function switchLocale(newLocale: 'ro' | 'en') {
    router.replace(pathname, { locale: newLocale });
    setMobileOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-primary font-heading text-2xl font-bold tracking-tight">
              BOXPRO
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Locale switcher */}
            <div className="flex items-center gap-1 text-sm">
              <button
                onClick={() => switchLocale('ro')}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  locale === 'ro'
                    ? 'text-primary font-bold'
                    : 'text-gray-medium hover:text-white'
                }`}
              >
                RO
              </button>
              <span className="text-gray-medium">/</span>
              <button
                onClick={() => switchLocale('en')}
                className={`px-2 py-1 rounded cursor-pointer transition-colors ${
                  locale === 'en'
                    ? 'text-primary font-bold'
                    : 'text-gray-medium hover:text-white'
                }`}
              >
                EN
              </button>
            </div>

            <Button href="tel:+40700000000" variant="primary">
              {t('callNow')}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-white/10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <div className="px-4 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white hover:text-primary transition-colors text-lg font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile locale switcher */}
              <div className="flex items-center gap-2 text-sm">
                <button
                  onClick={() => switchLocale('ro')}
                  className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    locale === 'ro'
                      ? 'bg-primary text-dark font-bold'
                      : 'text-gray-medium hover:text-white'
                  }`}
                >
                  RO
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={`px-3 py-1.5 rounded cursor-pointer transition-colors ${
                    locale === 'en'
                      ? 'bg-primary text-dark font-bold'
                      : 'text-gray-medium hover:text-white'
                  }`}
                >
                  EN
                </button>
              </div>

              <Button href="tel:+40700000000" variant="primary" className="mt-2">
                {t('callNow')}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
