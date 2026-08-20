import type { NavItem } from "@/lib/types";

export const mainNavigation: NavItem[] = [
  { label: "About", href: "/about" },
  {
    label: "Solutions",
    href: "/services",
    children: [
      {
        label: "Recruitment",
        href: "/services/recruitment",
        description: "Thoughtful sourcing and role-fit matching",
      },
      {
        label: "Outsourcing",
        href: "/services/outsourcing",
        description: "Scale your workforce with confidence",
      },
      {
        label: "Talent Advisory",
        href: "/services/talent-advisory",
        description: "Smarter workforce planning and strategy",
      },
      {
        label: "Training & Preparation",
        href: "/training",
        description: "Turn potential into readiness",
      },
    ],
  },
  { label: "For Employers", href: "/employers" },
  { label: "For Candidates", href: "/candidates" },
  { label: "Training", href: "/training" },
  { label: "Impact", href: "/impact" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNavigation = {
  solutions: [
    { label: "Recruitment", href: "/services/recruitment" },
    { label: "Outsourcing", href: "/services/outsourcing" },
    { label: "Talent Advisory", href: "/services/talent-advisory" },
    { label: "Training", href: "/training" },
  ],
  audiences: [
    { label: "For Employers", href: "/employers" },
    { label: "For Candidates", href: "/candidates" },
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Impact", href: "/impact" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};
