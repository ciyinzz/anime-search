import { configureStore } from '@reduxjs/toolkit'; // Import Redux Toolkit's helper to easily create a store
import searchReducer from '../features/search/searchSlice'; // Import the reducer that manages search-related state

// Create the Redux store and register all reducers
export const store = configureStore({
  reducer: {
    search: searchReducer // Assign the search slice reducer to the `search` state key
  }
});

// Infer the type of the entire Redux state object
export type RootState = ReturnType<typeof store.getState>;
// Infer the type of the Redux dispatch function
export type AppDispatch = typeof store.dispatch;
