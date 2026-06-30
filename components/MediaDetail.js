'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Play,
  Star,
  Clock,
  Calendar,
  Plus,
  Check,
  Tv,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import TrailerModal from './TrailerModal';
import ShareButton from './ShareButton';
import ActorCard from './ActorCard';
import ReviewCard from './ReviewCard';
import Carousel from './Carousel';
import Breadcrumb from './Breadcrumb';
import GenreBadge from './GenreBadge';
import { useFavorites } from '@/context/FavoritesContext';
import { BACKDROP, POSTER } from '@/constants';
import {
  formatDate,
  formatRuntime,
  formatRating,
  ratingColor,
  getYear,
  pickTrailer,
  cn,
} from '@/lib/utils';

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

export default function MediaDetail({ data, type }) {
  const router = useRouter();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [trailerOpen, setTrailerOpen] = useState(false);
  const castRef = useRef(null);

  const scrollCast = (dir) => {
    castRef.current?.scrollBy({ left: dir * 600, behavior: 'smooth' });
  };

  const isTV = type === 'tv';
  const title = data.title || data.name;
  const date = data.release_date || data.first_air_date;
  const runtime = isTV
    ? data.episode_run_time?.[0]
    : data.runtime;
  const trailer = pickTrailer(data.videos?.results);
  const cast = data.credits?.cast?.slice(0, 16) || [];
  const crew = data.credits?.crew || [];
  const directors = crew.filter((c) => c.job === 'Director' || c.job === 'Creator');
  const writers = crew.filter((c) =>
    ['Writer', 'Screenplay', 'Story'].includes(c.job)
  );
  const gallery = (data.images?.backdrops || []).slice(0, 8);
  const recommendations = data.recommendations?.results || [];
  const reviews = (data.reviews?.results || []).slice(0, 4);
  const providers =
    data['watch/providers']?.results?.US?.flatrate ||
    data['watch/providers']?.results?.US?.buy ||
    [];

  const media = {
    id: data.id,
    mediaType: type,
    title,
    poster: data.poster_path,
    backdrop: data.backdrop_path,
    rating: data.vote_average,
    date,
  };
  const fav = isFavorite(data.id, type);

  return (
    <article className="pb-10">
      {/* Backdrop hero */}
      <div className="relative -mt-20 h-[70vh] min-h-[520px] w-full overflow-hidden film-grain">
        <Image
          src={BACKDROP(data.backdrop_path, 'original') || ''}
          alt={title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 to-transparent" />

        <div className="container-page absolute inset-x-0 top-24">
          <button
            onClick={() => router.back()}
            className="btn-ghost px-4 py-2 text-xs"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
        </div>
      </div>

      {/* Title block, pulled up over the backdrop */}
      <div className="container-page relative -mt-56 sm:-mt-64">
        <div className="flex flex-col gap-8 md:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto w-44 shrink-0 sm:w-56 md:mx-0"
          >
            <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/10 shadow-lift">
              {POSTER(data.poster_path, 'w500') ? (
                <Image
                  src={POSTER(data.poster_path, 'w500')}
                  alt={title}
                  fill
                  sizes="224px"
                  className="object-cover"
                />
              ) : (
                <div className="grid h-full place-items-center bg-surface text-sm text-muted">
                  No poster
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1"
          >
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: isTV ? 'TV Shows' : 'Movies', href: isTV ? '/tv' : '/movies' },
                { label: title },
              ]}
            />
            <h1 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-5xl">
              {title}{' '}
              <span className="font-normal text-muted">({getYear(date)})</span>
            </h1>
            {data.tagline && (
              <p className="mt-2 italic text-muted">“{data.tagline}”</p>
            )}

            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <span className={cn('flex items-center gap-1.5 font-bold', ratingColor(data.vote_average))}>
                <Star className="h-4 w-4 fill-current" />
                {formatRating(data.vote_average)}
                <span className="font-normal text-muted">
                  ({data.vote_count?.toLocaleString()})
                </span>
              </span>
              {date && (
                <span className="flex items-center gap-1.5 text-muted">
                  <Calendar className="h-4 w-4" />
                  {formatDate(date)}
                </span>
              )}
              {runtime ? (
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="h-4 w-4" />
                  {formatRuntime(runtime)}
                </span>
              ) : null}
              {isTV && data.number_of_seasons && (
                <span className="flex items-center gap-1.5 text-muted">
                  <Tv className="h-4 w-4" />
                  {data.number_of_seasons} season
                  {data.number_of_seasons > 1 ? 's' : ''}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {(data.genres || []).map((g) => (
                <GenreBadge
                  key={g.id}
                  id={g.id}
                  name={g.name}
                  href={`/genres/${g.id}`}
                />
              ))}
            </div>

            <p className="mt-5 max-w-3xl leading-relaxed text-ground/90">
              {data.overview || 'No overview available.'}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {trailer && (
                <button onClick={() => setTrailerOpen(true)} className="btn-primary">
                  <Play className="h-4 w-4 fill-current" /> Watch Trailer
                </button>
              )}
              <button
                onClick={() => toggleFavorite(media)}
                className={cn('btn-ghost', fav && 'border-accent/50 text-accent')}
              >
                {fav ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                {fav ? 'In favorites' : 'Add to favorites'}
              </button>
              <ShareButton title={title} />
            </div>

            {(directors.length > 0 || writers.length > 0) && (
              <div className="mt-7 grid max-w-lg grid-cols-2 gap-4 text-sm">
                {directors.length > 0 && (
                  <div>
                    <p className="eyebrow mb-1">
                      {isTV ? 'Creator' : 'Director'}
                    </p>
                    <p className="font-medium">
                      {directors.map((d) => d.name).join(', ')}
                    </p>
                  </div>
                )}
                {writers.length > 0 && (
                  <div>
                    <p className="eyebrow mb-1">Writers</p>
                    <p className="font-medium">
                      {[...new Set(writers.map((w) => w.name))]
                        .slice(0, 3)
                        .join(', ')}
                    </p>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Cast */}
        {cast.length > 0 && (
          <motion.section {...fade} className="mt-14">
            <h2 className="mb-5 font-display text-2xl font-bold">Top Cast</h2>
            <div className="group/cast relative">
              <div
                ref={castRef}
                className="no-scrollbar flex snap-x gap-4 overflow-x-auto scroll-smooth pb-2"
              >
                {cast.map((p) => (
                  <div key={p.id} className="shrink-0 snap-start">
                    <ActorCard person={p} />
                  </div>
                ))}
              </div>

              {/* Desktop nav arrows fade in on hover */}
              <button
                onClick={() => scrollCast(-1)}
                className="absolute left-0 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 backdrop-blur transition hover:bg-accent md:grid md:opacity-0 md:group-hover/cast:opacity-100"
                aria-label="Scroll cast left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => scrollCast(1)}
                className="absolute right-0 top-[42%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 backdrop-blur transition hover:bg-accent md:grid md:opacity-0 md:group-hover/cast:opacity-100"
                aria-label="Scroll cast right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.section>
        )}

        {/* Streaming providers (UI only) */}
        {providers.length > 0 && (
          <motion.section {...fade} className="mt-14">
            <h2 className="mb-2 font-display text-2xl font-bold">Where to Watch</h2>
            <p className="mb-5 text-sm text-muted">
              Availability shown for reference (US). ReelNova does not stream content.
            </p>
            <div className="flex flex-wrap gap-3">
              {providers.map((p) => (
                <div
                  key={p.provider_id}
                  className="glass flex items-center gap-3 px-4 py-2.5"
                >
                  {POSTER(p.logo_path, 'w92') && (
                    <Image
                      src={POSTER(p.logo_path, 'w92')}
                      alt={p.provider_name}
                      width={32}
                      height={32}
                      className="rounded-lg"
                    />
                  )}
                  <span className="text-sm font-medium">{p.provider_name}</span>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Gallery */}
        {gallery.length > 0 && (
          <motion.section {...fade} className="mt-14">
            <h2 className="mb-5 font-display text-2xl font-bold">Gallery</h2>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
              {gallery.map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                >
                  <Image
                    src={BACKDROP(img.file_path, 'w780')}
                    alt={`${title} still ${i + 1}`}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Reviews */}
        {reviews.length > 0 && (
          <motion.section {...fade} className="mt-14">
            <h2 className="mb-5 font-display text-2xl font-bold">Reviews</h2>
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <motion.section {...fade} className="mt-16">
          <div className="container-page mb-5">
            <h2 className="font-display text-2xl font-bold">More Like This</h2>
          </div>
          <Carousel items={recommendations} fallbackType={type} />
        </motion.section>
      )}

      <TrailerModal
        open={trailerOpen}
        videoKey={trailer?.key}
        title={title}
        onClose={() => setTrailerOpen(false)}
      />
    </article>
  );
}
