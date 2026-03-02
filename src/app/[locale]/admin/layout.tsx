import { createClient } from '@/lib/supabase/server';
import { redirect } from '@/i18n/routing';
import { getLocale } from 'next-intl/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const user = supabase ? (await supabase.auth.getUser()).data.user : null;
  const locale = await getLocale();

  // Get the current path to determine if we're on the login page
  // The login page is /[locale]/admin (no sub-path)
  // We allow unauthenticated access to the login page only
  // For all other admin pages, redirect to login if not authenticated

  if (!user) {
    // Return children directly for the login page (no sidebar layout)
    return <>{children}</>;
  }

  // Authenticated users get the full admin layout
  return (
    <div className="min-h-screen flex bg-dark">
      <AdminSidebar />
      <main className="flex-1 ml-0 md:ml-64 min-h-screen">
        <div className="pt-16 px-4 pb-4 md:pt-8 md:px-8 md:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
