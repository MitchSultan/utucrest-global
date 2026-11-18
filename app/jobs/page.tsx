import { JobsListing } from "@/components/sections/JobsListing";
import { createMetadata } from "@/lib/metadata";
import { getPublicJobs } from "@/lib/public-content";

export const metadata = createMetadata({
  title: "Job Opportunities",
  description:
    "Browse current job openings across Kenya and global markets. Ethical recruitment with preparation support.",
  path: "/jobs",
});

export default async function JobsPage() {
  const jobs = await getPublicJobs();
  return <JobsListing jobs={jobs} />;
}
