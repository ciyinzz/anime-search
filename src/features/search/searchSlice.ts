import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

// Anime type definition
export interface Anime {
  mal_id: number;
  title: string;
  synopsis: string;
  episodes: number | null;
  status: string;
  score: number | null;
  images: {
    jpg: {
      image_url: string;
    };
  };
}

// Pagination metadata from Jikan API
interface Pagination {
  current_page: number;
  last_visible_page: number;
  has_next_page: boolean;
}

// Slice state
interface SearchState {
  query: string;
  results: Anime[];
  suggestions: Anime[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  selected: Anime | null;
}

const initialState: SearchState = {
  query: '',
  results: [],
  suggestions: [],
  currentPage: 1,
  totalPages: 1,
  loading: false,
  error: null,
  selected: null
};

// Thunk: fetch paginated search results
export const fetchAnimeResults = createAsyncThunk(
  'search/fetchAnimeResults',
  async ({ query, page }: { query: string; page: number }, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}&page=${page}`, {
      signal: controller.signal
    });

    return {
      data: response.data.data,
      pagination: response.data.pagination
    };
  }
);


// Thunk: fetch autocomplete suggestions
export const fetchAnimeSuggestions = createAsyncThunk(
  'search/fetchAnimeSuggestions',
  async (query: string, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());

    const response = await axios.get(`https://api.jikan.moe/v4/anime?q=${query}`, {
      signal: controller.signal
    });

    return response.data.data;
  }
);


// Thunk: fetch anime detail by ID
export const fetchAnimeDetail = createAsyncThunk(
  'search/fetchAnimeDetail',
  async (id: number, { signal }) => {
    const controller = new AbortController();
    signal.addEventListener('abort', () => controller.abort());
    const res = await axios.get(`https://api.jikan.moe/v4/anime/${id}`, {
      signal: controller.signal
    });
    return res.data.data as Anime;
  }
);

// Slice
const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAnimeResults.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeResults.fulfilled, (state, action: PayloadAction<{ data: Anime[]; pagination: Pagination }>) => {
        state.loading = false;
        state.results = action.payload.data;
        state.totalPages = action.payload.pagination.last_visible_page ?? 1;
        state.currentPage = action.payload.pagination.current_page ?? state.currentPage;
      })
      .addCase(fetchAnimeResults.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchAnimeSuggestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAnimeSuggestions.fulfilled, (state, action: PayloadAction<Anime[]>) => {
        state.loading = false;
        state.suggestions = action.payload;
      })
      .addCase(fetchAnimeSuggestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      })
      .addCase(fetchAnimeDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.selected = null;
      })
      .addCase(fetchAnimeDetail.fulfilled, (state, action: PayloadAction<Anime>) => {
        state.loading = false;
        state.selected = action.payload;
      })
      .addCase(fetchAnimeDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? 'Unknown error';
      });
  }
});

export const { setQuery, setCurrentPage } = searchSlice.actions;
export default searchSlice.reducer;
