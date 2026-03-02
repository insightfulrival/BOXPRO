'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import type { Project } from '@/components/ui/ProjectCard';
import ProjectModal from './ProjectModal';

const filterKeys = ['all', 'housing', 'offices', 'storage', 'custom'] as const;

interface PhotoWithProject {
  photoId: string;
  url: string;
  alt: string;
  type: 'image' | 'video';
  photoIndex: number;
  project: Project;
}

interface GalleryGridProps {
  projects: Project[];
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = useTranslations('gallery');

  // Flatten all photos from all projects into a single list
  const allPhotos = useMemo(() => {
    const filtered =
      activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    const photos: PhotoWithProject[] = [];
    for (const project of filtered) {
      if (!project.photos) continue;
      project.photos.forEach((photo, index) => {
        photos.push({
          photoId: photo.id,
          url: photo.url,
          alt: photo.alt || '',
          type: photo.type || 'image',
          photoIndex: index,
          project,
        });
      });
    }
    return photos;
  }, [projects, activeFilter]);

  function handlePhotoClick(item: PhotoWithProject) {
    // Reorder photos so the clicked one is first
    const photos = item.project.photos || [];
    const reordered = [
      ...photos.slice(item.photoIndex),
      ...photos.slice(0, item.photoIndex),
    ];
    setSelectedProject({ ...item.project, photos: reordered });
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {filterKeys.map((key) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-5 py-2 rounded-full font-heading text-sm font-bold transition-colors cursor-pointer ${
              activeFilter === key
                ? 'bg-primary text-white'
                : 'bg-dark-lighter text-gray-medium hover:text-foreground border border-foreground/10'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>

      {/* Photo grid - phone gallery style */}
      <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-10 gap-1 sm:gap-1.5">
        <AnimatePresence mode="popLayout">
          {allPhotos.map((item) => (
            <motion.div
              key={item.photoId}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative aspect-square overflow-hidden rounded-md cursor-pointer"
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handlePhotoClick(item)}
            >
              {item.type === 'video' ? (
                <>
                  <video
                    src={item.url}
                    muted
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/90 flex items-center justify-center">
                      <svg className="w-4 h-4 sm:w-5 sm:h-5 text-foreground ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={item.url}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 20vw, (max-width: 768px) 14vw, (max-width: 1024px) 12vw, 10vw"
                />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
