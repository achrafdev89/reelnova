import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Providers from './providers';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';
import FloatingShapes from '@/components/FloatingShapes';
import { SITE } from '@/constants';

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '600', '700', '800'],
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL('https://reelnova-coral.vercel.app/'),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description:
    'ReelNova is a premium movie and TV discovery experience: trending titles, deep details, trailers, and a personal watchlist. Built by achrafdev89.',
  authors: [{ name: SITE.author, url: SITE.github }],
  keywords: ['movies', 'tv shows', 'streaming', 'tmdb', 'film discovery'],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'Discover movies and TV the cinematic way.',
    siteName: SITE.name,
    type: 'website',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.tagline}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'Discover movies and TV the cinematic way.',
    images: ['/og.png'],
    creator: `@${SITE.author}`,
  },
};

export const viewport = {
  themeColor: '#09090B',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body>
        <Providers>
          <ScrollProgress />
          <FloatingShapes />
          <Navbar />
          <main className="relative min-h-screen pt-20">{children}</main>
          <Footer />
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
