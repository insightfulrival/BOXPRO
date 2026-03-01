import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import ProjectForm from '@/components/admin/ProjectForm';

export default async function NewProjectPage() {
  const supabase = await createClient();
  const locale = await getLocale();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;

  if (!user) {
    redirect({ href: '/admin', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  return (
    <div>
      <h1 className="text-2xl font-heading font-bold text-foreground mb-8">
        {t('addProject')}
      </h1>
      <ProjectForm />
    </div>
  );
}
