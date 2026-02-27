'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import SectionWrapper from '@/components/ui/SectionWrapper';

const categories = [
  {
    key: 'housing',
    gradient: 'from-orange-600/80 to-orange-900/80',
  },
  {
    key: 'offices',
    gradient: 'from-blue-600/80 to-blue-900/80',
  },
  {
    key: 'storage',
    gradient: 'from-green-600/80 to-green-900/80',
  },
  {
    key: 'custom',
    gradient: 'from-purple-600/80 to-purple-900/80',
  },
] as const;

export default function Offers() {
  const t = useTranslations('offers');

  return (
    <SectionWrapper className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
        {t('title')}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.key}
            className={`relative aspect-[16/9] rounded-xl overflow-hidden bg-gradient-to-br ${cat.gradient} flex items-end cursor-pointer`}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="relative z-10 p-6">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-white">
                {t(cat.key)}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
