import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import PhotoUpload from '@/components/admin/PhotoUpload';
import PhotoGrid from '@/components/admin/PhotoGrid';

export default async function AdminPhotosPage() {
  const supabase = await createClient();
  const locale = await getLocale();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    redirect({ href: '/admin', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  const { data: photos } = await supabase!
    .from('photos')
    .select('*, projects(id, title_ro, title_en)')
    .order('created_at', { ascending: false });

  const { data: projects } = await supabase!
    .from('projects')
    .select('id, title_ro, title_en')
    .order('title_ro', { ascending: true });

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-8">
        {t('photos')}
      </h1>

      <PhotoUpload projects={projects ?? []} />

      <div className="mt-10">
        <PhotoGrid photos={photos ?? []} />
      </div>
    </div>
  );
}
