import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const tmdbApiKey = process.env.REACT_APP_TMDB_KEY;
const page = 1;
export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});
// In above snippet, we can see that we are creating a reducer for the TMDB API.

export const {
  useGetMoviesQuery,
} = tmdbApi;
// In above snippet, we can see that we are using the TMDB API. exporting tmdbApi as a useGetMoviesQuery.
