import type { TrustItem, ProcessStep, Value } from "@/lib/types";

export const trustItems: TrustItem[] = [
  {
    title: "Speed",
    description:
      "Rapid deployment of job-ready personnel to keep your operational engines running without pause.",
    icon: "sparkles",
  },
  {
    title: "Integrity",
    description:
      "Zero candidate placement fees, fully transparent commercial terms, and statutory NEA compliance.",
    icon: "shield",
  },
  {
    title: "Prepared Talent",
    description:
      "Comprehensive cultural, ethical, and professional work-readiness training before day one.",
    icon: "award",
  },
  {
    title: "Local & Global Reach",
    description:
      "Deep Kenyan sourcing capabilities paired with international corridors into Europe, the Middle East, and Asia.",
    icon: "globe",
  },
];

export const candidateProcess: ProcessStep[] = [
  {
    title: "Ethical Sourcing & Registration",
    description: "Submit your profile and CV into our verified talent pool with zero recruitment fees.",
  },
  {
    title: "Work-Readiness Preparation",
    description: "Receive practical conduct coaching, orientation, and role-aligned expectations training.",
  },
  {
    title: "Transparent Matching",
    description: "Interview with vetted employers offering clear contracts, fair wages, and legitimate visas.",
  },
  {
    title: "Deployment & Welfare Support",
    description: "Begin work with structured onboarding and ongoing access to our dedicated worker helpline.",
  },
];

export const employerProcess: ProcessStep[] = [
  {
    title: "Needs Assessment",
    description: "We analyze your exact role profiles, headcount targets, timelines, and operational KPIs.",
  },
  {
    title: "Talent Sourcing & Screening",
    description: "Rigorous vetting of candidate qualifications, soft skills, and regulatory documentation.",
  },
  {
    title: "Onboarding & Deployment",
    description: "Structured induction, statutory alignment, and smooth workforce integration into your facilities.",
  },
  {
    title: "Ongoing Supervision & Compliance",
    description: "Continuous oversight, KPI tracking, payroll administration, and replacement continuity.",
  },
];

export const employerOnboardingSteps = [
  {
    step: "Step 1",
    title: "Engagement & Contracting",
    description: "Agreement on commercial scope, SLAs, and execution of the workforce service agreement.",
  },
  {
    step: "Step 2",
    title: "Client Needs Assessment",
    description: "Granular audit of roles, required skill competencies, numbers, shift rotations, and operational standards.",
  },
  {
    step: "Step 3",
    title: "Workforce Planning & KPIs",
    description: "Definition of job descriptions, responsibilities matrix (Client vs UtuCrest), and timeline alignment.",
  },
  {
    step: "Step 4",
    title: "Talent Sourcing & Selection",
    description: "Candidate sourcing, in-depth screening, skill verification, and presentation of top candidates.",
  },
  {
    step: "Step 5",
    title: "Onboarding & Induction",
    description: "Employee contract signing, code of conduct orientation, and workplace health and safety induction.",
  },
  {
    step: "Step 6",
    title: "Deployment & Workforce Management",
    description: "Active placement, dedicated on-site or roving supervision, and performance oversight.",
  },
  {
    step: "Step 7",
    title: "Partnership & Continuous Improvement",
    description: "Periodic operational reviews, stakeholder feedback, performance reporting, and service optimization.",
  },
];

export const commercialModel = {
  fee: "30% Management Fee",
  base: "Applied on Total Direct Employee Costs",
  directCosts: [
    "Basic salary",
    "Overtime (where applicable)",
    "Statutory deductions & contributions (PAYE, NSSF, Housing Levy / AHL)",
    "Leave pay & statutory public holiday pay",
    "WIBA (Work Injury Benefits Act cover)",
    "Relief staff and backfill coverage",
    "Uniforms, specialized tools, and PPE",
    "Medical insurance cover (where required)",
  ],
  managementFeeCovers: [
    "End-to-end workforce recruitment and talent pipeline management",
    "Full payroll administration, tax deductions, and statutory compliance",
    "Day-to-day employee supervision and operational performance oversight",
    "Complete legal, labor-law, and regulatory compliance accountability",
    "Employee relations, grievance resolution, and disciplinary management",
    "Workforce continuity guarantee with rapid backup replacement",
  ],
};

export const utuCrestExperience = [
  {
    number: "01",
    title: "Assurance",
    description:
      "Confidence in a transparent, professionally managed recruitment and outsourcing process built on respect.",
  },
  {
    number: "02",
    title: "Hope",
    description:
      "Access to life-changing career opportunities that improve livelihoods and open new sustainable possibilities.",
  },
  {
    number: "03",
    title: "Trust",
    description:
      "Reliable relationships anchored in honesty, regulatory accountability, and uncompromised ethical conduct.",
  },
  {
    number: "04",
    title: "Freedom",
    description:
      "Dignified work that empowers individuals and families to build secure, prosperous futures locally and globally.",
  },
];

export const dignityPractices = [
  "Zero candidate placement or recruitment fees—employers carry commercial costs",
  "Full contract transparency in a language the worker understands before signing",
  "No confiscation or holding of personal passports, national IDs, or certificates",
  "24/7 dedicated worker welfare helpline and rapid grievance logging (+254 713 448 062)",
  "Pre-departure readiness training encompassing financial literacy and worker rights",
  "Direct liaison with destination missions and National Employment Authority (NEA)",
];

export const companyValues: Value[] = [
  {
    title: "Dignity",
    description:
      "Every worker deserves respect, fairness, and humane treatment in the workplace, regardless of tier or location.",
  },
  {
    title: "Integrity",
    description:
      "We commit to ethical recruitment practices, honest communication, and fully transparent business conduct.",
  },
  {
    title: "Empowerment",
    description:
      "Employment should elevate individuals, families, and communities through sustainable earning and career dignity.",
  },
  {
    title: "Professional Excellence",
    description:
      "We deliver dependable, compliant, and high-quality workforce outsourcing solutions to employers and partners.",
  },
  {
    title: "Advocacy",
    description:
      "We seek to actively influence responsible labour standards, migrant worker protections, and ethical employment policy.",
  },
];

export const talentBands = [
  {
    name: "Semi-Skilled",
    roles: "Warehouse associates, general operatives, hospitality assistants, construction crew",
    description: "Dependable, vetted individuals equipped with essential workplace discipline and safety standards.",
  },
  {
    name: "Skilled",
    roles: "Customer support, administrative specialists, logistics coordinators, sales reps",
    description: "Experienced communicators and operational coordinators ready for rapid productivity.",
  },
  {
    name: "Technical",
    roles: "Electricians, mechanics, technicians, facility supervisors, IT technicians",
    description: "Certified and trade-tested technical specialists trained in rigorous quality protocols.",
  },
  {
    name: "Professional",
    roles: "Healthcare clinicians, software engineers, accountants, HR consultants",
    description: "University-educated, licensed practitioners ready for high-impact organizational leadership.",
  },
];

export const industriesServed = [
  "FMCG",
  "Hospitality",
  "Construction",
  "Healthcare",
  "Business Process Services (BPS)",
  "Technical and Skilled Trades",
  "Oil & Gas",
  "Banking and Finance",
  "Start-ups & Growing Enterprises",
];
