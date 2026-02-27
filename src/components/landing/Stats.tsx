'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useSpring, useInView } from 'motion/react';
import { useTranslations } from 'next-intl';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, { duration: 2000 });

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  useEffect(() => {
    const unsubscribe = spring.on('change', (v: number) => setDisplay(Math.round(v)));
    return unsubscribe;
  }, [spring]);

  return <span ref={ref}>{display}{suffix}</span>;
}

const stats = [
  { key: 'projects', value: 150, suffix: '+' },
  { key: 'years', value: 10, suffix: '+' },
  { key: 'satisfaction', value: 98, suffix: '%' },
  { key: 'delivery', value: 3, suffix: '' },
];

export default function Stats() {
  const t = useTranslations('stats');

  return (
    <section className="py-16 md:py-20 border-y border-white/5" style={{ background: '#0F0F0F' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.key}
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-primary mb-2">
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-medium text-xs sm:text-sm uppercase tracking-[0.15em]">
                {t(`${stat.key}Label`)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
