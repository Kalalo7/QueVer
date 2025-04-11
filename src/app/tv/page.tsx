'use client';

import { useEffect, useState } from 'react';
import { getPopularTVShows, getTopRatedTVShows } from '@/lib/api';
import TVShowCard from '@/components/TVShowCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function TVShowsPage() {
  const [popularShows, setPopularShows] = useState<any[]>([]);
  const [topRatedShows, setTopRatedShows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [popularPage, setPopularPage] = useState(1);
  const [topRatedPage, setTopRatedPage] = useState(1);
  const [popularTotalPages, setPopularTotalPages] = useState(1);
  const [topRatedTotalPages, setTopRatedTotalPages] = useState(1);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      try {
        const [popularData, topRatedData] = await Promise.all([
          getPopularTVShows(popularPage),
          getTopRatedTVShows(topRatedPage)
        ]);

        setPopularShows(popularData.results);
        setTopRatedShows(topRatedData.results);
        setPopularTotalPages(popularData.total_pages);
        setTopRatedTotalPages(topRatedData.total_pages);
      } catch (error) {
        console.error('Error cargando series:', error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [popularPage, topRatedPage]);

  const handlePageChange = (type: 'popular' | 'topRated', newPage: number) => {
    if (type === 'popular') {
      setPopularPage(newPage);
    } else {
      setTopRatedPage(newPage);
    }
    window.scrollTo(0, 0);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Series de TV</h1>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Series Populares</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {popularShows.map((show) => (
            <TVShowCard key={show.id} show={show} />
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange('popular', popularPage - 1)}
            disabled={popularPage === 1}
            className={`px-4 py-2 rounded-md ${
              popularPage === 1
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-md">
            Página {popularPage} de {popularTotalPages}
          </span>
          <button
            onClick={() => handlePageChange('popular', popularPage + 1)}
            disabled={popularPage === popularTotalPages}
            className={`px-4 py-2 rounded-md ${
              popularPage === popularTotalPages
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Siguiente
          </button>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Series Mejor Valoradas</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {topRatedShows.map((show) => (
            <TVShowCard key={show.id} show={show} />
          ))}
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => handlePageChange('topRated', topRatedPage - 1)}
            disabled={topRatedPage === 1}
            className={`px-4 py-2 rounded-md ${
              topRatedPage === 1
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Anterior
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-md">
            Página {topRatedPage} de {topRatedTotalPages}
          </span>
          <button
            onClick={() => handlePageChange('topRated', topRatedPage + 1)}
            disabled={topRatedPage === topRatedTotalPages}
            className={`px-4 py-2 rounded-md ${
              topRatedPage === topRatedTotalPages
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Siguiente
          </button>
        </div>
      </section>
    </main>
  );
}