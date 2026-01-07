"use client";

import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export type CarouselSlide = {
  src: string;
  alt: string;
  title: string;
  description: string;
};

type Props = {
  slides?: CarouselSlide[];
  className?: string;
};

const defaultSlides: CarouselSlide[] = [
  {
    src: "/carousel/slide-1.svg",
    alt: "New arrivals",
    title: "New arrivals",
    description: "Fresh picks added weekly—discover what’s new.",
  },
  {
    src: "/carousel/slide-2.svg",
    alt: "Best sellers",
    title: "Best sellers",
    description: "Customer favorites that keep coming back in stock.",
  },
  {
    src: "/carousel/slide-3.svg",
    alt: "Fast checkout",
    title: "Fast checkout",
    description: "Quick add-to-cart and a smooth checkout experience.",
  },
];

export function ImageCarousel({ slides = defaultSlides, className }: Props) {
  const safeSlides = useMemo(() => (slides.length ? slides : defaultSlides), [slides]);
  const [index, setIndex] = useState(0);

  const goTo = useCallback((next: number) => {
    setIndex(() => {
      const n = safeSlides.length;
      if (n === 0) return 0;
      return ((next % n) + n) % n;
    });
  }, [safeSlides.length]);

  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Promotions"
      className={[
        "relative overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100",
        "aspect-[16/10]",
        className ?? "",
      ].join(" ")}
    >
      <div
        className="flex h-full w-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {safeSlides.map((slide) => (
          <div key={slide.src} className="relative h-full w-full shrink-0">
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 560px"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent p-4">
              <p className="text-sm font-semibold text-white sm:text-base">{slide.title}</p>
              <p className="mt-1 text-xs text-white/90 sm:text-sm">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <span aria-hidden>‹</span>
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/35 px-3 py-2 text-sm font-medium text-white backdrop-blur hover:bg-black/45 focus:outline-none focus:ring-2 focus:ring-white/80"
      >
        <span aria-hidden>›</span>
      </button>

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

