'use client';

import Link from 'next/link';
import { Github, Linkedin, Globe, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import Logo from './Logo';
import { NAV_LINKS, MOVIE_GENRES, SITE } from '@/constants';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="container-page py-14">
        {/* Newsletter card */}
        <div className="glass mb-14 flex flex-col items-center gap-4 p-8 text-center md:flex-row md:justify-between md:text-left">
          <div>
            <h3 className="font-display text-2xl font-bold">
              Never miss a premiere
            </h3>
            <p className="mt-1 text-sm text-muted">
              Get a weekly cut of standout releases. No spam, just cinema.
            </p>
          </div>
          <div className="flex w-full max-w-sm gap-2">
            <input
              type="email"
              placeholder="you@example.com"
              aria-label="Email address"
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm"
            />
            <button
              onClick={() => toast.success('You are on the list (demo)')}
              className="btn-primary shrink-0"
            >
              Subscribe
            </button>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <Logo />
            <p className="max-w-xs text-sm text-muted">{SITE.tagline}</p>
            <div className="flex gap-2">
              {[
                { Icon: Github, href: SITE.github, label: 'GitHub' },
                { Icon: Linkedin, href: SITE.linkedin, label: 'LinkedIn' },
                { Icon: Globe, href: SITE.portfolio, label: 'Portfolio' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted transition hover:text-ground"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Explore" links={NAV_LINKS} />

          <div>
            <h4 className="mb-4 text-sm font-semibold">Top Genres</h4>
            <ul className="space-y-2 text-sm text-muted">
              {MOVIE_GENRES.slice(0, 6).map((g) => (
                <li key={g.id}>
                  <Link href={`/genres/${g.id}`} className="transition hover:text-ground">
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold">Data</h4>
            <p className="text-sm text-muted">
              Movie and TV data provided by{' '}
              <a
                href="https://www.themoviedb.org"
                target="_blank"
                rel="noreferrer"
                className="text-ground underline-offset-2 hover:underline"
              >
                TMDB
              </a>
              . This product uses the TMDB API but is not endorsed or certified
              by TMDB.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Built with <Heart className="h-4 w-4 fill-accent text-accent" /> by{' '}
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-ground transition hover:text-accent"
            >
              {SITE.author}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }) {
  return (
    <div>
      <h4 className="mb-4 text-sm font-semibold">{title}</h4>
      <ul className="space-y-2 text-sm text-muted">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition hover:text-ground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
