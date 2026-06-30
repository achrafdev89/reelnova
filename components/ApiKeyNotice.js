import { KeyRound } from 'lucide-react';

// Friendly setup guidance shown when the TMDB key is missing, instead of
// failing silently. Uses interface voice, names what to do.
export default function ApiKeyNotice() {
  return (
    <div className="container-page py-24">
      <div className="glass mx-auto max-w-xl p-8 text-center">
        <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-2xl bg-accent/15">
          <KeyRound className="h-7 w-7 text-accent" />
        </div>
        <h2 className="font-display text-2xl font-bold">Add your TMDB API key</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          ReelNova loads its catalog from TMDB. Create a free key, then add it to
          a <code className="rounded bg-white/10 px-1.5 py-0.5">.env.local</code> file:
        </p>
        <pre className="mt-4 overflow-x-auto rounded-xl bg-black/50 p-4 text-left font-mono text-xs text-ground">
NEXT_PUBLIC_TMDB_API_KEY=your_key_here</pre>
        <a
          href="https://www.themoviedb.org/settings/api"
          target="_blank"
          rel="noreferrer"
          className="btn-primary mt-6"
        >
          Get a free key
        </a>
      </div>
    </div>
  );
}
