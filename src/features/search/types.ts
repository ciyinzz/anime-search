export interface Anime {
  mal_id: number;
  title: string;
  images: { jpg?: { image_url?: string } };
  score?: number;
  episodes?: number;
  year?: number;
  synopsis?: string;
}

export interface SearchState {
  query: string;
  page: number;
  results: Anime[];
  total: number; // total results from API pagination
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error?: string;
  requestId?: string; // used for race cancellation
}
