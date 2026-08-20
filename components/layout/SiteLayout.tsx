import { AnnouncementStrip } from "@/components/layout/AnnouncementStrip";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LinkButton } from "@/components/ui/LinkButton";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-deep-teal focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      <AnnouncementStrip />
      <SiteHeader />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter />

      {/* Sticky mobile action bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-white/95 p-3 backdrop-blur-md md:hidden">
        <div className="flex gap-2">
          <LinkButton href="/jobs" size="sm" className="flex-1">
            Find jobs
          </LinkButton>
          <LinkButton href="/employers" variant="secondary" size="sm" className="flex-1">
            Hire talent
          </LinkButton>
        </div>
      </div>
      <div className="h-16 md:hidden" aria-hidden="true" />
    </>
  );
}
