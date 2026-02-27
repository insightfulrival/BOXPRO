'use client';

import { motion } from 'motion/react';
import ProjectCard, { type Project } from '@/components/ui/ProjectCard';

interface RecentProjectsGridProps {
  projects: Project[];
}

export default function RecentProjectsGrid({ projects }: RecentProjectsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
        >
          <ProjectCard project={project} />
        </motion.div>
      ))}
    </div>
  );
}
