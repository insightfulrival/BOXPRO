import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'BOXPRO - Containere Modulare Premium',
    short_name: 'BOXPRO',
    description: 'Containere modulare de calitate premium in Romania',
    start_url: '/',
    display: 'standalone',
    background_color: '#FEFEFE',
    theme_color: '#4A4A4A',
    icons: [
      { src: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
      { src: '/favicon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
