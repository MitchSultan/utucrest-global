"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { LoginState } from "@/app/login/types";
import { createClient } from "@/utils/supabase/server";

export async function login(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = formData.get("email")?.toString().trim().toLowerCase() || "";
  const password = formData.get("password")?.toString() || "";

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const supabase = createClient(await cookies());
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Email or password is incorrect." };
  }

  if (data.user.app_metadata?.role !== "admin") {
    await supabase.auth.signOut();
    return { error: "This account is not authorized to access the dashboard." };
  }

  redirect("/dashboard");
}

export async function logout() {
  const supabase = createClient(await cookies());
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error("Unable to sign out. Please try again.");
  redirect("/login");
}
