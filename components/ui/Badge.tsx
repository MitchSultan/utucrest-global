import { cn } from "@/lib/utils";
import { type HTMLAttributes } from "react";

const variants = {
  default: "bg-mist text-ink",
  teal: "bg-deep-teal/10 text-deep-teal",
  terracotta: "bg-terracotta/10 text-terracotta",
  sand: "bg-golden-sand/20 text-ink",
  outline: "border border-border bg-transparent text-charcoal",
} as const;

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: keyof typeof variants;
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
