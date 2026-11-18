import { notFound } from "next/navigation";
import { JobDetailClient } from "@/components/sections/JobDetailClient";
import { createMetadata } from "@/lib/metadata";
import { getPublicJobs } from "@/lib/public-content";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = (await getPublicJobs()).find((item) => item.slug === slug);
  if (!job) return {};

  return createMetadata({
    title: job.title,
    description: job.summary,
    path: `/jobs/${slug}`,
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const jobs = await getPublicJobs();
  const job = jobs.find((item) => item.slug === slug);

  if (!job) notFound();

  const relatedJobs = jobs
    .filter((item) => item.slug !== slug && item.sector === job.sector)
    .slice(0, 3);

  return <JobDetailClient job={job} relatedJobs={relatedJobs} />;
}
