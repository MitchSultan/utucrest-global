"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export interface ActivityPoint {
  week: string;
  applications: number;
  accepted: number;
}

export interface CategoryPoint {
  name: string;
  count: number;
}

const categoryColors = ["#08745b", "#c46a4b", "#d4ad60", "#4d8ca0", "#7869ad", "#829274"];

const tooltipStyle = {
  backgroundColor: "var(--admin-surface)",
  border: "1px solid var(--admin-border)",
  borderRadius: "10px",
  color: "var(--ink)",
  boxShadow: "var(--admin-shadow)",
};

export function ApplicationActivityChart({ data }: { data: ActivityPoint[] }) {
  return (
    <div
      role="img"
      aria-label="Weekly application activity over the last 12 weeks, including submitted and accepted applications"
      className="h-[280px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, bottom: 0, left: -18 }}>
          <defs>
            <linearGradient id="applicationFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#08745b" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#08745b" stopOpacity={0.01} />
            </linearGradient>
            <linearGradient id="acceptedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c46a4b" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#c46a4b" stopOpacity={0.01} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="var(--admin-border)" strokeDasharray="3 5" />
          <XAxis
            dataKey="week"
            axisLine={false}
            tickLine={false}
            tickMargin={10}
            minTickGap={18}
            tick={{ fill: "var(--charcoal)", fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "var(--charcoal)", fontSize: 11 }}
          />
          <Tooltip contentStyle={tooltipStyle} />
          <Area
            type="monotone"
            dataKey="applications"
            name="Applications"
            stroke="#08745b"
            strokeWidth={2.5}
            fill="url(#applicationFill)"
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
          <Area
            type="monotone"
            dataKey="accepted"
            name="Accepted"
            stroke="#c46a4b"
            strokeWidth={2}
            fill="url(#acceptedFill)"
            activeDot={{ r: 4, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function JobsByCategoryChart({
  data,
  total,
}: {
  data: CategoryPoint[];
  total: number;
}) {
  if (!data.length) {
    return (
      <div className="flex h-[250px] items-center justify-center text-sm text-charcoal/60">
        No published jobs to group yet.
      </div>
    );
  }

  return (
    <div className="grid items-center gap-3 sm:grid-cols-[minmax(160px,1fr)_minmax(0,1.1fr)]">
      <div
        role="img"
        aria-label={`Published jobs by category. ${data.map((item) => `${item.name}: ${item.count}`).join("; ")}`}
        className="relative mx-auto h-[210px] w-full max-w-[230px]"
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="name"
              innerRadius="67%"
              outerRadius="92%"
              paddingAngle={3}
              stroke="none"
            >
              {data.map((item, index) => (
                <Cell key={item.name} fill={categoryColors[index % categoryColors.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[10px] font-medium uppercase tracking-wide text-charcoal/55">Total live</span>
          <span className="mt-0.5 text-2xl font-semibold tabular-nums text-ink">{total.toLocaleString()}</span>
        </div>
      </div>
      <ul className="space-y-2.5">
        {data.map((item, index) => (
          <li key={item.name} className="flex items-center justify-between gap-2 text-xs">
            <span className="flex min-w-0 items-center gap-2 text-charcoal/75">
              <span className="size-2 shrink-0 rounded-full" style={{ backgroundColor: categoryColors[index % categoryColors.length] }} />
              <span className="truncate">{item.name}</span>
            </span>
            <span className="font-semibold tabular-nums text-ink">
              {item.count}
              <span className="ml-1 font-normal text-charcoal/50">{total ? `${Math.round((item.count / total) * 100)}%` : "0%"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
