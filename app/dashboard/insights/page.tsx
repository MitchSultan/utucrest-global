import Link from "next/link";
import { InsightEditor } from "@/components/dashboard/InsightEditor";
import { requireAdmin } from "@/lib/admin";

export default async function DashboardInsightsPage() {
  const { supabase } = await requireAdmin();
  const { data: insights, error } = await supabase
    .from("insights")
    .select("id, slug, title, category, status, published_date, updated_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Could not load dashboard insights:", error.message);
    throw new Error("Articles could not be loaded.");
  }

  return (
    <div className="space-y-8">
      <header>
        <p className="eyebrow text-deep-teal">Content</p>
        <h1 className="mt-2 text-3xl font-semibold text-ink">Blog & insights</h1>
        <p className="mt-2 text-sm text-charcoal/70">Write articles and publish them to the website when ready.</p>
      </header>
      <section>
        <h2 className="mb-4 text-xl font-semibold text-ink">Add an article</h2>
        <InsightEditor />
      </section>
      <section className="admin-card overflow-hidden">
        <h2 className="border-b border-border px-5 py-4 font-semibold text-ink">Existing articles</h2>
        {insights?.length ? (
          <ul className="divide-y divide-border">
            {insights.map((insight) => (
              <li key={insight.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
                <div>
                  <p className="font-medium text-ink">{insight.title}</p>
                  <p className="mt-1 text-sm text-charcoal/70">{insight.category}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-mist px-3 py-1 text-xs font-medium capitalize">{insight.status}</span>
                  {insight.status === "published" && (
                    <Link href={`/insights/${insight.slug}`} className="text-sm font-medium text-deep-teal hover:underline">
                      View
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="p-5 text-sm text-charcoal/70">No articles yet.</p>
        )}
      </section>
    </div>
  );
}
