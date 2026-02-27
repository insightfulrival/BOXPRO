import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BOXPRO - Containere Modulare',
  description: 'Containere modulare de calitate premium. Locuinte, birouri, depozite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
