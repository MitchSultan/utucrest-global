"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface ScrollRevealProps {
  as: "p" | "div" | "ol";
  children: ReactNode;
  className?: string;
  id?: string;
  role?: string;
  ariaLabelledBy?: string;
  stagger?: boolean;
  trigger?: "load" | "scroll";
  delay?: number;
}

export function ScrollReveal({
  as: Tag,
  children,
  className,
  id,
  role,
  ariaLabelledBy,
  stagger = false,
  trigger = "scroll",
  delay = 0,
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const container = containerRef.current;
        const targets = container
          ? stagger
            ? Array.from(container.querySelectorAll<HTMLElement>(".reveal-item"))
            : [container]
          : [];

        if (!targets.length) return;

        gsap.fromTo(
          targets,
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.64,
            delay,
            ease: "power3.out",
            ...(stagger
              ? { stagger: { amount: 0.46, ease: "power2.out" } }
              : {}),
            scrollTrigger:
              trigger === "scroll"
                ? { trigger: container, start: "top 84%", once: true }
                : undefined,
          },
        );
      });

      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <Tag
      aria-labelledby={ariaLabelledBy}
      className={className}
      id={id}
      role={role}
      ref={(element: HTMLElement | null) => {
        containerRef.current = element;
      }}
    >
      {children}
    </Tag>
  );
}
