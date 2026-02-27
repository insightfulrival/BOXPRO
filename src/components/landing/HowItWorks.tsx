'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

const steps = [
  { num: 1, key: 'step1' },
  { num: 2, key: 'step2' },
  { num: 3, key: 'step3' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <SectionWrapper className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {steps.map((step, i) => (
          <motion.div
            key={step.key}
            className="text-center"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            {/* Number circle */}
            <motion.div
              className="w-16 h-16 bg-primary text-dark rounded-full flex items-center justify-center text-2xl font-heading font-bold mx-auto mb-5"
              initial={{ scale: 0 }}
              whileInView={{ scale: [0, 1.2, 1] }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
            >
              {step.num}
            </motion.div>

            <h3 className="font-heading text-xl font-bold text-white mb-3">
              {t(step.key)}
            </h3>
            <p className="text-gray-medium text-sm leading-relaxed max-w-xs mx-auto">
              {t(`${step.key}Desc`)}
            </p>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
