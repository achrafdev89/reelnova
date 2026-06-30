'use client';

import { useState } from 'react';
import { Star, Quote } from 'lucide-react';
import { PROFILE } from '@/constants';
import { formatDate } from '@/lib/utils';

export default function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const rating = review.author_details?.rating;
  const avatarPath = review.author_details?.avatar_path;
  const avatar =
    avatarPath && !avatarPath.startsWith('/https')
      ? PROFILE(avatarPath, 'w185')
      : null;
  const long = review.content.length > 320;
  const text = expanded ? review.content : review.content.slice(0, 320);

  return (
    <article className="glass p-6">
      <div className="mb-3 flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-accent-gradient text-sm font-bold">
          {avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatar} alt="" className="h-full w-full object-cover" />
          ) : (
            review.author?.[0]?.toUpperCase() || '?'
          )}
        </div>
        <div>
          <p className="text-sm font-semibold">{review.author}</p>
          <p className="text-xs text-muted">{formatDate(review.created_at)}</p>
        </div>
        {rating != null && (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-1 text-sm font-semibold text-amber-400">
            <Star className="h-3.5 w-3.5 fill-current" />
            {rating}
          </span>
        )}
      </div>
      <Quote className="mb-2 h-5 w-5 text-accent/50" />
      <p className="text-sm leading-relaxed text-ground/90">
        {text}
        {long && !expanded && '… '}
        {long && (
          <button
            onClick={() => setExpanded((e) => !e)}
            className="ml-1 font-medium text-accent hover:underline"
          >
            {expanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </p>
    </article>
  );
}
