'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getMovieDetails, getMovieCredits, getSimilarMovies } from '@/lib/api';
import { MovieDetails, CastMember, Movie } from '@/types/movie';
import { useFavorites } from '@/lib/favorites-context';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import MovieCard from '@/components/MovieCard';
import MovieTrailer from '@/components/MovieTrailer';
import MovieGallery from '@/components/MovieGallery';
import MovieReviews from '@/components/MovieReviews';
import WatchProviders from '@/components/WatchProviders';


export default function MovieDetailsPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similarMovies, setSimilarMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    async function loadMovieData() {
      setLoading(true);
      try {
        const [movieData, creditsData, similarData] = await Promise.all([
          getMovieDetails(id as string),
          getMovieCredits(id as string),
          getSimilarMovies(id as string)
        ]);
        
        setMovie(movieData);
        setCast(creditsData.cast.slice(0, 10)); // Get top 10 cast members
        setSimilarMovies(similarData.results.slice(0, 5)); // Get top 5 similar movies
      } catch (error) {
        console.error('Failed to load movie data:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadMovieData();
    }
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;
    
    if (isFavorite(movie.id)) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!movie) {
    return <div className="text-center py-10">Película no encontrada</div>;
  }

  const favorited = isFavorite(movie.id);

  return (
    <div>
      {/* Movie Header with Poster and Basic Info */}
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        {movie.backdrop_path && (
          <div className="relative h-80 w-full">
            <Image
              src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
              alt={movie.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          </div>
        )}
        
        <div className="p-6 -mt-10 relative">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex-shrink-0">
              {movie.poster_path ? (
                <div className="relative h-96 w-64 mx-auto md:mx-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="h-96 w-64 mx-auto md:mx-0 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No image available</span>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{movie.title}</h1>
                <button
                  onClick={handleFavoriteToggle}
                  className="p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                >
                  {favorited ? (
                    <HeartSolidIcon className="h-6 w-6 text-red-500" />
                  ) : (
                    <HeartIcon className="h-6 w-6 text-white" />
                  )}
                </button>
              </div>
              
              {movie.tagline && (
                <p className="text-gray-400 italic mt-2">{movie.tagline}</p>
              )}
              
              <div className="flex flex-wrap items-center mt-4 text-sm">
                <span className="bg-blue-600 text-white px-2 py-1 rounded mr-2">
                  {movie.vote_average.toFixed(1)} ★
                </span>
                <span className="text-gray-300 mr-4">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
                </span>
                <span className="text-gray-300">
                  {movie.runtime ? `${movie.runtime} min` : 'N/A'}
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Sinopsis</h3>
                <p className="mt-2 text-gray-300">{movie.overview || 'No hay sinopsis disponible.'}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Géneros</h3>
                <div className="flex flex-wrap mt-2">
                  {movie.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {movie.homepage && (
                <div className="mt-6">
                  <a
                    href={movie.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Sitio Web Oficial
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Trailer Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Tráiler</h2>
        <MovieTrailer movieId={id as string} />
      </div>
      
      {/* Gallery Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Galería</h2>
        <MovieGallery movieId={id as string} />
      </div>
      
      {/* Cast Section */}
      {cast.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Reparto Principal</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {cast.map((person) => (
              <div key={person.id} className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="relative h-48 w-full">
                  {person.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                      alt={person.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-500">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="font-medium text-white truncate">{person.name}</h3>
                  <p className="text-sm text-gray-400 truncate">{person.character}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Watch Providers Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Dónde Ver</h2>
        <WatchProviders movieId={id as string} />
      </div>
      
      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Reseñas</h2>
        <MovieReviews movieId={id as string} />
      </div>
      
      {/* Similar Movies Section */}
      {similarMovies.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Películas Similares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link 
              href={`/similar/${id}`}
              className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
            >
              Ver Más Películas Similares
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}