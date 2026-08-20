import { JobsListing } from "@/components/sections/JobsListing";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Job Opportunities",
  description:
    "Browse current job openings across Kenya and global markets. Ethical recruitment with preparation support.",
  path: "/jobs",
});

export default function JobsPage() {
  return <JobsListing />;
}
