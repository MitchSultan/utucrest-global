import {
  Globe,
  Handshake,
  Shield,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { TrustItem } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
  shield: Shield,
  sparkles: Sparkles,
  handshake: Handshake,
  globe: Globe,
};

export interface TrustBandProps {
  items: TrustItem[];
}

export function TrustBand({ items }: TrustBandProps) {
  return (
    <section className="border-y border-border bg-mist py-12 md:py-14" aria-label="Why trust Utu Crest">
      <div className="container-site">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => {
            const Icon = iconMap[item.icon] ?? Shield;
            return (
              <div key={item.title} className="text-center lg:text-left">
                <div className="mx-auto inline-flex rounded-lg bg-white p-2.5 text-deep-teal shadow-sm lg:mx-0">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/75">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
