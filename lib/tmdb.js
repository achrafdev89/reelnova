import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// A single configured axios instance. The TMDB v3 key rides on every
// request as a query param so we never have to repeat it at call sites.
export const tmdb = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
    include_adult: false,
  },
});

tmdb.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error?.response?.status;
    const message =
      error?.response?.data?.status_message ||
      error?.message ||
      'Something went wrong talking to TMDB.';

    if (status === 401) {
      return Promise.reject(
        new Error(
          'TMDB rejected the request (401). Add a valid NEXT_PUBLIC_TMDB_API_KEY to .env.local.'
        )
      );
    }
    return Promise.reject(new Error(message));
  }
);

export const hasApiKey = Boolean(API_KEY);
