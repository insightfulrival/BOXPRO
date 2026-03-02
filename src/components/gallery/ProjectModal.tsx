'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import type { Project } from '@/components/ui/ProjectCard';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const locale = useLocale();
  const t = useTranslations('gallery');

  const photos = project?.photos || [];
  const title = project
    ? locale === 'ro'
      ? project.title_ro
      : project.title_en
    : '';
  const description = project
    ? locale === 'ro'
      ? project.description_ro
      : project.description_en
    : '';

  const goNext = useCallback(() => {
    if (photos.length > 0) {
      setCurrentPhoto((prev) => (prev + 1) % photos.length);
    }
  }, [photos.length]);

  const goPrev = useCallback(() => {
    if (photos.length > 0) {
      setCurrentPhoto((prev) => (prev - 1 + photos.length) % photos.length);
    }
  }, [photos.length]);

  // Reset photo index when project changes
  useEffect(() => {
    setCurrentPhoto(0);
  }, [project?.id]);

  // Keyboard navigation
  useEffect(() => {
    if (!project) return;

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [project, onClose, goNext, goPrev]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-md"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content */}
          <motion.div
            className="relative z-10 bg-dark-lighter rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors cursor-pointer"
              aria-label={t('close')}
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
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Image/Video carousel */}
            <div className="relative aspect-[16/10] bg-dark-lighter">
              {photos.length > 0 ? (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto}
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {photos[currentPhoto].type === 'video' ? (
                      <video
                        src={photos[currentPhoto].url}
                        controls
                        autoPlay
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <Image
                        src={photos[currentPhoto].url}
                        alt={photos[currentPhoto].alt || title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 896px"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-medium text-5xl font-heading">
                    BOXPRO
                  </span>
                </div>
              )}

              {/* Carousel navigation */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors cursor-pointer"
                    aria-label={t('prev')}
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
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                  </button>
                  <button
                    onClick={goNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:text-primary transition-colors cursor-pointer"
                    aria-label={t('next')}
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
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  </button>

                  {/* Dots */}
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                    {photos.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhoto(idx)}
                        className={`w-2 h-2 rounded-full transition-colors cursor-pointer ${
                          idx === currentPhoto ? 'bg-primary' : 'bg-foreground/30'
                        }`}
                        aria-label={`Photo ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Info */}
            <div className="p-6 overflow-y-auto">
              <h2 className="font-heading text-2xl font-bold text-foreground">
                {title}
              </h2>

              {project.price && (
                <p className="text-primary font-bold text-lg mt-2">
                  {t('price')}: {project.price.toLocaleString(locale === 'ro' ? 'ro-RO' : 'en-US')}{' '}
                  {project.currency || 'EUR'}
                </p>
              )}

              {description && (
                <p className="text-gray-medium mt-4 leading-relaxed">
                  {description}
                </p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
