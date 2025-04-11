// Media types
export interface MediaBase {
  id: number;
  poster_path?: string;
  backdrop_path?: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

export interface Movie extends MediaBase {
  title: string;
  release_date?: string;
  media_type?: 'movie';
}

export interface TVShow extends MediaBase {
  name: string;
  first_air_date?: string;
  number_of_seasons?: number;
  tagline?: string;
  homepage?: string;
  media_type?: 'tv';
}

// For favorites that can be either movies or TV shows
export interface FavoriteItem extends MediaBase {
  title: string;
  name?: string;
  release_date?: string;
  first_air_date?: string;
  media_type: 'movie' | 'tv';
}

// Cast and crew
export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path?: string;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path?: string;
}

// Images and videos
export interface Image {
  file_path: string;
  width: number;
  height: number;
  aspect_ratio: number;
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

// Watch providers
export interface Provider {
  provider_id: number;
  provider_name: string;
  logo_path: string;
}

export interface WatchProviderData {
  link: string;
  rent?: Provider[];
  buy?: Provider[];
  flatrate?: Provider[];
}

export interface WatchProviders {
  results: {
    [countryCode: string]: WatchProviderData;
  };
}

// Reviews
export interface Review {
  id: string;
  author: string;
  content: string;
  created_at: string;
  author_details?: {
    rating?: number;
    avatar_path?: string;
  };
}