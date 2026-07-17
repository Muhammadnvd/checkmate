import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Checkmate | Premium Chess Application',
  description: 'A professional, production-quality chess web application.',
  manifest: '/manifest.json',
  themeColor: '#161512',
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
