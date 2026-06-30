import Image from 'next/image';
import { PROFILE } from '@/constants';

export default function ActorCard({ person }) {
  const photo = PROFILE(person.profile_path, 'w300');
  return (
    <div className="w-32 shrink-0 text-center sm:w-36">
      <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-surface">
        {photo ? (
          <Image
            src={photo}
            alt={person.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center text-2xl text-muted">
            {person.name?.[0] || '?'}
          </div>
        )}
      </div>
      <p className="mt-2 truncate text-sm font-semibold">{person.name}</p>
      {person.character && (
        <p className="truncate text-xs text-muted">{person.character}</p>
      )}
    </div>
  );
}
