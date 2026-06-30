'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Star, Play } from 'lucide-react';
import { useFavorites } from '@/context/FavoritesContext';
import { POSTER } from '@/constants';
import { formatRating, ratingColor, getYear, cn } from '@/lib/utils';

export default function MovieCard({ media, rank }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  if (!media) return null;

  const fav = isFavorite(media.id, media.mediaType);
  const href = `/${media.mediaType === 'tv' ? 'tv' : 'movie'}/${media.id}`;
  const poster = POSTER(media.poster, 'w500');

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      className="group relative"
    >
      <Link href={href} className="block">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-lift">
          {poster ? (
            <Image
              src={poster}
              alt={media.title}
              fill
              sizes="(max-width:640px) 45vw, (max-width:1024px) 25vw, 16vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="grid h-full place-items-center bg-white/5 p-4 text-center text-xs text-muted">
              {media.title}
            </div>
          )}

          {/* Gradient veil + reveal-on-hover controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent opacity-90" />

          {typeof rank === 'number' && (
            <span className="rank-stamp pointer-events-none absolute -bottom-3 left-1 text-[6rem] font-extrabold">
              {rank}
            </span>
          )}

          <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 text-xs font-semibold backdrop-blur">
            <Star className={cn('h-3 w-3 fill-current', ratingColor(media.rating))} />
            <span className={ratingColor(media.rating)}>
              {formatRating(media.rating)}
            </span>
          </span>

          <span className="absolute right-2 top-2 rounded-full bg-black/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-muted backdrop-blur">
            {media.mediaType === 'tv' ? 'TV' : 'Film'}
          </span>

          <div className="absolute inset-x-0 bottom-0 translate-y-3 p-3 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <span className="btn-primary w-full py-2 text-xs">
              <Play className="h-3.5 w-3.5 fill-current" /> View details
            </span>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault();
          toggleFavorite(media);
        }}
        aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
        aria-pressed={fav}
        className="absolute right-2 top-12 grid h-9 w-9 place-items-center rounded-full bg-black/60 backdrop-blur transition hover:scale-110"
      >
        <Heart
          className={cn(
            'h-4 w-4 transition',
            fav ? 'fill-accent text-accent' : 'text-white'
          )}
        />
      </button>

      <div className="mt-3 px-1">
        <h3 className="truncate text-sm font-semibold">{media.title}</h3>
        <p className="text-xs text-muted">{getYear(media.date) || '—'}</p>
      </div>
    </motion.article>
  );
}
