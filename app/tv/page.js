'use client';

import { useMemo, useState } from 'react';
import PageHeader from '@/components/PageHeader';
import FilterBar from '@/components/FilterBar';
import InfiniteList from '@/components/InfiniteList';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { discover } from '@/services/tmdb-service';
import { hasApiKey } from '@/lib/tmdb';

export default function TVPage() {
  const [filters, setFilters] = useState({ sort_by: 'popularity.desc' });
  const cacheKey = useMemo(() => ['tv', JSON.stringify(filters)], [filters]);

  if (!hasApiKey) return <ApiKeyNotice />;

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="Series & shows"
        title="TV Shows"
        description="From prestige drama to the latest binge — explore television worth your evening."
      >
        <div className="mt-6">
          <FilterBar filters={filters} onChange={setFilters} />
        </div>
      </PageHeader>
      <div className="container-page">
        <InfiniteList
          cacheKey={cacheKey}
          fetcher={(page) => discover('tv', filters, page)}
          fallbackType="tv"
        />
      </div>
    </div>
  );
}
