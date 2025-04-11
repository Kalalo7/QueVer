export interface MediaBase {
  id: number;
  title?: string;
  name?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  vote_average: number;
  overview: string;
  release_date?: string;
  first_air_date?: string;
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
  media_type?: 'tv';
}

export type FavoriteItem = Movie | TVShow;