'use client';

import { useState, useEffect } from 'react';
import { getGenres } from '@/lib/api';  // Change this import
import { Genre } from '@/types/movie';

interface GenreFilterProps {
  onSelectGenre: (genreId: number | null) => void;
  selectedGenre: number | null;
}

export default function GenreFilter({ onSelectGenre, selectedGenre }: GenreFilterProps) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await getGenres();
        setGenres(data.genres);
        setError(null);
      } catch (error) {
        console.error('Failed to load genres:', error);
        setError('Failed to load genres. Please try again later.');
        setGenres([]);
      } finally {
        setLoading(false);
      }
    }

    loadGenres();
  }, []);

  if (loading) {
    return <div className="flex space-x-2 overflow-x-auto py-2 text-gray-700 dark:text-gray-300">Cargando géneros...</div>;
  }

  if (error) {
    return <div className="text-red-500 py-2">{error}</div>;
  }

  return (
    <div className="flex space-x-2 overflow-x-auto py-2">
      <button
        onClick={() => onSelectGenre(null)}
        className={`px-4 py-1 rounded-full whitespace-nowrap ${
          selectedGenre === null
            ? 'bg-blue-600 text-white'
            : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
        }`}
      >
        Todos
      </button>
      {genres.map((genre) => (
        <button
          key={genre.id}
          onClick={() => onSelectGenre(genre.id)}
          className={`px-4 py-1 rounded-full whitespace-nowrap ${
            selectedGenre === genre.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}