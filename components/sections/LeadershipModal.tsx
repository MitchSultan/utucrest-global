"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { Quote, CheckCircle2, Briefcase } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { LinkButton } from "@/components/ui/LinkButton";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { LeadershipMember } from "@/content/site";

// Register useGSAP plugin
gsap.registerPlugin(useGSAP);

export interface LeadershipModalProps {
  member: LeadershipMember | null;
  isOpen: boolean;
  onClose: () => void;
  sourceElement: HTMLElement | null;
}

export function LeadershipModal({
  member,
  isOpen,
  onClose,
  sourceElement,
}: LeadershipModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [imgError, setImgError] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const dialogImageContainerRef = useRef<HTMLDivElement>(null);
  const flyingImageRef = useRef<HTMLDivElement>(null);

  // Animate Exit with GSAP (smooth transition back to original UI card)
  const handleRequestClose = useCallback(() => {
    if (isClosing) return;
    setIsClosing(true);

    const dialogImgContainer = dialogImageContainerRef.current;
    const flyingImg = flyingImageRef.current;

    // If missing transition elements, close immediately
    if (!dialogImgContainer || !flyingImg || !sourceElement) {
      if (sourceElement) gsap.set(sourceElement, { opacity: 1 });
      setIsClosing(false);
      onClose();
      return;
    }

    // Get current positions of source card image and dialog image
    const currentSourceRect = sourceElement.getBoundingClientRect();
    const currentTargetRect = dialogImgContainer.getBoundingClientRect();

    // Hide dialog image and show flying clone at current dialog image position
    gsap.set(dialogImgContainer, { visibility: "hidden" });
    gsap.set(flyingImg, {
      display: "block",
      position: "fixed",
      top: currentTargetRect.top,
      left: currentTargetRect.left,
      width: currentTargetRect.width,
      height: currentTargetRect.height,
      borderRadius: "0.75rem",
      zIndex: 99999,
      pointerEvents: "none",
    });

    const closeTl = gsap.timeline({
      onComplete: () => {
        // Restore original card image visibility
        if (sourceElement) {
          gsap.set(sourceElement, { opacity: 1 });
        }
        setIsClosing(false);
        onClose();
      },
    });

    // Flying image glides back into the exact card position in the UI in one smooth motion!
    closeTl.to(
      flyingImg,
      {
        top: currentSourceRect.top,
        left: currentSourceRect.left,
        width: currentSourceRect.width,
        height: currentSourceRect.height,
        borderRadius: "1rem",
        duration: 0.45,
        ease: "power3.inOut",
      },
      0
    );
  }, [isClosing, onClose, sourceElement]);

  // Handle shadcn openChange
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      handleRequestClose();
    }
  };

  // Animate Entrance with GSAP
  useGSAP(
    () => {
      if (!isOpen || !member || isClosing) return;

      const dialogImgContainer = dialogImageContainerRef.current;
      const flyingImg = flyingImageRef.current;

      if (!dialogImgContainer || !flyingImg) return;

      // 1. Calculate Source & Target Rectangles
      let startRect = sourceElement
        ? sourceElement.getBoundingClientRect()
        : null;

      // Fallback if sourceElement is not available or offscreen
      if (!startRect || startRect.width === 0 || startRect.height === 0) {
        startRect = {
          left: window.innerWidth / 2 - 120,
          top: window.innerHeight / 2 - 120,
          width: 240,
          height: 240,
          right: window.innerWidth / 2 + 120,
          bottom: window.innerHeight / 2 + 120,
          x: window.innerWidth / 2 - 120,
          y: window.innerHeight / 2 - 120,
          toJSON: () => {},
        };
      }

      const targetRect = dialogImgContainer.getBoundingClientRect();

      // Temporarily hide the card's original image to create seamless illusion of lifting off
      if (sourceElement) {
        gsap.set(sourceElement, { opacity: 0 });
      }

      // Hide target dialog image until the flying clone arrives
      gsap.set(dialogImgContainer, { visibility: "hidden" });

      // Initial state of flying image clone
      gsap.set(flyingImg, {
        display: "block",
        position: "fixed",
        top: startRect.top,
        left: startRect.left,
        width: startRect.width,
        height: startRect.height,
        borderRadius: "1rem",
        zIndex: 99999,
        pointerEvents: "none",
        boxShadow: "0 12px 36px rgba(0,0,0,0.28)",
      });

      // Timeline for smooth entrance
      const tl = gsap.timeline({
        onComplete: () => {
          // Reveal the static dialog image and hide flying transition clone
          gsap.set(dialogImgContainer, { visibility: "visible" });
          gsap.set(flyingImg, { display: "none" });
        },
      });

      // The Hero Transition: Leader image glides in one smooth motion!
      tl.to(
        flyingImg,
        {
          top: targetRect.top,
          left: targetRect.left,
          width: targetRect.width,
          height: targetRect.height,
          borderRadius: "0.75rem",
          duration: 0.5,
          ease: "power3.inOut",
        },
        0
      );
    },
    { dependencies: [isOpen, member], scope: containerRef }
  );

  if (!isOpen && !isClosing) return null;
  if (!member) return null;

  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div ref={containerRef}>
      {/* Floating Transition Image (Proxy for the smooth GSAP motion) */}
      <div
        ref={flyingImageRef}
        className="overflow-hidden bg-warm-ivory"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        {!imgError ? (
          <Image
            src={member.image}
            alt=""
            fill
            className="leadership-portrait object-cover object-top"
            sizes="600px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-deep-teal text-white font-display text-2xl font-bold">
            {initials}
          </div>
        )}
      </div>

      {/* Shadcn Dialog Component with Sticky / Fixed Footer */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent
          className="w-full max-w-[calc(100%-2rem)] sm:max-w-2xl md:max-w-3xl overflow-hidden rounded-2xl bg-white p-6 shadow-2xl border border-border"
          showCloseButton
        >
          {/* Dialog Header */}
          <DialogHeader className="pb-3 border-b border-border/70 pr-8">
            <span className="text-xs font-bold uppercase tracking-wider text-terracotta">
              {member.role}
            </span>
            <DialogTitle className="font-display mt-1 text-2xl sm:text-3xl font-bold text-ink">
              {member.name}
            </DialogTitle>
            <DialogDescription className="text-xs text-charcoal/70">
              Executive Director · UtuCrest Global Workforce Company Limited
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content Body with Sticky Footer Support */}
          <div className="-mx-6 max-h-[60vh] overflow-y-auto px-6 py-4 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Leader Image Target Container */}
              <div className="md:col-span-5">
                <div
                  ref={dialogImageContainerRef}
                  className="relative aspect-[4/5] w-full overflow-hidden rounded-xl border border-border shadow-md bg-warm-ivory"
                >
                  {!imgError ? (
                    <Image
                      src={member.image}
                      alt={`Portrait of ${member.name}`}
                      fill
                      className="leadership-portrait object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 360px"
                      onError={() => setImgError(true)}
                      priority
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center bg-deep-teal/10">
                      <div className="flex size-20 items-center justify-center rounded-full bg-deep-teal text-white font-display text-2xl font-bold shadow-sm">
                        {initials}
                      </div>
                    </div>
                  )}

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-60"
                    aria-hidden="true"
                  />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <span className="inline-flex items-center gap-1 rounded-full bg-white/20 backdrop-blur-xs px-2.5 py-0.5 text-[11px] font-semibold text-white">
                      <Briefcase className="size-3" aria-hidden="true" />
                      Executive Leadership
                    </span>
                  </div>
                </div>
              </div>

              {/* Leader Profile Bio & Details */}
              <div className="md:col-span-7 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                    Executive Profile
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/85 sm:text-base">
                    {member.fullBio || member.bio}
                  </p>
                </div>

                {member.expertise && member.expertise.length > 0 && (
                  <div className="pt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-deep-teal">
                      Key Areas of Leadership
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {member.expertise.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center gap-1 rounded-md bg-mist/60 px-2.5 py-1 text-xs font-medium text-charcoal border border-border"
                        >
                          <CheckCircle2
                            className="size-3 text-deep-teal"
                            aria-hidden="true"
                          />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {member.quote && (
                  <div className="rounded-xl border border-golden-sand/40 bg-warm-ivory p-4 mt-3">
                    <div className="flex items-start gap-2.5">
                      <Quote
                        className="size-4 shrink-0 text-golden-sand mt-0.5"
                        aria-hidden="true"
                      />
                      <p className="font-display text-xs sm:text-sm italic text-ink">
                        &ldquo;{member.quote}&rdquo;
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sticky / Fixed Footer with DialogClose Button */}
          <DialogFooter className="-mx-6 -mb-6 border-t border-border/80 bg-muted/40 p-4 flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-charcoal/60 hidden sm:block">
              UtuCrest Global Workforce · Elevating Talent with Dignity
            </p>
            <div className="flex items-center justify-end gap-2.5 w-full sm:w-auto">
              <DialogClose
                render={
                  <Button
                    variant="outline"
                    className="border-border hover:bg-mist cursor-pointer"
                  >
                    Close
                  </Button>
                }
              />
              <LinkButton
                href="/contact"
                size="sm"
                className="w-full sm:w-auto text-xs"
              >
                Executive Consultation
              </LinkButton>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
