import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Checkmate | Premium Chess Application',
  description: 'A professional, production-quality chess web application.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#161512',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
