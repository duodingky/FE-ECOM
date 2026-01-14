"use client";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useMemo, useState, useEffect } from "react";
import type { HomePageBanners } from "@/lib/type/catalog";


type Props = {
  data: HomePageBanners[];
  strapiBaseUrl: string;
};

export function ImageCarousel({ data, strapiBaseUrl }: Props) {
  const safeSlides = useMemo(() => (data ?? []), [data]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex(() => {
        const n = safeSlides.length;
        if (n === 0) return 0;
        return ((next % n) + n) % n;
      });
    },
    [safeSlides.length]
  );

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  // Auto-scroll effect
  useEffect(() => {
    if (isPaused) return; // stop when hovered
    const interval = setInterval(() => {
      goNext();
    }, 3000); // change slide every 3s
    return () => clearInterval(interval);
  }, [goNext, isPaused]);
 
  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className={[
        "relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100",
        "aspect-[16/10]",
      ].join(" ")}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {safeSlides.map((slide) => (
  
          <div key={slide.id} className="relative h-full w-full shrink-0">
            <Link href={slide.link} >
              <Image
                src={strapiBaseUrl + slide.bannerImg.formats.large.url}
                alt={slide.shortDesc}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
              />
            </Link>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 p-4 bg-black/40">
              <p className="mt-1 text-xs text-white/90 sm:text-sm">
                {slide.shortDesc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <span aria-hidden>›</span>
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2">
        {safeSlides.map((_, i) => {
          const active = i === index;
          return (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={active ? "true" : undefined}
              className={[
                "h-2.5 w-2.5 rounded-full transition",
                active ? "bg-white" : "bg-white/50 hover:bg-white/70",
                "focus:outline-none focus:ring-2 focus:ring-white/80",
              ].join(" ")}
            />
          );
        })}
      </div>
    </section>
  );
}