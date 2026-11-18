"use client";

import { Children, useEffect, useState, type ReactNode } from "react";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const carouselOptions = {
  align: "start" as const,
  breakpoints: {
    "(min-width: 768px)": { active: false },
  },
};

interface ResponsiveCarouselProps {
  children: ReactNode;
  label: string;
  className: string;
  contentRole?: "list";
  itemRole?: "listitem";
  loop?: boolean;
  autoplay?: boolean;
  itemClassName?: string;
}

export function ResponsiveCarousel({
  children,
  label,
  className,
  contentRole,
  itemRole,
  loop = false,
  autoplay = false,
  itemClassName,
}: ResponsiveCarouselProps) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!api || !autoplay || isPaused) return;

    const interval = window.setInterval(() => {
      api.scrollNext();
    }, 4200);

    return () => window.clearInterval(interval);
  }, [api, autoplay, isPaused]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop,
        breakpoints: loop ? undefined : carouselOptions.breakpoints,
      }}
      setApi={setApi}
      aria-label={label}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <CarouselContent
        className={cn(!loop && "md:ml-0 md:grid md:gap-6", className)}
        role={contentRole}
        viewportClassName={loop ? "pb-1" : "md:overflow-visible"}
      >
        {Children.map(children, (child) => (
          <CarouselItem
            className={cn(
              "reveal-item h-full basis-[88%] sm:basis-[72%]",
              loop
                ? "md:basis-[calc((100%-1.5rem)/2)] md:pl-4 lg:basis-[calc((100%-3rem)/3)]"
                : "md:basis-auto md:shrink md:grow md:pl-0",
              itemClassName,
            )}
            role={itemRole}
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
      {loop && (
        <>
          <CarouselPrevious
            className="absolute top-auto bottom-[-3.75rem] left-0 rounded-full border-deep-teal/20 bg-white text-deep-teal disabled:opacity-40"
            aria-label="Previous commitment"
          />
          <CarouselNext
            className="absolute top-auto right-0 bottom-[-3.75rem] rounded-full border-deep-teal/20 bg-white text-deep-teal disabled:opacity-40"
            aria-label="Next commitment"
          />
        </>
      )}
    </Carousel>
  );
}
