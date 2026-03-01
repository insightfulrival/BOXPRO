'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('cta');

  return (
    <section className="relative py-20 md:py-28 overflow-hidden" style={{ background: '#4A4A4A' }}>
      {/* Diagonal stripe pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.06) 40px, rgba(255,255,255,0.06) 80px)',
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          style={{ color: '#FFFFFF' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t('title')}
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl mb-10"
          style={{ color: 'rgba(255, 255, 255, 0.8)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          {t('subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {/* Mobile: buton Suna Acum */}
          <div className="md:hidden">
            <a
              href="tel:+40740000000"
              className="inline-flex items-center gap-3 font-heading font-bold text-lg px-10 py-4 rounded-lg transition-colors"
              style={{ background: '#FEFEFE', color: '#1A1A1A' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                />
              </svg>
              {t('button')}
            </a>
          </div>

          {/* Desktop: buton Email + numar de telefon afisat */}
          <div className="hidden md:flex flex-col items-center gap-4">
            <a
              href="mailto:contact@boxpro.ro"
              className="inline-flex items-center gap-3 font-heading font-bold text-lg px-10 py-4 rounded-lg transition-colors"
              style={{ background: '#FEFEFE', color: '#1A1A1A' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              {t('buttonEmail')}
            </a>
            <p className="flex items-center gap-2 text-lg font-medium" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              {t('phone')}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
