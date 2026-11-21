"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { ArrowRight, User } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LeadershipModal } from "@/components/sections/LeadershipModal";
import { leadershipTeam, type LeadershipMember } from "@/content/site";

export interface LeadershipSectionProps {
  members?: LeadershipMember[];
  eyebrow?: string;
  title?: string;
  description?: string;
  className?: string;
}

export function LeadershipSection({
  members = leadershipTeam,
  eyebrow = "Leadership",
  title = "Our Directors",
  description = "A founding leadership team with diverse expertise across operational HR, enterprise business development, and strategic communications.",
  className,
}: LeadershipSectionProps) {
  const [selectedMember, setSelectedMember] = useState<LeadershipMember | null>(
    null
  );
  const [sourceElement, setSourceElement] = useState<HTMLElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleOpenModal = (member: LeadershipMember, index: number) => {
    const el = imageRefs.current[index];
    setSourceElement(el);
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <section
      className={`bg-mist/40 py-16 md:py-24 border-y border-border ${className ?? ""}`}
      aria-labelledby="leadership-directors-heading"
    >
      <div className="container-site">
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="mb-12"
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          {members.map((leader, index) => (
            <article
              key={leader.name}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition-all duration-300 hover:border-deep-teal/40 hover:shadow-lg"
            >
              <div>
                {/* Image Container with ref for smooth GSAP transition */}
                <div
                  ref={(el) => {
                    imageRefs.current[index] = el;
                  }}
                  className="relative aspect-[4/3] w-full overflow-hidden bg-warm-ivory"
                >
                  {!imageErrors[index] ? (
                    <Image
                      src={leader.image}
                      alt={`Portrait of ${leader.name}`}
                      fill
                      className="leadership-portrait object-cover filter:grayscale(100%) object-top transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      onError={() =>
                        setImageErrors((prev) => ({ ...prev, [index]: true }))
                      }
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-deep-teal/10">
                      <div className="flex size-16 items-center justify-center rounded-full bg-deep-teal text-white font-display text-xl font-bold">
                        {getInitials(leader.name)}
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"
                    aria-hidden="true"
                  />

                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-xs px-2.5 py-1 text-[11px] font-semibold text-deep-teal shadow-xs">
                      <User className="size-3" aria-hidden="true" />
                      Director
                    </span>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-6">
                  <p className="text-xs font-bold uppercase tracking-wider text-terracotta">
                    {leader.role}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-semibold text-ink group-hover:text-deep-teal transition-colors">
                    {leader.name}
                  </h3>
                  <p className="mt-3 text-sm line-clamp-3 leading-relaxed text-charcoal/80  border-t border-border/70 pt-3">
                    {leader.bio}
                  </p>
                </div>
              </div>

              {/* Learn More Button */}
              <div className="p-6 pt-0">
                <button
                  type="button"
                  onClick={() => handleOpenModal(leader, index)}
                  className="inline-flex w-full items-start justify-start gap-2 rounded-lg  px-4 py-2.5 text-sm font-semibold text-deep-teal transition hover:bg-deep-teal hover:text-white focus:outline-hidden focus:ring-2 focus:ring-deep-teal shadow-2xs "
                >
                  <span>Learn More</span>
                  <ArrowRight
                    className="size-4 transition-transform group-hover/btn:translate-x-1"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* GSAP Powered Shared-Element Transition Modal */}
      <LeadershipModal
        member={selectedMember}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        sourceElement={sourceElement}
      />
    </section>
  );
}
