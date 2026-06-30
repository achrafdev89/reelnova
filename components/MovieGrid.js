'use client';

import { motion } from 'framer-motion';
import MovieCard from './MovieCard';
import { normalizeMedia } from '@/lib/utils';

// Responsive grid with staggered entrance. Accepts raw TMDB items or
// pre-normalized media objects.
export default function MovieGrid({ items = [], fallbackType, columns }) {
  return (
    <div
      className={
        columns ||
        'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'
      }
    >
      {items.map((raw, i) => {
        const media = raw.mediaType ? raw : normalizeMedia(raw, fallbackType);
        if (!media) return null;
        return (
          <motion.div
            key={`${media.mediaType}-${media.id}-${i}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.4) }}
          >
            <MovieCard media={media} />
          </motion.div>
        );
      })}
    </div>
  );
}
