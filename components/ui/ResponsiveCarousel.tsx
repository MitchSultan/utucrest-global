"use client";

import { Children, type ReactNode } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
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
}

export function ResponsiveCarousel({
  children,
  label,
  className,
  contentRole,
  itemRole,
}: ResponsiveCarouselProps) {
  return (
    <Carousel opts={carouselOptions} aria-label={label}>
      <CarouselContent
        className={cn("md:ml-0 md:grid md:gap-6", className)}
        role={contentRole}
        viewportClassName="md:overflow-visible"
      >
        {Children.map(children, (child) => (
          <CarouselItem
            className="reveal-item h-full basis-[88%] sm:basis-[72%] md:basis-auto md:shrink md:grow md:pl-0"
            role={itemRole}
          >
            {child}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
