'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { searchMulti } from '@/lib/api';
import MovieCard from '@/components/MovieCard';
import TVShowCard from '@/components/TVShowCard';
import LoadingSpinner from '@/components/LoadingSpinner';

// Create a client component that uses useSearchParams
function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchResults() {
      if (query) {
        setLoading(true);
        try {
          const data = await searchMulti(query);
          setResults(data.results);
        } catch (error) {
          console.error('Error searching:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
        setLoading(false);
      }
    }

    fetchResults();
  }, [query]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-xl text-gray-400">
          {query ? `No se encontraron resultados para "${query}"` : 'Ingresa un término de búsqueda'}
        </p>
      </div>
    );
  }

  // Filter and separate movies and TV shows
  const movies = results.filter(item => item.media_type === 'movie');
  const tvShows = results.filter(item => item.media_type === 'tv');

  return (
    <div>
      {query && (
        <h2 className="text-2xl font-bold mb-6">
          Resultados para: <span className="text-blue-500">{query}</span>
        </h2>
      )}

      {movies.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-4">Películas</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {tvShows.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Series</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {tvShows.map(show => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSpinner />}>
        <SearchResults />
      </Suspense>
    </div>
  );
}