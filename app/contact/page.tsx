import { InquiryForm } from "@/components/sections/InquiryForm";
import { PageHero } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact",
  description:
    "Talk with Utu Crest about hiring, candidate support, and workforce solutions.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s talk about what comes next."
        description="Tell us whether you are hiring, looking for work, or exploring a partnership. We will help you find the right next step."
      />
      <section className="bg-mist py-16 md:py-20">
        <div className="container-site grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Email
              </h2>
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="mt-2 inline-block text-deep-teal hover:underline"
              >
                {siteConfig.contact.email}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Phone
              </h2>
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-block text-deep-teal hover:underline"
              >
                {siteConfig.contact.phone}
              </a>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-ink">
                Office
              </h2>
              <p className="mt-2 text-charcoal/80">{siteConfig.contact.address}</p>
            </div>
          </div>
          <InquiryForm variant="general" />
        </div>
      </section>
    </>
  );
}
