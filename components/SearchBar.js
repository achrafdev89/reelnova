'use client';

import { useForm } from 'react-hook-form';
import { Search, X } from 'lucide-react';

// Controlled-ish search input. Reports every keystroke up via onQueryChange
// (for instant search) and validates the submitted query with a light schema.
export default function SearchBar({
  defaultValue = '',
  onQueryChange,
  onSubmit,
  autoFocus = false,
  placeholder = 'Search movies, shows, people…',
}) {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: { q: defaultValue },
  });
  const value = watch('q');

  const submit = handleSubmit(({ q }) => {
    const trimmed = q.trim();
    if (trimmed.length) onSubmit?.(trimmed);
  });

  return (
    <form onSubmit={submit} className="relative w-full" role="search">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
      <input
        {...register('q', {
          onChange: (e) => onQueryChange?.(e.target.value),
        })}
        autoFocus={autoFocus}
        type="search"
        placeholder={placeholder}
        aria-label="Search"
        className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-12 text-base text-ground placeholder:text-muted focus:border-accent/50 focus:bg-white/10"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            setValue('q', '');
            onQueryChange?.('');
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted transition hover:text-ground"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </form>
  );
}
