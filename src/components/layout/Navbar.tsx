'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import Image from 'next/image';
import Button from '@/components/ui/Button';

function FlagRO({ className = 'w-6 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 30 20" className={className}>
      <rect width="10" height="20" fill="#002B7F" />
      <rect x="10" width="10" height="20" fill="#FCD116" />
      <rect x="20" width="10" height="20" fill="#CE1126" />
    </svg>
  );
}

function FlagEN({ className = 'w-6 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 30" className={className}>
      <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  );
}

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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-foreground/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/logo.png"
              alt="BOXPRO - Containere Modulare"
              width={280}
              height={75}
              className="h-16 md:h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            {/* Locale switcher with flags */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => switchLocale('ro')}
                className={`p-1 rounded cursor-pointer transition-all ${
                  locale === 'ro'
                    ? 'ring-2 ring-primary scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
                aria-label="Romana"
              >
                <FlagRO />
              </button>
              <button
                onClick={() => switchLocale('en')}
                className={`p-1 rounded cursor-pointer transition-all ${
                  locale === 'en'
                    ? 'ring-2 ring-primary scale-110'
                    : 'opacity-50 hover:opacity-100'
                }`}
                aria-label="English"
              >
                <FlagEN />
              </button>
            </div>

            <Button href="tel:+40700000000" variant="primary">
              {t('callNow')}
            </Button>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <a
              href="tel:+40700000000"
              className="p-2 rounded-lg bg-primary text-white"
              aria-label="Call"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
            </a>
            <button
              className="flex flex-col gap-1.5 p-2 cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
            <motion.span
              className="block w-6 h-0.5 bg-foreground"
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-foreground"
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-foreground"
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
            />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-foreground/10"
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
                  className="text-foreground hover:text-primary transition-colors text-lg font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* Mobile locale switcher with flags */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => switchLocale('ro')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    locale === 'ro'
                      ? 'bg-primary/10 ring-1 ring-primary'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <FlagRO className="w-7 h-5" />
                  <span className={`text-sm ${locale === 'ro' ? 'text-primary font-bold' : 'text-gray-medium'}`}>Romana</span>
                </button>
                <button
                  onClick={() => switchLocale('en')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-all ${
                    locale === 'en'
                      ? 'bg-primary/10 ring-1 ring-primary'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <FlagEN className="w-7 h-5" />
                  <span className={`text-sm ${locale === 'en' ? 'text-primary font-bold' : 'text-gray-medium'}`}>English</span>
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
