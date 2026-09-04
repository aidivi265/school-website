import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://decentpublicschoolrohini.edu.in'),
  title: {
    default: 'Decent Public School | Rohini, Delhi | CBSE Affiliated School',
    template: '%s | Decent Public School, Rohini, Delhi',
  },
  description:
    'Decent Public School is a leading CBSE-affiliated co-educational senior secondary institution in Sector 3, Rohini, Delhi. Delivering academic excellence, smart digital classrooms, advanced laboratories, sports coaching, and holistic personality development since 1995.',
  keywords: [
    'Decent Public School',
    'Decent Public School Rohini',
    'Schools in Rohini Delhi',
    'Best CBSE School Rohini',
    'CBSE School in North Delhi',
    'School Admissions Rohini 2025-26',
    'Top Schools in Rohini Sector 3',
    'Nursery Admissions Rohini',
  ],
  authors: [{ name: 'Decent Public School' }],
  creator: 'Decent Public School',
  publisher: 'Decent Public School, Rohini, Delhi',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://decentpublicschoolrohini.edu.in',
    title: 'Decent Public School | Rohini, Delhi | CBSE Affiliated School',
    description:
      'Premier CBSE affiliated institution in Sector 3, Rohini, Delhi. Dedicated to academic brilliance, moral integrity, and all-round growth.',
    siteName: 'Decent Public School',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85',
        width: 1200,
        height: 630,
        alt: 'Decent Public School Campus Rohini',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decent Public School | Rohini, Delhi',
    description: 'Premier CBSE affiliated institution in Sector 3, Rohini, Delhi.',
    images: ['https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=1200&q=85'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="font-sans antialiased text-slate-800 bg-slate-50 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
