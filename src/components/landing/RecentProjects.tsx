import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import RecentProjectsGrid from './RecentProjectsGrid';
import type { Project } from '@/components/ui/ProjectCard';

async function fetchFeaturedProjects(): Promise<Project[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*, photos(*)')
      .eq('featured', true)
      .order('order_index')
      .limit(6);

    if (error) throw error;
    return (data as Project[]) || [];
  } catch {
    return [];
  }
}

export default async function RecentProjects() {
  const t = await getTranslations('recentProjects');
  const projects = await fetchFeaturedProjects();

  // Placeholder projects when Supabase is not configured
  const placeholders: Project[] =
    projects.length > 0
      ? []
      : Array.from({ length: 3 }, (_, i) => ({
          id: `placeholder-${i}`,
          title_ro: `Proiect ${i + 1}`,
          title_en: `Project ${i + 1}`,
          category: 'housing',
          price: 15000 + i * 5000,
          currency: 'EUR',
          photos: [],
        }));

  const displayProjects = projects.length > 0 ? projects : placeholders;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-14">
        {t('title')}
      </h2>

      <RecentProjectsGrid projects={displayProjects} />

      <div className="mt-12 text-center">
        <Link
          href="/gallery"
          className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-heading font-bold transition-colors"
        >
          {t('viewAll')}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
