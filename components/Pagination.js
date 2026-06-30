'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

// Simple, accessible numeric pagination. Used where infinite scroll is not desired.
export default function Pagination({ page, totalPages, onChange }) {
  const max = Math.min(totalPages, 500);
  const pages = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(max, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  const btn =
    'grid h-10 min-w-10 place-items-center rounded-xl border border-white/10 px-3 text-sm transition disabled:opacity-40';

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        className={btn}
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          aria-current={p === page ? 'page' : undefined}
          className={
            p === page
              ? 'grid h-10 min-w-10 place-items-center rounded-xl bg-accent px-3 text-sm font-semibold text-white'
              : `${btn} bg-white/5 hover:bg-white/10`
          }
        >
          {p}
        </button>
      ))}
      <button
        className={btn}
        disabled={page >= max}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}
