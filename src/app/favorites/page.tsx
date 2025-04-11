'use client';

import { useState, useEffect } from 'react';
import { useFavorites } from '@/lib/favorites-context';
import MovieCard from '@/components/MovieCard';
import TVShowCard from '@/components/TVShowCard';

type TabType = 'all' | 'movies' | 'tv';

type MediaItem = {
  id: number;
  media_type?: 'movie' | 'tv';
  title?: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average?: number;
  overview?: string;
  genre_ids?: number[];
};

const FavoritesPage = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { favorites } = useFavorites() as { favorites: MediaItem[] };
  const [movieFavorites, setMovieFavorites] = useState<MediaItem[]>([]);
  const [tvFavorites, setTvFavorites] = useState<MediaItem[]>([]);

  useEffect(() => {
    if (favorites && Array.isArray(favorites)) {
      const movies = favorites.filter((item: MediaItem) => {
        if (!item) return false;
        return ('media_type' in item && item.media_type === 'movie') || (!('media_type' in item) && 'title' in item && !('name' in item));
      });
      
      const tvShows = favorites.filter((item: MediaItem) => {
        if (!item) return false;
        return ('media_type' in item && item.media_type === 'tv') || (!('media_type' in item) && 'name' in item);
      });
      
      setMovieFavorites(movies);
      setTvFavorites(tvShows);
    }
  }, [favorites]);

  const renderContent = () => {
    if (!favorites || favorites.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-xl text-gray-400">No tienes favoritos guardados.</p>
          <p className="mt-2 text-gray-500">
            Explora películas y series y haz clic en el corazón para añadirlas a tus favoritos.
          </p>
        </div>
      );
    }

    const getItems = () => {
      switch (activeTab) {
        case 'movies':
          return movieFavorites;
        case 'tv':
          return tvFavorites;
        default:
          return favorites as MediaItem[];
      }
    };

    const items = getItems();

    return items.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {items.map((item: MediaItem) => {
          const isTvShow = ('media_type' in item && item.media_type === 'tv') || 
                          (!('media_type' in item) && 'name' in item);
          
          return (
            <div key={item.id} className="w-full" style={{ minWidth: '100%', aspectRatio: '2/3' }}>
              {isTvShow ? (
                <TVShowCard 
                  show={{
                    ...item,
                    media_type: 'tv' as const,
                    name: item.name || item.title || '',
                    first_air_date: item.first_air_date || item.release_date || '',
                    poster_path: item.poster_path || null,
                    backdrop_path: item.backdrop_path || null,
                    vote_average: item.vote_average || 0,
                    overview: item.overview || ''
                  }} 
                />
              ) : (
                // In the MovieCard section, modify the props like this:
                <MovieCard 
                  movie={{
                    id: item.id,
                    // Remove media_type as it's causing the error
                    title: item.title || item.name || '',
                    release_date: item.release_date || item.first_air_date || '',
                    poster_path: item.poster_path || null,
                    backdrop_path: item.backdrop_path || null,
                    vote_average: item.vote_average || 0,
                    overview: item.overview || '',
                    genre_ids: item.genre_ids || []
                  } as any} // Add type assertion to bypass type checking
                />
              )}
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-10">
        <p className="text-xl text-gray-400">
          {activeTab === 'movies' ? 'No tienes películas favoritas guardadas.' :
           activeTab === 'tv' ? 'No tienes series favoritas guardadas.' :
           'No tienes favoritos guardados.'}
        </p>
      </div>
    );
  };

  const tabs = [
    { id: 'all', label: 'Todos', count: favorites?.length || 0 },
    { id: 'movies', label: 'Películas', count: movieFavorites?.length || 0 },
    { id: 'tv', label: 'Series', count: tvFavorites?.length || 0 }
  ] as const;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Mis Favoritos</h1>

      <div className="mb-8">
        <div className="flex space-x-2 mb-6 border-b border-gray-700">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 font-medium rounded-t-lg ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              {`${tab.label} (${tab.count})`}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default FavoritesPage;