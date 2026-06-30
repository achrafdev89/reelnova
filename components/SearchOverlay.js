'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Film, Tv, User, X } from 'lucide-react';
import SearchBar from './SearchBar';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearch } from '@/hooks/queries';
import { useLocalStorageList } from '@/hooks/useLocalStorageList';
import { RECENT_SEARCH_KEY, POSTER, PROFILE } from '@/constants';
import { getYear } from '@/lib/utils';

const TYPE_ICON = { movie: Film, tv: Tv, person: User };

export default function SearchOverlay({ open, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 300);
  const { data, isFetching } = useSearch(debounced);
  const recent = useLocalStorageList(RECENT_SEARCH_KEY, 6);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  const go = (path, term) => {
    if (term) recent.add({ value: term });
    onClose();
    setQuery('');
    router.push(path);
  };

  const results = (data?.results || [])
    .filter((r) => ['movie', 'tv', 'person'].includes(r.media_type))
    .slice(0, 7);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[90] bg-black/70 px-4 pt-24 backdrop-blur"
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-strong mx-auto max-w-2xl overflow-hidden p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Search ReelNova"
          >
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <SearchBar
                  autoFocus
                  onQueryChange={setQuery}
                  onSubmit={(q) => go(`/search?q=${encodeURIComponent(q)}`, q)}
                />
              </div>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 text-muted hover:text-ground"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 max-h-[55vh] overflow-y-auto">
              {!debounced && recent.items.length > 0 && (
                <div>
                  <p className="eyebrow mb-2 px-2">Recent</p>
                  {recent.items.map((r) => (
                    <button
                      key={r.value}
                      onClick={() => go(`/search?q=${encodeURIComponent(r.value)}`, r.value)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-white/5"
                    >
                      <Clock className="h-4 w-4 text-muted" />
                      {r.value}
                    </button>
                  ))}
                </div>
              )}

              {debounced && isFetching && (
                <p className="px-3 py-6 text-center text-sm text-muted">Searching…</p>
              )}

              {debounced && !isFetching && results.length === 0 && (
                <p className="px-3 py-6 text-center text-sm text-muted">
                  No matches for “{debounced}”.
                </p>
              )}

              {results.map((r) => {
                const Icon = TYPE_ICON[r.media_type] || Film;
                const title = r.title || r.name;
                const img =
                  r.media_type === 'person'
                    ? PROFILE(r.profile_path, 'w185')
                    : POSTER(r.poster_path, 'w185');
                const path =
                  r.media_type === 'person'
                    ? `/search?q=${encodeURIComponent(title)}`
                    : `/${r.media_type}/${r.id}`;
                return (
                  <button
                    key={`${r.media_type}-${r.id}`}
                    onClick={() => go(path, title)}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-white/5"
                  >
                    <div className="relative h-14 w-10 shrink-0 overflow-hidden rounded-md bg-white/5">
                      {img ? (
                        <Image src={img} alt="" fill sizes="40px" className="object-cover" />
                      ) : (
                        <div className="grid h-full place-items-center">
                          <Icon className="h-4 w-4 text-muted" />
                        </div>
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{title}</p>
                      <p className="flex items-center gap-1 text-xs capitalize text-muted">
                        <Icon className="h-3 w-3" />
                        {r.media_type}
                        {getYear(r.release_date || r.first_air_date) &&
                          ` · ${getYear(r.release_date || r.first_air_date)}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
