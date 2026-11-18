import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { PathAwareSiteLayout } from "@/components/layout/PathAwareSiteLayout";
import { LinkButton } from "@/components/ui/LinkButton";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <PathAwareSiteLayout
      header={<SiteHeader />}
      footer={<SiteFooter />}
      mobileActions={
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
      }
    >
      {children}
    </PathAwareSiteLayout>
  );
}
