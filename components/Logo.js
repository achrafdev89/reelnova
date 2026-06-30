import Link from 'next/link';
import Image from 'next/image';

export default function Logo({ compact = false }) {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5"
      aria-label="ReelNova home"
    >
      <span className="relative grid h-9 w-9 place-items-center">
        <Image
          src="/logo.png"
          alt="ReelNova"
          width={36}
          height={36}
          priority
          className="h-9 w-9 object-contain drop-shadow-[0_0_12px_rgba(236,72,153,0.45)] transition-transform duration-300 group-hover:scale-110"
        />
      </span>
      {!compact && (
        <span className="font-display text-xl font-extrabold tracking-tight">
          Reel<span className="text-gradient">Nova</span>
        </span>
      )}
    </Link>
  );
}
