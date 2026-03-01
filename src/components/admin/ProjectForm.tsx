'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';

interface ProjectData {
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
}

interface ProjectFormProps {
  initialData?: ProjectData;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
  const isEdit = !!initialData;
  const router = useRouter();
  const t = useTranslations('admin');

  const [formData, setFormData] = useState({
    title_ro: initialData?.title_ro ?? '',
    title_en: initialData?.title_en ?? '',
    description_ro: initialData?.description_ro ?? '',
    description_en: initialData?.description_en ?? '',
    category: initialData?.category ?? 'locuinta',
    price: initialData?.price ?? '',
    currency: initialData?.currency ?? 'EUR',
    featured: initialData?.featured ?? false,
    order_index: initialData?.order_index ?? 0,
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const supabase = createClient();

      const payload = {
        title_ro: formData.title_ro,
        title_en: formData.title_en,
        description_ro: formData.description_ro,
        description_en: formData.description_en,
        category: formData.category,
        price: formData.price !== '' ? Number(formData.price) : null,
        currency: formData.currency,
        featured: formData.featured,
        order_index: Number(formData.order_index),
      };

      if (isEdit && initialData) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(payload)
          .eq('id', initialData.id);

        if (updateError) {
          setError(t('errorOccurred'));
          setSaving(false);
          return;
        }
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert(payload);

        if (insertError) {
          setError(t('errorOccurred'));
          setSaving(false);
          return;
        }
      }

      router.push('/admin/projects');
      router.refresh();
    } catch {
      setError(t('errorOccurred'));
      setSaving(false);
    }
  };

  const inputClasses =
    'w-full px-4 py-3 bg-dark-lighter border border-foreground/10 rounded-lg text-foreground placeholder-gray-medium focus:outline-none focus:border-primary transition-colors';

  const labelClasses = 'block text-sm font-medium text-gray-medium mb-2';

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Title RO */}
      <div>
        <label htmlFor="title_ro" className={labelClasses}>
          {t('titleRo')} *
        </label>
        <input
          id="title_ro"
          name="title_ro"
          type="text"
          value={formData.title_ro}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      {/* Title EN */}
      <div>
        <label htmlFor="title_en" className={labelClasses}>
          {t('titleEn')} *
        </label>
        <input
          id="title_en"
          name="title_en"
          type="text"
          value={formData.title_en}
          onChange={handleChange}
          required
          className={inputClasses}
        />
      </div>

      {/* Description RO */}
      <div>
        <label htmlFor="description_ro" className={labelClasses}>
          {t('descriptionRo')}
        </label>
        <textarea
          id="description_ro"
          name="description_ro"
          value={formData.description_ro}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
        />
      </div>

      {/* Description EN */}
      <div>
        <label htmlFor="description_en" className={labelClasses}>
          {t('descriptionEn')}
        </label>
        <textarea
          id="description_en"
          name="description_en"
          value={formData.description_en}
          onChange={handleChange}
          rows={4}
          className={inputClasses}
        />
      </div>

      {/* Category + Currency row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="category" className={labelClasses}>
            {t('category')} *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="locuinta">{t('housing')}</option>
            <option value="birou">{t('office')}</option>
            <option value="depozit">{t('storage')}</option>
            <option value="custom">{t('custom')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="currency" className={labelClasses}>
            {t('currency')}
          </label>
          <select
            id="currency"
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className={inputClasses}
          >
            <option value="EUR">EUR</option>
            <option value="RON">RON</option>
          </select>
        </div>
      </div>

      {/* Price + Order Index row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="price" className={labelClasses}>
            {t('price')}
          </label>
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="order_index" className={labelClasses}>
            {t('orderIndex')}
          </label>
          <input
            id="order_index"
            name="order_index"
            type="number"
            value={formData.order_index}
            onChange={handleChange}
            min="0"
            className={inputClasses}
          />
        </div>
      </div>

      {/* Featured */}
      <div className="flex items-center gap-3">
        <input
          id="featured"
          name="featured"
          type="checkbox"
          checked={formData.featured}
          onChange={handleChange}
          className="w-4 h-4 rounded border-foreground/10 bg-dark-lighter text-primary focus:ring-primary accent-primary"
        />
        <label htmlFor="featured" className="text-sm font-medium text-gray-medium">
          {t('featured')}
        </label>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="bg-primary text-white font-bold px-6 py-3 rounded-lg font-heading text-sm uppercase tracking-wider hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {saving ? t('saving') : t('save')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/projects')}
          className="px-6 py-3 rounded-lg text-sm font-medium text-gray-medium border border-foreground/10 hover:border-foreground/20 hover:text-foreground transition-colors cursor-pointer"
        >
          {t('cancel')}
        </button>
      </div>
    </form>
  );
}
