import Link from 'next/link';

export default function GenreBadge({ id, name, href }) {
  const content = (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-muted transition hover:border-accent/50 hover:text-ground">
      {name}
    </span>
  );
  return href ? (
    <Link href={href} key={id}>
      {content}
    </Link>
  ) : (
    content
  );
}
