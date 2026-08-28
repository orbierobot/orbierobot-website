import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Orbie — an open-source home robot',
  description:
    'Three hardware generations, built in public. The files, the firmware and the failures are all open.',
  openGraph: {
    title: 'Orbie — an open-source home robot',
    description:
      'Three hardware generations, built in public. The files, the firmware and the failures are all open.',
    type: 'website',
  },
  twitter: { card: 'summary_large_image', creator: '@jaiswalashok' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
