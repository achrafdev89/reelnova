'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import FilterBar from '@/components/FilterBar';
import InfiniteList from '@/components/InfiniteList';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { discover } from '@/services/tmdb-service';
import { hasApiKey } from '@/lib/tmdb';

export default function MoviesPage() {
  const [filters, setFilters] = useState({ sort_by: 'popularity.desc' });

  // Stable cache key derived from active filters.
  const cacheKey = useMemo(
    () => ['movies', JSON.stringify(filters)],
    [filters]
  );

  if (!hasApiKey) return <ApiKeyNotice />;

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="The full library"
        title="Movies"
        description="Browse the catalog and shape it with filters — by genre, year, rating, and sort."
      >
        <div className="mt-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
      </PageHeader>
      <div className="container-page">
        <InfiniteList
          cacheKey={cacheKey}
          fetcher={(page) => discover('movie', filters, page)}
          fallbackType="movie"
        />
      </div>
    </div>
  );
}
