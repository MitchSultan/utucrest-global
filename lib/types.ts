export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export type StoryType = "candidate" | "employer" | "impact";

export type InquiryVariant = "employer" | "candidate" | "partner" | "general";

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  href: string;
  outcome: string;
  description: string;
  icon: string;
}

export interface Job {
  slug: string;
  title: string;
  employer: string;
  sector: string;
  location: string;
  employmentType: EmploymentType;
  postedDate: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
  candidateNotes?: string;
}

export interface Insight {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  publishedDate: string;
  readingTime: number;
  author: string;
}

export interface Story {
  id: string;
  type: StoryType;
  label: string;
  title: string;
  challenge: string;
  intervention: string;
  outcome: string;
  quote?: string;
  personName: string;
  personRole: string;
  image: string;
  imageAlt: string;
}

export interface TrustItem {
  title: string;
  description: string;
  icon: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface ImpactMetric {
  label: string;
  value: string;
  isPlaceholder?: boolean;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
}

export interface Value {
  title: string;
  description: string;
}
