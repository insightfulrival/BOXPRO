import { createClient } from '@/lib/supabase/server';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link, redirect } from '@/i18n/routing';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const locale = await getLocale();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    redirect({ href: '/admin', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  let projectCount = 0;
  let photoCount = 0;

  if (supabase) {
    try {
      const { count: pCount } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });
      projectCount = pCount ?? 0;
    } catch {}

    try {
      const { count: phCount } = await supabase
        .from('photos')
        .select('*', { count: 'exact', head: true });
      photoCount = phCount ?? 0;
    } catch {}
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-8">
        {t('dashboard')}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-dark-lighter border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <div>
              <p className="text-gray-medium text-sm">{t('totalProjects')}</p>
              <p className="text-3xl font-bold text-white">{projectCount}</p>
            </div>
          </div>
        </div>

        <div className="bg-dark-lighter border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-gray-medium text-sm">{t('totalPhotos')}</p>
              <p className="text-3xl font-bold text-white">{photoCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h2 className="text-lg font-heading font-semibold text-white mb-4">
        {t('quickActions')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/admin/projects/new"
          className="bg-dark-lighter border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">{t('addProject')}</p>
              <p className="text-gray-medium text-sm">{t('projects')}</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/photos"
          className="bg-dark-lighter border border-white/10 rounded-xl p-6 hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <p className="text-white font-medium">{t('uploadPhotos')}</p>
              <p className="text-gray-medium text-sm">{t('photos')}</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
