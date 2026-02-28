'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

const VIDEO_URL = '/hero-video.mp4';

export default function Hero() {
  const t = useTranslations('hero');
  const titleWords = t('title').split(' ');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      if (video.duration) setProgress((video.currentTime / video.duration) * 100);
    };
    video.addEventListener('timeupdate', onTime);
    return () => video.removeEventListener('timeupdate', onTime);
  }, []);

  return (
    <section className="relative bg-dark" style={{ overflow: 'visible' }}>
      {/* Background grid */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(245,166,35,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(245,166,35,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, transparent 60%, #0A0A0A 100%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 md:pt-36 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-center">
          {/* Text content - stanga */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h1 className="font-heading text-5xl sm:text-6xl md:text-5xl lg:text-7xl font-bold leading-tight">
              {titleWords.map((word, i) => (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.3em] ${
                    i === 0 ? 'text-primary' : 'text-white'
                  }`}
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.3 + i * 0.15,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </h1>

            <motion.p
              className="mt-6 text-lg sm:text-xl md:text-xl lg:text-2xl text-gray-medium max-w-lg mx-auto md:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              {/* Mobile: buton Suna Acum */}
              <div className="md:hidden">
                <Button href="tel:+40740000000" variant="primary" className="text-lg px-10 py-4">
                  {t('cta')}
                </Button>
              </div>

              {/* Desktop: buton Email + numar de telefon afisat */}
              <div className="hidden md:block">
                <Button href="mailto:contact@boxpro.ro" variant="primary" className="text-lg px-10 py-4">
                  {t('ctaEmail')}
                </Button>
                <p className="mt-4 text-gray-medium flex items-center gap-2 text-lg">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  {t('phone')}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Video - dreapta */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{ overflow: 'visible' }}
          >
            <div
              style={{
                padding: '2px',
                borderRadius: '20px',
                background: 'linear-gradient(180deg, rgba(245,166,35,0.7) 0%, rgba(245,166,35,0.2) 40%, rgba(245,166,35,0.2) 60%, rgba(245,166,35,0.7) 100%)',
                boxShadow: '0 0 20px rgba(245,166,35,0.4), 0 0 50px rgba(245,166,35,0.2), 0 0 100px rgba(245,166,35,0.1)',
              }}
            >
              <div style={{ borderRadius: '18px', overflow: 'hidden', background: '#0A0A0A' }}>
                <div className="aspect-video relative">
                  <video
                    ref={videoRef}
                    src={VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                    aria-label={t('videoAlt')}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: '18px 18px 0 0' }}
                  />
                </div>
                {/* Progress bar */}
                <div style={{ height: '3px', background: 'rgba(255,255,255,0.05)' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #F5A623, #D4901E)',
                      transition: 'width 0.3s linear',
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
