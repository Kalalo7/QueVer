'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SearchBar from './SearchBar';
import ThemeToggle from './ThemeToggle';
// Remove this import
// import { FaCoffee } from 'react-icons/fa';
import KofiButton from './KofiButton';

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-gray-900 dark:text-white text-xl font-bold">¿Que Veo?</h1>
            </Link>

            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <Link
                  href="/"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  href="/movies/popular"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.startsWith('/movies')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Películas
                </Link>
                <Link
                  href="/tv"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname.startsWith('/tv')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Series
                </Link>
                <Link
                  href="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/favorites'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Favoritos
                </Link>
                {/* Remove this entire Link block
                <Link
                  href="https://tecito.app/kalalo7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white"
                >
                  <span className="flex items-center">
                    <FaCoffee className="mr-1" />
                    Invitame un tecito
                  </span>
                </Link>
                */}
              </div>
            </div>

            <div className="md:hidden">
              {/* Mobile navigation */}
              <div className="flex justify-between items-center">
                <Link
                  href="/movies"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/movies' || pathname.startsWith('/movies/')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Películas
                </Link>
                <Link
                  href="/tv"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/tv' || pathname.startsWith('/tv/')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Series
                </Link>
                <Link
                  href="/favorites"
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === '/favorites'
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  Favoritos
                </Link>
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="w-full max-w-md">
              <SearchBar />
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div className="md:hidden p-2">
        <SearchBar />
      </div>

      <div className="md:hidden">
        <div className="flex justify-around px-2 pt-2 pb-3 space-x-1">
          <Link
            href="/"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Inicio
          </Link>
          <Link
            href="/movies/popular"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/movies' || pathname.startsWith('/movies/')
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Películas
          </Link>
          <Link
            href="/tv"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/tv' || pathname.startsWith('/tv/')
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Series
          </Link>
          <Link
            href="/favorites"
            className={`px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/favorites'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Favoritos
          </Link>
          <ThemeToggle />
        </div>
      </div>
      {/* Remove the standalone Tecito button that was here */}
      <div className="hidden md:block ml-10">
        <div className="flex items-baseline space-x-4">
          {/* Remove or replace the existing Tecito link */}
          <KofiButton />
        </div>
      </div>
    </nav>
  );
}