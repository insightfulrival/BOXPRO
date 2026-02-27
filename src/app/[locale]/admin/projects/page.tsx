import { createClient } from '@/lib/supabase/server';
import { getLocale, getTranslations } from 'next-intl/server';
import { Link, redirect } from '@/i18n/routing';
import ProjectsTable from '@/components/admin/ProjectsTable';

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const locale = await getLocale();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    redirect({ href: '/admin', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  const { data: projects, error } = await supabase!
    .from('projects')
    .select('*')
    .order('order_index', { ascending: true });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-heading font-bold text-white">
          {t('projects')}
        </h1>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center gap-2 bg-primary text-dark font-bold px-4 py-2 rounded-lg font-heading text-sm uppercase tracking-wider hover:bg-primary-dark transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t('addProject')}
        </Link>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-3 text-red-400 text-sm mb-6">
          {t('errorOccurred')}
        </div>
      )}

      <ProjectsTable projects={projects ?? []} />
    </div>
  );
}
