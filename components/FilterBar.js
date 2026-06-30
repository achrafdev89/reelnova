'use client';

import { SlidersHorizontal } from 'lucide-react';
import { MOVIE_GENRES, SORT_OPTIONS } from '@/constants';

const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);

const selectCls =
  'rounded-xl border border-white/10 bg-surface/80 px-3 py-2.5 text-sm text-ground focus:border-accent/50';

export default function FilterBar({ filters, onChange }) {
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="container-page">
      <div className="glass flex flex-wrap items-center gap-3 p-4">
        <span className="flex items-center gap-2 text-sm font-semibold text-muted">
          <SlidersHorizontal className="h-4 w-4" />
          Filter
        </span>

        <select
          className={selectCls}
          value={filters.sort_by}
          onChange={(e) => set('sort_by', e.target.value)}
          aria-label="Sort by"
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>

        <select
          className={selectCls}
          value={filters.with_genres || ''}
          onChange={(e) => set('with_genres', e.target.value || undefined)}
          aria-label="Genre"
        >
          <option value="">All genres</option>
          {MOVIE_GENRES.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>

        <select
          className={selectCls}
          value={filters.primary_release_year || ''}
          onChange={(e) =>
            set('primary_release_year', e.target.value || undefined)
          }
          aria-label="Year"
        >
          <option value="">Any year</option>
          {YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>

        <select
          className={selectCls}
          value={filters['vote_average.gte'] || ''}
          onChange={(e) =>
            set('vote_average.gte', e.target.value || undefined)
          }
          aria-label="Minimum rating"
        >
          <option value="">Any rating</option>
          <option value="8">8+ Excellent</option>
          <option value="7">7+ Great</option>
          <option value="6">6+ Good</option>
        </select>
      </div>
    </div>
  );
}
