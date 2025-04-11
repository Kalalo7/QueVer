'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMovieImages } from '@/lib/api';

interface MovieGalleryProps {
  movieId: string;
}

export default function MovieGallery({ movieId }: MovieGalleryProps) {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await getMovieImages(movieId);
        // Combinar backdrops y posters, limitando a 10 imágenes
        const allImages = [...data.backdrops, ...data.posters].slice(0, 10);
        setImages(allImages);
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [movieId]);

  if (loading) {
    return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-40 bg-gray-800 animate-pulse rounded-lg"></div>
      ))}
    </div>;
  }

  if (images.length === 0) {
    return <div className="text-center py-5">No hay imágenes disponibles</div>;
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="relative h-40 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => setSelectedImage(index)}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
              alt="Movie image"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* Modal para ver imagen ampliada */}
      {selectedImage !== null && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={`https://image.tmdb.org/t/p/original${images[selectedImage].file_path}`}
              alt="Movie image full size"
              fill
              className="object-contain"
            />
            <button 
              className="absolute top-2 right-2 bg-gray-800 text-white p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              X
            </button>
          </div>
        </div>
      )}
    </div>
  );
}