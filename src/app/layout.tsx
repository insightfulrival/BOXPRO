import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://boxpro.ro'),
  title: {
    default: 'BOXPRO | Containere Modulare Premium',
    template: '%s | BOXPRO',
  },
  description: 'Containere modulare de calitate premium. Locuinte, birouri, depozite.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
