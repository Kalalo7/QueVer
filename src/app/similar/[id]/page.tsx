'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getSimilarMovies, getMovieDetails } from '@/lib/api';
import { Movie, MovieDetails } from '@/types/movie';
import MovieCard from '@/components/MovieCard';
import Link from 'next/link';

export default function SimilarMoviesPage() {
  const { id } = useParams();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [originalMovie, setOriginalMovie] = useState<MovieDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSimilarMovies() {
      setLoading(true);
      try {
        const [similarData, movieData] = await Promise.all([
          getSimilarMovies(id as string),
          getMovieDetails(id as string)
        ]);
        
        setMovies(similarData.results);
        setOriginalMovie(movieData);
      } catch (error) {
        console.error('Failed to load similar movies:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadSimilarMovies();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Link href={`/movies/${id}`} className="text-blue-400 hover:underline">
          &larr; Back to {originalMovie?.title || 'Movie'}
        </Link>
        <h1 className="text-3xl font-bold mt-2">
          Movies Similar to {originalMovie?.title || 'This Movie'}
        </h1>
      </div>
      
      {movies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-gray-800 rounded-lg">
          <h3 className="text-xl mb-2">No similar movies found</h3>
          <p className="text-gray-400">
            There are no similar movies available for this title.
          </p>
        </div>
      )}
    </div>
  );
}