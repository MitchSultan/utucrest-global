"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MAP_DOTS, MAP_H, MAP_STEP, MAP_TOP_LAT, MAP_W } from "./WorldDots";

gsap.registerPlugin(ScrollTrigger);

export type Hub = {
  region: string;
  focus: string;
  role: string;
  description: string;
};

/* ------------------------------------------------------------------ */
/*  Pins. Edit lat / lon to move a pin. `match` links a pin to the     */
/*  hub in your data whose `region` contains that word.                */
/* ------------------------------------------------------------------ */
type PinDef = {
  id: string;
  match: string;
  label: string;
  lat: number;
  lon: number;
  hq?: boolean;
};

const PINS: PinDef[] = [
  { id: "kenya", match: "kenya", label: "Kenya", lat: -1.29, lon: 36.82, hq: true }, // Nairobi
  { id: "europe", match: "europe", label: "Europe", lat: 49, lon: 10 },
  { id: "middle-east", match: "middle east", label: "Middle East", lat: 25.2, lon: 55.3 },
  { id: "asia", match: "asia", label: "Asia", lat: 20, lon: 100 },
];

const K = MAP_W / 360;
const project = (lat: number, lon: number) => ({
  x: (lon + 180) * K,
  y: (MAP_TOP_LAT - lat) * K,
});

const PLACED = PINS.map((p) => ({ ...p, ...project(p.lat, p.lon) }));
const HQ = PLACED[0];

/* Curved "routes" from the Nairobi HQ to every other pin */
const ARCS = PLACED.filter((p) => !p.hq).map((p) => {
  const dist = Math.hypot(p.x - HQ.x, p.y - HQ.y);
  const cx = (HQ.x + p.x) / 2;
  const cy = (HQ.y + p.y) / 2 - dist * 0.3;
  return { id: p.id, d: `M${HQ.x} ${HQ.y} Q${cx} ${cy} ${p.x} ${p.y}` };
});

/* Full world on desktop, cropped to Africa / Europe / Asia on mobile */
const VIEW_FULL = { x: 0, y: 0, w: MAP_W, h: MAP_H };
const VIEW_COMPACT = { x: 420, y: 16, w: 500, h: 312 };

function useIsDesktop() {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(min-width: 768px)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(min-width: 768px)").matches,
    () => true
  );
}

export default function OperationsMap({ hubs }: { hubs: Hub[] }) {
  const uid = useId().replace(/:/g, "");
  const desktop = useIsDesktop();
  const vb = desktop ? VIEW_FULL : VIEW_COMPACT;

  const rootRef = useRef<HTMLDivElement>(null);
  const clipRect = useRef<SVGRectElement>(null);
  const [active, setActive] = useState("kenya");

  const hubFor = (pin: PinDef) =>
    hubs.find((h) => h.region.toLowerCase().includes(pin.match));
  const pinIdFor = (hub: Hub) =>
    PINS.find((p) => hub.region.toLowerCase().includes(p.match))?.id;

  /* Intro: wipe the dots in, drop the pins, draw the routes */
  useEffect(() => {
    const root = rootRef.current;
    if (!root || !clipRect.current) return;
    const DRAW = 1.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(clipRect.current, { attr: { x: vb.x, width: 0 } });
      gsap.set("[data-pin]", { autoAlpha: 0, y: -24 });
      gsap.set("[data-card]", { autoAlpha: 0, y: 24 });
      gsap.set("[data-packet]", { autoAlpha: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", once: true },
      });

      tl.to(clipRect.current, { attr: { width: vb.w }, duration: DRAW, ease: "none" }, 0);

      PLACED.forEach((p) => {
        tl.to(
          `[data-pin="${p.id}"]`,
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "bounce.out" },
          Math.max(0, DRAW * ((p.x - vb.x) / vb.w))
        );
      });

      const arcEls = gsap.utils.toArray<SVGPathElement>("[data-arc]");
      arcEls.forEach((arc, i) => {
        const len = arc.getTotalLength();
        gsap.set(arc, { strokeDasharray: len, strokeDashoffset: len });
        tl.to(arc, { strokeDashoffset: 0, duration: 1.2, ease: "power2.out" }, 0.9 + i * 0.25);
      });

      tl.to("[data-card]", { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" }, 0.4);
      tl.to("[data-packet]", { autoAlpha: 1, duration: 0.4 }, 2.3);

      /* little dots travelling along each route */
      tl.call(() => {
        if (reduce) return;
        ctx.add(() => {
          arcEls.forEach((arc, i) => {
            const len = arc.getTotalLength();
            const pk = root.querySelector(`[data-packet="${i}"]`);
            const o = { t: 0 };
            gsap.to(o, {
              t: 1,
              duration: 2.4 + i * 0.5,
              repeat: -1,
              ease: "none",
              onUpdate: () => {
                const pt = arc.getPointAtLength(o.t * len);
                pk?.setAttribute("cx", String(pt.x));
                pk?.setAttribute("cy", String(pt.y));
              },
            });
          });
        });
      }, [], 2.3);

      if (reduce) tl.progress(1);
    }, root);

    return () => ctx.revert();
  }, [desktop]); // eslint-disable-line react-hooks/exhaustive-deps

  const pct = (p: { x: number; y: number }) => ({
    left: `${((p.x - vb.x) / vb.w) * 100}%`,
    top: `${((p.y - vb.y) / vb.h) * 100}%`,
  });

  return (
    <div ref={rootRef}>
      {/* Map */}
      <div className="rounded-2xl border border-white/15 bg-white/5 p-3 md:p-8">
        <div
          className="relative mx-auto w-full max-w-5xl"
          style={{ aspectRatio: `${vb.w} / ${vb.h}` }}
        >
          <svg
            viewBox={`${vb.x} ${vb.y} ${vb.w} ${vb.h}`}
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <defs>
              <radialGradient id={`${uid}-glow`}>
                <stop offset="0" style={{ stopColor: "var(--color-golden-sand)", stopOpacity: 0.5 }} />
                <stop offset="1" style={{ stopColor: "var(--color-golden-sand)", stopOpacity: 0 }} />
              </radialGradient>
              <clipPath id={`${uid}-wipe`}>
                <rect ref={clipRect} x={vb.x} y={vb.y - 10} width={0} height={vb.h + 20} />
              </clipPath>
            </defs>

            <g clipPath={`url(#${uid}-wipe)`}>
              {PLACED.map((p) => (
                <circle
                  key={p.id}
                  cx={p.x}
                  cy={p.y}
                  r="38"
                  fill={`url(#${uid}-glow)`}
                  className={`transition-opacity duration-300 ${active === p.id ? "opacity-100" : "opacity-30"}`}
                />
              ))}
              <path
                d={MAP_DOTS}
                fill="none"
                className="stroke-white/35"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeDasharray={`0.01 ${MAP_STEP}`}
              />
            </g>

            {/* routes from the Nairobi HQ */}
            {ARCS.map((a) => (
              <path
                key={a.id}
                data-arc
                d={a.d}
                fill="none"
                strokeWidth="1.6"
                strokeLinecap="round"
                className={`transition-colors duration-300 ${
                  active === a.id ? "stroke-golden-sand" : "stroke-white/30"
                }`}
              />
            ))}
            {ARCS.map((a, i) => (
              <circle
                key={a.id}
                data-packet={i}
                cx={HQ.x}
                cy={HQ.y}
                r="2.6"
                className="fill-golden-sand"
              />
            ))}
          </svg>

          {/* Pins */}
          {PLACED.map((p) => {
            const hub = hubFor(p);
            const isActive = active === p.id;
            const pos = pct(p);
            const leftPct = parseFloat(pos.left);
            const topPct = parseFloat(pos.top);
            const below = topPct < 40;
            const h = leftPct > 70 ? "right-[-16px]" : leftPct < 30 ? "left-[-16px]" : "left-1/2 -translate-x-1/2";

            return (
              <div
                key={p.id}
                data-pin={p.id}
                className="absolute opacity-0"
                style={{ ...pos, zIndex: isActive ? 20 : 10 }}
              >
                {/* ground shadow + pulse */}
                <span className="pointer-events-none absolute left-0 top-0 h-1.5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/30" />
                {isActive && (
                  <span className="pointer-events-none absolute left-0 top-0 h-2.5 w-7 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-golden-sand motion-reduce:hidden" />
                )}

                <button
                  type="button"
                  aria-label={`${hub?.region ?? p.label}${p.hq ? ", headquarters" : ""}`}
                  aria-pressed={isActive}
                  onMouseEnter={() => setActive(p.id)}
                  onFocus={() => setActive(p.id)}
                  onClick={() => setActive(p.id)}
                  className={`absolute left-0 top-0 origin-bottom -translate-x-1/2 -translate-y-full transition-transform duration-200 focus-visible:outline-none ${
                    isActive ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <svg viewBox="0 0 24 28" className="h-8 w-7 drop-shadow-md md:h-9 md:w-8" aria-hidden>
                    <path
                      d="M12 27C12 27 22 17.5 22 10.5a10 10 0 1 0-20 0C2 17.5 12 27 12 27z"
                      className={isActive ? "fill-golden-sand" : "fill-golden-sand/90"}
                    />
                    <circle cx="12" cy="10.5" r="3.8" className="fill-deep-teal" />
                  </svg>
                </button>

                {/* label */}
                <span className="pointer-events-none absolute left-0 top-0 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded bg-deep-teal/80 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-white md:text-[10px]">
                  {p.label}
                </span>

                {/* tooltip */}
                <div
                  className={`pointer-events-none absolute w-52 rounded-xl border border-white/20 bg-deep-teal/95 p-3 text-left shadow-xl backdrop-blur-xs transition duration-200 md:w-60 ${h} ${
                    below ? "top-10" : "bottom-12 md:bottom-14"
                  } ${isActive ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0"}`}
                >
                  <span className="text-[10px] font-bold uppercase tracking-wider text-golden-sand">
                    {p.hq ? "Headquarters" : hub?.focus ?? "Service area"}
                  </span>
                  <p className="font-display mt-1 text-base font-bold text-white">
                    {hub?.region ?? p.label}
                  </p>
                  {hub && <p className="mt-0.5 text-[11px] font-semibold text-white/70">{hub.role}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cards (synced with the pins) */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {hubs.map((hub) => {
          const id = pinIdFor(hub);
          const isActive = id === active;
          return (
            <div
              key={hub.region}
              data-card
              onMouseEnter={() => id && setActive(id)}
              onClick={() => id && setActive(id)}
              className={`rounded-2xl border p-6 opacity-0 backdrop-blur-xs transition-colors duration-300 ${
                isActive ? "border-golden-sand/70 bg-white/15" : "border-white/15 bg-white/10"
              }`}
            >
              <span className="text-xs font-bold uppercase tracking-wider text-golden-sand">
                {hub.focus}
              </span>
              <h3 className="font-display mt-2 text-2xl font-bold text-white">{hub.region}</h3>
              <p className="mt-1 text-xs font-semibold text-white/70">{hub.role}</p>
              <p className="mt-3 text-xs leading-relaxed text-white/80">{hub.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}