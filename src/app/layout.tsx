import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CODE® — iOS Healthcare & Vital Tracking Experience',
  description: 'CODE® modern iOS health companion, medication tracking, and biometric intelligence.',
  keywords: ['CODE', 'Next.js', 'iOS App', 'Health', 'Medication Tracking', 'GSAP', 'Cloudflare Pages'],
  authors: [{ name: 'CODE® Technologies' }],
  openGraph: {
    title: 'CODE® — Next-Gen iOS Healthcare Platform',
    description: 'Minimalist, fluid iOS interface powered by Next.js and GSAP.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#F4F6F8',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
