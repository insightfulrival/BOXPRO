'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

export default function Hero() {
  const t = useTranslations('hero');

  const titleWords = t('title').split(' ');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark to-dark-lighter" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Title */}
        <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
          {titleWords.map((word, i) => (
            <motion.span
              key={i}
              className={`inline-block mr-[0.3em] ${
                i === 0 ? 'text-primary' : 'text-white'
              }`}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: i * 0.15,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-medium max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: titleWords.length * 0.15 + 0.2,
          }}
        >
          {t('subtitle')}
        </motion.p>

        {/* CTA */}
        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: titleWords.length * 0.15 + 0.5,
          }}
        >
          <Button href="tel:+40700000000" variant="primary" className="text-lg px-10 py-4">
            {t('cta')}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
