'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from 'react';
import toast from 'react-hot-toast';
import { FAVORITES_KEY } from '@/constants';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Load once on mount (client only) to avoid SSR/localStorage mismatch.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist whenever the list changes (after hydration).
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch {
      /* storage may be full or blocked */
    }
  }, [favorites, hydrated]);

  const isFavorite = useCallback(
    (id, mediaType = 'movie') =>
      favorites.some((f) => f.id === id && f.mediaType === mediaType),
    [favorites]
  );

  const toggleFavorite = useCallback(
    (media) => {
      if (!media?.id) return;
      const type = media.mediaType || 'movie';
      setFavorites((prev) => {
        const exists = prev.some(
          (f) => f.id === media.id && f.mediaType === type
        );
        if (exists) {
          toast('Removed from favorites');
          return prev.filter(
            (f) => !(f.id === media.id && f.mediaType === type)
          );
        }
        toast.success('Added to favorites');
        return [
          {
            id: media.id,
            mediaType: type,
            title: media.title,
            poster: media.poster,
            backdrop: media.backdrop,
            rating: media.rating,
            date: media.date,
            addedAt: Date.now(),
          },
          ...prev,
        ];
      });
    },
    []
  );

  const clearFavorites = useCallback(() => {
    setFavorites([]);
    toast('Favorites cleared');
  }, []);

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite, clearFavorites, hydrated }),
    [favorites, isFavorite, toggleFavorite, clearFavorites, hydrated]
  );

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx)
    throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
