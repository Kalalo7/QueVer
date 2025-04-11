// First, let's check the current file and fix the formattedShow issue
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getSimilarTVShows } from '@/lib/api';
import LoadingSpinner from '@/components/LoadingSpinner';
import TVShowCard from '@/components/TVShowCard';

// Define a proper interface for the TV show
interface TVShow {
  id: number;
  name: string;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  first_air_date?: string;
  overview: string;
}

export default function SimilarTVShowsPage() {
  const { id } = useParams();
  const [shows, setShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSimilarTVShows(Number(id));
        setShows(data.results);
      } catch (error) {
        console.error('Error cargando series similares:', error);
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      loadData();
    }
  }, [id]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (shows.length === 0) {
    return <div className="text-center py-10">No se encontraron series similares</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Series Similares</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {shows.map((show) => (
          <TVShowCard 
            key={show.id} 
            show={{
              id: show.id,
              name: show.name,
              poster_path: show.poster_path,
              vote_average: show.vote_average,
              first_air_date: show.first_air_date
            }} 
          />
        ))}
      </div>
    </div>
  );
}