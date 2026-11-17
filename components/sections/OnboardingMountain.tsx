"use client";

import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type OnboardingStep = {
  step: string;
  title: string;
  description: string;
};

/* The 8th "summit" step (your old summary card) */
const EDGE: OnboardingStep = {
  step: "The UtuCrest Edge",
  title: "Full Operational Accountability",
  description:
    "We do not merely supply labour; we take full responsibility for attendance, supervision, continuous compliance, and backup continuity.",
};

/* ------------------------------------------------------------------ */
/*  Mountain geometry (viewBox 1000 x 360).                            */
/*  ASCENT must keep increasing in x (it does) so nodes can be placed  */
/*  by x. You can redraw these in Figma and paste the `d` values.      */
/* ------------------------------------------------------------------ */
const VB_W = 1000;
const VB_H = 360;
const X_FIRST = 90;
const X_SUMMIT = 790;

const ASCENT =
  "M0 335 C80 330 120 300 180 290 C250 278 290 300 350 250 C420 195 450 215 520 160 C590 105 640 130 700 80 C730 55 760 45 790 40";
const DESCENT = "M790 40 C850 50 900 150 1000 230";
const MOUNTAIN = `${ASCENT} C850 50 900 150 1000 230 L1000 360 L0 360 Z`;
const RIDGE =
  "M0 300 C120 250 200 270 320 220 C440 170 520 200 640 140 C760 80 860 120 1000 170 L1000 360 L0 360 Z";

type Pt = { x: number; y: number };

/* Path is monotonic in x: binary search its length to find y for a given x */
function pointAtX(path: SVGPathElement, x: number): Pt {
  let lo = 0;
  let hi = path.getTotalLength();
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).x < x) lo = mid;
    else hi = mid;
  }
  const p = path.getPointAtLength(hi);
  return { x: p.x, y: p.y };
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
    </svg>
  );
}

function Flag() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" aria-hidden>
      <path d="M5 3h2v18H5z" />
      <path d="M8 4h11l-3 4 3 4H8z" />
    </svg>
  );
}

export default function OnboardingMountain({ steps }: { steps: OnboardingStep[] }) {
  const uid = useId().replace(/:/g, "");
  const all = [...steps, EDGE];
  const n = all.length;

  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const introRect = useRef<SVGRectElement>(null);
  const progRect = useRef<SVGRectElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prevActive = useRef(0);

  const [pts, setPts] = useState<Pt[] | null>(null);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);

  /* Place the nodes on the real curve */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    setPts(
      all.map((_, i) =>
        pointAtX(path, X_FIRST + ((X_SUMMIT - X_FIRST) * i) / (n - 1))
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  /* Intro: wipe the mountain in left-to-right, pop each node as it passes */
  useEffect(() => {
    if (!pts) return;
    const DRAW = 2.2;

    const ctx = gsap.context(() => {
      gsap.set(introRect.current, { attr: { width: 0 } });
      gsap.set(progRect.current, { attr: { width: 0 } });
      gsap.set("[data-node]", { autoAlpha: 0, scale: 0.4 });
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 75%", once: true },
        onComplete: () => setReady(true),
      });

      tl.to("[data-reveal]", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" })
        .to(introRect.current, { attr: { width: VB_W }, duration: DRAW, ease: "none" }, 0.1);

      pts.forEach((p, i) => {
        tl.to(
          `[data-node="${i}"]`,
          { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out(2)" },
          0.1 + DRAW * (p.x / VB_W)
        );
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.progress(1);
    }, rootRef);

    return () => ctx.revert();
  }, [pts]);

  /* The terracotta "climbed" trail follows the active step */
  useEffect(() => {
    if (!ready || !pts || !progRect.current) return;
    gsap.to(progRect.current, {
      attr: { width: pts[active].x },
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto",
    });
  }, [ready, pts, active]);

  /* Swap animation for the detail card */
  useEffect(() => {
    if (prevActive.current === active) return;
    prevActive.current = active;
    if (!contentRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    gsap.fromTo(
      contentRef.current,
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, duration: reduce ? 0 : 0.35, ease: "power2.out" }
    );
  }, [active]);

  const cur = all[active];
  const summitActive = active === n - 1;

  return (
    <div ref={rootRef}>
      {/* Full list for screen readers and crawlers */}
      <ol className="sr-only">
        {all.map((s) => (
          <li key={s.title}>
            {s.step}: {s.title}. {s.description}
          </li>
        ))}
      </ol>

      {/* Mountain */}
      <div data-reveal className="relative mb-14 h-56 opacity-0 sm:h-72 lg:h-[22rem]">
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden
        >
          <defs>
            <clipPath id={`${uid}-intro`}>
              <rect ref={introRect} x="0" y="-20" width={0} height={VB_H + 40} />
            </clipPath>
            <clipPath id={`${uid}-prog`}>
              <rect ref={progRect} x="0" y="-20" width={0} height={VB_H + 40} />
            </clipPath>
          </defs>

          <g clipPath={`url(#${uid}-intro)`}>
            <path d={RIDGE} className="fill-deep-teal/5" />
            <path d={MOUNTAIN} className="fill-deep-teal/10" />
            <path
              d={DESCENT}
              fill="none"
              className="stroke-deep-teal/25"
              strokeWidth="2"
              strokeDasharray="4 8"
              vectorEffect="non-scaling-stroke"
            />
            <path
              ref={pathRef}
              d={ASCENT}
              fill="none"
              className="stroke-deep-teal/30"
              strokeWidth="3"
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          <path
            d={ASCENT}
            fill="none"
            className="stroke-terracotta"
            strokeWidth="4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            clipPath={`url(#${uid}-prog)`}
          />
        </svg>

        {/* Step nodes */}
        {pts &&
          all.map((s, i) => {
            const p = pts[i];
            const summit = i === n - 1;
            const isActive = i === active;
            const done = i < active;

            const size = summit ? "h-9 w-9 md:h-12 md:w-12" : "h-7 w-7 md:h-10 md:w-10";
            const tone = isActive
              ? "bg-terracotta text-white"
              : summit
              ? "bg-golden-sand text-deep-teal"
              : done
              ? "bg-deep-teal text-white"
              : "border border-border bg-white text-charcoal hover:border-terracotta";

            return (
              <div
                key={s.title}
                data-node={i}
                className="absolute"
                style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` }}
              >
                <div className="relative -translate-x-1/2 -translate-y-1/2">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${s.step}: ${s.title}`}
                    aria-current={isActive ? "step" : undefined}
                    className={`font-display relative grid place-items-center rounded-full text-[11px] font-semibold shadow-2xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta md:text-xs ${size} ${tone}`}
                  >
                    {isActive && (
                      <span
                        className="absolute inset-0 animate-ping rounded-full bg-terracotta/40 motion-reduce:hidden"
                        aria-hidden
                      />
                    )}
                    <span className="relative">{summit ? <Flag /> : i + 1}</span>
                  </button>

                  <span
                    className={`pointer-events-none absolute left-1/2 top-full mt-2 hidden w-24 -translate-x-1/2 text-center text-[11px] leading-tight md:line-clamp-2 md:block ${
                      isActive ? "font-semibold text-ink" : "text-charcoal/70"
                    }`}
                  >
                    {summit ? "The UtuCrest Edge" : s.title}
                  </span>
                </div>
              </div>
            );
          })}
      </div>

      {/* Detail card */}
      <div
        data-reveal
        className={`rounded-xl border p-6 opacity-0 shadow-2xs transition-colors duration-300 md:p-8 ${
          summitActive ? "border-deep-teal bg-deep-teal text-white" : "border-border bg-white"
        }`}
      >
        <div ref={contentRef} className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                summitActive ? "text-golden-sand" : "text-terracotta"
              }`}
            >
              {cur.step}
            </span>
            <h3 className={`font-display mt-2 text-xl font-semibold ${summitActive ? "text-white" : "text-ink"}`}>
              {cur.title}
            </h3>
            <p
              className={`mt-3 max-w-2xl text-sm leading-relaxed ${
                summitActive ? "text-white/80" : "text-charcoal/80"
              }`}
            >
              {cur.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className={`text-xs tabular-nums ${summitActive ? "text-white/70" : "text-charcoal/60"}`}>
              {active + 1} / {n}
            </span>
            {(["left", "right"] as const).map((dir) => {
              const disabled = dir === "left" ? active === 0 : active === n - 1;
              return (
                <button
                  key={dir}
                  type="button"
                  disabled={disabled}
                  onClick={() => setActive((a) => a + (dir === "left" ? -1 : 1))}
                  aria-label={dir === "left" ? "Previous step" : "Next step"}
                  className={`grid h-9 w-9 place-items-center rounded-full border transition-colors disabled:opacity-30 ${
                    summitActive
                      ? "border-white/30 hover:bg-white/10"
                      : "border-border hover:border-terracotta hover:text-terracotta"
                  }`}
                >
                  <Chevron dir={dir} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}