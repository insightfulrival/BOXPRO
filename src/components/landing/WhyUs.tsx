'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

const benefits = [
  { key: 'speed', icon: '\u26A1' },
  { key: 'quality', icon: '\uD83C\uDFC6' },
  { key: 'custom', icon: '\uD83D\uDD27' },
  { key: 'price', icon: '\uD83D\uDCB0' },
] as const;

export default function WhyUs() {
  const t = useTranslations('whyUs');

  return (
    <SectionWrapper className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefits.map((benefit, i) => (
          <motion.div
            key={benefit.key}
            className="bg-dark-lighter rounded-xl p-6 text-center border border-white/5 hover:border-primary/30 transition-colors"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-4xl mb-4">{benefit.icon}</div>
            <h3 className="font-heading text-primary text-lg font-bold mb-2">
              {t(benefit.key)}
            </h3>
            <p className="text-gray-medium text-sm leading-relaxed">
              {t(`${benefit.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
