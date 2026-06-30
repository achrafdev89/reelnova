import { Newspaper, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';

// Mock editorial cards. Content is illustrative — there is no news backend.
const NEWS = [
  {
    tag: 'Festival',
    title: 'Cannes lineup leans into bold debut directors this year',
    excerpt:
      'A wave of first features dominates the official selection, signalling a generational shift on the Croisette.',
    time: '2h ago',
  },
  {
    tag: 'Box Office',
    title: 'Original sci-fi outperforms sequels in a surprising weekend',
    excerpt:
      'Audiences turned out for fresh worlds over familiar franchises, reshaping the summer forecast.',
    time: '6h ago',
  },
  {
    tag: 'Streaming',
    title: 'The limited series is quietly becoming prestige cinema',
    excerpt:
      'Filmmakers are treating six-hour runtimes as a canvas, and the craft is following the budget.',
    time: '1d ago',
  },
];

export default function NewsSection() {
  return (
    <section className="py-8">
      <SectionHeader eyebrow="From the editors" title="Movie News" index={9} />
      <div className="container-page grid gap-5 md:grid-cols-3">
        {NEWS.map((n) => (
          <article
            key={n.title}
            className="glass group flex flex-col p-6 transition hover:border-accent/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <Newspaper className="h-4 w-4" />
                {n.tag}
              </span>
              <span className="text-xs text-muted">{n.time}</span>
            </div>
            <h3 className="font-display text-lg font-bold leading-snug">
              {n.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-muted">{n.excerpt}</p>
            <span className="mt-4 flex items-center gap-1 text-sm font-medium text-muted transition group-hover:text-ground">
              Read story
              <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
