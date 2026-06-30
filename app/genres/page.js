'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { MOVIE_GENRES } from '@/constants';

// Deterministic gradient per genre so the grid feels designed, not random.
const GRADIENTS = [
  'from-rose-600 to-orange-500',
  'from-violet-600 to-fuchsia-500',
  'from-sky-500 to-indigo-600',
  'from-emerald-500 to-teal-600',
  'from-amber-500 to-red-600',
  'from-pink-500 to-rose-600',
  'from-cyan-500 to-blue-600',
  'from-purple-600 to-indigo-700',
];

export default function GenresPage() {
  return (
    <div className="pb-10">
      <PageHeader
        eyebrow="Find your mood"
        title="Genres"
        description="Pick a lane — from pulse-pounding action to slow-burn drama."
      />
      <div className="container-page grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {MOVIE_GENRES.map((g, i) => (
          <motion.div
            key={g.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: Math.min(i * 0.04, 0.5) }}
          >
            <Link
              href={`/genres/${g.id}`}
              className={`group relative flex h-32 items-end overflow-hidden rounded-2xl bg-gradient-to-br ${
                GRADIENTS[i % GRADIENTS.length]
              } p-5`}
            >
              <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/10" />
              <div className="film-grain absolute inset-0 opacity-40" />
              <div className="relative flex w-full items-center justify-between">
                <span className="font-display text-xl font-bold text-white">
                  {g.name}
                </span>
                <ArrowRight className="h-5 w-5 text-white transition group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
