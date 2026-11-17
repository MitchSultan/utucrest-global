"use client";

import { useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ------------------------------------------------------------------ */
/*  1. THE CURVE                                                       */
/*  Draw it in Figma (Pen tool) inside a 1000 x 400 frame, no fill,    */
/*  right-click > Copy as SVG, then paste the `d="..."` value here.    */
/* ------------------------------------------------------------------ */
const PATH_D =
  "M40 250 C110 270 190 325 270 322 C360 318 400 270 442 240 C520 190 560 160 615 148 C690 130 720 62 787 58 C850 54 900 100 960 150";

const VB_W = 1000;
const VB_H = 400;
const X_START = 40; // 8AM
const X_PER_HOUR = 57.5; // 8AM -> 12AM = 16h = 920 units

type Tick = { h: number; label: string };
type IconType = "sun" | "moon";
type Callout = {
  id: string;
  hour: number;
  title: string;
  body: string;
  icon: IconType;
  box: string;
};
type PlacedCallout = Callout & { x: number; y: number; len: number };
type Hover = { time: string; stress: number; flip: boolean };
type QuickTo = ReturnType<typeof gsap.quickTo>;

const TICKS: Tick[] = [
  { h: 8, label: "8AM" },
  { h: 12, label: "12PM" },
  { h: 15, label: "3PM" },
  { h: 18, label: "6PM" },
  { h: 21, label: "9PM" },
  { h: 24, label: "12AM" },
];

const CALLOUTS: Callout[] = [
  {
    id: "mid",
    hour: 12,
    title: "Midday dip",
    body: "Excess solar floods the grid",
    icon: "sun",
    box: "bg-[#2f6b4a] text-white left-[-12px] md:left-auto md:right-1",
  },
  {
    id: "eve",
    hour: 21,
    title: "Evening spike",
    body: "Solar drops to zero as demand peaks",
    icon: "moon",
    box: "bg-[#6df08a] text-neutral-900 right-1",
  },
];

const xOfHour = (h: number): number => X_START + (h - 8) * X_PER_HOUR;

/* Path is monotonic in x, so binary search the length for a given x */
function pointAtX(path: SVGPathElement, x: number) {
  const total = path.getTotalLength();
  let lo = 0;
  let hi = total;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).x < x) lo = mid;
    else hi = mid;
  }
  const p = path.getPointAtLength(hi);
  return { x: p.x, y: p.y, len: hi };
}

const fmtHour = (h: number): string => {
  const H = Math.round(h);
  return `${((H + 11) % 12) + 1}${H % 24 >= 12 ? "PM" : "AM"}`;
};

/* Placeholder skyline. Replace with your Figma export if you have one */
const BUILDINGS = Array.from({ length: 34 }, (_, i) => {
  const s = Math.sin(i * 97.13) * 10000;
  const r = s - Math.floor(s);
  return {
    x: i * 30,
    w: Math.round(22 + r * 14),
    h: Math.round(25 + ((i * 37) % 11) * 6 + r * 20),
  };
});

function Skyline() {
  return (
    <svg
      viewBox="0 0 1020 140"
      preserveAspectRatio="xMidYMax slice"
      className="h-full w-full"
      aria-hidden
    >
      <defs>
        <linearGradient id="gp-sky" gradientUnits="userSpaceOnUse" x1="0" x2="1020" y1="0" y2="0">
          <stop offset="0" style={{ stopColor: "var(--sl)" }} />
          <stop offset=".5" style={{ stopColor: "var(--sl)" }} />
          <stop offset=".5" style={{ stopColor: "var(--sr)" }} />
          <stop offset="1" style={{ stopColor: "var(--sr)" }} />
        </linearGradient>
      </defs>
      {BUILDINGS.map((b, i) => (
        <rect key={i} x={b.x} y={140 - b.h} width={b.w} height={b.h} fill="url(#gp-sky)" />
      ))}
    </svg>
  );
}

function Icon({ type }: { type: IconType }) {
  return type === "sun" ? (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
    </svg>
  );
}

export default function GridProblem() {
  const rootRef = useRef<HTMLElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const statRef = useRef<HTMLSpanElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const quick = useRef<{ x?: QuickTo; y?: QuickTo }>({});
  const [pts, setPts] = useState<PlacedCallout[] | null>(null);
  const [hover, setHover] = useState<Hover | null>(null);

  /* Measure callout positions from the real path (so they stay glued to it) */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    setPts(CALLOUTS.map((c) => ({ ...c, ...pointAtX(path, xOfHour(c.hour)) })));
  }, []);

  /* GSAP: reveal, draw the line, pop callouts as the line reaches them */
  useEffect(() => {
    if (!pts || !rootRef.current || !pathRef.current || !dotRef.current) return;
    const path = pathRef.current;
    const dot = dotRef.current;

    const ctx = gsap.context(() => {
      const total = path.getTotalLength();
      const DRAW = 2.4;

      gsap.set(path, { strokeDasharray: total, strokeDashoffset: total });
      gsap.set("[data-callout]", { autoAlpha: 0, scale: 0.6 });
      gsap.set("[data-reveal]", { autoAlpha: 0, y: 24 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 70%", once: true },
      });

      tl.to("[data-reveal]", { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: "power3.out" })
        .to(path, { strokeDashoffset: 0, duration: DRAW, ease: "none" }, 0.3);

      pts.forEach((p) => {
        tl.to(
          `[data-callout="${p.id}"]`,
          { autoAlpha: 1, scale: 1, duration: 0.5, ease: "back.out(2)" },
          0.3 + DRAW * (p.len / total)
        );
      });

      const counter = { v: 0 };
      tl.to(
        counter,
        {
          v: 2,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => {
            if (statRef.current) statRef.current.textContent = `${counter.v.toFixed(1)}M+`;
          },
          onComplete: () => {
            if (statRef.current) statRef.current.textContent = "2M+";
          },
        },
        0.4
      );

      gsap.to("[data-pulse]", {
        scale: 2.2,
        opacity: 0,
        duration: 1.6,
        repeat: -1,
        ease: "power1.out",
      });

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) tl.progress(1);

      /* scrubber dot follows the pointer with a little lag */
      gsap.set(dot, { autoAlpha: 0 });
      quick.current.x = gsap.quickTo(dot, "x", { duration: 0.25, ease: "power3.out" });
      quick.current.y = gsap.quickTo(dot, "y", { duration: 0.25, ease: "power3.out" });
    }, rootRef);

    return () => ctx.revert();
  }, [pts]);

  /* Interactivity: hover / drag along the curve */
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!chartRef.current || !pathRef.current || !dotRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const fx = (e.clientX - rect.left) / rect.width;
    const vx = Math.min(Math.max(fx * VB_W, X_START), xOfHour(24));
    const p = pointAtX(pathRef.current, vx);
    const px = (p.x / VB_W) * rect.width;
    const py = (p.y / VB_H) * rect.height;

    if (!hover) gsap.set(dotRef.current, { x: px, y: py });
    gsap.to(dotRef.current, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
    quick.current.x?.(px);
    quick.current.y?.(py);

    setHover({
      time: fmtHour(8 + (vx - X_START) / X_PER_HOUR),
      stress: Math.round(100 * (1 - p.y / VB_H)),
      flip: fx > 0.7,
    });
  };

  const onLeave = () => {
    setHover(null);
    if (dotRef.current) gsap.to(dotRef.current, { autoAlpha: 0, duration: 0.25 });
  };

  return (
    <section
      ref={rootRef}
      className="relative mx-auto my-10 w-full max-w-5xl overflow-hidden rounded-2xl border border-[#6df08a]/60 bg-[#262626] text-white md:aspect-[16/10] [--gl:#6df08a] [--gr:#6df08a] [--sl:#4a4a4a] [--sr:#4a4a4a] md:[--gl:#1f5c3a] md:[--sl:#d4d4d4] md:[--sr:#6a6a6a]"
    >
      {/* white left half (desktop only) */}
      <div className="absolute inset-y-0 left-0 hidden w-1/2 bg-white md:block" aria-hidden />

      {/* left copy */}
      <div className="relative p-6 md:absolute md:left-[6%] md:top-[8%] md:w-[44%] md:p-0 md:text-neutral-900">
        <span data-reveal className="inline-block rounded-md bg-[#6df08a] px-3 py-0.5 text-xs font-medium text-neutral-900">
          Problem
        </span>
        <h2 data-reveal className="mt-4 text-2xl font-medium leading-tight tracking-tight md:text-[clamp(1.4rem,2.9vw,2.1rem)]">
          The grid is breaking under its own success
        </h2>
      </div>

      <div data-reveal className="relative px-6 md:absolute md:left-[6%] md:top-[40%] md:p-0 md:text-neutral-900">
        <p className="text-3xl font-light md:text-[clamp(1.5rem,3vw,2.2rem)]">
          <span ref={statRef}>2M+</span>
          <span className="ml-1 text-xs opacity-70">MWh</span>
        </p>
        <p className="text-xs opacity-70">Clean energy wasted annually in California</p>
      </div>

      {/* chart */}
      <div
        ref={chartRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ touchAction: "pan-y" }}
        className="relative mx-4 mt-6 h-64 cursor-crosshair md:absolute md:inset-x-0 md:top-[26%] md:bottom-[14%] md:mx-0 md:mt-0 md:h-auto"
      >
        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full overflow-visible"
          aria-hidden
        >
          <defs>
            <linearGradient id="gp-stroke" gradientUnits="userSpaceOnUse" x1="0" x2={VB_W} y1="0" y2="0">
              <stop offset="0" style={{ stopColor: "var(--gl)" }} />
              <stop offset=".5" style={{ stopColor: "var(--gl)" }} />
              <stop offset=".5" style={{ stopColor: "var(--gr)" }} />
              <stop offset="1" style={{ stopColor: "var(--gr)" }} />
            </linearGradient>
          </defs>

          {TICKS.map((t) => (
            <line
              key={t.h}
              x1={xOfHour(t.h)}
              x2={xOfHour(t.h)}
              y1="0"
              y2={VB_H}
              stroke="rgba(128,128,128,.25)"
              vectorEffect="non-scaling-stroke"
            />
          ))}

          <path
            ref={pathRef}
            d={PATH_D}
            fill="none"
            stroke="url(#gp-stroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* hour labels */}
        {TICKS.map((t) => (
          <span
            key={t.h}
            className="pointer-events-none absolute bottom-0 -translate-x-1/2 text-[10px] text-neutral-400 md:text-[11px]"
            style={{ left: `${(xOfHour(t.h) / VB_W) * 100}%` }}
          >
            {t.label}
          </span>
        ))}

        {/* callouts */}
        {pts?.map((p) => (
          <div
            key={p.id}
            data-callout={p.id}
            className="pointer-events-none absolute"
            style={{ left: `${(p.x / VB_W) * 100}%`, top: `${(p.y / VB_H) * 100}%` }}
          >
            <span className="absolute left-0 top-0 grid h-6 w-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#262626] text-[#6df08a]">
              <span data-pulse className="absolute inset-0 rounded-full border border-[#6df08a]" />
              <Icon type={p.icon} />
            </span>
            <div
              className={`absolute bottom-4 w-32 rounded-lg px-3 py-2 text-[11px] leading-snug md:w-36 ${p.box}`}
            >
              <p className="font-semibold">{p.title}</p>
              <p className="opacity-90">{p.body}</p>
            </div>
          </div>
        ))}

        {/* scrubber */}
        <div ref={dotRef} className="pointer-events-none absolute left-0 top-0">
          <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full border-2 border-white bg-[#6df08a] shadow" />
          {hover && (
            <div
              className={`absolute -top-14 whitespace-nowrap rounded-md bg-black/85 px-2 py-1 text-[11px] text-white ${
                hover.flip ? "right-3" : "left-3"
              }`}
            >
              <b>{hover.time}</b> · stress index {hover.stress}
            </div>
          )}
        </div>
      </div>

      {/* right copy */}
      <p
        data-reveal
        className="relative px-6 py-6 text-xl leading-snug md:absolute md:left-[62%] md:top-[56%] md:w-[34%] md:p-0 md:text-[clamp(1rem,2.1vw,1.55rem)]"
      >
        This mismatch creates curtailment, higher prices, and grid stress.
      </p>

      {/* skyline */}
      <div className="pointer-events-none relative h-20 md:absolute md:inset-x-0 md:bottom-0 md:h-[16%]" aria-hidden>
        <Skyline />
      </div>
    </section>
  );
}