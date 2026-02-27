'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import ProjectCard, { type Project } from '@/components/ui/ProjectCard';
import ProjectModal from './ProjectModal';

const filterKeys = ['all', 'housing', 'offices', 'storage', 'custom'] as const;

const categoryMap: Record<string, string> = {
  housing: 'housing',
  offices: 'offices',
  storage: 'storage',
  custom: 'custom',
};

interface GalleryGridProps {
  projects: Project[];
}

export default function GalleryGrid({ projects }: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const t = useTranslations('gallery');

  const filtered =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

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
                ? 'bg-primary text-dark'
                : 'bg-dark-lighter text-gray-medium hover:text-white border border-white/10'
            }`}
          >
            {t(key)}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" layout>
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
