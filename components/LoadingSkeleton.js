// Shimmer skeletons used while data loads. Composed from the .shimmer utility.

export function SkeletonCard() {
  return (
    <div className="space-y-2">
      <div className="shimmer aspect-[2/3] w-full rounded-2xl" />
      <div className="shimmer h-3 w-3/4 rounded" />
      <div className="shimmer h-3 w-1/3 rounded" />
    </div>
  );
}

export function SkeletonRow({ count = 6 }) {
  return (
    <div className="flex gap-4 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-40 shrink-0 sm:w-48">
          <SkeletonCard />
        </div>
      ))}
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}

export function SkeletonHero() {
  return (
    <div className="container-page">
      <div className="shimmer h-[70vh] w-full rounded-3xl" />
    </div>
  );
}

export function SkeletonDetail() {
  return (
    <div className="container-page space-y-6 py-10">
      <div className="shimmer h-[50vh] w-full rounded-3xl" />
      <div className="shimmer h-8 w-1/2 rounded" />
      <div className="shimmer h-4 w-full rounded" />
      <div className="shimmer h-4 w-5/6 rounded" />
    </div>
  );
}
