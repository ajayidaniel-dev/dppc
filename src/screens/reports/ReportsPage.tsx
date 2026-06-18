import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
  Gauge,
  Lightbulb,
  Plus,
  Presentation,
  RefreshCw,
  Search,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Badge,
  Button,
  Card,
  Modal,
  PageHeader,
  Select,
  type BadgeVariant,
} from "../../components/elements";
import { cn, formatDate } from "../../utils/helpers";

type Category = "Executive" | "Board" | "Management" | "Client";
type Frequency = "Weekly" | "Monthly" | "Quarterly" | "Annual";
type ReportStatus = "Ready" | "Scheduled" | "Generating";

interface Report {
  id: string;
  name: string;
  description: string;
  category: Category;
  frequency: Frequency;
  status: ReportStatus;
  date: string;
}

const reports: Report[] = [
  {
    id: "r1",
    name: "Q2 Executive Summary",
    description: "Strategic portfolio performance for leadership.",
    category: "Executive",
    frequency: "Quarterly",
    status: "Ready",
    date: "2026-06-15",
  },
  {
    id: "r2",
    name: "June Board Pack",
    description: "Governance, financials, and risk for the board.",
    category: "Board",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-10",
  },
  {
    id: "r3",
    name: "May Monthly Portfolio Report",
    description: "Portfolio-wide KPIs, budget, and milestones.",
    category: "Management",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-01",
  },
  {
    id: "r4",
    name: "Week 24 Status Report",
    description: "Weekly progress, blockers, and upcoming work.",
    category: "Management",
    frequency: "Weekly",
    status: "Ready",
    date: "2026-06-16",
  },
  {
    id: "r5",
    name: "Client Update — Coastal Highway",
    description: "Curated progress summary for the client sponsor.",
    category: "Client",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-08",
  },
  {
    id: "r6",
    name: "2025 Annual Portfolio Report",
    description: "Full-year corporate and portfolio performance.",
    category: "Executive",
    frequency: "Annual",
    status: "Ready",
    date: "2026-02-01",
  },
  {
    id: "r7",
    name: "Q3 Executive Summary",
    description: "Auto-generates at quarter close.",
    category: "Executive",
    frequency: "Quarterly",
    status: "Scheduled",
    date: "2026-09-30",
  },
  {
    id: "r8",
    name: "Week 25 Status Report",
    description: "Compiling latest project updates.",
    category: "Management",
    frequency: "Weekly",
    status: "Generating",
    date: "2026-06-18",
  },
];

const aiNarrative =
  "Portfolio value rose 6.4% to $48.2M this quarter, with 18 of 28 projects on track. Budget performance is healthy overall (CPI 1.02), but two infrastructure programs — Coastal Highway Phase II and Harbor Terminal Upgrade — are driving most of the cost and schedule risk and have been escalated to leadership.";

const aiInsights = [
  "Budget utilization at 84%, tracking 3.2% under plan.",
  "3 critical risks concentrated in Infrastructure and Maritime units.",
  "Engineering is over-allocated at 92% — a delivery bottleneck.",
  "Completed projects up 12 year-to-date.",
];

const aiRecommendations = [
  "Re-baseline Coastal Highway scope before the next funding cycle.",
  "Rebalance resources from Advisory (64%) toward Engineering.",
  "Accelerate the Harbor Terminal vendor decision to clear its critical risk.",
];

const predictions: {
  icon: typeof AlertTriangle;
  label: string;
  value: string;
  tone: string;
}[] = [
  {
    icon: AlertTriangle,
    label: "Risk prediction",
    value: "2 risks likely to escalate within 30 days",
    tone: "bg-danger/15 text-danger",
  },
  {
    icon: Gauge,
    label: "Performance forecast",
    value: "Portfolio CPI forecast 0.99 by Q3 close",
    tone: "bg-warning/15 text-warning",
  },
  {
    icon: CalendarClock,
    label: "Delivery forecast",
    value: "82% of milestones forecast on time",
    tone: "bg-info/15 text-info",
  },
];

const categoryOptions = [
  { label: "All categories", value: "all" },
  { label: "Executive", value: "Executive" },
  { label: "Board", value: "Board" },
  { label: "Management", value: "Management" },
  { label: "Client", value: "Client" },
];
const frequencyOptions = [
  { label: "All frequencies", value: "all" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
  { label: "Annual", value: "Annual" },
];

/** Options for the generate-report modal (excludes "All" filters). */
const generateCategoryOptions = categoryOptions.slice(1);
const generateFrequencyOptions = frequencyOptions.slice(1);

const categoryVariant: Record<Category, BadgeVariant> = {
  Executive: "primary",
  Board: "info",
  Management: "neutral",
  Client: "success",
};
const statusVariant: Record<ReportStatus, BadgeVariant> = {
  Ready: "success",
  Scheduled: "info",
  Generating: "warning",
};
const statusIcon: Record<ReportStatus, typeof CheckCircle2> = {
  Ready: CheckCircle2,
  Scheduled: CalendarClock,
  Generating: Clock,
};

const exportFormats = [
  { label: "PDF", icon: FileText },
  { label: "Excel", icon: FileSpreadsheet },
  { label: "PowerPoint", icon: Presentation },
];

function ReportsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [frequency, setFrequency] = useState(frequencyOptions[0]);
  const [exportTarget, setExportTarget] = useState<Report | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [genCategory, setGenCategory] = useState(generateCategoryOptions[0]);
  const [genFrequency, setGenFrequency] = useState(generateFrequencyOptions[0]);

  const openGenerateModal = () => {
    setGenCategory(generateCategoryOptions[0]);
    setGenFrequency(generateFrequencyOptions[0]);
    setGenerateOpen(true);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesQuery =
        !q || [r.name, r.description].join(" ").toLowerCase().includes(q);
      const matchesCategory =
        category.value === "all" || r.category === category.value;
      const matchesFrequency =
        frequency.value === "all" || r.frequency === frequency.value;
      return matchesQuery && matchesCategory && matchesFrequency;
    });
  }, [search, category, frequency]);

  const handleExport = (format: string) => {
    if (!exportTarget) return;
    toast.success(`Exporting “${exportTarget.name}” as ${format}…`);
    setExportTarget(null);
  };

  const handleGenerate = () => {
    toast.success(
      `${genFrequency.label} ${genCategory.label} report queued for generation.`,
    );
    setGenerateOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Reporting Center"
        subtitle="AI-assisted summaries, insights, and exportable reports."
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={openGenerateModal}
          >
            Generate report
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="AI Executive Summary"
          action={
            <div className="flex items-center gap-2">
              <Badge variant="primary">
                <Sparkles className="h-3 w-3" />
                AI-generated
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<RefreshCw className="h-4 w-4" />}
                onClick={() => toast.success("Summary regenerated")}
              >
                Regenerate
              </Button>
            </div>
          }
        >
          <p className="text-sm leading-relaxed text-foreground">
            {aiNarrative}
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Generated as of {formatDate("2026-06-18")} · review before
            distribution.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-6 border-t border-border pt-4 sm:grid-cols-2">
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <TrendingUp className="h-4 w-4 text-primary" />
                Key insights
              </h4>
              <ul className="flex flex-col gap-2">
                {aiInsights.map((insight) => (
                  <li
                    key={insight}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                <Lightbulb className="h-4 w-4 text-warning" />
                Smart recommendations
              </h4>
              <ul className="flex flex-col gap-2">
                {aiRecommendations.map((rec) => (
                  <li
                    key={rec}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>

        <Card title="Predictions & Forecast">
          <div className="flex flex-col gap-3">
            {predictions.map((p) => (
              <div
                key={p.label}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <span className={cn("rounded-lg p-2", p.tone)}>
                  <p.icon className="h-4 w-4" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{p.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Predictive estimates — directional, not guaranteed.
          </p>
        </Card>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-base font-semibold text-foreground">
            Report Library
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:w-56">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports…"
                aria-label="Search reports"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="w-44">
              <Select
                options={categoryOptions}
                value={category}
                onChange={(opt) => opt && setCategory(opt)}
                isSearchable={false}
                aria-label="Filter by category"
              />
            </div>
            <div className="w-44">
              <Select
                options={frequencyOptions}
                value={frequency}
                onChange={(opt) => opt && setFrequency(opt)}
                isSearchable={false}
                aria-label="Filter by frequency"
              />
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <Card>
            <p className="py-8 text-center text-sm text-muted-foreground">
              No reports match your filters.
            </p>
          </Card>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
            <ul className="divide-y divide-border">
              {filtered.map((report) => {
                const StatusIcon = statusIcon[report.status];
                return (
                  <li
                    key={report.id}
                    className="flex flex-wrap items-center gap-4 px-4 py-3.5"
                  >
                    <span className="rounded-lg bg-primary-soft p-2 text-primary">
                      <FileText className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {report.name}
                        </p>
                        <Badge variant={categoryVariant[report.category]}>
                          {report.category}
                        </Badge>
                      </div>
                      <p className="truncate text-xs text-muted-foreground">
                        {report.description}
                      </p>
                    </div>
                    <div className="hidden text-right sm:block">
                      <p className="text-xs font-medium text-foreground">
                        {report.frequency}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {report.status === "Ready"
                          ? `Generated ${formatDate(report.date)}`
                          : report.status === "Scheduled"
                            ? `Scheduled ${formatDate(report.date)}`
                            : "In progress"}
                      </p>
                    </div>
                    <Badge
                      variant={statusVariant[report.status]}
                      className="shrink-0"
                    >
                      <StatusIcon className="h-3 w-3" />
                      {report.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Download className="h-4 w-4" />}
                      disabled={report.status !== "Ready"}
                      onClick={() => setExportTarget(report)}
                    >
                      Export
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!exportTarget}
        onClose={() => setExportTarget(null)}
        title="Export report"
        size="sm"
      >
        {exportTarget && (
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              Choose a format for{" "}
              <span className="font-medium text-foreground">
                {exportTarget.name}
              </span>
              .
            </p>
            <div className="grid grid-cols-3 gap-3">
              {exportFormats.map((f) => (
                <button
                  key={f.label}
                  onClick={() => handleExport(f.label)}
                  className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <f.icon className="h-6 w-6 text-primary" />
                  {f.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </Modal>

      <Modal
        isOpen={generateOpen}
        onClose={() => setGenerateOpen(false)}
        title="Generate report"
        size="md"
        footer={
          <>
            <Button variant="outline" onClick={() => setGenerateOpen(false)}>
              Cancel
            </Button>
            <Button leftIcon={<Sparkles className="h-4 w-4" />} onClick={handleGenerate}>
              Generate
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Compile an AI-assisted report from the latest portfolio data.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Category
              </label>
              <Select
                options={generateCategoryOptions}
                value={genCategory}
                onChange={(opt) => opt && setGenCategory(opt)}
                isSearchable={false}
                aria-label="Report category"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Frequency
              </label>
              <Select
                options={generateFrequencyOptions}
                value={genFrequency}
                onChange={(opt) => opt && setGenFrequency(opt)}
                isSearchable={false}
                aria-label="Report frequency"
              />
            </div>
          </div>
          <div className="rounded-lg bg-primary-soft/60 p-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5 font-medium text-primary">
              <Sparkles className="h-3 w-3" />
              AI summary, insights, and recommendations included.
            </span>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ReportsPage;
