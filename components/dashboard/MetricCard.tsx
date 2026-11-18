import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";

export function MetricCard({
  label,
  value,
  icon: Icon,
  currentPeriod,
  previousPeriod,
  periodLabel,
  accent,
}: {
  label: string;
  value: number;
  icon: LucideIcon;
  currentPeriod: number;
  previousPeriod: number;
  periodLabel: string;
  accent: "teal" | "terracotta" | "sand" | "blue" | "violet";
}) {
  const difference = currentPeriod - previousPeriod;
  const percentage = previousPeriod > 0
    ? Math.round((difference / previousPeriod) * 100)
    : null;
  const increased = difference >= 0;
  const sparkline = [previousPeriod, currentPeriod];
  const max = Math.max(...sparkline, 1);
  const points = sparkline
    .map((point, index) => `${index * 100},${27 - (point / max) * 22}`)
    .join(" ");

  const accentClasses = {
    teal: "bg-deep-teal/10 text-deep-teal",
    terracotta: "bg-terracotta/10 text-terracotta",
    sand: "bg-golden-sand/20 text-ink",
    blue: "bg-sky-500/10 text-sky-700",
    violet: "bg-violet-500/10 text-violet-700",
  }[accent];

  return (
    <article className="admin-card min-w-0 p-5">
      <div className="flex items-start justify-between gap-3">
        <div className={`flex size-10 items-center justify-center rounded-xl ${accentClasses}`}>
          <Icon className="size-[18px]" aria-hidden="true" />
        </div>
        <svg
          viewBox="0 0 100 32"
          className="mt-1 h-8 w-[74px] overflow-visible"
          role="img"
          aria-label={`${currentPeriod} this month compared with ${previousPeriod} last month`}
        >
          <polyline
            points={points}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={increased ? "text-deep-teal" : "text-terracotta"}
          />
          <circle
            cx="100"
            cy={27 - (currentPeriod / max) * 22}
            r="3"
            className={increased ? "fill-deep-teal" : "fill-terracotta"}
          />
        </svg>
      </div>
      <p className="mt-5 text-sm font-medium text-charcoal/70">{label}</p>
      <p className="mt-1 text-[1.8rem] font-semibold leading-none tracking-tight text-ink tabular-nums">
        {value.toLocaleString()}
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs">
        <span className={`inline-flex items-center gap-0.5 font-semibold ${
          increased ? "text-deep-teal" : "text-terracotta"
        }`}>
          {increased
            ? <ArrowUpRight className="size-3.5" aria-hidden="true" />
            : <ArrowDownRight className="size-3.5" aria-hidden="true" />}
          {percentage === null
            ? currentPeriod > 0 ? "New" : "0%"
            : `${Math.abs(percentage)}%`}
        </span>
        <span className="text-charcoal/55">vs last month</span>
        <span className="ml-auto text-charcoal/55">{periodLabel}: {currentPeriod}</span>
      </div>
    </article>
  );
}
