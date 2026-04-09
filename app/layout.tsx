import type { Metadata, Viewport } from 'next';
import { Cinzel, Raleway, Amiri } from 'next/font/google';
// import { AudioControl } from './components/AudioControl'; // Sound system disabled
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
  weight: ['400', '600', '700', '900'],
});

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

const amiri = Amiri({
  subsets: ['arabic', 'latin'],
  variable: '--font-amiri',
  display: 'swap',
  weight: ['400', '700'],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#1A315B',
};

export const metadata: Metadata = {
  icons: {
    icon: '/site_logo.png',
    apple: '/site_logo.png',
    shortcut: '/site_logo.png',
  },
  title: 'Al-Amir Islamic Center | Jacksonville, FL - Masjid, Prayer Times & Community',
  description:
    "Al-Amir Islamic Center in Florida — Your home for worship, prayer times, Islamic education, community events, and spiritual growth. Join us for Salah, Jumu'ah, and community services.",
  keywords:
    'Islamic Center, Masjid, Mosque, Jacksonville, Florida, Prayer Times, Muslim community, Islam, Quran, Islamic education, Jacksonville FL',
  authors: [{ name: 'Al-Amir Islamic Center' }],
  creator: 'Al-Amir Islamic Center',
  publisher: 'Al-Amir Islamic Center',
  metadataBase: new URL('https://alamirislamiccenter.org'),
  alternates: { canonical: 'https://alamirislamiccenter.org' },
  openGraph: {
    title: 'Al-Amir Islamic Center | Jacksonville, FL',
    description: 'Your home for worship, prayer times, community events, and spiritual growth in Jacksonville, FL',
    type: 'website',
    locale: 'en_US',
    url: 'https://alamirislamiccenter.org',
    siteName: 'Al-Amir Islamic Center',
    images: [{ url: 'https://alamirislamiccenter.org/og-image.jpg', width: 1200, height: 630, alt: 'Al-Amir Islamic Center' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Al-Amir Islamic Center',
    description: 'Your home for worship, prayer times, and community in Florida',
    creator: '@alamircenter',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    'max-image-preview': 'large',
    'max-snippet': -1,
    'max-video-preview': -1,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${raleway.variable} ${amiri.variable}`}>
      <body className="w-full overflow-x-hidden">
        {children}
        {/* <AudioControl /> */}{/* Sound system disabled */}
      </body>
    </html>
  );
}
