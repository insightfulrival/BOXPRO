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

  // Static projects with local gallery images
  const staticProjects: Project[] = [
    {
      id: 'static-1',
      title_ro: 'Container Locuinta Moderna',
      title_en: 'Modern Housing Container',
      description_ro: 'Container modular transformat intr-o locuinta moderna cu toate facilitatile necesare.',
      description_en: 'Modular container transformed into a modern home with all necessary amenities.',
      category: 'housing',
      photos: [
        { id: 's1-1', url: '/gallery/boxpro-01.jpg', alt: 'Container locuinta BOXPRO' },
        { id: 's1-2', url: '/gallery/boxpro-02.jpg', alt: 'Container locuinta BOXPRO' },
        { id: 's1-3', url: '/gallery/boxpro-03.jpg', alt: 'Container locuinta BOXPRO' },
        { id: 's1-4', url: '/gallery/boxpro-04.jpg', alt: 'Container locuinta BOXPRO' },
      ],
    },
    {
      id: 'static-2',
      title_ro: 'Birou Modular Profesional',
      title_en: 'Professional Modular Office',
      description_ro: 'Spatiu de lucru profesional, complet echipat si gata de utilizare.',
      description_en: 'Professional workspace, fully equipped and ready to use.',
      category: 'offices',
      photos: [
        { id: 's2-1', url: '/gallery/boxpro-05.jpg', alt: 'Birou modular BOXPRO' },
        { id: 's2-2', url: '/gallery/boxpro-06.jpg', alt: 'Birou modular BOXPRO' },
        { id: 's2-3', url: '/gallery/boxpro-07.jpg', alt: 'Birou modular BOXPRO' },
        { id: 's2-4', url: '/gallery/boxpro-08.jpg', alt: 'Birou modular BOXPRO' },
      ],
    },
    {
      id: 'static-3',
      title_ro: 'Depozit Container',
      title_en: 'Container Storage',
      description_ro: 'Solutie de depozitare sigura si durabila, ideala pentru diverse utilizari.',
      description_en: 'Secure and durable storage solution, ideal for various uses.',
      category: 'storage',
      photos: [
        { id: 's3-1', url: '/gallery/boxpro-09.jpg', alt: 'Depozit container BOXPRO' },
        { id: 's3-2', url: '/gallery/boxpro-10.jpg', alt: 'Depozit container BOXPRO' },
        { id: 's3-3', url: '/gallery/boxpro-11.jpg', alt: 'Depozit container BOXPRO' },
        { id: 's3-4', url: '/gallery/boxpro-12.jpg', alt: 'Depozit container BOXPRO' },
      ],
    },
    {
      id: 'static-4',
      title_ro: 'Proiect Custom',
      title_en: 'Custom Project',
      description_ro: 'Proiect unic, realizat conform specificatiilor clientului.',
      description_en: 'Unique project, built according to client specifications.',
      category: 'custom',
      photos: [
        { id: 's4-1', url: '/gallery/boxpro-13.jpg', alt: 'Proiect custom BOXPRO' },
        { id: 's4-2', url: '/gallery/boxpro-14.jpg', alt: 'Proiect custom BOXPRO' },
        { id: 's4-3', url: '/gallery/boxpro-15.jpg', alt: 'Proiect custom BOXPRO' },
        { id: 's4-4', url: '/gallery/boxpro-16.jpg', alt: 'Proiect custom BOXPRO' },
        { id: 's4-5', url: '/gallery/boxpro-17.jpg', alt: 'Proiect custom BOXPRO' },
      ],
    },
    {
      id: 'static-5',
      title_ro: 'Casa Container Premium',
      title_en: 'Premium Container House',
      description_ro: 'Locuinta premium din container modular cu finisaje de inalta calitate.',
      description_en: 'Premium modular container home with high-quality finishes.',
      category: 'housing',
      photos: [
        { id: 's5-1', url: '/gallery/boxpro-18.jpg', alt: 'Casa container premium BOXPRO' },
        { id: 's5-2', url: '/gallery/boxpro-19.jpg', alt: 'Casa container premium BOXPRO' },
        { id: 's5-3', url: '/gallery/boxpro-20.jpg', alt: 'Casa container premium BOXPRO' },
        { id: 's5-4', url: '/gallery/boxpro-21.jpg', alt: 'Casa container premium BOXPRO' },
      ],
    },
    {
      id: 'static-6',
      title_ro: 'Container Multifunctional',
      title_en: 'Multifunctional Container',
      description_ro: 'Container versatil adaptat pentru multiple utilizari.',
      description_en: 'Versatile container adapted for multiple uses.',
      category: 'custom',
      photos: [
        { id: 's6-1', url: '/gallery/boxpro-22.jpg', alt: 'Container multifunctional BOXPRO' },
        { id: 's6-2', url: '/gallery/boxpro-23.jpg', alt: 'Container multifunctional BOXPRO' },
        { id: 's6-3', url: '/gallery/boxpro-24.jpg', alt: 'Container multifunctional BOXPRO' },
      ],
    },
  ];

  const displayProjects = projects.length > 0 ? projects : staticProjects;

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
    </>
  );
}
