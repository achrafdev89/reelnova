'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Info, Star, Plus, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import TrailerModal from './TrailerModal';
import { useFavorites } from '@/context/FavoritesContext';
import { getMovieDetails, getTVDetails } from '@/services/tmdb-service';
import { BACKDROP } from '@/constants';
import { formatRating, getYear, truncate, normalizeMedia, pickTrailer, cn } from '@/lib/utils';

export default function HeroBanner({ items = [] }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [index, setIndex] = useState(0);
  const [trailer, setTrailer] = useState({ open: false, key: null, title: '' });
  const [loadingTrailer, setLoadingTrailer] = useState(false);

  const featured = items.slice(0, 5).map((i) => normalizeMedia(i));
  const active = featured[index];

  // Auto-advance the hero every 8s.
  useEffect(() => {
    if (featured.length < 2) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % featured.length),
      8000
    );
    return () => clearInterval(id);
  }, [featured.length]);

  if (!active) return null;

  const detailPath = `/${active.mediaType === 'tv' ? 'tv' : 'movie'}/${active.id}`;
  const fav = isFavorite(active.id, active.mediaType);

  const watchTrailer = async () => {
    setLoadingTrailer(true);
    try {
      const fetcher = active.mediaType === 'tv' ? getTVDetails : getMovieDetails;
      const data = await fetcher(active.id);
      const t = pickTrailer(data?.videos?.results);
      if (t) setTrailer({ open: true, key: t.key, title: active.title });
      else toast('No trailer available for this title');
    } catch {
      toast.error('Could not load the trailer');
    } finally {
      setLoadingTrailer(false);
    }
  };

  return (
    <section className="relative -mt-20 h-[88vh] min-h-[600px] w-full overflow-hidden">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={active.id}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: 'easeOut' }}
          className="film-grain absolute inset-0"
        >
          <Image
            src={BACKDROP(active.backdrop, 'original') || ''}
            alt={active.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-top"
          />
        </motion.div>
      </AnimatePresence>

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/40 to-transparent" />

      <div className="container-page relative flex h-full items-end pb-24 sm:items-center sm:pb-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <p className="eyebrow mb-4 flex items-center gap-2">
              <span className="h-px w-8 bg-accent" />
              Featured {active.mediaType === 'tv' ? 'Series' : 'Film'}
            </p>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
              {active.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-muted">
              <span className="flex items-center gap-1 font-semibold text-amber-400">
                <Star className="h-4 w-4 fill-current" />
                {formatRating(active.rating)}
              </span>
              <span>•</span>
              <span>{getYear(active.date)}</span>
              <span className="rounded-full border border-white/15 px-2 py-0.5 text-xs uppercase">
                {active.mediaType === 'tv' ? 'TV' : 'Movie'}
              </span>
            </div>
            <p className="mt-4 text-base leading-relaxed text-ground/90">
              {truncate(active.overview, 200)}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <button
                onClick={watchTrailer}
                disabled={loadingTrailer}
                className="btn-primary"
              >
                <Play className="h-4 w-4 fill-current" />
                {loadingTrailer ? 'Loading…' : 'Watch Trailer'}
              </button>
              <button onClick={() => router.push(detailPath)} className="btn-ghost">
                <Info className="h-4 w-4" />
                More Details
              </button>
              <button
                onClick={() => toggleFavorite(active)}
                className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:bg-white/10"
                aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
              >
                {fav ? (
                  <Check className="h-5 w-5 text-accent" />
                ) : (
                  <Plus className="h-5 w-5" />
                )}
              </button>
            </div>

            {/* Slide indicators */}
            {featured.length > 1 && (
              <div className="mt-8 flex gap-2">
                {featured.map((f, i) => (
                  <button
                    key={f.id}
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${f.title}`}
                    className={cn(
                      'h-1 rounded-full transition-all',
                      i === index ? 'w-10 bg-accent' : 'w-4 bg-white/30'
                    )}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <TrailerModal
        open={trailer.open}
        videoKey={trailer.key}
        title={trailer.title}
        onClose={() => setTrailer((t) => ({ ...t, open: false }))}
      />
    </section>
  );
}
