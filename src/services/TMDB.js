import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const url = process.env.REACT_APP_TMDB_URL;
const page = 1;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => `/genre/movie/list?api_key=${tmdbApiKey}`,
    }),
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});
// In above snippet, we can see that we are creating a reducer for the TMDB API.

export const {
  useGetMoviesQuery,
  useGetGenresQuery,
} = tmdbApi;
// In above snippet, we can see that we are using the TMDB API. exporting tmdbApi as a useGetMoviesQuery.
