import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/TMDB';
import genreOrCategoryReducer from '../features/currentGenreOrCategory';

export default configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer, //* We are adding the TMDB API reducer to the store.(reducerPath is the path to the reducer reducerPath: 'tmdbApi')
    currentGenreOrCategory: genreOrCategoryReducer,
  },
});

