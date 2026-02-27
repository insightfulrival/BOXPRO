'use client';

import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const categories = [
  { key: 'housing', num: '01', icon: HomeIcon },
  { key: 'offices', num: '02', icon: BuildingIcon },
  { key: 'storage', num: '03', icon: BoxIcon },
  { key: 'custom', num: '04', icon: WrenchIcon },
] as const;

export default function Offers() {
  const t = useTranslations('offers');

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section title */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold">
            {t('title')}
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {categories.map((cat) => (
            <motion.div
              key={cat.key}
              variants={itemVariants}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
              className="group relative rounded-lg border border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden cursor-pointer"
              style={{ background: 'rgba(26, 26, 26, 0.5)' }}
            >
              {/* Large decorative number */}
              <div
                className="absolute -top-2 right-4 font-heading text-[80px] md:text-[100px] font-bold leading-none select-none pointer-events-none transition-colors duration-500"
                style={{ color: 'rgba(245, 166, 35, 0.04)' }}
              >
                {cat.num}
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 flex items-start gap-5">
                <div
                  className="w-12 h-12 rounded-lg flex-shrink-0 flex items-center justify-center border border-primary/20 group-hover:border-primary/40 transition-colors duration-300"
                  style={{ background: 'rgba(245, 166, 35, 0.05)' }}
                >
                  <cat.icon />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-white mb-2">
                    {t(cat.key)}
                  </h3>
                  <p className="text-gray-medium text-sm leading-relaxed">
                    {t(`${cat.key}Desc`)}
                  </p>
                </div>
              </div>

              {/* Bottom accent line on hover */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-primary/40 transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function HomeIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  );
}

function BoxIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
    </svg>
  );
}

function WrenchIcon() {
  return (
    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-4.655 4.655a2.56 2.56 0 01-3.621-3.622l4.655-4.654a8.003 8.003 0 013.621 3.621zM21.13 2.87a2.25 2.25 0 00-3.182 0l-3.507 3.507a8.003 8.003 0 013.621 3.621l3.507-3.507a2.25 2.25 0 00-.44-3.622zM14.267 8.733a5.25 5.25 0 00-7.425 7.425" />
    </svg>
  );
}
