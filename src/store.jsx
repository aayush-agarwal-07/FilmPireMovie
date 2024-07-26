import { configureStore } from '@reduxjs/toolkit';
import movieReducer from './reducers/movieSlice';
import tvReducer from './reducers/tvSlice';
import { tmdbApi } from './services/TMDB';
import genreOrCategoryReducer from './reducers/currentGenreOrCategory';
import userReducer from './reducers/auth';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    tv: tvReducer,
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer,
  },
  // Add RTK Query middleware here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
