export const siteConfig = {
  name: "UtuCrest Global Workforce",
  shortName: "UtuCrest Global",
  legalName: "UtuCrest Global Workforce Company Limited",
  tagline: "Beyond Recruitment · Elevating Talent with Dignity",
  slogan: "Where opportunity meets dignity",
  description:
    "UtuCrest Global is a workforce solutions company committed to providing businesses with reliable, prepared, and ethically sourced talent. We partner with organizations to manage their workforce.",
  url: "https://www.utucrestglobal.co.ke",
  contact: {
    headquarters: "Elysee Plaza, First Floor, Kilimani, Nairobi, Kenya",
    address: "Elysee Plaza, 1st Floor, Kilimani, Nairobi",
    phone: "+254 713 448 062",
    helpline: "+254 713 448 062",
    whatsapp: "+254713448062",
    email: "info@utucrestglobal.co.ke",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/utucrest-global",
    twitter: "",
    facebook: "",
  },
  announcement:
    "UtuCrest Global Workforce: Elevating talent with dignity across Kenya and global markets.",
};

export const brandPrinciples = {
  core: "Elevating Talent with Dignity",
  tagline: "Beyond Recruitment",
  purpose:
    "We exist to bridge the gap between opportunity and talent. Our purpose is to enable businesses to thrive while empowering individuals to grow, earn, and work with dignity locally and globally.",
  vision:
    "To become a trusted global workforce platform that connects talent to dignified work opportunities while advocating for ethical labour practices and empowering workers to realise their full potential.",
  mission:
    "To elevate talent with dignity, creating sustainable employment opportunities locally and globally.",
  brandPromise: "Speed. Integrity. Prepared Talent.",
  trustStatement:
    "Speed · Integrity · Prepared Talent · Ethical Recruitment",
  closingStatement: "UtuCrest Global Workforce — where opportunity meets dignity.",
};

export interface LeadershipMember {
  name: string;
  role: string;
  bio: string;
  fullBio: string;
  image: string;
  expertise: string[];
  quote?: string;
}

export const leadershipTeam: LeadershipMember[] = [
  {
    name: "Josephine Macharia",
    role: "Director, Operations",
    bio: "Josephine Muthoni Macharia is a Human Resource leader with over 25 years of hands-on experience managing large and complex workforces across manufacturing and banking.",
    fullBio:
      "She has led HR operations for workforces of over 3,000 employees and understands what it takes to recruit, deploy, manage, and sustain staff at scale. Her experience spans highly operational environments as well as regulated sectors, giving her a practical understanding of compliance, efficiency, and workforce stability. At UtuCrest, she focuses on delivering end-to-end workforce outsourcing solutions, covering recruitment, onboarding, payroll administration, compliance, performance management, and employee relations. She works closely with clients to ensure their workforce is well managed, compliant, and aligned to business needs.",
    image:
      "/images/macharia.jpg",
    expertise: [
      "Workforce Operations",
      "Labor Compliance & NEA Regulations",
      "Large-Scale Staffing",
      "Worker Welfare Governance",
    ],
    quote: "True workforce excellence is only possible when human dignity is prioritized as the first and foundational metric.",
  },
  {
    name: "Judy Mwangi",
    role: "Director, Business Development",
    bio: "Extensive business development and enterprise sales leadership in the insurance sector; proven entrepreneur in consumer goods and retail products.",
    fullBio:
      "Judy Mwangi is a dynamic business development strategist and entrepreneur with an exceptional track record in enterprise client acquisition, strategic partnerships, and commercial growth. Having driven high-value corporate portfolios across the insurance and financial services sectors, Judy oversees UtuCrest's client engagement models and bilateral staffing agreements. She works directly with domestic and international enterprise partners to structure customized workforce solutions that solve operational bottlenecks while fiercely safeguarding fair recruitment principles.",
    image:
      "/images/judymwangi.jpg",
    expertise: [
      "Enterprise Solutions & Outsourcing",
      "Bilateral Staffing Partnerships",
      "Strategic Market Expansion",
      "Client Relationship Governance",
    ],
    quote: "We don't merely fill headcount; we build resilient, dependable talent partnerships that fuel sustainable commercial growth.",
  },
  {
    name: "Joyce Gituro",
    role: "Director, Communication and Brand Strategy",
    bio: "25+ years in media, executive communication, and broadcast leadership across Kenya's leading media houses, high-level corporate appointments, and strategic advisory.",
    fullBio:
      "Joyce Gituro is an iconic media executive, strategic communications consultant, and public advocate with over two decades of leadership at Kenya's premier broadcasting organizations (including Royal Media Services and Standard Media Group). At UtuCrest, Joyce leads corporate brand identity, stakeholder communications, and ethical recruitment advocacy. Her passion for human dignity and worker empowerment ensures that UtuCrest's voice resonates with clarity, trustworthiness, and compassion across both candidate communities and institutional platforms.",
    image:
      "/images/joyce.jpg",
    expertise: [
      "Strategic Communications & PR",
      "Ethical Advocacy & Public Affairs",
      "Brand Positioning & Governance",
      "Stakeholder Engagement",
    ],
    quote: "Communication built on truth, dignity, and empathy has the power to transform industries and elevate lives.",
  },
];

export const globalFootprint = [
  {
    region: "Kenya",
    role: "Headquarters & Local Operations",
    description: "Labour management, local recruitment, and workforce outsourcing across East Africa.",
    focus: "Local Sourcing & Placement",
  },
  {
    region: "Europe",
    role: "International Placement",
    description: "Bilateral ethical recruitment pipelines connecting prepared Kenyan professionals to European employers.",
    focus: "Healthcare, Tech & Trades",
  },
  {
    region: "Middle East",
    role: "International Placement",
    description: "Ethically governed workforce placement with comprehensive worker protection and transition support.",
    focus: "Hospitality, Logistics & Skilled Trades",
  },
  {
    region: "Asia",
    role: "International Placement",
    description: "Strategic talent partnerships matching specialized technical and professional expertise.",
    focus: "BPS & Technical Sectors",
  },
];

export const workerProtectionChecks = [
  {
    step: "01",
    title: "Verify the Employer",
    description:
      "Legal registration, physical premises, statutory authorization to hire, and genuine demand verified before any role is published.",
  },
  {
    step: "02",
    title: "Verify the Offer",
    description:
      "Comprehensive written contracts covering wage rates, working hours, accommodation, leave entitlements, and clear dispute mechanisms.",
  },
  {
    step: "03",
    title: "Prepare the Worker",
    description:
      "Pre-departure orientation in candidate's language, full contract explanation, worker rights education, and professional conduct coaching.",
  },
  {
    step: "04",
    title: "Deploy Lawfully",
    description:
      "Travel exclusively with verified work permits and complete National Employment Authority (NEA) clearance—never tourist or visit visas.",
  },
  {
    step: "05",
    title: "Continuous Follow-Up",
    description:
      "Post-arrival check-ins and an open 24/7 worker welfare helpline (+254 713 448 062) to address grievances immediately.",
  },
];

export const fairRecruitmentStandard = {
  headline: "Workers never pay to get a job.",
  employerCovers: [
    "Recruitment service fees",
    "Visa and legal work permit fees",
    "Air travel ticket and transit costs",
    "Pre-deployment medical examinations",
    "Required statutory onboarding clearances",
  ],
  workerCovers: [
    "Personal identity documents they retain independently (National ID, Passport)",
  ],
  clarification:
    "No job is ever offered in exchange for payment. All commercial charges are disclosed in writing before a candidate signs an offer.",
};
