import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    id: "recruitment",
    title: "Recruitment",
    slug: "recruitment",
    href: "/services/recruitment",
    outcome: "Find the right people for the work that matters.",
    description:
      "We combine thoughtful sourcing, practical screening, and role-fit matching.",
    icon: "users",
  },
  {
    id: "outsourcing",
    title: "Outsourcing",
    slug: "outsourcing",
    href: "/services/outsourcing",
    outcome: "Scale your workforce with confidence.",
    description:
      "We support the people, processes, and administration that keep operations moving.",
    icon: "building",
  },
  {
    id: "talent-advisory",
    title: "Talent Advisory",
    slug: "talent-advisory",
    href: "/services/talent-advisory",
    outcome: "Make better workforce decisions.",
    description:
      "We help organizations understand talent needs, plan for growth, and build stronger teams.",
    icon: "compass",
  },
  {
    id: "training",
    title: "Training & Preparation",
    slug: "training",
    href: "/training",
    outcome: "Turn potential into readiness.",
    description:
      "We help candidates build the confidence, skills, and workplace knowledge needed to take their next step.",
    icon: "graduation-cap",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
