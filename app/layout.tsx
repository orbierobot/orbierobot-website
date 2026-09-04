import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://orbierobot.com'),
  title: 'Orbie — an open-source home robot',
  description:
    'Three hardware generations in eight months. The CAD, the firmware and the failures are public.',
  openGraph: {
    title: 'Orbie — an open-source home robot',
    description:
      'Three hardware generations in eight months. The CAD, the firmware and the failures are public.',
    type: 'website',
    images: ['/media/orbie-poster.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@orbie_robot',
    creator: '@jaiswalashok',
    images: ['/media/orbie-poster.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
        />
      </head>
      <body className="blueprint">{children}</body>
    </html>
  );
}
