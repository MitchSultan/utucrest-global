"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import { LeadershipModal } from "@/components/sections/LeadershipModal";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadershipTeam, type LeadershipMember } from "@/content/site";

export interface LeadershipCarouselProps {
  members?: LeadershipMember[];
}

export function LeadershipCarousel({
  members = leadershipTeam,
}: LeadershipCarouselProps) {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});
  const [selectedMember, setSelectedMember] = useState<LeadershipMember | null>(
    null,
  );
  const [sourceElement, setSourceElement] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const memberImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpenModal = (member: LeadershipMember, index: number) => {
    setSourceElement(memberImageRefs.current[index]);
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleImageError = (index: number) => {
    setImageErrors((previous) => ({ ...previous, [index]: true }));
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();

  return (
    <section
      className="border-y border-border bg-mist/30 py-16 md:py-24"
      aria-label="Leadership and governance"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow="Leadership & Governance"
          title="Our Leadership Team"
          description="Guiding UtuCrest with decades of combined leadership in human resource management, corporate strategy, and ethical labor advocacy."
          className="mb-12"
        />

        <ResponsiveCarousel
          label="Leadership members"
          className="md:grid-cols-2 lg:grid-cols-2"
        >
          {members.map((member, index) => (
            <article
              key={member.name}
              className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition-all duration-300 hover:border-deep-teal/40 hover:shadow-sm"
            >
              <div>
                <div
                  ref={(element) => {
                    memberImageRefs.current[index] = element;
                  }}
                  className="relative aspect-[4/5] w-full overflow-hidden bg-warm-ivory"
                >
                  {!imageErrors[index] ? (
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="leadership-portrait object-cover object-top transition filter-grayscale duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={() => handleImageError(index)}
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-deep-teal/10 text-deep-teal">
                      <div className="flex size-20 items-center justify-center rounded-full bg-deep-teal font-display text-2xl font-bold text-white shadow-sm">
                        {getInitials(member.name)}
                      </div>
                    </div>
                  )}
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40"
                    aria-hidden="true"
                  />
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-deep-teal shadow-xs backdrop-blur-xs">
                      <User className="size-3" aria-hidden="true" />
                      Director
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                    {member.role}
                  </p>
                  <h3 className="font-display mt-2 text-2xl font-semibold text-ink transition-colors group-hover:text-deep-teal">
                    {member.name}
                  </h3>
                  <div className="mt-4 border-t border-border/70 pt-4">
                    <p className="text-sm line-clamp-3 leading-relaxed text-charcoal/85">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0 sm:p-7 sm:pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenModal(member, index)}
                  className=" inline-flex w-full items-start justify-start gap-2 rounded-lg  px-4 py-2.5 text-sm font-semibold text-deep-teal    hover:text-deep-teal/80 focus:outline-hidden focus:ring-2 focus:ring-deep-teal"
                >
                  <span>Learn More</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover/btn:translate-x-4"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </ResponsiveCarousel>
      </div>

      <LeadershipModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        sourceElement={sourceElement}
      />
    </section>
  );
}
