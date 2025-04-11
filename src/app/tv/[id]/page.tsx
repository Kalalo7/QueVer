'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { getTVShowDetails, getTVShowCredits, getSimilarTVShows } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import MovieTrailer from '@/components/MovieTrailer';
import MovieGallery from '@/components/MovieGallery';
import WatchProviders from '@/components/WatchProviders';
import TVShowCard from '@/components/TVShowCard';
import Link from 'next/link';
import { useFavorites } from '@/lib/favorites-context';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Define interfaces for the data structures
interface TVShow {
  id: number;
  name: string;
  tagline?: string;
  overview: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  first_air_date?: string;
  number_of_seasons: number;
  homepage?: string;
  genres: { id: number; name: string }[];
}

interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export default function TVShowDetailsPage() {
  const { id } = useParams();
  const [show, setShow] = useState<TVShow | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similarShows, setSimilarShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    async function loadData() {
      try {
        const [showData, creditsData, similarData] = await Promise.all([
          getTVShowDetails(Number(id)),
          getTVShowCredits(id as string),
          getSimilarTVShows(Number(id))
        ]);

        setShow(showData);
        setCast(creditsData.cast.slice(0, 10));
        setSimilarShows(similarData.results.slice(0, 5));
      } catch (error) {
        console.error('Error cargando detalles de la serie:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  // In the handleFavoriteToggle function:
  
  const handleFavoriteToggle = () => {
    if (!show) return;
    
    if (isFavorite(show.id)) {
      removeFavorite(show.id);
    } else {
      // Format TV show to match the expected structure for favorites
      const formattedShow = {
        id: show.id,
        name: show.name,
        title: show.name, // Add title for compatibility with Movie type
        poster_path: show.poster_path || null,
        backdrop_path: show.backdrop_path || null,
        vote_average: show.vote_average || 0,
        overview: show.overview || '',
        release_date: show.first_air_date || '',
        first_air_date: show.first_air_date || '',
        genre_ids: show.genres?.map(genre => genre.id) || [],
        media_type: 'tv' as const
      };
      
      // Use @ts-expect-error instead of @ts-ignore
      addFavorite(formattedShow);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!show) {
    return <div className="text-center py-10">Serie no encontrada</div>;
  }

  const favorited = isFavorite(show.id);

  return (
    <div>
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        {show.backdrop_path && (
          <div className="relative h-80 w-full">
            <Image
              src={`https://image.tmdb.org/t/p/original${show.backdrop_path}`}
              alt={show.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent"></div>
          </div>
        )}
        
        <div className="p-6 -mt-10 relative">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 flex-shrink-0">
              {show.poster_path ? (
                <div className="relative h-96 w-64 mx-auto md:mx-0">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
                    alt={show.name}
                    fill
                    className="object-cover rounded-lg shadow-lg"
                  />
                </div>
              ) : (
                <div className="h-96 w-64 mx-auto md:mx-0 bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">Sin imagen disponible</span>
                </div>
              )}
            </div>
            
            <div className="md:w-2/3 md:pl-8 mt-6 md:mt-0">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">{show.name}</h1>
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
              
              {show.tagline && (
                <p className="text-gray-400 italic mt-2">{show.tagline}</p>
              )}
              
              <div className="flex flex-wrap items-center mt-4 text-sm">
                <span className="bg-blue-600 text-white px-2 py-1 rounded mr-2">
                  {show.vote_average.toFixed(1)} ★
                </span>
                <span className="text-gray-300 mr-4">
                  {show.first_air_date ? new Date(show.first_air_date).getFullYear() : 'N/A'}
                </span>
                <span className="text-gray-300">
                  {show.number_of_seasons} {show.number_of_seasons === 1 ? 'Temporada' : 'Temporadas'}
                </span>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Sinopsis</h3>
                <p className="mt-2 text-gray-300">{show.overview || 'No hay sinopsis disponible.'}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold">Géneros</h3>
                <div className="flex flex-wrap mt-2">
                  {show.genres.map((genre) => (
                    <span
                      key={genre.id}
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded-full text-sm mr-2 mb-2"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
              
              {show.homepage && (
                <div className="mt-6">
                  <a
                    href={show.homepage}
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
      
      {/* Watch Providers Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Dónde Ver</h2>
        <WatchProviders movieId={id as string} />
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
      
      {/* Similar Shows Section */}
      {similarShows.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold mb-4">Series Similares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {similarShows.map((show) => (
              <TVShowCard key={show.id} show={{
                id: show.id,
                name: show.name,
                poster_path: show.poster_path || null,
                vote_average: show.vote_average,
                first_air_date: show.first_air_date
              }} />
            ))}
          </div>
          <div className="flex justify-between items-center mb-6">
            <Link href={`/tv/${id}/similar`} className="text-blue-500 hover:text-blue-400 flex items-center">
              Ver más series similares
              <ArrowRightIcon className="h-5 w-5 ml-1" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}