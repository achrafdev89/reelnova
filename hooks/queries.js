'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import * as api from '@/services/tmdb-service';

const HOUR = 1000 * 60 * 60;

// Shared options: TMDB data is stable, so cache generously.
const common = { staleTime: HOUR, gcTime: HOUR * 24, retry: 1 };

export const useTrending = (window = 'day') =>
  useQuery({
    queryKey: ['trending', window],
    queryFn: () => api.getTrending(window),
    ...common,
  });

export const useHomeRail = (key, fn) =>
  useQuery({ queryKey: ['rail', key], queryFn: fn, ...common });

export const useMovieDetails = (id) =>
  useQuery({
    queryKey: ['movie', id],
    queryFn: () => api.getMovieDetails(id),
    enabled: Boolean(id),
    ...common,
  });

export const useTVDetails = (id) =>
  useQuery({
    queryKey: ['tv', id],
    queryFn: () => api.getTVDetails(id),
    enabled: Boolean(id),
    ...common,
  });

export const usePerson = (id) =>
  useQuery({
    queryKey: ['person', id],
    queryFn: () => api.getPersonDetails(id),
    enabled: Boolean(id),
    ...common,
  });

export const useSearch = (query) =>
  useQuery({
    queryKey: ['search', query],
    queryFn: () => api.searchMulti(query),
    enabled: query.trim().length > 1,
    staleTime: 1000 * 60 * 5,
  });

// Infinite list used by /movies, /tv, /trending, and genre pages.
export const useInfiniteList = (key, fetcher) =>
  useInfiniteQuery({
    queryKey: ['infinite', ...key],
    queryFn: ({ pageParam = 1 }) => fetcher(pageParam),
    getNextPageParam: (last) =>
      last.page < Math.min(last.total_pages, 500) ? last.page + 1 : undefined,
    initialPageParam: 1,
    ...common,
  });
