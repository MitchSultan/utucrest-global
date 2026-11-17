import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "recruitment",
    title: "Workforce Recruitment",
    slug: "recruitment",
    href: "/services/recruitment",
    outcome: "Ethically sourced, prepared talent for local and overseas employers.",
    description:
      "Strategic talent sourcing, screening, and placement across Kenya, Europe, the Middle East, and Asia with absolute transparency and candidate dignity.",
    icon: "users",
  },
  {
    id: "outsourcing",
    title: "Workforce Outsourcing",
    slug: "outsourcing",
    href: "/services/outsourcing",
    outcome: "Focus on your core business while we take total workforce accountability.",
    description:
      "Comprehensive employer-of-record solutions: recruitment, onboarding, payroll processing, statutory compliance (PAYE, NSSF, AHL, WIBA), and on-site staff supervision.",
    icon: "building",
  },
  {
    id: "readiness-training",
    title: "Worker Readiness & Preparation",
    slug: "training",
    href: "/training",
    outcome: "Transform raw talent into work-ready, confident employees.",
    description:
      "Specialized training modules covering cultural orientation, workplace ethics, financial literacy, emotional resilience for migration, and worker rights.",
    icon: "graduation-cap",
  },
  {
    id: "talent-advisory",
    title: "HR Consulting & Compliance",
    slug: "talent-advisory",
    href: "/services/talent-advisory",
    outcome: "Mitigate hiring risks and ensure total regulatory alignment.",
    description:
      "HR compliance audits, labor law alignment, contract structuring, performance management systems, and workforce planning advisory.",
    icon: "compass",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
