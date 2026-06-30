'use client';

import { useCallback, useEffect, useState } from 'react';

// Generic, bounded, most-recent-first list backed by localStorage.
// Used for recent searches and recently-viewed titles.
export function useLocalStorageList(key, max = 8) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, [key]);

  const persist = useCallback(
    (next) => {
      setItems(next);
      try {
        localStorage.setItem(key, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [key]
  );

  const add = useCallback(
    (entry, matchKey = 'value') => {
      persist(
        [entry, ...items.filter((i) => i[matchKey] !== entry[matchKey])].slice(
          0,
          max
        )
      );
    },
    [items, max, persist]
  );

  const remove = useCallback(
    (value, matchKey = 'value') => {
      persist(items.filter((i) => i[matchKey] !== value));
    },
    [items, persist]
  );

  const clear = useCallback(() => persist([]), [persist]);

  return { items, add, remove, clear };
}
