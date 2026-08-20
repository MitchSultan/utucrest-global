import { notFound } from "next/navigation";
import { JobDetailClient } from "@/components/sections/JobDetailClient";
import { getJobBySlug, getRelatedJobs } from "@/content/jobs";
import { createMetadata } from "@/lib/metadata";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { jobs } = await import("@/content/jobs");
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);
  if (!job) return {};

  return createMetadata({
    title: job.title,
    description: job.summary,
    path: `/jobs/${slug}`,
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(slug);

  return <JobDetailClient job={job} relatedJobs={relatedJobs} />;
}
