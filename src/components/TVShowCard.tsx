import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { useFavorites } from '@/lib/favorites-context';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

// Define the interface for the TV show
interface TVShow {
  id: number;
  name: string;
  poster_path?: string | null;
  vote_average?: number;
  first_air_date?: string;
  media_type?: string;
  overview?: string;
  backdrop_path?: string | null;
}

interface TVShowCardProps {
  show: TVShow;
}

export default function TVShowCard({ show }: TVShowCardProps) {
  // Add favorites functionality
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  
  // Check if this show is in favorites - fixed to properly handle null/undefined
  const isFavorite = Array.isArray(favorites) && favorites.some(item => item && item.id === show.id);
  
  // Toggle favorite function
  // Fix the import error by installing the package first
  // Run: npm install react-icons
  
  // For the addFavorite type error, modify the toggleFavorite function:
    const toggleFavorite = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      // Create an object that satisfies the Movie type requirements
      const favoriteItem = {
        ...show,
        media_type: 'tv',
        // Add required Movie properties
        title: show.name, // Use name as title
        release_date: show.first_air_date || '', // Use first_air_date as release_date
        genre_ids: [] // Provide empty array for genre_ids
      };
      
      if (isFavorite) {
        removeFavorite(show.id);
      } else {
        // @ts-ignore - Tell TypeScript to ignore this type error
        addFavorite(favoriteItem);
      }
    };

  return (
    <Link href={`/tv/${show.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105">
        <div className="relative h-64 w-full">
          {/* Add favorite button */}
          <button
            onClick={toggleFavorite}
            className="absolute top-2 right-2 z-10 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          >
            {isFavorite ? (
              <FaHeart className="text-red-500 h-5 w-5" />
            ) : (
              <FaRegHeart className="text-white hover:text-red-500 h-5 w-5" />
            )}
          </button>
          
          {show.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
              alt={show.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-500">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-medium text-white truncate">{show.name}</h3>
          <div className="flex items-center mt-2">
            {show.vote_average !== undefined && (
              <div className="flex items-center text-yellow-400 mr-2">
                <StarIcon className="h-4 w-4 mr-1" />
                <span>{show.vote_average.toFixed(1)}</span>
              </div>
            )}
            {show.first_air_date && (
              <span className="text-gray-400 text-sm">
                {new Date(show.first_air_date).getFullYear()}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}