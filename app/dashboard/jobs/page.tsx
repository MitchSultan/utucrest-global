import Link from "next/link";
import { JobEditor } from "@/components/dashboard/JobEditor";
import { requireAdmin } from "@/lib/admin";

export default async function DashboardJobsPage() {
  const { supabase } = await requireAdmin();
  const { data: jobs, error } = await supabase
    .from("jobs")
    .select("id, slug, title, employer, sector_name, location, employment_type, status, posted_date, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load dashboard jobs:", error.message);
    throw new Error("Jobs could not be loaded.");
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow text-deep-teal">Content</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Jobs</h1>
        <p className="mt-2 text-sm text-charcoal/70">Add vacancies and choose whether they are drafts or live on the website.</p>
      </header>
      <section>
        <h2 className="mb-4 text-xl font-semibold text-ink">Add a job</h2>
        <JobEditor />
      </section>
      <section className="admin-card overflow-hidden">
        <h2 className="border-b border-border px-5 py-4 font-semibold text-ink">Existing jobs</h2>
        {jobs?.length ? (
          <ul className="divide-y divide-border">
            {jobs.map((job) => (
              <li key={job.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-medium text-ink">{job.title}</p>
                  <p className="mt-1 text-sm text-charcoal/70">{job.employer} · {job.location} · {job.employment_type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium capitalize">{job.status}</span>
                  {job.status === "published" && (
                    <Link href={`/jobs/${job.slug}`} className="text-sm font-medium text-deep-teal hover:underline">
                      View
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-5 text-sm text-charcoal/70">No jobs yet.</p>
        )}
      </section>
    </div>
  );
}
