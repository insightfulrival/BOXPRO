import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const locale = await getLocale();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    redirect({ href: '/admin', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  const { data: project, error } = await supabase!
    .from('projects')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !project) {
    redirect({ href: '/admin/projects', locale: locale as 'ro' | 'en' });
  }

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-white mb-8">
        {t('editProject')}
      </h1>
      <ProjectForm initialData={project} />
    </div>
  );
}
