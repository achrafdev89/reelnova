'use client';

import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/free-mode';
import MovieCard from './MovieCard';
import { normalizeMedia } from '@/lib/utils';

export default function Carousel({ items = [], fallbackType, ranked = false }) {
  const ref = useRef(null);

  const slide = (dir) => {
    const swiper = ref.current?.swiper;
    if (!swiper) return;
    swiper.slideTo(swiper.activeIndex + dir * 4);
  };

  return (
    <div className="group/rail relative">
      <Swiper
        ref={ref}
        modules={[FreeMode]}
        freeMode
        slidesPerView="auto"
        spaceBetween={16}
        className="!px-4 sm:!px-6 lg:!px-10"
      >
        {items.map((raw, i) => {
          const media = raw.mediaType ? raw : normalizeMedia(raw, fallbackType);
          if (!media) return null;
          return (
            <SwiperSlide
              key={`${media.id}-${i}`}
              className="!w-40 sm:!w-48"
            >
              <MovieCard media={media} rank={ranked ? i + 1 : undefined} />
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Desktop nav arrows fade in on rail hover */}
      <button
        onClick={() => slide(-1)}
        className="absolute left-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 backdrop-blur transition hover:bg-accent md:grid md:opacity-0 md:group-hover/rail:opacity-100"
        aria-label="Scroll left"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => slide(1)}
        className="absolute right-2 top-[38%] z-10 hidden h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-black/70 backdrop-blur transition hover:bg-accent md:grid md:opacity-0 md:group-hover/rail:opacity-100"
        aria-label="Scroll right"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}
