// Small, dependency-free helpers used across the UI.

// Conditionally join class names. Falsy values are dropped.
export function cn(...parts) {
  return parts.filter(Boolean).join(' ');
}

// "2024-05-31" -> "May 31, 2024". Returns "" for missing dates.
export function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

export function getYear(dateStr) {
  if (!dateStr) return '';
  return dateStr.slice(0, 4);
}

// 142 -> "2h 22m"
export function formatRuntime(minutes) {
  if (!minutes) return '';
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h ? `${h}h ${m}m` : `${m}m`;
}

// 7.842 -> "7.8"
export function formatRating(vote) {
  if (!vote && vote !== 0) return 'NR';
  return vote.toFixed(1);
}

// Maps a 0-10 rating to a tailwind text color for quick visual scanning.
export function ratingColor(vote) {
  if (vote >= 7.5) return 'text-emerald-400';
  if (vote >= 6) return 'text-amber-400';
  if (vote > 0) return 'text-rose-400';
  return 'text-muted';
}

// Normalizes a TMDB result (movie or tv) into a single shape the UI can rely on.
export function normalizeMedia(item, fallbackType) {
  if (!item) return null;
  const mediaType = item.media_type || fallbackType || 'movie';
  return {
    id: item.id,
    mediaType,
    title: item.title || item.name || 'Untitled',
    overview: item.overview || '',
    poster: item.poster_path,
    backdrop: item.backdrop_path,
    rating: item.vote_average ?? 0,
    date: item.release_date || item.first_air_date || '',
    genreIds: item.genre_ids || [],
    popularity: item.popularity ?? 0,
  };
}

export function truncate(text, max = 160) {
  if (!text) return '';
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

// Picks the best official YouTube trailer from a TMDB videos payload.
export function pickTrailer(videos = []) {
  if (!videos.length) return null;
  const yt = videos.filter((v) => v.site === 'YouTube');
  return (
    yt.find((v) => v.type === 'Trailer' && v.official) ||
    yt.find((v) => v.type === 'Trailer') ||
    yt.find((v) => v.type === 'Teaser') ||
    yt[0] ||
    null
  );
}
