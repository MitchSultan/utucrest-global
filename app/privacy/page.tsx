import { PageHero } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Privacy Notice",
  description: "How Utu Crest handles information shared through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Your information deserves careful handling."
        description="This website’s inquiry forms open a draft email in your own email application. Information is not submitted to or stored by this website."
      />
      <article className="container-site max-w-3xl space-y-8 py-12 text-charcoal/85 md:py-16">
        <section>
          <h2 className="text-xl font-semibold text-ink">When you contact us</h2>
          <p className="mt-3 leading-relaxed">
            If you choose to send an email, Utu Crest will receive the information included
            in that message and may use it to respond to your inquiry. Please do not include
            sensitive personal information unless it is needed for your request.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">Questions or requests</h2>
          <p className="mt-3 leading-relaxed">
            To ask about information you have sent by email, contact{" "}
            <a
              className="font-medium text-deep-teal hover:underline"
              href={`mailto:${siteConfig.contact.email}`}
            >
              {siteConfig.contact.email}
            </a>
            .
          </p>
        </section>
        <p className="border-t border-border pt-5 text-sm text-charcoal/65">
          Before connecting a CRM, analytics, or other data-collection service, this notice
          should be reviewed and updated to reflect the final production setup.
        </p>
      </article>
    </>
  );
}
