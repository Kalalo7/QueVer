'use client';

import { useState, useEffect } from 'react';
import { getMovieReviews } from '@/lib/api';

interface MovieReviewsProps {
  movieId: string;
}

export default function MovieReviews({ movieId }: MovieReviewsProps) {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data.results.slice(0, 5)); // Limitar a 5 reseñas
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [movieId]);

  if (loading) {
    return <div className="space-y-4">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="p-4 bg-gray-800 animate-pulse rounded-lg h-32"></div>
      ))}
    </div>;
  }

  if (reviews.length === 0) {
    return <div className="text-center py-5">No hay reseñas disponibles</div>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="p-4 bg-gray-800 rounded-lg">
          <div className="flex items-center mb-2">
            <div className="font-bold">{review.author}</div>
            {review.author_details.rating && (
              <div className="ml-2 px-2 py-1 bg-blue-600 text-white rounded-full text-xs">
                {review.author_details.rating}/10
              </div>
            )}
          </div>
          <p className="text-gray-300 line-clamp-3">{review.content}</p>
          <a 
            href={review.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-blue-400 text-sm mt-2 inline-block hover:underline"
          >
            Leer reseña completa
          </a>
        </div>
      ))}
    </div>
  );
}