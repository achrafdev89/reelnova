'use client';

import { useParams } from 'next/navigation';
import MediaDetail from '@/components/MediaDetail';
import EmptyState from '@/components/EmptyState';
import { SkeletonDetail } from '@/components/LoadingSkeleton';
import { useMovieDetails } from '@/hooks/queries';
import { Film } from 'lucide-react';

export default function MoviePage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useMovieDetails(id);

  if (isLoading) return <SkeletonDetail />;
  if (isError || !data)
    return (
      <EmptyState
        icon={Film}
        title="Movie not found"
        message="We couldn't load this title. It may have been removed or the ID is invalid."
        action={{ href: '/movies', label: 'Browse movies' }}
      />
    );

  return <MediaDetail data={data} type="movie" />;
}
