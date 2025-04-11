'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getTrendingMovies, getTrendingTVShows } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import TVShowCard from '@/components/TVShowCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState<any[]>([]);
  const [trendingTVShows, setTrendingTVShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [moviesData, tvData] = await Promise.all([
          getTrendingMovies(),
          getTrendingTVShows()
        ]);
        
        setTrendingMovies(moviesData.results.slice(0, 5));
        setTrendingTVShows(tvData.results.slice(0, 5));
      } catch (error) {
        console.error('Error fetching trending content:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-8 mb-12 shadow-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            ¿Qué Ver?
          </h1>
          <p className="text-xl text-gray-200 mb-6">
            Tu guía definitiva para descubrir películas y series que te encantarán
          </p>
          <p className="text-gray-300 mb-8">
            Explora miles de películas y series, guarda tus favoritos, descubre dónde verlos y mantente al día con los últimos estrenos.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/movies/popular" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Explorar Películas
            </Link>
            <Link 
              href="/tv" 
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Explorar Series
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-10">¿Qué puedes hacer con nuestra app?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">Descubre</h3>
            <p className="text-gray-300">
              Encuentra nuevas películas y series basadas en tus gustos y preferencias.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">❤️</div>
            <h3 className="text-xl font-bold mb-2">Guarda</h3>
            <p className="text-gray-300">
              Crea tu lista de favoritos para no perder de vista lo que quieres ver.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-md">
            <div className="text-blue-500 text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">Visualiza</h3>
            <p className="text-gray-300">
              Descubre dónde puedes ver tus películas y series favoritas en plataformas de streaming.
            </p>
          </div>
        </div>
      </div>

      {/* Trending Movies Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Películas Populares del Momento</h2>
          <Link href="/movies/popular" className="text-blue-500 hover:text-blue-700">
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      {/* Trending TV Shows Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Series Populares del Momento</h2>
          <Link href="/tv" className="text-blue-500 hover:text-blue-700">
            Ver Todas
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {trendingTVShows.map((show) => (
            <TVShowCard key={show.id} show={show} />
          ))}
        </div>
      </section>
    </div>
  );
}
