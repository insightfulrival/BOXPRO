import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import LoginForm from '@/components/admin/LoginForm';

export default async function AdminLoginPage() {
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const locale = await getLocale();

  if (user) {
    redirect({ href: '/admin/dashboard', locale: locale as 'ro' | 'en' });
  }

  const t = await getTranslations('admin');

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-heading font-bold text-primary">BOXPRO</h1>
          <p className="text-gray-medium mt-2">{t('login')}</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
