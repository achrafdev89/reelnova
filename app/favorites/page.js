'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, Film, Tv } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import PageHeader from '@/components/PageHeader';
import EmptyState from '@/components/EmptyState';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import { useFavorites } from '@/context/FavoritesContext';
import { POSTER } from '@/constants';
import { formatRating, getYear, ratingColor } from '@/lib/utils';

export default function FavoritesPage() {
  const { favorites, clearFavorites, toggleFavorite, hydrated } = useFavorites();

  // Avoid an SSR/CSR flash before localStorage is read.
  if (!hydrated) {
    return (
      <div className="pb-10">
        <PageHeader eyebrow="Your collection" title="Favorites" />
        <div className="container-page">
          <SkeletonGrid count={12} />
        </div>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="pb-10">
        <PageHeader eyebrow="Your collection" title="Favorites" />
        <EmptyState
          icon={Heart}
          title="No favorites yet"
          message="Tap the heart on any movie or show to save it here for later."
          action={{ href: '/movies', label: 'Browse movies' }}
        />
      </div>
    );
  }

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="Your collection"
        title="Favorites"
        description={`${favorites.length} title${
          favorites.length === 1 ? '' : 's'
        } saved on this device.`}
      >
        <button
          onClick={clearFavorites}
          className="mt-5 inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm text-muted transition hover:border-accent/40 hover:text-accent"
        >
          <Trash2 className="h-4 w-4" />
          Clear all
        </button>
      </PageHeader>

      <div className="container-page">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          <AnimatePresence mode="popLayout">
            {favorites.map((media) => {
              const Icon = media.mediaType === 'tv' ? Tv : Film;
              const poster = POSTER(media.poster, 'w500');
              const year = getYear(media.date);
              return (
                <motion.div
                  key={`${media.mediaType}-${media.id}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.25 }}
                  className="group relative"
                >
                  <Link
                    href={`/${media.mediaType}/${media.id}`}
                    className="block overflow-hidden rounded-2xl border border-white/10 bg-surface"
                  >
                    <div className="relative aspect-[2/3] bg-white/5">
                      {poster ? (
                        <Image
                          src={poster}
                          alt={media.title || ''}
                          fill
                          sizes="(max-width: 640px) 50vw, 200px"
                          className="object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="grid h-full place-items-center">
                          <Icon className="h-8 w-8 text-muted" />
                        </div>
                      )}
                      {media.rating > 0 && (
                        <span
                          className={`absolute left-2 top-2 rounded-md bg-black/70 px-1.5 py-0.5 text-xs font-bold ${ratingColor(
                            media.rating
                          )}`}
                        >
                          {formatRating(media.rating)}
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <p className="truncate text-sm font-semibold">
                        {media.title}
                      </p>
                      <p className="flex items-center gap-1 text-xs capitalize text-muted">
                        <Icon className="h-3 w-3" />
                        {media.mediaType}
                        {year ? ` · ${year}` : ''}
                      </p>
                    </div>
                  </Link>

                  {/* Remove button */}
                  <button
                    onClick={() => toggleFavorite(media)}
                    aria-label={`Remove ${media.title} from favorites`}
                    className="absolute right-2 top-2 grid h-9 w-9 place-items-center rounded-full bg-black/70 text-accent opacity-0 backdrop-blur transition group-hover:opacity-100"
                  >
                    <Heart className="h-4 w-4 fill-current" />
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
