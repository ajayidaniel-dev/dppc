import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Banknote,
  PiggyBank,
  Sparkles,
  Star,
  Target,
  TrendingUp,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Badge,
  Card,
  PageHeader,
  ProgressBar,
  StatCard,
  StatusBadge,
} from "../../components/elements";
import { projectDetailsPath } from "../../router/routes";
import { getProjectById } from "../projects/projectsData";
import {
  featured,
  highlights,
  highlightTypeVariant,
  successMetrics,
} from "./highlightsData";

const metricIcon: LucideIcon[] = [Banknote, PiggyBank, Target, TrendingUp];
const metricTone = ["success", "info", "primary", "warning"] as const;

function HighlightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Highlights & Success Stories"
        subtitle="Monthly wins, featured projects, and realized business benefits."
      />

      {/* Success metrics */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {successMetrics.map((m, i) => (
          <StatCard
            key={m.label}
            label={m.label}
            value={m.value}
            icon={metricIcon[i]}
            tone={metricTone[i]}
            hint={m.hint}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Monthly highlights */}
        <Card
          title="Monthly Highlights"
          className="lg:col-span-2"
          action={
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              Curated
            </span>
          }
        >
          <div className="flex flex-col">
            {highlights.map((h, idx) => (
              <div
                key={h.id}
                className={
                  "flex gap-4 py-4" +
                  (idx !== highlights.length - 1
                    ? " border-b border-border"
                    : "")
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <Star className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-foreground">{h.title}</p>
                    <Badge variant={highlightTypeVariant[h.type]}>
                      {h.type}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {h.detail}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {h.project} · {h.month}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Featured projects */}
        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-foreground">
            Featured Projects
          </h3>
          {featured.map((f) => {
            const p = getProjectById(f.projectId);
            if (!p) return null;
            return (
              <Link
                key={f.projectId}
                to={projectDetailsPath(p.id)}
                className="group rounded-xl border border-border bg-surface p-4 shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {p.code} · {p.manager}
                    </p>
                  </div>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{f.reason}</p>
                <div className="mt-3">
                  <ProgressBar value={p.progress} showLabel />
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <StatusBadge status={p.status} />
                  {f.tags.map((t) => (
                    <Badge key={t} variant="neutral">
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default HighlightsPage;
