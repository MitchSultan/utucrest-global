"use server";

import { revalidatePath } from "next/cache";
import type { ContentActionState } from "@/components/dashboard/types";
import { getAdminContext } from "@/lib/admin";

function value(formData: FormData, key: string) {
  return formData.get(key)?.toString().trim() || "";
}

function toSlug(input: string) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function textList(input: string) {
  return input
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

export async function createJobAction(
  _previousState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const context = await getAdminContext();
  if (!context) return { error: "You must be signed in as an administrator." };

  const title = value(formData, "title");
  const slug = toSlug(value(formData, "slug") || title);
  const employer = value(formData, "employer");
  const sector = value(formData, "sector");
  const location = value(formData, "location");
  const summary = value(formData, "summary");
  const employmentType = value(formData, "employment_type");
  const status = value(formData, "status");

  if (!title || !slug || !employer || !sector || !location || !summary) {
    return { error: "Complete all required job fields." };
  }
  if (!["Full-time", "Part-time", "Contract", "Internship"].includes(employmentType)) {
    return { error: "Choose a valid employment type." };
  }
  if (!["draft", "published"].includes(status)) {
    return { error: "Choose draft or published status." };
  }

  const salaryMinValue = value(formData, "salary_min");
  const salaryMaxValue = value(formData, "salary_max");
  const salaryMin = salaryMinValue ? Number(salaryMinValue) : null;
  const salaryMax = salaryMaxValue ? Number(salaryMaxValue) : null;
  if (
    (salaryMin !== null && (!Number.isInteger(salaryMin) || salaryMin < 0)) ||
    (salaryMax !== null && (!Number.isInteger(salaryMax) || salaryMax < 0)) ||
    (salaryMin !== null && salaryMax !== null && salaryMin > salaryMax)
  ) {
    return { error: "Enter a valid salary range." };
  }

  const postedDate = value(formData, "posted_date") || new Date().toISOString().slice(0, 10);
  const closingDate = value(formData, "closing_date") || null;
  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(postedDate) ||
    (closingDate !== null && !/^\d{4}-\d{2}-\d{2}$/.test(closingDate)) ||
    (closingDate !== null && closingDate < postedDate)
  ) {
    return { error: "Enter valid job dates; the closing date cannot be before the posted date." };
  }
  const { error } = await context.supabase.from("jobs").insert({
    slug,
    title,
    employer,
    sector_name: sector,
    location,
    employment_type: employmentType,
    salary_min: salaryMin,
    salary_max: salaryMax,
    salary_currency: value(formData, "salary_currency") || "KES",
    posted_date: postedDate,
    closing_date: closingDate,
    summary,
    responsibilities: textList(value(formData, "responsibilities")),
    requirements: textList(value(formData, "requirements")),
    benefits: textList(value(formData, "benefits")),
    candidate_notes: value(formData, "candidate_notes") || null,
    status,
    is_featured: formData.get("is_featured") === "on",
  });

  if (error) {
    console.error("Could not create job:", error.message);
    return {
      error: error.code === "23505"
        ? "That URL slug is already in use."
        : "The job could not be saved. Check the database configuration and try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/jobs");
  revalidatePath("/jobs");
  revalidatePath(`/jobs/${slug}`);
  return { success: "Job saved." };
}

export async function createInsightAction(
  _previousState: ContentActionState,
  formData: FormData,
): Promise<ContentActionState> {
  const context = await getAdminContext();
  if (!context) return { error: "You must be signed in as an administrator." };

  const title = value(formData, "title");
  const slug = toSlug(value(formData, "slug") || title);
  const category = value(formData, "category");
  const excerpt = value(formData, "excerpt");
  const content = value(formData, "content");
  const author = value(formData, "author") || "Utu Crest Editorial";
  const status = value(formData, "status");
  const readingTime = Number(value(formData, "reading_time") || "5");

  if (!title || !slug || !category || !excerpt || !content) {
    return { error: "Complete all required article fields." };
  }
  if (!["draft", "published"].includes(status)) {
    return { error: "Choose draft or published status." };
  }
  if (!Number.isInteger(readingTime) || readingTime < 1 || readingTime > 120) {
    return { error: "Reading time must be between 1 and 120 minutes." };
  }

  const publishedDate =
    status === "published"
      ? value(formData, "published_date") || new Date().toISOString().slice(0, 10)
      : null;
  const coverImageUrl = value(formData, "cover_image_url");
  if (publishedDate && !/^\d{4}-\d{2}-\d{2}$/.test(publishedDate)) {
    return { error: "Enter a valid published date." };
  }
  if (coverImageUrl) {
    try {
      if (!["http:", "https:"].includes(new URL(coverImageUrl).protocol)) {
        return { error: "Cover image URL must use HTTP or HTTPS." };
      }
    } catch {
      return { error: "Enter a valid cover image URL." };
    }
  }
  const { error } = await context.supabase.from("insights").insert({
    slug,
    title,
    category,
    excerpt,
    content,
    author,
    reading_time: readingTime,
    cover_image_url: coverImageUrl || null,
    status,
    published_date: publishedDate,
  });

  if (error) {
    console.error("Could not create article:", error.message);
    return {
      error: error.code === "23505"
        ? "That URL slug is already in use."
        : "The article could not be saved. Check the database configuration and try again.",
    };
  }

  revalidatePath("/dashboard");
  revalidatePath("/dashboard/insights");
  revalidatePath("/insights");
  revalidatePath(`/insights/${slug}`);
  return { success: "Article saved." };
}
