import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Eyebrow + title + optional "view all" link. The index encodes section order.
export default function SectionHeader({ eyebrow, title, href, index }) {
  return (
    <div className="container-page mb-6 flex items-end justify-between gap-4">
      <div>
        {(eyebrow || index) && (
          <p className="eyebrow mb-2 flex items-center gap-2">
            {index && (
              <span className="font-mono text-accent">
                {String(index).padStart(2, '0')}
              </span>
            )}
            {eyebrow}
          </p>
        )}
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group flex shrink-0 items-center gap-1 text-sm font-medium text-muted transition hover:text-ground"
        >
          View all
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}
