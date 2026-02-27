'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const steps = [
  { num: '01', key: 'step1' },
  { num: '02', key: 'step2' },
  { num: '03', key: 'step3' },
] as const;

export default function HowItWorks() {
  const t = useTranslations('howItWorks');

  return (
    <section className="py-24 md:py-32 relative">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(180deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('title')}
          </h2>
        </motion.div>

        {/* Steps with connecting line */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div
            className="hidden md:block absolute h-px left-[16.67%] right-[16.67%]"
            style={{ top: '40px', background: 'rgba(255, 255, 255, 0.06)' }}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.key}
                className="text-center relative"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Number circle */}
                <motion.div
                  className="relative z-10 w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
                  style={{
                    background: '#0F0F0F',
                    border: '2px solid rgba(245, 166, 35, 0.25)',
                    boxShadow: '0 0 25px rgba(245, 166, 35, 0.08)',
                  }}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 20,
                    delay: i * 0.2 + 0.2,
                  }}
                >
                  <span className="text-primary font-heading text-xl font-bold">{step.num}</span>
                </motion.div>

                <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-3">
                  {t(step.key)}
                </h3>
                <p className="text-gray-medium text-sm leading-relaxed max-w-xs mx-auto">
                  {t(`${step.key}Desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
