'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMovieWatchProviders } from '@/lib/api';

interface WatchProvidersProps {
  movieId: string;
}

export default function WatchProviders({ movieId }: WatchProvidersProps) {
  const [providers, setProviders] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const data = await getMovieWatchProviders(movieId);
        // Obtener proveedores para España (ES) o si no hay, para US
        const results = data.results;
        setProviders(results.ES || results.US || null);
      } catch (error) {
        console.error('Error fetching providers:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProviders();
  }, [movieId]);

  if (loading) {
    return <div className="h-20 bg-gray-800 animate-pulse rounded-lg"></div>;
  }

  if (!providers) {
    return <div className="text-center py-5">No hay información de proveedores disponible</div>;
  }

  return (
    <div>
      {providers.flatrate && providers.flatrate.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Disponible en streaming</h4>
          <div className="flex flex-wrap gap-2">
            {providers.flatrate.map((provider: any) => (
              <div key={provider.provider_id} className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  fill
                  className="object-cover"
                  title={provider.provider_name}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {providers.rent && providers.rent.length > 0 && (
        <div className="mb-4">
          <h4 className="text-lg font-medium mb-2">Disponible para alquilar</h4>
          <div className="flex flex-wrap gap-2">
            {providers.rent.map((provider: any) => (
              <div key={provider.provider_id} className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  fill
                  className="object-cover"
                  title={provider.provider_name}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {providers.buy && providers.buy.length > 0 && (
        <div>
          <h4 className="text-lg font-medium mb-2">Disponible para comprar</h4>
          <div className="flex flex-wrap gap-2">
            {providers.buy.map((provider: any) => (
              <div key={provider.provider_id} className="relative w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
                  alt={provider.provider_name}
                  fill
                  className="object-cover"
                  title={provider.provider_name}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {providers.link && (
        <a 
          href={providers.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-blue-400 text-sm mt-4 inline-block hover:underline"
        >
          Ver todas las opciones
        </a>
      )}
    </div>
  );
}