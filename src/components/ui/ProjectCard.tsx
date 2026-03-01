'use client';

import { motion, useMotionValue, useTransform } from 'motion/react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

interface Photo {
  id: string;
  url: string;
  alt?: string;
}

export interface Project {
  id: string;
  title_ro: string;
  title_en: string;
  description_ro?: string;
  description_en?: string;
  category: string;
  price?: number;
  currency?: string;
  featured?: boolean;
  order_index?: number;
  photos?: Photo[];
}

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const locale = useLocale();
  const t = useTranslations('recentProjects');

  const title = locale === 'ro' ? project.title_ro : project.title_en;
  const photo = project.photos?.[0];

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [5, -5]);
  const rotateY = useTransform(x, [-150, 150], [-5, 5]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      className="group cursor-pointer rounded-xl overflow-hidden bg-dark-lighter"
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {photo ? (
          <Image
            src={photo.url}
            alt={photo.alt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
            <span className="text-gray-medium text-4xl font-heading">
              BOXPRO
            </span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-heading text-lg text-foreground">{title}</h3>
        {project.price && (
          <p className="text-primary font-bold mt-1">
            {t('from')} {project.price.toLocaleString(locale === 'ro' ? 'ro-RO' : 'en-US')}{' '}
            {project.currency || 'EUR'}
          </p>
        )}
      </div>
    </motion.div>
  );
}
