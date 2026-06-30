'use client';

import { useParams } from 'next/navigation';
import MediaDetail from '@/components/MediaDetail';
import EmptyState from '@/components/EmptyState';
import { SkeletonDetail } from '@/components/LoadingSkeleton';
import { useTVDetails } from '@/hooks/queries';
import { Tv } from 'lucide-react';

export default function TVPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useTVDetails(id);

  if (isLoading) return <SkeletonDetail />;
  if (isError || !data)
    return (
      <EmptyState
        icon={Tv}
        title="Show not found"
        message="We couldn't load this series. It may have been removed or the ID is invalid."
        action={{ href: '/tv', label: 'Browse TV shows' }}
      />
    );

  return <MediaDetail data={data} type="tv" />;
}
