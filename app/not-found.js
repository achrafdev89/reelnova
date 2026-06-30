import Link from 'next/link';
import { Home, Compass } from 'lucide-react';

export const metadata = { title: 'Page not found · ReelNova' };

export default function NotFound() {
  return (
    <div className="relative grid min-h-[70vh] place-items-center overflow-hidden px-4">
      <div className="absolute inset-0 bg-spotlight opacity-60" />
      <div className="film-grain absolute inset-0 opacity-40" />

      <div className="relative text-center">
        <p className="font-display text-[7rem] font-extrabold leading-none text-gradient sm:text-[10rem]">
          404
        </p>
        <h1 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
          This scene didn’t make the final cut
        </h1>
        <p className="mx-auto mt-3 max-w-md text-muted">
          The page you’re looking for has wrapped or never existed. Let’s get
          you back to the good stuff.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary inline-flex items-center gap-2">
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link
            href="/trending"
            className="btn-ghost inline-flex items-center gap-2"
          >
            <Compass className="h-4 w-4" />
            Explore trending
          </Link>
        </div>
      </div>
    </div>
  );
}
