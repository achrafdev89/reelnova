import { Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

// Reusable empty/illustration state. The illustration is a CSS/SVG composition
// so there are no external image dependencies.
export default function EmptyState({ icon: Icon, title, message, action }) {
  return (
    <div className="container-page grid place-items-center py-24 text-center">
      <div className="relative mb-6 grid h-28 w-28 place-items-center">
        <div className="absolute inset-0 rounded-full bg-accent/20 blur-2xl" />
        <div className="glass grid h-24 w-24 place-items-center rounded-3xl">
          {Icon ? <Icon className="h-10 w-10 text-accent" /> : <LinkIcon className="h-10 w-10 text-accent" />}
        </div>
      </div>
      <h3 className="font-display text-2xl font-bold">{title}</h3>
      {message && <p className="mt-2 max-w-md text-sm text-muted">{message}</p>}
      {action && (
        <Link href={action.href} className="btn-primary mt-6">
          {action.label}
        </Link>
      )}
    </div>
  );
}
