import { InquiryForm } from "@/components/sections/InquiryForm";
import { PageHero } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Contact UtuCrest Global Workforce",
  description:
    "Connect with our workforce advisory team in Nairobi, Kenya. Discuss hiring needs, candidate opportunities, or institutional partnerships.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact UtuCrest"
        title="Let’s talk about what comes next."
        description="Whether you are an employer looking to outsource workforce operations, a professional exploring new horizons, or an institutional partner—we are ready to assist you."
      />

      <section className="bg-mist/40 py-16 md:py-24">
        <div className="container-site grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-8">
            <div>
              <p className="eyebrow text-deep-teal">Headquarters</p>
              <h2 className="font-display mt-2 text-2xl font-bold text-ink">
                UtuCrest Global Workforce
              </h2>
              <p className="mt-2 text-sm text-charcoal/80 leading-relaxed">
                {siteConfig.contact.headquarters}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                  Worker Helpline & WhatsApp
                </span>
                <p className="mt-1 text-base font-semibold text-deep-teal">
                  <a href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`} className="hover:underline">
                    {siteConfig.contact.phone}
                  </a>
                </p>
                <p className="mt-1 text-xs text-charcoal/60">
                  Call or WhatsApp · 24-hour response turnaround
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                  Official Email
                </span>
                <p className="mt-1 text-base font-semibold text-deep-teal">
                  <a href={`mailto:${siteConfig.contact.email}`} className="hover:underline">
                    {siteConfig.contact.email}
                  </a>
                </p>
                <p className="mt-1 text-xs text-charcoal/60">
                  For RFPs, enterprise inquiries, and official correspondence
                </p>
              </div>

              <div className="rounded-xl border border-border bg-white p-5 shadow-2xs">
                <span className="text-xs font-bold uppercase tracking-wider text-charcoal/60">
                  Working Hours
                </span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  Monday – Friday: 8:00 AM – 5:00 PM EAT
                </p>
                <p className="mt-1 text-xs text-charcoal/60">
                  Emergency candidate welfare support available 24/7
                </p>
              </div>
            </div>
          </div>

          <InquiryForm variant="general" />
        </div>
      </section>
    </>
  );
}
