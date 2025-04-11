import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { FavoritesProvider } from '@/lib/favorites-context';
import { ThemeProvider } from '@/lib/theme-context';
import KofiButton from '@/components/KofiButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MovieFinder - Discover Movies and TV Shows',
  description: 'Search and discover movies and TV shows, save your favorites, and more.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider>
          <FavoritesProvider>
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-grow">
              {children}
            </main>
            <Footer />
            <KofiButton />
          </FavoritesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
