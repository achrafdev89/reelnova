'use client';

import { Share2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ShareButton({ title }) {
  const share = async () => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        /* user cancelled */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard');
      } catch {
        toast.error('Could not copy link');
      }
    }
  };

  return (
    <button
      onClick={share}
      className="grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-white/5 backdrop-blur transition hover:bg-white/10"
      aria-label="Share this title"
    >
      <Share2 className="h-5 w-5" />
    </button>
  );
}
