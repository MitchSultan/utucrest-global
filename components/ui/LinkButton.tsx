import Link from "next/link";
import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

const variants = {
  primary:
    "bg-deep-teal text-white hover:bg-deep-teal-hover shadow-sm",
  secondary:
    "bg-transparent text-ink border border-border hover:bg-mist",
  terracotta:
    "bg-terracotta text-white hover:bg-terracotta-hover shadow-sm",
  ghost: "bg-transparent text-ink hover:bg-mist",
  inverse:
    "bg-white text-ink hover:bg-warm-ivory shadow-sm",
  link: "bg-transparent text-deep-teal underline-offset-4 hover:underline p-0 h-auto",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
} as const;

export interface LinkButtonProps extends ComponentProps<typeof Link> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export function LinkButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: LinkButtonProps) {
  const isLink = variant === "link";

  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors duration-200",
        !isLink && variants[variant],
        !isLink && sizes[size],
        isLink && variants.link,
        className,
      )}
      {...props}
    />
  );
}
