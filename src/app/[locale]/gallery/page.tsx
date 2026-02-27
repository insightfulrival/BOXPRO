import { getTranslations } from 'next-intl/server';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import MobileCallButton from '@/components/layout/MobileCallButton';
import type { Project } from '@/components/ui/ProjectCard';

async function fetchAllProjects(): Promise<Project[]> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    if (!supabase) return [];
    const { data, error } = await supabase
      .from('projects')
      .select('*, photos(*)')
      .order('order_index');

    if (error) throw error;
    return (data as Project[]) || [];
  } catch {
    return [];
  }
}

export default async function GalleryPage() {
  const t = await getTranslations('gallery');
  const projects = await fetchAllProjects();

  // Placeholder projects when Supabase is not configured
  const placeholders: Project[] =
    projects.length > 0
      ? []
      : Array.from({ length: 6 }, (_, i) => {
          const categories = ['housing', 'offices', 'storage', 'custom'];
          return {
            id: `placeholder-${i}`,
            title_ro: `Proiect Demo ${i + 1}`,
            title_en: `Demo Project ${i + 1}`,
            description_ro: 'Acesta este un proiect demonstrativ.',
            description_en: 'This is a demo project.',
            category: categories[i % categories.length],
            price: 12000 + i * 3000,
            currency: 'EUR',
            photos: [],
          };
        });

  const displayProjects = projects.length > 0 ? projects : placeholders;

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 pt-8">
            {t('title')}
          </h1>
          <GalleryGrid projects={displayProjects} />
        </div>
      </main>
      <Footer />
      <MobileCallButton />
    </>
  );
}
