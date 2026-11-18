import { cookies } from "next/headers";
import type { Insight, Job } from "@/lib/types";
import { insights as fallbackInsights } from "@/content/insights";
import { jobs as fallbackJobs } from "@/content/jobs";
import { createClient } from "@/utils/supabase/server";

function hasSupabaseConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}

function toJob(row: {
  slug: string;
  title: string;
  employer: string;
  sector_name: string;
  location: string;
  employment_type: Job["employmentType"];
  posted_date: string;
  summary: string;
  responsibilities: string[] | null;
  requirements: string[] | null;
  benefits: string[] | null;
  candidate_notes: string | null;
}): Job {
  return {
    slug: row.slug,
    title: row.title,
    employer: row.employer,
    sector: row.sector_name,
    location: row.location,
    employmentType: row.employment_type,
    postedDate: row.posted_date,
    summary: row.summary,
    responsibilities: row.responsibilities ?? [],
    requirements: row.requirements ?? [],
    benefits: row.benefits ?? [],
    candidateNotes: row.candidate_notes ?? undefined,
  };
}

function toInsight(row: {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  published_date: string | null;
  reading_time: number;
  author: string;
  created_at: string;
}): Insight {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    excerpt: row.excerpt,
    content: row.content,
    publishedDate: row.published_date ?? row.created_at.slice(0, 10),
    readingTime: row.reading_time,
    author: row.author,
  };
}

export async function getPublicJobs(): Promise<Job[]> {
  if (!hasSupabaseConfig()) return fallbackJobs;

  try {
    const supabase = createClient(await cookies());
    const { data, error } = await supabase
      .from("jobs")
      .select("slug, title, employer, sector_name, location, employment_type, posted_date, summary, responsibilities, requirements, benefits, candidate_notes")
      .eq("status", "published")
      .order("posted_date", { ascending: false });

    if (error) {
      console.error("Could not load published jobs:", error.message);
      return fallbackJobs;
    }

    return data?.length ? data.map(toJob) : fallbackJobs;
  } catch (error) {
    console.error("Could not connect to published jobs:", error);
    return fallbackJobs;
  }
}

export async function getPublicInsights(): Promise<Insight[]> {
  if (!hasSupabaseConfig()) return fallbackInsights;

  try {
    const supabase = createClient(await cookies());
    const { data, error } = await supabase
      .from("insights")
      .select("slug, title, category, excerpt, content, published_date, reading_time, author, created_at")
      .eq("status", "published")
      .order("published_date", { ascending: false });

    if (error) {
      console.error("Could not load published articles:", error.message);
      return fallbackInsights;
    }

    const published = data?.map(toInsight) ?? [];
    if (!published.length) return fallbackInsights;

    const databaseSlugs = new Set(published.map((insight) => insight.slug));
    return [...published, ...fallbackInsights.filter((insight) => !databaseSlugs.has(insight.slug))];
  } catch (error) {
    console.error("Could not connect to published articles:", error);
    return fallbackInsights;
  }
}
