'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import InfiniteList from '@/components/InfiniteList';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { tmdb } from '@/lib/tmdb';
import { hasApiKey } from '@/lib/tmdb';
import { cn } from '@/lib/utils';

const WINDOWS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' },
];

export default function TrendingPage() {
  const [window, setWindow] = useState('day');

  if (!hasApiKey) return <ApiKeyNotice />;

  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="What everyone is watching"
        title="Trending"
        description="The titles climbing fastest right now, across movies and TV."
      >
        <div className="mt-6 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
          {WINDOWS.map((w) => (
            <button
              key={w.value}
              onClick={() => setWindow(w.value)}
              className={cn(
                'rounded-full px-5 py-2 text-sm font-medium transition',
                window === w.value
                  ? 'bg-accent text-white shadow-glow'
                  : 'text-muted hover:text-ground'
              )}
            >
              {w.label}
            </button>
          ))}
        </div>
      </PageHeader>
      <div className="container-page">
        <InfiniteList
          cacheKey={['trending', window]}
          fetcher={(page) =>
            tmdb.get(`/trending/all/${window}`, { params: { page } })
          }
        />
      </div>
    </div>
  );
}
