'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Link, useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Project {
  id: string;
  title_ro: string;
  title_en: string;
  description_ro: string;
  description_en: string;
  category: string;
  price: number | null;
  currency: string;
  featured: boolean;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export default function ProjectsTable({ projects }: { projects: Project[] }) {
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('admin');

  const categoryLabels: Record<string, string> = {
    locuinta: t('housing'),
    birou: t('office'),
    depozit: t('storage'),
    custom: t('custom'),
  };

  const handleDelete = async (id: string) => {
    setDeleting(true);
    setError('');

    try {
      const supabase = createClient();
      const { error: deleteError } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (deleteError) {
        setError(t('errorOccurred'));
        setDeleting(false);
        setDeleteId(null);
        return;
      }

      setDeleteId(null);
      setDeleting(false);
      router.refresh();
    } catch {
      setError(t('errorOccurred'));
      setDeleting(false);
      setDeleteId(null);
    }
  };

  if (projects.length === 0) {
    return (
      <div className="bg-dark-lighter border border-white/10 rounded-xl p-12 text-center">
        <p className="text-gray-medium">{t('noProjects')}</p>
      </div>
    );
  }

  return (
    <>
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Delete confirmation dialog */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-dark-lighter border border-white/10 rounded-xl p-6 max-w-sm w-full">
            <p className="text-white mb-6">{t('confirmDelete')}</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-medium hover:text-white border border-white/10 hover:border-white/20 transition-colors cursor-pointer"
              >
                {t('cancel')}
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                disabled={deleting}
                className="px-4 py-2 rounded-lg text-sm font-medium bg-red-500 text-white hover:bg-red-600 transition-colors disabled:opacity-50 cursor-pointer"
              >
                {deleting ? '...' : t('delete')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Table */}
      <div className="hidden md:block bg-dark-lighter border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-medium">
                {t('titleRo')}
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-medium">
                {t('category')}
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-medium">
                {t('price')}
              </th>
              <th className="text-left px-6 py-4 text-sm font-medium text-gray-medium">
                {t('featured')}
              </th>
              <th className="text-right px-6 py-4 text-sm font-medium text-gray-medium">
                {t('actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                <td className="px-6 py-4">
                  <span className="text-white font-medium">{project.title_ro}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-medium bg-white/5 px-2 py-1 rounded">
                    {categoryLabels[project.category] ?? project.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white">
                    {project.price != null
                      ? `${project.price.toLocaleString()} ${project.currency}`
                      : '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      project.featured ? 'bg-primary' : 'bg-white/10'
                    }`}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <Link
                      href={`/admin/projects/${project.id}/edit`}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
                    >
                      {t('edit')}
                    </Link>
                    <button
                      onClick={() => setDeleteId(project.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors cursor-pointer"
                    >
                      {t('delete')}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-dark-lighter border border-white/10 rounded-xl p-4"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="text-white font-medium">{project.title_ro}</h3>
                <span className="text-xs text-gray-medium bg-white/5 px-2 py-0.5 rounded inline-block mt-1">
                  {categoryLabels[project.category] ?? project.category}
                </span>
              </div>
              {project.featured && (
                <span className="w-3 h-3 rounded-full bg-primary flex-shrink-0 mt-1" />
              )}
            </div>

            <div className="text-sm text-gray-medium mb-3">
              {project.price != null
                ? `${project.price.toLocaleString()} ${project.currency}`
                : '-'}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/admin/projects/${project.id}/edit`}
                className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-medium text-primary border border-primary/30 hover:bg-primary/10 transition-colors"
              >
                {t('edit')}
              </Link>
              <button
                onClick={() => setDeleteId(project.id)}
                className="flex-1 text-center px-3 py-2 rounded-lg text-xs font-medium text-red-400 border border-red-400/30 hover:bg-red-400/10 transition-colors cursor-pointer"
              >
                {t('delete')}
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
