'use client';

import { useScrollProgress } from '@/hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();
  return (
    <div
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-accent-gradient"
      style={{ transform: `scaleX(${progress})` }}
      aria-hidden="true"
    />
  );
}
