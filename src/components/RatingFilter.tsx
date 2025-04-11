'use client';

import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';

interface RatingFilterProps {
  onRatingChange: (minRating: number) => void;
  currentRating: number;
}

export default function RatingFilter({ onRatingChange, currentRating }: RatingFilterProps) {
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  
  const handleRatingClick = (rating: number) => {
    onRatingChange(rating === currentRating ? 0 : rating);
  };

  return (
    <div className="flex flex-col items-start">
      <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Minimum Rating</h3>
      <div className="flex">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((rating) => (
          <button
            key={rating}
            onClick={() => handleRatingClick(rating)}
            onMouseEnter={() => setHoveredRating(rating)}
            onMouseLeave={() => setHoveredRating(null)}
            className="p-1"
          >
            <StarIcon
              className={`h-6 w-6 ${
                (hoveredRating !== null ? rating <= hoveredRating : rating <= currentRating)
                  ? 'text-yellow-500'
                  : 'text-gray-400 dark:text-gray-600'
              }`}
            />
          </button>
        ))}
        {currentRating > 0 && (
          <span className="ml-2 text-sm text-gray-600 dark:text-gray-300 self-center">
            {currentRating}+ Stars
          </span>
        )}
      </div>
    </div>
  );
}