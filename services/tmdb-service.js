import { tmdb } from '@/lib/tmdb';

// --- Discovery / lists -----------------------------------------------------

export const getTrending = (window = 'day', page = 1) =>
  tmdb.get(`/trending/all/${window}`, { params: { page } });

export const getTrendingMovies = (window = 'week', page = 1) =>
  tmdb.get(`/trending/movie/${window}`, { params: { page } });

export const getNowPlaying = (page = 1) =>
  tmdb.get('/movie/now_playing', { params: { page } });

export const getPopularMovies = (page = 1) =>
  tmdb.get('/movie/popular', { params: { page } });

export const getTopRatedMovies = (page = 1) =>
  tmdb.get('/movie/top_rated', { params: { page } });

export const getUpcomingMovies = (page = 1) =>
  tmdb.get('/movie/upcoming', { params: { page } });

export const getPopularTV = (page = 1) =>
  tmdb.get('/tv/popular', { params: { page } });

export const getTopRatedTV = (page = 1) =>
  tmdb.get('/tv/top_rated', { params: { page } });

export const getPopularPeople = (page = 1) =>
  tmdb.get('/person/popular', { params: { page } });

// --- Discover with filters -------------------------------------------------

export const discover = (type = 'movie', filters = {}, page = 1) =>
  tmdb.get(`/discover/${type}`, {
    params: {
      page,
      sort_by: 'popularity.desc',
      ...filters,
    },
  });

export const getByGenre = (genreId, type = 'movie', page = 1, sortBy) =>
  discover(type, { with_genres: genreId, sort_by: sortBy }, page);

// --- Detail ----------------------------------------------------------------

export const getMovieDetails = (id) =>
  tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'videos,credits,images,recommendations,reviews,watch/providers',
      include_image_language: 'en,null',
    },
  });

export const getTVDetails = (id) =>
  tmdb.get(`/tv/${id}`, {
    params: {
      append_to_response: 'videos,credits,images,recommendations,reviews,watch/providers',
      include_image_language: 'en,null',
    },
  });

export const getPersonDetails = (id) =>
  tmdb.get(`/person/${id}`, {
    params: { append_to_response: 'combined_credits,images' },
  });

// --- Search ----------------------------------------------------------------

export const searchMulti = (query, page = 1) =>
  tmdb.get('/search/multi', { params: { query, page } });
