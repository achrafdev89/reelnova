'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { SearchX, Clock, TrendingUp, Sparkles } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import SearchBar from '@/components/SearchBar';
import MovieGrid from '@/components/MovieGrid';
import ActorCard from '@/components/ActorCard';
import EmptyState from '@/components/EmptyState';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { SkeletonGrid } from '@/components/LoadingSkeleton';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/queries';
import { useLocalStorageList } from '@/hooks/useLocalStorageList';
import { hasApiKey } from '@/lib/tmdb';
import { RECENT_SEARCH_KEY } from '@/constants';

const TABS = [
  { label: 'All', value: 'all' },
  { label: 'Movies', value: 'movie' },
  { label: 'TV Shows', value: 'tv' },
  { label: 'People', value: 'person' },
];

const SUGGESTIONS = [
  'Dune',
  'Oppenheimer',
  'Breaking Bad',
  'Studio Ghibli',
  'Christopher Nolan',
  'The Bear',
];

function SearchInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initial = searchParams.get('q') || '';

  const [query, setQuery] = useState(initial);
  const [tab, setTab] = useState('all');
  const debounced = useDebounce(query, 350);
  const { data, isFetching } = useSearch(debounced);
  const recent = useLocalStorageList(RECENT_SEARCH_KEY, 8);

  // Keep the URL in sync so searches are shareable/bookmarkable.
  useEffect(() => {
    const trimmed = debounced.trim();
    if (!trimmed) return;
    recent.add({ value: trimmed });
    const next = `/search?q=${encodeURIComponent(trimmed)}`;
    router.replace(next, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounced]);

  const results = data?.results || [];

  const grouped = useMemo(() => {
    const movies = results.filter((r) => r.media_type === 'movie');
    const tv = results.filter((r) => r.media_type === 'tv');
    const people = results.filter((r) => r.media_type === 'person');
    return { movies, tv, people };
  }, [results]);

  const hasQuery = debounced.trim().length > 1;
  const total =
    grouped.movies.length + grouped.tv.length + grouped.people.length;

  if (!hasApiKey) return <ApiKeyNotice />;

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="Search"
        title="Find anything"
        description="Movies, shows, and the people who make them — as you type."
      >
        <div className="mt-6 max-w-2xl">
          <SearchBar
            autoFocus
            defaultValue={initial}
            onQueryChange={setQuery}
            onSubmit={setQuery}
          />
        </div>

        {/* Result-type tabs */}
        {hasQuery && (
          <div className="mt-5 flex flex-wrap gap-2">
            {TABS.map((t) => (
              <button
                key={t.value}
                onClick={() => setTab(t.value)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                  tab === t.value
                    ? 'bg-accent text-white'
                    : 'border border-white/10 text-muted hover:text-ground'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}
      </PageHeader>

      <div className="container-page">
        {/* Idle state: suggestions + recent searches */}
        {!hasQuery && (
          <div className="space-y-10">
            <section>
              <p className="eyebrow mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4" /> Try searching for
              </p>
              <div className="flex flex-wrap gap-2.5">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm transition hover:border-accent/40 hover:text-ground"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </section>

            {recent.items.length > 0 && (
              <section>
                <div className="mb-3 flex items-center justify-between">
                  <p className="eyebrow flex items-center gap-2">
                    <Clock className="h-4 w-4" /> Recent searches
                  </p>
                  <button
                    onClick={recent.clear}
                    className="text-xs text-muted transition hover:text-accent"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {recent.items.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => setQuery(r.value)}
                      className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition hover:text-ground"
                    >
                      <TrendingUp className="h-3.5 w-3.5" />
                      {r.value}
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        {/* Loading */}
        {hasQuery && isFetching && total === 0 && <SkeletonGrid count={12} />}

        {/* No results */}
        {hasQuery && !isFetching && total === 0 && (
          <EmptyState
            icon={SearchX}
            title={`No results for “${debounced}”`}
            message="Check the spelling or try a different title, show, or name."
          />
        )}

        {/* Results */}
        {hasQuery && total > 0 && (
          <div className="space-y-12">
            {(tab === 'all' || tab === 'movie') && grouped.movies.length > 0 && (
              <ResultSection title="Movies" count={grouped.movies.length}>
                <MovieGrid items={grouped.movies} fallbackType="movie" />
              </ResultSection>
            )}

            {(tab === 'all' || tab === 'tv') && grouped.tv.length > 0 && (
              <ResultSection title="TV Shows" count={grouped.tv.length}>
                <MovieGrid items={grouped.tv} fallbackType="tv" />
              </ResultSection>
            )}

            {(tab === 'all' || tab === 'person') &&
              grouped.people.length > 0 && (
                <ResultSection title="People" count={grouped.people.length}>
                  <div className="flex flex-wrap gap-5">
                    {grouped.people.map((p, i) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: Math.min(i * 0.03, 0.3) }}
                      >
                        <ActorCard person={p} />
                      </motion.div>
                    ))}
                  </div>
                </ResultSection>
              )}
          </div>
        )}
      </div>
    </div>
  );
}

function ResultSection({ title, count, children }) {
  return (
    <section>
      <h2 className="mb-5 flex items-baseline gap-3 font-display text-2xl font-bold">
        {title}
        <span className="text-sm font-normal text-muted">{count}</span>
      </h2>
      {children}
    </section>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SkeletonGrid count={12} />}>
      <SearchInner />
    </Suspense>
  );
}
