'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function MobileCallButton() {
  const t = useTranslations('nav');

  return (
    <motion.a
      href="tel:+40700000000"
      className="fixed bottom-4 left-4 right-4 z-50 md:hidden flex items-center justify-center gap-2 bg-primary text-white font-heading font-bold text-lg py-4 rounded-xl shadow-lg"
      animate={{ scale: [1, 1.02, 1] }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
      {t('callNow')}
    </motion.a>
  );
}
