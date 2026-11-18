import Link from "next/link";
import { requireAdmin } from "@/lib/admin";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="border-b border-border px-5 py-4 font-semibold text-ink">{children}</h2>;
}

function CvLink({ url, name }: { url: string | null; name?: string | null }) {
  if (!url) return <span className="text-charcoal/60">No CV attached</span>;
  return (
    <a className="font-medium text-deep-teal hover:underline" href={url} target="_blank" rel="noreferrer">
      {name || "View CV"}
    </a>
  );
}

export default async function DashboardSubmissionsPage() {
  const { supabase } = await requireAdmin();
  const [inquiries, candidates, applications, contacts, subscriptions] = await Promise.all([
    supabase
      .from("inquiries")
      .select("id, type, status, name, email, phone, organization, hiring_need, role_count, location, partnership_type, subject, message, interest, consent_privacy, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("candidates")
      .select("id, first_name, last_name, email, phone, location, skill_level, years_experience, current_title, professional_summary, cv_url, cv_filename, preferred_sectors, open_to_international, consent_privacy, consent_job_alerts, status, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("job_applications")
      .select("id, cover_letter, cv_url, status, applied_at, candidates(first_name, last_name, email, phone, cv_filename), jobs(title, slug)")
      .order("applied_at", { ascending: false })
      .limit(100),
    supabase
      .from("contact_messages")
      .select("id, name, email, phone, subject, message, is_read, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("job_alert_subscriptions")
      .select("id, email, name, preferred_sectors, preferred_locations, preferred_types, is_active, created_at")
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const failed = [inquiries, candidates, applications, contacts, subscriptions]
    .filter((result) => result.error)
    .map((result) => result.error?.message);
  if (failed.length) {
    console.error("Could not load form submissions:", failed);
    throw new Error("Form submissions could not be loaded.");
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow text-deep-teal">Website activity</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Form submissions</h1>
        <p className="mt-2 text-sm text-charcoal/70">
          The latest 100 records of each form type. Candidate and contact details are visible only to authorized admins.
        </p>
      </header>

      <section className="admin-card overflow-hidden">
        <SectionTitle>Inquiries ({inquiries.data?.length ?? 0})</SectionTitle>
        {inquiries.data?.length ? (
          <div className="divide-y divide-border">
            {inquiries.data.map((item) => (
              <article key={item.id} className="space-y-2 p-5">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h3 className="font-semibold text-ink">{item.name} <span className="font-normal text-charcoal/60">· {item.type}</span></h3>
                    <p className="text-sm text-charcoal/75">{item.email}{item.phone ? ` · ${item.phone}` : ""}</p>
                  </div>
                  <span className="rounded-full bg-mist px-3 py-1 text-xs capitalize">{item.status}</span>
                </div>
                <dl className="grid gap-x-6 gap-y-1 text-sm text-charcoal/80 sm:grid-cols-2">
                  {item.organization && <div><dt className="inline font-medium">Organization: </dt><dd className="inline">{item.organization}</dd></div>}
                  {item.hiring_need && <div><dt className="inline font-medium">Need: </dt><dd className="inline">{item.hiring_need}</dd></div>}
                  {item.role_count !== null && <div><dt className="inline font-medium">Headcount: </dt><dd className="inline">{item.role_count}</dd></div>}
                  {item.location && <div><dt className="inline font-medium">Location: </dt><dd className="inline">{item.location}</dd></div>}
                  {item.partnership_type && <div><dt className="inline font-medium">Partnership: </dt><dd className="inline">{item.partnership_type}</dd></div>}
                  {item.interest && <div><dt className="inline font-medium">Interest: </dt><dd className="inline">{item.interest}</dd></div>}
                  {item.subject && <div><dt className="inline font-medium">Subject: </dt><dd className="inline">{item.subject}</dd></div>}
                  <div><dt className="inline font-medium">Privacy consent: </dt><dd className="inline">{item.consent_privacy ? "Yes" : "No"}</dd></div>
                </dl>
                {item.message && <p className="whitespace-pre-wrap rounded-lg bg-mist/60 p-3 text-sm text-charcoal/85">{item.message}</p>}
                <time className="block text-xs text-charcoal/55" dateTime={item.created_at}>{new Date(item.created_at).toLocaleString()}</time>
              </article>
            ))}
          </div>
        ) : <p className="p-5 text-sm text-charcoal/70">No inquiries submitted.</p>}
      </section>

      <section className="admin-card overflow-hidden">
        <SectionTitle>Candidate registrations ({candidates.data?.length ?? 0})</SectionTitle>
        {candidates.data?.length ? (
          <div className="divide-y divide-border">
            {candidates.data.map((person) => (
              <article key={person.id} className="space-y-2 p-5">
                <h3 className="font-semibold text-ink">{person.first_name} {person.last_name}</h3>
                <p className="text-sm text-charcoal/75">{person.email} · {person.phone}</p>
                <dl className="grid gap-x-6 gap-y-1 text-sm text-charcoal/80 sm:grid-cols-2">
                  <div><dt className="inline font-medium">Location: </dt><dd className="inline">{person.location || "Not provided"}</dd></div>
                  <div><dt className="inline font-medium">Target role: </dt><dd className="inline">{person.current_title || "Not provided"}</dd></div>
                  <div><dt className="inline font-medium">Experience: </dt><dd className="inline">{person.years_experience ?? "Not provided"} years</dd></div>
                  <div><dt className="inline font-medium">Category: </dt><dd className="inline">{person.skill_level || "Not provided"}</dd></div>
                  <div><dt className="inline font-medium">Sectors: </dt><dd className="inline">{person.preferred_sectors?.join(", ") || "Not provided"}</dd></div>
                  <div><dt className="inline font-medium">International placement: </dt><dd className="inline">{person.open_to_international ? "Yes" : "No"}</dd></div>
                  <div><dt className="inline font-medium">Job alerts consent: </dt><dd className="inline">{person.consent_job_alerts ? "Yes" : "No"}</dd></div>
                  <div><dt className="inline font-medium">Privacy consent: </dt><dd className="inline">{person.consent_privacy ? "Yes" : "No"}</dd></div>
                  <div><dt className="inline font-medium">Status: </dt><dd className="inline capitalize">{person.status}</dd></div>
                  <div><dt className="inline font-medium">CV: </dt><dd className="inline"><CvLink url={person.cv_url} name={person.cv_filename} /></dd></div>
                </dl>
                {person.professional_summary && <p className="whitespace-pre-wrap rounded-lg bg-mist/60 p-3 text-sm text-charcoal/85">{person.professional_summary}</p>}
                <time className="block text-xs text-charcoal/55" dateTime={person.created_at}>{new Date(person.created_at).toLocaleString()}</time>
              </article>
            ))}
          </div>
        ) : <p className="p-5 text-sm text-charcoal/70">No candidate profiles submitted.</p>}
      </section>

      <section className="admin-card overflow-hidden">
        <SectionTitle>Job applications ({applications.data?.length ?? 0})</SectionTitle>
        {applications.data?.length ? (
          <div className="divide-y divide-border">
            {applications.data.map((application) => {
              const candidate = application.candidates?.[0];
              const job = application.jobs?.[0];
              return (
                <article key={application.id} className="space-y-2 p-5">
                  <h3 className="font-semibold text-ink">{candidate ? `${candidate.first_name} ${candidate.last_name}` : "Applicant"} · {job?.title || "Job"}</h3>
                  {candidate && <p className="text-sm text-charcoal/75">{candidate.email} · {candidate.phone}</p>}
                  <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-charcoal/80">
                    <span>Status: <span className="capitalize">{application.status.replace(/_/g, " ")}</span></span>
                    {job && <Link className="font-medium text-deep-teal hover:underline" href={`/jobs/${job.slug}`}>View job</Link>}
                    <CvLink url={application.cv_url} name={candidate?.cv_filename} />
                  </div>
                  {application.cover_letter && <p className="whitespace-pre-wrap rounded-lg bg-mist/60 p-3 text-sm text-charcoal/85">{application.cover_letter}</p>}
                  <time className="block text-xs text-charcoal/55" dateTime={application.applied_at}>{new Date(application.applied_at).toLocaleString()}</time>
                </article>
              );
            })}
          </div>
        ) : <p className="p-5 text-sm text-charcoal/70">No applications submitted.</p>}
      </section>

      <section className="admin-card overflow-hidden">
        <SectionTitle>Job-alert subscriptions ({subscriptions.data?.length ?? 0})</SectionTitle>
        {subscriptions.data?.length ? (
          <ul className="divide-y divide-border">
            {subscriptions.data.map((item) => (
              <li key={item.id} className="flex flex-wrap justify-between gap-3 px-5 py-4 text-sm">
                <div>
                  <p className="font-medium text-ink">{item.name || "Subscriber"} · {item.email}</p>
                  <p className="text-charcoal/70">
                    Sectors: {item.preferred_sectors?.join(", ") || "Any"} · Locations: {item.preferred_locations?.join(", ") || "Any"} · Types: {item.preferred_types?.join(", ") || "Any"}
                  </p>
                  <time className="text-xs text-charcoal/55" dateTime={item.created_at}>{new Date(item.created_at).toLocaleString()}</time>
                </div>
                <span className="capitalize text-charcoal/70">{item.is_active ? "Active" : "Inactive"}</span>
              </li>
            ))}
          </ul>
        ) : <p className="p-5 text-sm text-charcoal/70">No subscriptions yet.</p>}
      </section>

      <section className="admin-card overflow-hidden">
        <SectionTitle>Contact messages ({contacts.data?.length ?? 0})</SectionTitle>
        {contacts.data?.length ? (
          <div className="divide-y divide-border">
            {contacts.data.map((item) => (
              <article key={item.id} className="space-y-2 p-5">
                <h3 className="font-semibold text-ink">{item.name} · {item.subject || "Contact message"}</h3>
                <p className="text-sm text-charcoal/75">{item.email}{item.phone ? ` · ${item.phone}` : ""}</p>
                <p className="whitespace-pre-wrap text-sm text-charcoal/85">{item.message}</p>
                <time className="block text-xs text-charcoal/55" dateTime={item.created_at}>{new Date(item.created_at).toLocaleString()}</time>
              </article>
            ))}
          </div>
        ) : <p className="p-5 text-sm text-charcoal/70">No contact messages submitted.</p>}
      </section>
    </div>
  );
}
