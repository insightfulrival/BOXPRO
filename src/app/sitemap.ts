import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://boxpro.ro';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ro: `${baseUrl}/ro`,
          en: `${baseUrl}/en`,
        },
      },
    },
    {
      url: `${baseUrl}/ro/gallery`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          ro: `${baseUrl}/ro/gallery`,
          en: `${baseUrl}/en/gallery`,
        },
      },
    },
  ];
}
