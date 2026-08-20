import type { Job } from "@/lib/types";

export const jobs: Job[] = [
  {
    slug: "customer-success-coordinator-nairobi",
    title: "Customer Success Coordinator",
    employer: "[Confidential employer]",
    sector: "Technology",
    location: "Nairobi, Kenya",
    employmentType: "Full-time",
    postedDate: "2026-08-01",
    summary:
      "Support client relationships and help customers get lasting value from a growing SaaS platform serving East African businesses.",
    responsibilities: [
      "Onboard new clients and guide them through product adoption",
      "Monitor account health and identify opportunities for support",
      "Coordinate with product and sales teams on client feedback",
      "Prepare weekly status updates for assigned accounts",
    ],
    requirements: [
      "1–3 years in customer support, account coordination, or a related role",
      "Strong written and spoken English; Swahili is a plus",
      "Comfortable working with CRM tools and structured workflows",
      "Demonstrated ability to listen, follow through, and solve problems",
    ],
    benefits: [
      "Competitive local salary with performance review cycle",
      "Hybrid working arrangement",
      "Structured onboarding and ongoing coaching",
    ],
    candidateNotes:
      "Utu Crest will guide you through preparation before your employer interview. Apply only if you can commit to a full-time schedule in Nairobi.",
  },
  {
    slug: "administrative-assistant-kamakis",
    title: "Administrative Assistant",
    employer: "Regional logistics firm",
    sector: "Logistics",
    location: "Kamakis, Kenya",
    employmentType: "Full-time",
    postedDate: "2026-07-28",
    summary:
      "Keep daily operations organized for a logistics team handling regional distribution and client coordination.",
    responsibilities: [
      "Manage scheduling, correspondence, and filing for the operations team",
      "Track inventory documentation and support dispatch coordination",
      "Prepare reports and assist with vendor communication",
      "Maintain accurate records for compliance and audit readiness",
    ],
    requirements: [
      "Diploma or certificate in business administration or equivalent experience",
      "Proficiency in Microsoft Office and basic accounting tools",
      "Reliable, detail-oriented, and comfortable in a fast-paced environment",
    ],
    benefits: [
      "Stable employment with clear reporting structure",
      "Transport allowance",
      "Opportunity to grow into operations support roles",
    ],
  },
  {
    slug: "registered-nurse-healthcare-partner",
    title: "Registered Nurse",
    employer: "[Healthcare partner — name on application]",
    sector: "Healthcare",
    location: "Nairobi, Kenya",
    employmentType: "Contract",
    postedDate: "2026-07-20",
    summary:
      "Join a healthcare provider focused on accessible outpatient care with structured shift planning and professional support.",
    responsibilities: [
      "Deliver patient care in line with clinical protocols",
      "Maintain accurate patient records and handover notes",
      "Support health education and follow-up scheduling",
      "Collaborate with multidisciplinary care teams",
    ],
    requirements: [
      "Valid nursing registration in Kenya",
      "Minimum 2 years of clinical experience",
      "Strong communication and documentation skills",
      "Willingness to work rotating shifts as required",
    ],
    benefits: [
      "Competitive contract rates",
      "Professional indemnity support through employer",
      "Clear scope of work before contract start",
    ],
    candidateNotes:
      "This role is filled through Utu Crest's ethical placement process. Licensing verification is required before interview.",
  },
  {
    slug: "software-developer-remote-kenya",
    title: "Software Developer (Mid-Level)",
    employer: "Global fintech partner",
    sector: "Technology",
    location: "Remote, Kenya",
    employmentType: "Full-time",
    postedDate: "2026-07-15",
    summary:
      "Build and maintain payment infrastructure features for a product expanding across East Africa and select global markets.",
    responsibilities: [
      "Develop and review backend services in a modern TypeScript stack",
      "Collaborate with product and QA on feature delivery",
      "Participate in code reviews and documentation",
      "Support incident response within agreed on-call rotation",
    ],
    requirements: [
      "3+ years professional software development experience",
      "Strong experience with Node.js or similar backend frameworks",
      "Familiarity with cloud deployment and CI/CD workflows",
      "Clear written communication for distributed teams",
    ],
    benefits: [
      "USD-indexed compensation band",
      "Remote-first with quarterly team meetups",
      "Learning budget and mentorship from senior engineers",
    ],
  },
  {
    slug: "sales-representative-consumer-goods",
    title: "Sales Representative",
    employer: "Consumer goods distributor",
    sector: "Retail & FMCG",
    location: "Nairobi & Central Kenya",
    employmentType: "Full-time",
    postedDate: "2026-07-10",
    summary:
      "Drive retail relationships and territory growth for a established FMCG brand with structured sales support.",
    responsibilities: [
      "Manage assigned retail accounts and meet agreed sales targets",
      "Execute in-store activations and merchandising standards",
      "Report market feedback and competitor activity weekly",
      "Coordinate with logistics on order fulfillment",
    ],
    requirements: [
      "Proven field sales experience in FMCG or retail",
      "Valid driver's license and willingness to travel within territory",
      "Strong negotiation and relationship-building skills",
    ],
    benefits: [
      "Base salary plus commission structure",
      "Fuel and phone allowance",
      "Sales training and route planning support",
    ],
  },
  {
    slug: "hr-intern-workforce-program",
    title: "HR Intern — Workforce Program",
    employer: "Utu Crest Global Workforce",
    sector: "Human Resources",
    location: "Kamakis, Kenya",
    employmentType: "Internship",
    postedDate: "2026-08-05",
    summary:
      "Gain hands-on experience supporting candidate preparation, employer coordination, and ethical recruitment operations.",
    responsibilities: [
      "Assist with candidate communication and interview scheduling",
      "Support document verification and onboarding checklists",
      "Help maintain accurate records in the talent management system",
      "Contribute to training session logistics and feedback collection",
    ],
    requirements: [
      "Currently pursuing or recently completed a HR, business, or related degree",
      "Strong organizational skills and professional communication",
      "Interest in ethical workforce development and people-centered HR",
    ],
    benefits: [
      "Structured mentorship from senior workforce consultants",
      "Certificate of completion and reference on successful program",
      "Exposure to local and global placement workflows",
    ],
    candidateNotes:
      "This internship prioritizes learning and professional development. It does not guarantee full-time employment.",
  },
  {
    slug: "facility-supervisor-manufacturing",
    title: "Facility Supervisor",
    employer: "Manufacturing partner",
    sector: "Manufacturing",
    location: "Thika, Kenya",
    employmentType: "Full-time",
    postedDate: "2026-06-30",
    summary:
      "Oversee daily facility operations, safety compliance, and team coordination for a light manufacturing facility.",
    responsibilities: [
      "Supervise shift teams and ensure production schedules are met",
      "Enforce safety protocols and maintain incident logs",
      "Coordinate maintenance requests and inventory for essential supplies",
      "Report operational metrics to plant management",
    ],
    requirements: [
      "3+ years supervisory experience in manufacturing or industrial settings",
      "Understanding of workplace safety standards",
      "Ability to lead teams with clarity and respect",
    ],
    benefits: [
      "Competitive salary with overtime where applicable",
      "Safety equipment provided",
      "Pathway to operations management roles",
    ],
  },
];

export const jobSectors = [...new Set(jobs.map((j) => j.sector))].sort();
export const jobLocations = [...new Set(jobs.map((j) => j.location))].sort();

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export function getRelatedJobs(currentSlug: string, limit = 3): Job[] {
  const current = getJobBySlug(currentSlug);
  if (!current) return jobs.slice(0, limit);
  return jobs
    .filter((j) => j.slug !== currentSlug && j.sector === current.sector)
    .slice(0, limit);
}
