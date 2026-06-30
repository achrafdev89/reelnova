import { SkeletonGrid } from '@/components/LoadingSkeleton';

// Route-level fallback shown during navigation/data fetches.
export default function Loading() {
  return (
    <div className="container-page py-12">
      <div className="mb-8 space-y-3">
        <div className="shimmer h-4 w-28 rounded-full" />
        <div className="shimmer h-10 w-64 rounded-xl" />
      </div>
      <SkeletonGrid count={18} />
    </div>
  );
}
