'use client';

import SectionHeader from './SectionHeader';
import Carousel from './Carousel';
import { SkeletonRow } from './LoadingSkeleton';
import { useHomeRail } from '@/hooks/queries';

// A self-contained home-page rail. Fetches its own data so the Home page
// stays declarative. `queryKey` namespaces the cache; `fetcher` returns a TMDB list.
export default function Rail({
  queryKey,
  fetcher,
  eyebrow,
  title,
  href,
  index,
  fallbackType,
  ranked = false,
}) {
  const { data, isLoading, isError } = useHomeRail(queryKey, fetcher);
  const items = data?.results || [];

  return (
    <section className="py-8">
      <SectionHeader
        eyebrow={eyebrow}
        title={title}
        href={href}
        index={index}
      />
      {isLoading ? (
        <div className="px-4 sm:px-6 lg:px-10">
          <SkeletonRow />
        </div>
      ) : isError || !items.length ? (
        <p className="container-page text-sm text-muted">
          Couldn’t load this row right now.
        </p>
      ) : (
        <Carousel items={items} fallbackType={fallbackType} ranked={ranked} />
      )}
    </section>
  );
}
