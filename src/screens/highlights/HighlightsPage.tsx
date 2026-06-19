import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  Modal,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
} from "../../components/elements";
import { cn } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import { getProjectById } from "../projects/projectsData";
import {
  featured,
  HIGHLIGHT_TYPES,
  highlights,
  highlightTypeIcon,
  highlightTypeVariant,
  portfolioWinNarrative,
  successMetrics,
  type Highlight,
  type HighlightType,
} from "./highlightsData";

const typeOptions = [
  { label: "All highlight types", value: "all" },
  ...HIGHLIGHT_TYPES.map((t) => ({ label: t, value: t })),
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function HighlightsPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [selected, setSelected] = useState<Highlight | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return highlights.filter((h) => {
      const matchesQuery =
        !q ||
        [h.title, h.project, h.location, h.detail, h.impact, h.type]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesType = type.value === "all" || h.type === type.value;
      return matchesQuery && matchesType;
    });
  }, [search, type]);

  const filtersActive = search.trim() !== "" || type.value !== "all";

  const setTypeQuickFilter = (highlightType: HighlightType) => {
    setType(typeOptions.find((o) => o.value === highlightType) ?? typeOptions[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Highlights & Success Stories"
        subtitle="Portfolio wins, handover milestones, sales achievements, and community impact across Rivers State"
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {successMetrics.map((m) => (
          <StatCard
            key={m.label}
            label={m.label}
            value={m.value}
            icon={m.icon}
            tone={m.tone}
            hint={m.hint}
          />
        ))}
      </div>

      <Card
        title="Portfolio wins summary"
        action={
          <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            H1 2026
          </span>
        }
      >
        <p className="text-sm leading-relaxed text-foreground">
          {portfolioWinNarrative}
        </p>
      </Card>

      <div className="flex flex-wrap gap-2">
        {HIGHLIGHT_TYPES.map((highlightType) => {
          const Icon = highlightTypeIcon[highlightType];
          const count = highlights.filter((h) => h.type === highlightType).length;
          const active = type.value === highlightType;
          return (
            <button
              key={highlightType}
              type="button"
              onClick={() => setTypeQuickFilter(highlightType)}
              className={cn(
                "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                active
                  ? "border-primary bg-primary-soft text-primary"
                  : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-surface-muted",
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {highlightType}
              <span className="text-xs text-muted-foreground">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-4 lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-base font-semibold text-foreground">
              Development highlights
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:w-56">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search highlights…"
                  aria-label="Search highlights"
                  className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
                />
              </div>
              <div className="w-48">
                <Select
                  options={typeOptions}
                  value={type}
                  onChange={(opt) => opt && setType(opt)}
                  isSearchable={false}
                  aria-label="Filter by highlight type"
                />
              </div>
              {filtersActive && (
                <Badge variant="info">
                  {filtered.length} of {highlights.length} shown
                </Badge>
              )}
            </div>
          </div>

          <Card>
            {filtered.length === 0 ? (
              <EmptyState
                icon={Sparkles}
                title="No highlights found"
                description="Try a different search term or highlight type."
              />
            ) : (
              <div className="flex flex-col">
                {filtered.map((h, idx) => {
                  const Icon = highlightTypeIcon[h.type];
                  return (
                    <button
                      key={h.id}
                      type="button"
                      onClick={() => setSelected(h)}
                      className={cn(
                        "flex gap-4 py-4 text-left transition-colors hover:bg-surface-muted focus:outline-none focus-visible:bg-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40",
                        idx !== filtered.length - 1 && "border-b border-border",
                      )}
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-medium text-foreground">{h.title}</p>
                          <Badge variant={highlightTypeVariant[h.type]}>
                            {h.type}
                          </Badge>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                          {h.detail}
                        </p>
                        <p className="mt-2 text-xs font-medium text-success">
                          {h.impact}
                        </p>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-xs text-muted-foreground">
                          <span>{h.project}</span>
                          <span>·</span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {h.location}
                          </span>
                          <span>·</span>
                          <span>{h.month}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-base font-semibold text-foreground">
            Featured developments
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
                      {p.code} · {p.phase}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {p.location}
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

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={highlightTypeVariant[selected.type]}>
                {selected.type}
              </Badge>
              <span className="text-xs text-muted-foreground">{selected.id}</span>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Development">{selected.project}</Field>
              <Field label="Period">{selected.month}</Field>
              <Field label="Location">{selected.location}</Field>
              <Field label="Impact">{selected.impact}</Field>
            </dl>
            <Field label="Detail">{selected.detail}</Field>
            {selected.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selected.projectId)}
                  className="text-sm font-medium text-primary hover:text-primary-700"
                >
                  View development details →
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default HighlightsPage;
