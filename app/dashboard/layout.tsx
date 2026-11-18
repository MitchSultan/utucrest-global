import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { requireAdmin } from "@/lib/admin";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { user } = await requireAdmin();

  return <DashboardShell email={user.email ?? ""}>{children}</DashboardShell>;
}
