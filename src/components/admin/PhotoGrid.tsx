'use client';

import { useState } from 'react';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Photo {
  id: string;
  url: string;
  alt_ro: string;
  alt_en: string;
  type: 'image' | 'video';
  placement: string;
  order_index: number;
  project_id: string | null;
  created_at: string;
  projects: {
    id: string;
    title_ro: string;
    title_en: string;
  } | null;
}

const PLACEMENTS = ['all', 'hero', 'gallery', 'section_offers', 'project'] as const;

export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState('');
  const router = useRouter();
  const t = useTranslations('admin');

  const placementLabels: Record<string, string> = {
    all: t('all'),
    hero: t('heroPlacement'),
    gallery: t('galleryPlacement'),
    section_offers: t('sectionPlacement'),
    project: t('projectPlacement'),
  };

  const filteredPhotos =
    activeFilter === 'all'
      ? photos
      : photos.filter((p) => p.placement === activeFilter);

  const handleDelete = async (photo: Photo) => {
    setDeletingId(photo.id);
    setError('');

    try {
      const supabase = createClient();

      // Extract storage path from URL
      // URL format: https://xxx.supabase.co/storage/v1/object/public/photos/filename
      const urlParts = photo.url.split('/photos/');
      const storagePath = urlParts[urlParts.length - 1];

      if (storagePath) {
        // Remove from storage
        await supabase.storage.from('photos').remove([storagePath]);
      }

      // Remove from database
      const { error: deleteError } = await supabase
        .from('photos')
        .delete()
        .eq('id', photo.id);

      if (deleteError) {
        setError(t('errorOccurred'));
        setDeletingId(null);
        return;
      }

      setDeletingId(null);
      router.refresh();
    } catch {
      setError(t('errorOccurred'));
      setDeletingId(null);
    }
  };

  return (
    <div>
      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PLACEMENTS.map((p) => (
          <button
            key={p}
            onClick={() => setActiveFilter(p)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              activeFilter === p
                ? 'bg-primary text-white'
                : 'bg-dark-lighter border border-foreground/10 text-gray-medium hover:text-foreground hover:border-foreground/20'
            }`}
          >
            {placementLabels[p]}
          </button>
        ))}
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {filteredPhotos.length === 0 ? (
        <div className="bg-dark-lighter border border-foreground/10 rounded-xl p-12 text-center">
          <p className="text-gray-medium">{t('noPhotos')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative bg-dark-lighter border border-foreground/10 rounded-xl overflow-hidden aspect-square"
            >
              {photo.type === 'video' ? (
                <>
                  <video
                    src={photo.url}
                    muted
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center">
                      <svg className="w-5 h-5 text-foreground ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              ) : (
                <Image
                  src={photo.url}
                  alt={photo.alt_ro || 'Photo'}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              )}

              {/* Overlay with info and delete */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors flex flex-col justify-between p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Top: placement badge + project name */}
                <div className="flex flex-wrap gap-1">
                  <span className="text-[10px] font-medium bg-primary/90 text-white px-2 py-0.5 rounded">
                    {placementLabels[photo.placement]}
                  </span>
                  {photo.projects && (
                    <span className="text-[10px] font-medium bg-white/20 text-white px-2 py-0.5 rounded truncate max-w-[120px]">
                      {photo.projects.title_ro}
                    </span>
                  )}
                </div>

                {/* Bottom: delete button */}
                <div className="flex justify-end">
                  <button
                    onClick={() => handleDelete(photo)}
                    disabled={deletingId === photo.id}
                    className="p-2 rounded-lg bg-red-500/80 text-white hover:bg-red-500 transition-colors disabled:opacity-50 cursor-pointer"
                    title={t('delete')}
                  >
                    {deletingId === photo.id ? (
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
