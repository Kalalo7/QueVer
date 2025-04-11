'use client';

import { useEffect, useState } from 'react';
import { getPopularMovies } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PopularMoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchMovies() {
      setLoading(true);
      try {
        const data = await getPopularMovies(page);
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages, 20)); // Limitamos a 20 páginas máximo
      } catch (error) {
        console.error('Error fetching popular movies:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo(0, 0);
    }
  };

  if (loading && page === 1) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Películas Populares</h1>
      
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className={`px-4 py-2 rounded ${
                page === 1
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Anterior
            </button>
            <span className="px-4 py-2 bg-gray-800 rounded">
              Página {page} de {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className={`px-4 py-2 rounded ${
                page === totalPages
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              Siguiente
            </button>
          </div>
        </>
      )}
    </div>
  );
}