// Centralized constants for ReelNova.

export const SITE = {
  name: 'ReelNova',
  tagline: 'Discover Movies. Experience Cinema.',
  author: 'achrafdev89',
  github: 'https://github.com/achrafdev89',
  linkedin: 'https://www.linkedin.com/in/achraf-chibane/',
  portfolio: 'https://github.com/achrafdev89',
};

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Trending', href: '/trending' },
  { label: 'Movies', href: '/movies' },
  { label: 'TV Shows', href: '/tv' },
  { label: 'Genres', href: '/genres' },
  { label: 'Favorites', href: '/favorites' },
  { label: 'About', href: '/about' },
];

// TMDB image base + named sizes.
export const IMG_BASE = 'https://image.tmdb.org/t/p';
export const POSTER = (path, size = 'w500') =>
  path ? `${IMG_BASE}/${size}${path}` : null;
export const BACKDROP = (path, size = 'original') =>
  path ? `${IMG_BASE}/${size}${path}` : null;
export const PROFILE = (path, size = 'w300') =>
  path ? `${IMG_BASE}/${size}${path}` : null;

// Curated movie genres (matches TMDB genre ids).
export const MOVIE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 35, name: 'Comedy' },
  { id: 18, name: 'Drama' },
  { id: 878, name: 'Sci-Fi' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 14, name: 'Fantasy' },
  { id: 80, name: 'Crime' },
  { id: 9648, name: 'Mystery' },
  { id: 53, name: 'Thriller' },
  { id: 10749, name: 'Romance' },
  { id: 99, name: 'Documentary' },
  { id: 27, name: 'Horror' },
  { id: 10752, name: 'War' },
  { id: 10751, name: 'Family' },
];

export const GENRE_MAP = Object.fromEntries(
  MOVIE_GENRES.map((g) => [g.id, g.name])
);

export const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity.desc' },
  { label: 'Newest', value: 'primary_release_date.desc' },
  { label: 'Oldest', value: 'primary_release_date.asc' },
  { label: 'Highest Rated', value: 'vote_average.desc' },
  { label: 'Lowest Rated', value: 'vote_average.asc' },
];

export const FAVORITES_KEY = 'reelnova:favorites';
export const RECENT_SEARCH_KEY = 'reelnova:recent-searches';
export const RECENTLY_VIEWED_KEY = 'reelnova:recently-viewed';
