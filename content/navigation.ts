import type { NavItem } from "@/lib/types";

export const mainNavigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Solutions",
    href: "/services",
    children: [
      {
        label: "Workforce Recruitment",
        href: "/services/recruitment",
        description: "Ethical talent sourcing locally and globally",
      },
      {
        label: "Workforce Outsourcing",
        href: "/services/outsourcing",
        description: "Full lifecycle employer-of-record management",
      },
      {
        label: "Worker Readiness & Training",
        href: "/training",
        description: "Orientation, conduct, and resilience coaching",
      },
      {
        label: "HR Consulting & Compliance",
        href: "/services/talent-advisory",
        description: "Audits, contracts, and regulatory alignment",
      },
    ],
  },
  { label: "For Employers", href: "/employers" },
  { label: "For Candidates", href: "/candidates" },
  { label: "Impact & Safeguards", href: "/impact" },
];

export const footerNavigation = {
  solutions: [
    { label: "Workforce Recruitment", href: "/services/recruitment" },
    { label: "Workforce Outsourcing", href: "/services/outsourcing" },
    { label: "Worker Readiness & Training", href: "/training" },
    { label: "HR Consulting & Advisory", href: "/services/talent-advisory" },
  ],
  audiences: [
    { label: "For Employers", href: "/employers" },
    { label: "For Candidates", href: "/candidates" },
    { label: "Submit CV / Talent Pool", href: "/candidates#talent-pool" },
    { label: "Browse Current Jobs", href: "/jobs" },
    { label: "Safeguards & Protection", href: "/impact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Leadership Team", href: "/leadership" },
    { label: "Insights & Articles", href: "/insights" },
    { label: "Contact & Helpline", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
