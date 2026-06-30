'use client';

import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import MovieGrid from './MovieGrid';
import { SkeletonGrid } from './LoadingSkeleton';
import EmptyState from './EmptyState';
import { useInfiniteList } from '@/hooks/queries';
import { SearchX } from 'lucide-react';

// Drives /movies, /tv, /trending and genre pages. `cacheKey` namespaces the
// query; `fetcher(page)` returns a TMDB paginated payload.
export default function InfiniteList({ cacheKey, fetcher, fallbackType, emptyMessage }) {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteList(cacheKey, fetcher);

  const sentinel = useRef(null);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { rootMargin: '600px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <SkeletonGrid count={18} />;

  const items = (data?.pages || []).flatMap((p) => p.results || []);

  if (isError || items.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="Nothing here yet"
        message={emptyMessage || 'No titles matched. Try adjusting your filters.'}
      />
    );
  }

  return (
    <>
      <MovieGrid items={items} fallbackType={fallbackType} />
      <div ref={sentinel} className="h-10" />
      {isFetchingNextPage && (
        <div className="flex justify-center py-8 text-muted">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      )}
      {!hasNextPage && (
        <p className="py-8 text-center text-sm text-muted">You’ve reached the end.</p>
      )}
    </>
  );
}
