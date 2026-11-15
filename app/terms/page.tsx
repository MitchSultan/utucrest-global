import { PageHero } from "@/components/sections/FinalCTA";
import { siteConfig } from "@/content/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Terms of Use",
  description: "Important information about using the Utu Crest website.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms of use"
        title="Using this website."
        description="The information on this website is provided to help candidates and employers understand Utu Crest’s workforce services."
      />
      <article className="container-site max-w-3xl space-y-8 py-12 text-charcoal/85 md:py-16">
        <section>
          <h2 className="text-xl font-semibold text-ink">Opportunities and information</h2>
          <p className="mt-3 leading-relaxed">
            Job listings and service descriptions may change. Confirm role details,
            requirements, location, and terms directly with Utu Crest before making a
            decision. Applying or registering interest does not guarantee employment.
          </p>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-ink">Contact</h2>
          <p className="mt-3 leading-relaxed">
            If you have questions about this website, contact{" "}
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
          These terms should be reviewed for the operating jurisdiction and final business
          model before public launch.
        </p>
      </article>
    </>
  );
}
