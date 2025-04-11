'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Movie } from '@/types/movie';
import { useFavorites } from '@/lib/favorites-context';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';

interface MovieCardProps {
  movie: Movie;
}

export default function MovieCard({ movie }: MovieCardProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorited = isFavorite(movie.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorited) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <Link href={`/movies/${movie.id}`}>
        <div className="relative h-64 w-full">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              priority={false}
            />
          ) : (
            // Cambiar cualquier texto como "No image available" a "Imagen no disponible"
            <div className="flex items-center justify-center h-full bg-gray-200 dark:bg-gray-700">
              <span className="text-gray-500 dark:text-gray-400">Imagen no disponible</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">{movie.title}</h3>
          <div className="flex items-center justify-between mt-2">
            <span className="text-yellow-600 dark:text-yellow-400">
              ★ {movie.vote_average?.toFixed(1) || 'N/A'}
            </span>
            <span className="text-gray-600 dark:text-gray-400 text-sm">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
          </div>
        </div>
      </Link>
      <button
        onClick={handleFavoriteClick}
        className="absolute top-2 right-2 p-2 rounded-full bg-black bg-opacity-50 hover:bg-opacity-70"
      >
        {favorited ? (
          <HeartSolidIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIcon className="h-6 w-6 text-white" />
        )}
      </button>
    </div>
  );
}