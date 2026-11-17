"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface TextSegment {
  text: string;
  className?: string;
}

interface TextRevealProps {
  as: "h1" | "h2";
  text?: string;
  segments?: TextSegment[];
  className?: string;
  id?: string;
  trigger?: "load" | "scroll";
  delay?: number;
}

function renderText(text: string, segmentIndex: number) {
  return text.split(/(\s+)/u).map((token, tokenIndex) => {
    if (/^\s+$/u.test(token)) {
      return token;
    }

    return (
      <span className="text-reveal__word" key={`${segmentIndex}-${tokenIndex}`}>
        {Array.from(token).map((character, characterIndex) => (
          <span
            aria-hidden="true"
            className="text-reveal__char"
            key={`${segmentIndex}-${tokenIndex}-${characterIndex}`}
          >
            {character}
          </span>
        ))}
      </span>
    );
  });
}

export function TextReveal({
  as: Tag,
  text,
  segments,
  className,
  id,
  trigger = "scroll",
  delay = 0,
}: TextRevealProps) {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const content = segments ?? [{ text: text ?? "" }];
  const accessibleText = content.map((segment) => segment.text).join("");

  useGSAP(
    () => {
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        const characters = headingRef.current?.querySelectorAll(".text-reveal__char");
        if (!characters?.length) return;

        gsap.fromTo(
          characters,
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            delay,
            ease: "power3.out",
            stagger: { amount: 0.44, from: "start" },
            scrollTrigger:
              trigger === "scroll"
                ? {
                    trigger: headingRef.current,
                    start: "top 84%",
                    once: true,
                  }
                : undefined,
          },
        );
      });

      return () => media.revert();
    },
    { scope: headingRef },
  );

  return (
    <Tag
      aria-label={accessibleText}
      className={className}
      id={id}
      ref={headingRef}
    >
      {content.map((segment, index) => (
        <span className={segment.className} key={index}>
          {renderText(segment.text, index)}
        </span>
      ))}
    </Tag>
  );
}
