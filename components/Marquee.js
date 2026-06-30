'use client';

import Link from 'next/link';
import { normalizeMedia } from '@/lib/utils';

// Infinite scrolling ticker of trending titles — the home page's signature flourish.
export default function Marquee({ items = [] }) {
  const titles = items.slice(0, 14).map((i) => normalizeMedia(i)).filter(Boolean);
  if (!titles.length) return null;
  const loop = [...titles, ...titles];

  return (
    <div className="relative overflow-hidden border-y border-white/10 py-4">
      <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <Link
            key={`${t.id}-${i}`}
            href={`/${t.mediaType === 'tv' ? 'tv' : 'movie'}/${t.id}`}
            className="flex shrink-0 items-center gap-3 text-muted transition hover:text-ground"
          >
            <span className="font-mono text-xs text-accent">★ {t.rating.toFixed(1)}</span>
            <span className="font-display text-lg font-semibold">{t.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
