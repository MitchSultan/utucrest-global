import type { Insight } from "@/lib/types";

export const insights: Insight[] = [
  {
    slug: "prepare-for-global-opportunity",
    title: "How to prepare for a global opportunity",
    category: "Career readiness",
    excerpt:
      "A practical guide for candidates exploring international roles—covering documentation, interview preparation, and realistic expectations.",
    content: `
Global opportunities can open meaningful career pathways when approached with preparation and clarity. At Utu Crest, we guide candidates through a process that respects both ambition and reality.

**Start with readiness, not urgency.** Before applying abroad, confirm that your qualifications, documentation, and career goals align with the role and destination. Rushing into applications without preparation often leads to disappointment.

**Understand the role in context.** Research the employer, the work environment, and what success looks like in the first 90 days. Ask direct questions during screening—ethical recruiters welcome them.

**Prepare for structured interviews.** Practice clear examples of your work, prepare questions about support and onboarding, and be honest about your availability and constraints.

**Protect your dignity throughout.** You should never pay undisclosed fees, surrender original documents without receipt, or accept vague promises. Ethical placement means transparent communication at every step.

Utu Crest supports candidates with interview coaching, document checklists, and ongoing guidance. [Replace with verified program details when approved.]
    `.trim(),
    publishedDate: "2026-07-12",
    readingTime: 6,
    author: "Utu Crest Editorial",
  },
  {
    slug: "workforce-that-grows-with-business",
    title: "Building a workforce that can grow with your business",
    category: "Employer guide",
    excerpt:
      "Why workforce planning matters before you hire—and how to align recruitment, outsourcing, and advisory support.",
    content: `
Growing businesses often feel hiring pressure before they have clarity on what they actually need. The result: mismatched hires, repeated cycles, and teams that cannot scale.

**Map roles to outcomes.** Before posting a vacancy, define what the person will deliver in the first six months. Outcome-led hiring improves fit and reduces turnover.

**Choose the right workforce model.** Permanent recruitment, outsourced teams, and advisory support serve different needs. A blended approach often works best for scaling organizations.

**Invest in onboarding, not just selection.** The best match fails without structured induction, clear expectations, and manager support.

**Measure what matters.** Track time-to-productivity, retention, and quality of work—not just time-to-fill.

Utu Crest helps employers design workforce strategies that balance speed with sustainability. [Replace with verified case references when approved.]
    `.trim(),
    publishedDate: "2026-06-28",
    readingTime: 5,
    author: "Utu Crest Editorial",
  },
  {
    slug: "ethical-recruitment-in-practice",
    title: "What ethical recruitment looks like in practice",
    category: "Ethics & impact",
    excerpt:
      "Transparency, informed consent, and candidate dignity—the operational standards that separate ethical workforce partners from exploitative intermediaries.",
    content: `
Ethical recruitment is not a tagline. It is a set of daily decisions about how candidates and employers are treated.

**Transparent communication.** Candidates receive clear information about the role, compensation, location, and process before committing time or resources.

**No hidden fees.** Ethical partners do not charge candidates undisclosed placement fees or withhold documents as leverage.

**Realistic job representation.** Employers and recruiters share accurate role descriptions. Overselling opportunities damages trust and increases early attrition.

**Ongoing support.** Placement is a beginning, not an end. Follow-up after start date helps address challenges before they become failures.

**Accountability.** Organizations should be able to explain their process, document their standards, and respond when something goes wrong.

Utu Crest builds its operations around these principles. [Insert approved ethical recruitment policy link when available.]
    `.trim(),
    publishedDate: "2026-06-15",
    readingTime: 4,
    author: "Utu Crest Editorial",
  },
];

export function getInsightBySlug(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function getFeaturedInsights(limit = 3): Insight[] {
  return insights.slice(0, limit);
}
