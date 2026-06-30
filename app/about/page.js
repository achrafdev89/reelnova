'use client';

import { motion } from 'framer-motion';
import {
  Github,
  Linkedin,
  Globe,
  Film,
  Search,
  Heart,
  Zap,
  Palette,
  Smartphone,
  Layers,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { SITE } from '@/constants';

const TECH = [
  'Next.js 14 (App Router)',
  'React 18',
  'Tailwind CSS',
  'Framer Motion',
  'TanStack React Query',
  'Axios',
  'React Hook Form + Zod',
  'TMDB API',
  'Swiper',
  'Lucide Icons',
];

const FEATURES = [
  {
    icon: Film,
    title: 'Rich discovery',
    body: 'Trending, now playing, top rated, upcoming, and full movie + TV libraries with infinite scroll.',
  },
  {
    icon: Search,
    title: 'Instant search',
    body: 'Debounced multi-search across movies, shows, and people with a ⌘K command palette.',
  },
  {
    icon: Heart,
    title: 'Favorites',
    body: 'Save titles locally — no account needed. Your collection persists on the device.',
  },
  {
    icon: Zap,
    title: 'Fast by default',
    body: 'React Query caching, optimized images, and lazy loading keep navigation snappy.',
  },
  {
    icon: Palette,
    title: 'Cinematic design',
    body: 'Glassmorphism, film grain, gradient accents, and motion that feels premium.',
  },
  {
    icon: Smartphone,
    title: 'Fully responsive',
    body: 'Designed mobile-first and tuned all the way up to large desktop displays.',
  },
];

const fade = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

export default function AboutPage() {
  return (
    <div className="pb-16">
      <PageHeader
        eyebrow="About the project"
        title="Built for the love of cinema"
        description="ReelNova is a premium movie & TV discovery experience — a portfolio piece exploring what a modern, design-forward streaming-style frontend can feel like."
      />

      <div className="container-page space-y-16">
        {/* Overview */}
        <motion.section {...fade} transition={{ duration: 0.5 }}>
          <div className="glass max-w-3xl p-8">
            <p className="leading-relaxed text-muted">
              ReelNova pulls live data from{' '}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline"
              >
                The Movie Database (TMDB)
              </a>{' '}
              and presents it through a carefully crafted interface — animated
              rails, a cinematic detail view with trailers and cast, genre
              browsing, and a fast command-palette search. It’s a fully
              client-rendered Next.js app with no backend required: bring a TMDB
              key and it runs anywhere.
            </p>
          </div>
        </motion.section>

        {/* Features */}
        <section>
          <motion.h2
            {...fade}
            transition={{ duration: 0.5 }}
            className="mb-6 font-display text-3xl font-bold"
          >
            What’s inside
          </motion.h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f, i) => (
              <motion.div
                key={f.title}
                {...fade}
                transition={{ duration: 0.45, delay: Math.min(i * 0.06, 0.4) }}
                className="glass p-6"
              >
                <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-accent/15">
                  <f.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-display text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.body}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Tech stack */}
        <section>
          <motion.h2
            {...fade}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center gap-3 font-display text-3xl font-bold"
          >
            <Layers className="h-7 w-7 text-secondary" />
            Tech stack
          </motion.h2>
          <div className="flex flex-wrap gap-2.5">
            {TECH.map((t, i) => (
              <motion.span
                key={t}
                {...fade}
                transition={{ duration: 0.35, delay: Math.min(i * 0.04, 0.4) }}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-ground"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </section>

        {/* Developer */}
        <motion.section {...fade} transition={{ duration: 0.5 }}>
          <div className="relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-10">
            <div className="absolute inset-0 bg-accent-gradient opacity-10" />
            <div className="film-grain absolute inset-0 opacity-30" />
            <div className="relative">
              <p className="eyebrow mb-2">The developer</p>
              <h2 className="font-display text-3xl font-bold">
                {SITE.author}
              </h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">
                Frontend developer focused on polished, performant interfaces.
                ReelNova is part of an ongoing portfolio exploring real-world
                product design with modern React tooling.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
                <a
                  href={SITE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex items-center gap-2"
                >
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a
                  href={SITE.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost inline-flex items-center gap-2"
                >
                  <Globe className="h-4 w-4" />
                  Portfolio
                </a>
              </div>
            </div>
          </div>
        </motion.section>

        <p className="text-center text-sm text-muted">
          Built with <span className="text-accent">❤</span> by {SITE.author} ·
          Data from TMDB
        </p>
      </div>
    </div>
  );
}
