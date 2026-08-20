import type { Story } from "@/lib/types";

export const stories: Story[] = [
  {
    id: "candidate-story-amara",
    type: "candidate",
    label: "Candidate story",
    title: "From preparation to a role she was ready for",
    challenge:
      "Amara had strong administrative experience but lacked confidence in structured interviews and was unsure how to present her skills for a logistics role.",
    intervention:
      "Utu Crest guided her through interview preparation, helped refine her CV for the specific role, and matched her with an employer who valued reliability over credentials alone.",
    outcome:
      "She joined a regional logistics firm as an administrative assistant and received structured onboarding support. Six months later, she was coordinating dispatch schedules independently.",
    quote:
      "I wasn't just sent to an interview—I understood the role, the expectations, and what I needed to prepare.",
    personName: "Amara K.",
    personRole: "Administrative Assistant, Logistics",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
    imageAlt:
      "Professional woman in a modern office environment — prototype placeholder image",
  },
  {
    id: "employer-story-tech",
    type: "employer",
    label: "Employer perspective",
    title: "Scaling a customer team without compromising quality",
    challenge:
      "A growing technology company needed to expand customer support capacity quickly but had experienced early attrition from rushed hiring.",
    intervention:
      "Utu Crest worked with the HR team to define role outcomes, implemented a structured screening process, and provided candidates with pre-start preparation on product basics.",
    outcome:
      "The first cohort of hires reached productivity benchmarks two weeks ahead of the previous cycle. The employer extended the partnership to additional roles.",
    quote:
      "[Add approved employer testimonial when available]",
    personName: "[Employer contact name]",
    personRole: "HR Lead, Technology sector",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80",
    imageAlt:
      "HR professional in conversation with a colleague — prototype placeholder image",
  },
];

export function getFeaturedStory(): Story {
  return stories[0];
}

export function getStoryById(id: string): Story | undefined {
  return stories.find((s) => s.id === id);
}
