import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function getAdminContext() {
  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user || data.user.app_metadata?.role !== "admin") {
    return null;
  }

  return { supabase, user: data.user };
}

export async function requireAdmin() {
  const context = await getAdminContext();
  if (!context) redirect("/login");
  return context;
}
