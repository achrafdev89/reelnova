'use client';

import { useQuery } from '@tanstack/react-query';
import HeroBanner from '@/components/HeroBanner';
import Rail from '@/components/Rail';
import Marquee from '@/components/Marquee';
import NewsSection from '@/components/NewsSection';
import SectionHeader from '@/components/SectionHeader';
import ActorCard from '@/components/ActorCard';
import ApiKeyNotice from '@/components/ApiKeyNotice';
import { SkeletonHero, SkeletonRow } from '@/components/LoadingSkeleton';
import * as api from '@/services/tmdb-service';
import { hasApiKey } from '@/lib/tmdb';

export default function HomePage() {
  const trending = useQuery({
    queryKey: ['home', 'trending-hero'],
    queryFn: () => api.getTrending('day'),
    enabled: hasApiKey,
  });

  const people = useQuery({
    queryKey: ['home', 'people'],
    queryFn: () => api.getPopularPeople(),
    enabled: hasApiKey,
  });

  if (!hasApiKey) return <ApiKeyNotice />;

  const heroItems = (trending.data?.results || []).filter((i) => i.backdrop_path);

  return (
    <div className="pb-10">
      {trending.isLoading ? (
        <div className="pt-20">
          <SkeletonHero />
        </div>
      ) : (
        <HeroBanner items={heroItems} />
      )}

      <div className="my-8">
        <Marquee items={trending.data?.results || []} />
      </div>

      <Rail
        index={1}
        eyebrow="Right now"
        title="Trending Today"
        href="/trending"
        queryKey="trending-day"
        fetcher={() => api.getTrending('day')}
        ranked
      />
      <Rail
        index={2}
        eyebrow="In theaters"
        title="Now Playing"
        queryKey="now-playing"
        fetcher={() => api.getNowPlaying()}
        fallbackType="movie"
      />
      <Rail
        index={3}
        eyebrow="Acclaimed"
        title="Top Rated"
        href="/movies"
        queryKey="top-rated"
        fetcher={() => api.getTopRatedMovies()}
        fallbackType="movie"
      />
      <Rail
        index={4}
        eyebrow="Binge-worthy"
        title="Popular TV Shows"
        href="/tv"
        queryKey="popular-tv"
        fetcher={() => api.getPopularTV()}
        fallbackType="tv"
      />
      <Rail
        index={5}
        eyebrow="Coming soon"
        title="Upcoming Movies"
        queryKey="upcoming"
        fetcher={() => api.getUpcomingMovies()}
        fallbackType="movie"
      />

      {/* Featured actors */}
      <section className="py-8">
        <SectionHeader eyebrow="On screen" title="Featured Actors" index={6} />
        {people.isLoading ? (
          <div className="px-4 sm:px-6 lg:px-10">
            <SkeletonRow />
          </div>
        ) : (
          <div className="no-scrollbar flex gap-4 overflow-x-auto px-4 pb-2 sm:px-6 lg:px-10">
            {(people.data?.results || []).slice(0, 14).map((p) => (
              <ActorCard key={p.id} person={p} />
            ))}
          </div>
        )}
      </section>

      <Rail
        index={7}
        eyebrow="Hot this week"
        title="Trending This Week"
        href="/trending"
        queryKey="trending-week"
        fetcher={() => api.getTrendingMovies('week')}
        fallbackType="movie"
        ranked
      />
      <Rail
        index={8}
        eyebrow="Fresh"
        title="Latest Releases"
        queryKey="popular-movies"
        fetcher={() => api.getPopularMovies()}
        fallbackType="movie"
      />

      <NewsSection />
    </div>
  );
}
