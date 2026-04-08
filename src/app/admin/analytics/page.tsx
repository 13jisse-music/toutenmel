import { supabaseAdmin } from "@/lib/supabase-admin";
import { PeriodSelector } from "./PeriodSelector";

export const revalidate = 0;

// Types pour les evenements analytics
interface AnalyticsEvent {
  page_path: string;
  referrer: string | null;
  session_id: string;
  visitor_id: string;
  duration: number | null;
  created_at: string;
}

// Calcule la date de debut selon la periode
function periodStart(period: string): string | null {
  if (period === "all") return null;
  const days = period === "7d" ? 7 : 30;
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export default async function AnalyticsPage(props: {
  searchParams: Promise<{ period?: string }>;
}) {
  const searchParams = await props.searchParams;
  const period = searchParams.period || "30d";
  const start = periodStart(period);

  // Requete de base filtree par projet et periode
  let query = supabaseAdmin
    .from("analytics_events")
    .select("page_path, referrer, session_id, visitor_id, duration, created_at")
    .eq("project", "tem")
    .order("created_at", { ascending: false });

  if (start) {
    query = query.gte("created_at", start);
  }

  const { data: events } = await query;
  const rows = (events || []) as AnalyticsEvent[];

  // -- Vue generale --
  const pageViews = rows.length;
  const uniqueVisitors = new Set(rows.map((e) => e.visitor_id)).size;
  const sessions = new Set(rows.map((e) => e.session_id)).size;

  const durationsMs = rows
    .map((e) => e.duration)
    .filter((d): d is number => d != null && d > 0);
  const avgDuration =
    durationsMs.length > 0
      ? Math.round(durationsMs.reduce((a, b) => a + b, 0) / durationsMs.length)
      : 0;

  // Taux de rebond : sessions avec une seule page vue
  const sessionPageCounts: Record<string, number> = {};
  for (const e of rows) {
    sessionPageCounts[e.session_id] = (sessionPageCounts[e.session_id] || 0) + 1;
  }
  const totalSessions = Object.keys(sessionPageCounts).length;
  const bounceSessions = Object.values(sessionPageCounts).filter(
    (c) => c === 1
  ).length;
  const bounceRate =
    totalSessions > 0 ? Math.round((bounceSessions / totalSessions) * 100) : 0;

  // Formate la duree en min:sec
  const fmtDuration = (ms: number) => {
    const sec = Math.round(ms / 1000);
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s.toString().padStart(2, "0")}s`;
  };

  // -- Top pages --
  const pageCounts: Record<string, number> = {};
  for (const e of rows) {
    pageCounts[e.page_path] = (pageCounts[e.page_path] || 0) + 1;
  }
  const topPages = Object.entries(pageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // -- Sources de trafic --
  const refCounts: Record<string, number> = {};
  for (const e of rows) {
    const ref = e.referrer;
    if (!ref) continue;
    // Exclure le domaine toutenmel
    if (ref.includes("toutenmel")) continue;
    // Nettoyer le referrer (garder le domaine)
    let domain: string;
    try {
      domain = new URL(ref).hostname;
    } catch {
      domain = ref;
    }
    refCounts[domain] = (refCounts[domain] || 0) + 1;
  }
  const topReferrers = Object.entries(refCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  // Trafic direct (sans referrer ou depuis toutenmel)
  const directCount = rows.filter(
    (e) => !e.referrer || e.referrer.includes("toutenmel")
  ).length;

  const overviewStats = [
    {
      label: "Pages vues",
      value: pageViews.toLocaleString("fr-FR"),
      color: "from-coral to-magenta",
    },
    {
      label: "Visiteurs uniques",
      value: uniqueVisitors.toLocaleString("fr-FR"),
      color: "from-turquoise to-electric-blue",
    },
    {
      label: "Sessions",
      value: sessions.toLocaleString("fr-FR"),
      color: "from-amber to-orange",
    },
    {
      label: "Duree moyenne",
      value: fmtDuration(avgDuration),
      color: "from-violet to-magenta",
    },
    {
      label: "Taux de rebond",
      value: `${bounceRate}%`,
      color: "from-electric-blue to-turquoise",
    },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-warm-brown">Analytics</h1>
        <PeriodSelector current={period} />
      </div>

      {/* Vue generale */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-8">
        {overviewStats.map((stat) => (
          <div
            key={stat.label}
            className={`bg-gradient-to-br ${stat.color} rounded-xl p-3 sm:p-5 text-white`}
          >
            <p className="text-white/80 text-xs sm:text-sm font-medium">
              {stat.label}
            </p>
            <p className="text-xl sm:text-2xl font-bold mt-0.5">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top pages */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-xl font-bold text-warm-brown mb-4">
            Top pages
          </h2>
          {topPages.length === 0 ? (
            <p className="text-warm-gray text-sm py-4">
              Aucune donnee pour cette periode.
            </p>
          ) : (
            <div className="space-y-3">
              {topPages.map(([path, count], i) => {
                const maxCount = topPages[0][1];
                const pct = Math.round((count / maxCount) * 100);
                return (
                  <div key={path} className="flex items-center gap-3">
                    <span className="text-xs text-warm-gray w-5 text-right">
                      {i + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-warm-brown truncate">
                          {path}
                        </span>
                        <span className="text-sm text-warm-gray ml-2 flex-shrink-0">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-coral to-magenta rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Sources de trafic */}
        <div className="bg-white rounded-2xl p-6">
          <h2 className="text-xl font-bold text-warm-brown mb-4">
            Sources de trafic
          </h2>
          {/* Trafic direct */}
          <div className="mb-4 bg-cream/50 rounded-xl p-3 flex items-center justify-between">
            <span className="text-sm font-medium text-warm-brown">
              Acces direct
            </span>
            <span className="text-sm text-warm-gray">
              {directCount} vue{directCount > 1 ? "s" : ""}
            </span>
          </div>
          {topReferrers.length === 0 ? (
            <p className="text-warm-gray text-sm py-4">
              Aucun referrer externe pour cette periode.
            </p>
          ) : (
            <div className="space-y-3">
              {topReferrers.map(([domain, count], i) => {
                const maxRef = topReferrers[0][1];
                const pct = Math.round((count / maxRef) * 100);
                return (
                  <div key={domain} className="flex items-center gap-3">
                    <span className="text-xs text-warm-gray w-5 text-right">
                      {i + 1}.
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-warm-brown truncate">
                          {domain}
                        </span>
                        <span className="text-sm text-warm-gray ml-2 flex-shrink-0">
                          {count}
                        </span>
                      </div>
                      <div className="h-1.5 bg-cream-dark rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-turquoise to-electric-blue rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
