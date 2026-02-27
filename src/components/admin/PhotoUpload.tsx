'use client';

import { useState, useRef, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface Project {
  id: string;
  title_ro: string;
  title_en: string;
}

interface PhotoUploadProps {
  projects: Project[];
}

export default function PhotoUpload({ projects }: PhotoUploadProps) {
  const [placement, setPlacement] = useState<string>('gallery');
  const [projectId, setProjectId] = useState<string>('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const t = useTranslations('admin');

  const uploadFile = useCallback(async (file: File) => {
    setUploading(true);
    setProgress(0);
    setError('');

    try {
      const supabase = createClient();

      // Generate unique filename
      const filePath = `${Date.now()}-${file.name}`;

      // Simulate progress (since Supabase JS client doesn't have upload progress)
      setProgress(20);

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('photos')
        .upload(filePath, file);

      if (uploadError) {
        setError(t('errorOccurred'));
        setUploading(false);
        setProgress(0);
        return;
      }

      setProgress(60);

      // Get public URL
      const { data: publicUrlData } = supabase.storage
        .from('photos')
        .getPublicUrl(filePath);

      setProgress(80);

      // Insert record into photos table
      const insertData: Record<string, unknown> = {
        url: publicUrlData.publicUrl,
        placement,
        order_index: 0,
      };

      if (placement === 'project' && projectId) {
        insertData.project_id = projectId;
      }

      const { error: insertError } = await supabase
        .from('photos')
        .insert(insertData);

      if (insertError) {
        setError(t('errorOccurred'));
        setUploading(false);
        setProgress(0);
        return;
      }

      setProgress(100);

      // Reset and refresh
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        router.refresh();
      }, 500);
    } catch {
      setError(t('errorOccurred'));
      setUploading(false);
      setProgress(0);
    }
  }, [placement, projectId, router, t]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const inputClasses =
    'w-full px-4 py-3 bg-dark-lighter border border-white/10 rounded-lg text-white focus:outline-none focus:border-primary transition-colors';

  return (
    <div className="bg-dark-lighter border border-white/10 rounded-xl p-6">
      <h2 className="text-lg font-heading font-semibold text-white mb-4">
        {t('uploadPhotos')}
      </h2>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      {/* Placement + Project selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-medium mb-2">
            {t('placement')}
          </label>
          <select
            value={placement}
            onChange={(e) => setPlacement(e.target.value)}
            className={inputClasses}
          >
            <option value="hero">{t('heroPlacement')}</option>
            <option value="gallery">{t('galleryPlacement')}</option>
            <option value="section_offers">{t('sectionPlacement')}</option>
            <option value="project">{t('projectPlacement')}</option>
          </select>
        </div>

        {placement === 'project' && (
          <div>
            <label className="block text-sm font-medium text-gray-medium mb-2">
              {t('selectProject')}
            </label>
            <select
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
              className={inputClasses}
            >
              <option value="">-- {t('selectProject')} --</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title_ro}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Drag and drop zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => !uploading && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-colors ${
          dragOver
            ? 'border-primary bg-primary/5'
            : 'border-white/10 hover:border-white/20'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <svg className="w-10 h-10 text-gray-medium mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
        </svg>

        <p className="text-gray-medium text-sm">
          {uploading ? t('uploading') : t('dragDrop')}
        </p>
        {!uploading && (
          <p className="text-gray-medium/60 text-xs mt-1">
            {t('orClickToSelect')}
          </p>
        )}

        {/* Progress bar */}
        {uploading && progress > 0 && (
          <div className="mt-4 w-full max-w-xs mx-auto">
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-medium mt-1">{progress}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
