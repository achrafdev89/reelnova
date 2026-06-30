'use client';

import { useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Film } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import InfiniteList from '@/components/InfiniteList';
import EmptyState from '@/components/EmptyState';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { getByGenre } from '@/services/tmdb-service';
import { hasApiKey } from '@/lib/tmdb';
import { GENRE_MAP, SORT_OPTIONS } from '@/constants';

// Media-type + sort controls scoped to a single genre.
const TYPES = [
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
];

export default function GenreDetailPage() {
  const params = useParams();
  const genreId = Number(params.id);
  const genreName = GENRE_MAP[genreId];

  const [type, setType] = useState('movie');
  const [sortBy, setSortBy] = useState('popularity.desc');

  const cacheKey = useMemo(
    () => ['genre', genreId, type, sortBy],
    [genreId, type, sortBy]
  );

  if (!hasApiKey) return <ApiKeyNotice />;

  if (!genreName) {
    return (
      <EmptyState
        icon={Film}
        title="Unknown genre"
        message="We couldn't find that genre. Browse the full list instead."
        action={{ href: '/genres', label: 'All genres' }}
      />
    );
  }

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="Genre"
        title={genreName}
        description={`The best ${genreName.toLowerCase()} ${
          type === 'movie' ? 'movies' : 'shows'
        }, sorted your way.`}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {/* Media type toggle */}
          <div className="inline-flex rounded-xl border border-white/10 bg-white/5 p-1">
            {TYPES.map((t) => (
              <button
                key={t.value}
                onClick={() => setType(t.value)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium transition ${
                  type === t.value
                    ? 'bg-accent text-white'
                    : 'text-muted hover:text-ground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Sort selector */}
          <label className="sr-only" htmlFor="genre-sort">
            Sort by
          </label>
          <select
            id="genre-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-ground focus:border-accent/50"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value} className="bg-surface">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </PageHeader>

      <div className="container-page">
        <InfiniteList
          cacheKey={cacheKey}
          fetcher={(page) => getByGenre(genreId, type, page, sortBy)}
          fallbackType={type}
          emptyMessage={`No ${genreName.toLowerCase()} titles found for this sort.`}
        />
      </div>
    </div>
  );
}
