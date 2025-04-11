const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY || '';
const BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';

export async function fetchTrending() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  
  return response.json();
}

// Fix variable name to match BASE_URL
export async function getPopularMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  return response.json();
}

export async function getTopRatedMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  return response.json();
}

export async function getUpcomingMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  return response.json();
}

export async function getMovieDetails(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=es-ES`
  );
  return response.json();
}

// Keep only this version of getMovieCredits
export async function getMovieCredits(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie credits');
  }
  
  return response.json();
}

// Add back the getSimilarMovies function
export async function getSimilarMovies(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch similar movies');
  }
  
  return response.json();
}

export async function getSimilarTVShows(id: number) {
    const response = await fetch(
        `${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}&language=es-ES`
    );
    if (!response.ok) {
        throw new Error('Failed to fetch similar TV shows');
      }
      return response.json();
    }

export async function searchMovies(query: string, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`
  );
  return response.json();
}

export async function getMoviesByGenre(genreId: number, page = 1, minRating = 0) {
  const voteFilter = minRating > 0 ? `&vote_average.gte=${minRating}` : '';
  
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&with_genres=${genreId}&page=${page}${voteFilter}&sort_by=popularity.desc`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies by genre');
  }
  
  return response.json();
}

export async function getMoviesByRating(minRating: number, page = 1) {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${API_KEY}&language=es-ES&vote_average.gte=${minRating}&page=${page}&sort_by=popularity.desc`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movies by rating');
  }
  
  return response.json();
}

// Add this function to your existing api.ts file
export async function getGenres() {
  const response = await fetch(
    `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch genres');
  }
  
  return response.json();
}

// Añadir estas nuevas funciones para obtener videos, imágenes, reseñas y proveedores de streaming

export async function getMovieVideos(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie videos');
  }
  
  return response.json();
}

export async function getMovieImages(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/images?api_key=${API_KEY}&include_image_language=es,null`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie images');
  }
  
  return response.json();
}

export async function getMovieReviews(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch movie reviews');
  }
  
  return response.json();
}

export async function getMovieWatchProviders(id: string) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch watch providers');
  }
  
  return response.json();
}

// Añadir estas funciones para obtener series de TV

export async function getPopularTVShows(page = 1) {
  const response = await fetch(
    `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch popular TV shows');
  }
  
  return response.json();
}

export async function getTopRatedTVShows(page = 1) {
  const response = await fetch(
    `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&language=es-ES&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch top rated TV shows');
  }
  
  return response.json();
}

// Renamed to avoid duplicate declaration
export async function getTVShowDetailsById(id: string) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show details');
  }
  
  return response.json();
}

export async function getTVShowCredits(id: string) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show credits');
  }
  
  return response.json();
}

export async function getTVShowVideos(id: string) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show videos');
  }
  
  return response.json();
}

export async function getTVShowImages(id: string) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/images?api_key=${API_KEY}&include_image_language=es,null`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show images');
  }
  
  return response.json();
}

export async function getTVShowWatchProviders(id: string) {
  const response = await fetch(
    `${BASE_URL}/tv/${id}/watch/providers?api_key=${API_KEY}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show watch providers');
  }
  
  return response.json();
}

export async function searchTVShows(query: string, page = 1) {
  const response = await fetch(
    `${BASE_URL}/search/tv?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=${page}`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch TV show search results');
  }
  
  return response.json();
}

export async function getTVShowDetails(id: number) {
    const response = await fetch(
`${BASE_URL}/tv/${id}?api_key=${API_KEY}&language=es-ES`
  );
   
  if (!response.ok) {
    throw new Error('Failed to fetch TV show details');
  }
  
  return response.json();
}

export async function getTrendingMovies() {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending movies');
  }
  
  return response.json();
}

export async function getTrendingTVShows() {
  const response = await fetch(
    `${BASE_URL}/trending/tv/day?api_key=${API_KEY}&language=es-ES`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch trending TV shows');
  }
  
  return response.json();
}

// Add this new function for multi-search (movies and TV shows)
export async function searchMulti(query: string) {
  const url = `${BASE_URL}/search/multi?api_key=${API_KEY}&language=es-ES&query=${encodeURIComponent(query)}&page=1&include_adult=false`;
  
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch search results');
  }
  
  return response.json();
}