import { cn } from "@/lib/utils";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { TextReveal } from "@/components/ui/TextReveal";

export interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "mb-3 text-sm font-semibold uppercase tracking-wider",
            dark ? "text-golden-sand" : "text-deep-teal",
          )}
        >
          {eyebrow}
        </p>
      )}
      <TextReveal
        as="h2"
        text={title}
        trigger="scroll"
        className={cn(
          "font-display text-balance text-3xl font-semibold tracking-tight md:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      />
      {description && (
        <ScrollReveal
          as="p"
          className={cn(
            "mt-4 text-lg leading-relaxed",
            dark ? "text-mist" : "text-charcoal/80",
          )}
        >
          {description}
        </ScrollReveal>
      )}
    </div>
  );
}
