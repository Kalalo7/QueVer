'use client';

import { useState, useEffect } from 'react';
import { getMovieVideos } from '@/lib/api';

interface MovieTrailerProps {
  movieId: string;
}

export default function MovieTrailer({ movieId }: MovieTrailerProps) {
  const [trailer, setTrailer] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrailer() {
      try {
        const data = await getMovieVideos(movieId);
        // Buscar primero trailers oficiales
        const trailers = data.results.filter(
          (video: any) => 
            (video.type === 'Trailer' || video.type === 'Teaser') && 
            video.site === 'YouTube'
        );
        
        if (trailers.length > 0) {
          setTrailer(trailers[0].key);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTrailer();
  }, [movieId]);

  if (loading) {
    return <div className="h-64 bg-gray-800 animate-pulse rounded-lg"></div>;
  }

  if (!trailer) {
    return <div className="text-center py-10 bg-gray-800 rounded-lg">No hay tráilers disponibles</div>;
  }

  return (
    <div className="aspect-video">
      <iframe
        className="w-full h-full rounded-lg"
        src={`https://www.youtube.com/embed/${trailer}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}