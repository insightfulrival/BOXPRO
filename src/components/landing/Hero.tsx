'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';
import Button from '@/components/ui/Button';

// Schimba acest URL cu video-ul vostru
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
        {/* Video showcase */}
        <motion.div
          className="relative mx-auto max-w-5xl mb-14 md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ overflow: 'visible' }}
        >
          {/* Video frame cu glow */}
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
                  disablePictureInPicture
                  controlsList="nodownload nofullscreen noremoteplayback"
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

        {/* Text content */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight">
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
                  delay: 0.6 + i * 0.15,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-medium max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Button href="tel:+40700000000" variant="primary" className="text-lg px-10 py-4">
              {t('cta')}
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
