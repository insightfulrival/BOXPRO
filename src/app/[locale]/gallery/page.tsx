import { getTranslations } from 'next-intl/server';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import type { Project } from '@/components/ui/ProjectCard';
import type { Metadata } from 'next';

const SITE_URL = 'https://boxpro.ro';

const galleryMeta = {
  ro: {
    title: 'Galerie Proiecte | BOXPRO - Containere Modulare Finalizate',
    description:
      'Descopera proiectele BOXPRO finalizate: containere modulare transformate in locuinte moderne, birouri profesionale si depozite. Vezi portofoliul nostru complet.',
  },
  en: {
    title: 'Project Gallery | BOXPRO - Completed Modular Containers',
    description:
      'Discover completed BOXPRO projects: modular containers transformed into modern homes, professional offices and storage units. View our complete portfolio.',
  },
} as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const m = galleryMeta[locale as keyof typeof galleryMeta] || galleryMeta.ro;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: `${SITE_URL}/${locale}/gallery`,
      languages: {
        ro: `${SITE_URL}/ro/gallery`,
        en: `${SITE_URL}/en/gallery`,
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url: `${SITE_URL}/${locale}/gallery`,
      siteName: 'BOXPRO',
      locale: locale === 'ro' ? 'ro_RO' : 'en_US',
      type: 'website',
    },
  };
}

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

  return (
    <>
      <Navbar />
      <main className="pt-20 pb-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-12 pt-8">
            {t('title')}
          </h1>
          <GalleryGrid projects={projects} />
        </div>
      </main>
      <Footer />
    </>
  );
}
