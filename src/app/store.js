import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer, //* We are adding the TMDB API reducer to the store.(reducerPath is the path to the reducer reducerPath: 'tmdbApi')
  },
});

