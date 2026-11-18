import Link from "next/link";
import {
  ArrowRight,
  BookOpenText,
  BriefcaseBusiness,
  CalendarDays,
  CheckCheck,
  ClipboardList,
  FileText,
  Inbox,
  UserRound,
} from "lucide-react";
import { ApplicationActivityChart, JobsByCategoryChart } from "@/components/dashboard/OverviewCharts";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { requireAdmin } from "@/lib/admin";

const weekMilliseconds = 7 * 24 * 60 * 60 * 1000;

const applicationStages = [
  { label: "Applied", statuses: ["submitted"] },
  { label: "In review", statuses: ["under_review"] },
  { label: "Shortlisted", statuses: ["shortlisted"] },
  { label: "Interview", statuses: ["interview_scheduled", "interviewed"] },
  { label: "Offer", statuses: ["offered"] },
  { label: "Accepted", statuses: ["accepted"] },
  { label: "Closed / withdrawn", statuses: ["rejected", "withdrawn"] },
];

export default async function DashboardPage() {
  const { supabase } = await requireAdmin();
  const now = new Date();
  const monthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
  const nextMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1));
  const previousMonthStart = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - 1, 1));
  const activityStart = new Date(now);
  activityStart.setUTCDate(activityStart.getUTCDate() - 83);
  activityStart.setUTCHours(0, 0, 0, 0);

  const [
    liveJobs,
    jobsThisMonth,
    jobsLastMonth,
    applications,
    applicationsThisMonth,
    applicationsLastMonth,
    candidates,
    candidatesThisMonth,
    candidatesLastMonth,
    newInquiries,
    inquiriesThisMonth,
    inquiriesLastMonth,
    publishedArticles,
    articlesThisMonth,
    articlesLastMonth,
    draftJobs,
    registeredCandidates,
    activityRows,
    sectors,
    topJobs,
    recentInquiries,
  ] = await Promise.all([
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "published").gte("created_at", monthStart.toISOString()).lt("created_at", nextMonthStart.toISOString()),
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "published").gte("created_at", previousMonthStart.toISOString()).lt("created_at", monthStart.toISOString()),
    supabase.from("job_applications").select("id", { count: "exact", head: true }),
    supabase.from("job_applications").select("id", { count: "exact", head: true }).gte("applied_at", monthStart.toISOString()).lt("applied_at", nextMonthStart.toISOString()),
    supabase.from("job_applications").select("id", { count: "exact", head: true }).gte("applied_at", previousMonthStart.toISOString()).lt("applied_at", monthStart.toISOString()),
    supabase.from("candidates").select("id", { count: "exact", head: true }),
    supabase.from("candidates").select("id", { count: "exact", head: true }).gte("created_at", monthStart.toISOString()).lt("created_at", nextMonthStart.toISOString()),
    supabase.from("candidates").select("id", { count: "exact", head: true }).gte("created_at", previousMonthStart.toISOString()).lt("created_at", monthStart.toISOString()),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new").gte("created_at", monthStart.toISOString()).lt("created_at", nextMonthStart.toISOString()),
    supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new").gte("created_at", previousMonthStart.toISOString()).lt("created_at", monthStart.toISOString()),
    supabase.from("insights").select("id", { count: "exact", head: true }).eq("status", "published"),
    supabase.from("insights").select("id", { count: "exact", head: true }).eq("status", "published").gte("created_at", monthStart.toISOString()).lt("created_at", nextMonthStart.toISOString()),
    supabase.from("insights").select("id", { count: "exact", head: true }).eq("status", "published").gte("created_at", previousMonthStart.toISOString()).lt("created_at", monthStart.toISOString()),
    supabase.from("jobs").select("id", { count: "exact", head: true }).eq("status", "draft"),
    supabase.from("candidates").select("id", { count: "exact", head: true }).eq("status", "registered"),
    supabase.from("job_applications").select("applied_at, status").gte("applied_at", activityStart.toISOString()).order("applied_at", { ascending: true }),
    supabase.from("sectors").select("name").order("name"),
    supabase.from("jobs").select("id, slug, title, sector_name, location, status, view_count").eq("status", "published").order("view_count", { ascending: false }).limit(5),
    supabase.from("inquiries").select("id, name, type, subject, created_at").order("created_at", { ascending: false }).limit(6),
  ]);

  const initialResults = [
    liveJobs, jobsThisMonth, jobsLastMonth, applications, applicationsThisMonth,
    applicationsLastMonth, candidates, candidatesThisMonth, candidatesLastMonth,
    newInquiries, inquiriesThisMonth, inquiriesLastMonth, publishedArticles,
    articlesThisMonth, articlesLastMonth, draftJobs, registeredCandidates,
    activityRows, sectors, topJobs, recentInquiries,
  ];
  const initialErrors = initialResults
    .filter((result) => result.error)
    .map((result) => result.error?.message);
  if (initialErrors.length) {
    console.error("Could not load dashboard overview:", initialErrors);
    throw new Error("Dashboard data could not be loaded.");
  }

  const categoryCounts = await Promise.all(
    (sectors.data ?? []).map((sector) =>
      supabase
        .from("jobs")
        .select("id", { count: "exact", head: true })
        .eq("status", "published")
        .eq("sector_name", sector.name),
    ),
  );
  const topJobApplicationCounts = await Promise.all(
    (topJobs.data ?? []).map((job) =>
      supabase
        .from("job_applications")
        .select("id", { count: "exact", head: true })
        .eq("job_id", job.id),
    ),
  );
  const stageCounts = await Promise.all(
    applicationStages.map((stage) =>
      supabase
        .from("job_applications")
        .select("id", { count: "exact", head: true })
        .in("status", stage.statuses),
    ),
  );

  const secondaryErrors = [...categoryCounts, ...topJobApplicationCounts, ...stageCounts]
    .filter((result) => result.error)
    .map((result) => result.error?.message);
  if (secondaryErrors.length) {
    console.error("Could not load dashboard charts:", secondaryErrors);
    throw new Error("Dashboard charts could not be loaded.");
  }

  const activity = Array.from({ length: 12 }, (_, index) => {
    const weekStart = new Date(activityStart.getTime() + index * weekMilliseconds);
    return {
      week: new Intl.DateTimeFormat("en-KE", {
        month: "short",
        day: "numeric",
        timeZone: "Africa/Nairobi",
      }).format(weekStart),
      applications: 0,
      accepted: 0,
    };
  });

  for (const application of activityRows.data ?? []) {
    const week = Math.min(
      activity.length - 1,
      Math.max(0, Math.floor((new Date(application.applied_at).getTime() - activityStart.getTime()) / weekMilliseconds)),
    );
    activity[week].applications += 1;
    if (application.status === "accepted") activity[week].accepted += 1;
  }

  const categories = (sectors.data ?? [])
    .map((sector, index) => ({ name: sector.name, count: categoryCounts[index].count ?? 0 }))
    .filter((sector) => sector.count > 0)
    .sort((a, b) => b.count - a.count);
  const totalLiveJobs = liveJobs.count ?? 0;
  const topPerformingJobs = (topJobs.data ?? []).map((job, index) => ({
    ...job,
    applicationCount: topJobApplicationCounts[index].count ?? 0,
  }));
  const stages = applicationStages.map((stage, index) => ({
    ...stage,
    count: stageCounts[index].count ?? 0,
  }));

  const monthName = new Intl.DateTimeFormat("en-KE", {
    month: "long",
    year: "numeric",
    timeZone: "Africa/Nairobi",
  }).format(now);

  const metrics = [
    {
      label: "Published jobs",
      value: totalLiveJobs,
      icon: BriefcaseBusiness,
      currentPeriod: jobsThisMonth.count ?? 0,
      previousPeriod: jobsLastMonth.count ?? 0,
      accent: "teal" as const,
    },
    {
      label: "Applications",
      value: applications.count ?? 0,
      icon: ClipboardList,
      currentPeriod: applicationsThisMonth.count ?? 0,
      previousPeriod: applicationsLastMonth.count ?? 0,
      accent: "blue" as const,
    },
    {
      label: "Candidates",
      value: candidates.count ?? 0,
      icon: UserRound,
      currentPeriod: candidatesThisMonth.count ?? 0,
      previousPeriod: candidatesLastMonth.count ?? 0,
      accent: "violet" as const,
    },
    {
      label: "New inquiries",
      value: newInquiries.count ?? 0,
      icon: Inbox,
      currentPeriod: inquiriesThisMonth.count ?? 0,
      previousPeriod: inquiriesLastMonth.count ?? 0,
      accent: "terracotta" as const,
    },
    {
      label: "Published articles",
      value: publishedArticles.count ?? 0,
      icon: BookOpenText,
      currentPeriod: articlesThisMonth.count ?? 0,
      previousPeriod: articlesLastMonth.count ?? 0,
      accent: "sand" as const,
    },
  ];

  const actionItems = [
    { label: "Draft jobs to review", count: draftJobs.count ?? 0, href: "/dashboard/jobs", icon: BriefcaseBusiness },
    { label: "New inquiries", count: newInquiries.count ?? 0, href: "/dashboard/submissions", icon: Inbox },
    { label: "Registered candidates", count: registeredCandidates.count ?? 0, href: "/dashboard/submissions", icon: UserRound },
    { label: "Submitted applications", count: stages[0].count, href: "/dashboard/submissions", icon: ClipboardList },
  ];

  return (
    <div className="space-y-7">
      <header className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow text-deep-teal">Platform overview</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-ink sm:text-[1.8rem]">
            Your workforce platform, at a glance
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-charcoal/65">
            Live recruitment, content and inquiry activity for {monthName}.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/dashboard/jobs"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-deep-teal px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-deep-teal-hover"
          >
            <BriefcaseBusiness className="size-4" aria-hidden="true" />
            Post a job
          </Link>
          <Link
            href="/dashboard/submissions"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border bg-white px-4 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            <Inbox className="size-4" aria-hidden="true" />
            Review submissions
          </Link>
        </div>
      </header>

      <section aria-label="Platform statistics" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} periodLabel="This month" />
        ))}
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(340px,0.9fr)]">
        <article className="admin-card min-w-0 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-ink">Application activity</h3>
              <p className="mt-1 text-xs text-charcoal/60">Applications received and accepted · last 12 weeks</p>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full bg-mist px-3 py-1.5 text-xs font-medium text-charcoal/75">
              <CalendarDays className="size-3.5" aria-hidden="true" />
              12-week view
            </span>
          </div>
          <div className="mt-5">
            <ApplicationActivityChart data={activity} />
          </div>
          <div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 border-t border-border pt-4 text-xs text-charcoal/70">
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-deep-teal" />
              Applications
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="size-2 rounded-full bg-terracotta" />
              Accepted
            </span>
            <span className="ml-auto">Data from submitted application dates</span>
          </div>
        </article>

        <article className="admin-card min-w-0 p-5 sm:p-6">
          <div>
            <h3 className="font-semibold text-ink">Jobs by category</h3>
            <p className="mt-1 text-xs text-charcoal/60">Published vacancies across your sectors</p>
          </div>
          <div className="mt-4">
            <JobsByCategoryChart data={categories} total={totalLiveJobs} />
          </div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <article className="admin-card min-w-0 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-4 sm:px-6">
            <div>
              <h3 className="font-semibold text-ink">Top performing jobs</h3>
              <p className="mt-1 text-xs text-charcoal/60">Published vacancies ranked by total job views</p>
            </div>
            <Link href="/dashboard/jobs" className="inline-flex items-center gap-1 text-xs font-semibold text-deep-teal hover:underline">
              All jobs <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          {topPerformingJobs.length ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px] text-left text-sm">
                <thead className="bg-mist/50 text-[11px] uppercase tracking-wide text-charcoal/60">
                  <tr>
                    <th className="px-5 py-3 font-semibold sm:px-6">Job title</th>
                    <th className="px-4 py-3 font-semibold">Views</th>
                    <th className="px-4 py-3 font-semibold">Applications</th>
                    <th className="px-4 py-3 font-semibold">View-to-apply</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {topPerformingJobs.map((job) => {
                    const conversion = job.view_count > 0
                      ? ((job.applicationCount / job.view_count) * 100).toFixed(1)
                      : "0.0";
                    return (
                      <tr key={job.id} className="transition hover:bg-mist/30">
                        <td className="max-w-[260px] px-5 py-4 sm:px-6">
                          <Link href={`/jobs/${job.slug}`} className="block truncate font-medium text-ink hover:text-deep-teal">
                            {job.title}
                          </Link>
                          <span className="mt-1 block truncate text-xs text-charcoal/60">{job.sector_name} · {job.location}</span>
                        </td>
                        <td className="px-4 py-4 tabular-nums text-charcoal/80">{(job.view_count ?? 0).toLocaleString()}</td>
                        <td className="px-4 py-4 tabular-nums text-charcoal/80">{job.applicationCount.toLocaleString()}</td>
                        <td className="px-4 py-4 tabular-nums text-charcoal/80">{conversion}%</td>
                        <td className="px-4 py-4">
                          <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">Published</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <BriefcaseBusiness className="mx-auto size-8 text-charcoal/35" aria-hidden="true" />
              <p className="mt-3 text-sm font-medium text-ink">No published jobs yet</p>
              <p className="mt-1 text-xs text-charcoal/60">Publish a vacancy to see job performance here.</p>
              <Link href="/dashboard/jobs" className="mt-4 inline-flex text-sm font-semibold text-deep-teal hover:underline">Create a job</Link>
            </div>
          )}
        </article>

        <article className="admin-card">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="font-semibold text-ink">Action centre</h3>
              <p className="mt-1 text-xs text-charcoal/60">Items ready for your attention</p>
            </div>
            <span className="flex size-9 items-center justify-center rounded-full bg-golden-sand/20 text-ink">
              <CheckCheck className="size-[18px]" aria-hidden="true" />
            </span>
          </div>
          <ul className="divide-y divide-border px-5">
            {actionItems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label}>
                  <Link href={item.href} className="flex items-center gap-3 py-4">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-mist text-charcoal/75">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-medium text-ink">{item.label}</span>
                    <span className={`min-w-8 rounded-full px-2 py-1 text-center text-xs font-semibold tabular-nums ${
                      item.count > 0 ? "bg-golden-sand/25 text-ink" : "bg-mist text-charcoal/65"
                    }`}>{item.count}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mx-5 mb-5 rounded-lg bg-mist/50 px-3.5 py-3 text-xs leading-relaxed text-charcoal/70">
            Review candidate and employer requests promptly to keep the recruitment process moving.
          </div>
        </article>
      </section>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.8fr)]">
        <article className="admin-card p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold text-ink">Application pipeline</h3>
              <p className="mt-1 text-xs text-charcoal/60">Current applications by recorded status</p>
            </div>
            <Link href="/dashboard/submissions" className="inline-flex items-center gap-1 text-xs font-semibold text-deep-teal hover:underline">
              View applications <ArrowRight className="size-3.5" aria-hidden="true" />
            </Link>
          </div>
          <div className="mt-6 grid gap-x-7 gap-y-5 sm:grid-cols-2">
            {stages.map((stage) => {
              const percentage = applications.count
                ? Math.round((stage.count / applications.count) * 100)
                : 0;
              return (
                <div key={stage.label}>
                  <div className="mb-2 flex items-center justify-between text-xs">
                    <span className="font-medium text-charcoal/75">{stage.label}</span>
                    <span className="font-semibold tabular-nums text-ink">{stage.count.toLocaleString()} <span className="font-normal text-charcoal/50">· {percentage}%</span></span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-mist">
                    <div className="h-full rounded-full bg-deep-teal transition-[width]" style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </article>

        <article className="admin-card min-w-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-border px-5 py-4">
            <div>
              <h3 className="font-semibold text-ink">Recent inquiries</h3>
              <p className="mt-1 text-xs text-charcoal/60">Latest messages received from the website</p>
            </div>
            <FileText className="size-4 text-charcoal/50" aria-hidden="true" />
          </div>
          {recentInquiries.data?.length ? (
            <ul className="divide-y divide-border">
              {recentInquiries.data.map((inquiry) => (
                <li key={inquiry.id} className="px-5 py-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{inquiry.name}</p>
                      <p className="mt-0.5 truncate text-xs text-charcoal/65">
                        {inquiry.subject || `${inquiry.type} inquiry`}
                      </p>
                    </div>
                    <time className="shrink-0 text-[10px] text-charcoal/55" dateTime={inquiry.created_at}>
                      {new Intl.DateTimeFormat("en-KE", {
                        month: "short",
                        day: "numeric",
                        timeZone: "Africa/Nairobi",
                      }).format(new Date(inquiry.created_at))}
                    </time>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-5 py-10 text-center">
              <Inbox className="mx-auto size-7 text-charcoal/35" aria-hidden="true" />
              <p className="mt-2 text-sm text-charcoal/65">No inquiries received yet.</p>
            </div>
          )}
          <Link href="/dashboard/submissions" className="flex items-center justify-center gap-1 border-t border-border px-5 py-3 text-xs font-semibold text-deep-teal hover:bg-mist/40">
            Open submissions <ArrowRight className="size-3.5" aria-hidden="true" />
          </Link>
        </article>
      </section>
    </div>
  );
}
