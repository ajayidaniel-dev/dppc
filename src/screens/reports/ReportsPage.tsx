import { useMemo, useState } from "react";
import moment from "moment";
import {
  CalendarClock,
  CheckCircle2,
  Clock,
  Download,
  FileSpreadsheet,
  FileText,
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
  StatCard,
  type BadgeVariant,
} from "../../components/elements";
import { cn, formatDate } from "../../utils/helpers";
import {
  aiInsights,
  aiNarrative,
  aiRecommendations,
  aiSummaryGenerated,
  predictions,
  quickTemplates,
  REPORT_CATEGORIES,
  REPORT_TYPES,
  reportTypeIcon,
  reports,
  type QuickTemplate,
  type Report,
  type ReportCategory,
  type ReportStatus,
} from "./reportsData";

const categoryOptions = [
  { label: "All audiences", value: "all" },
  ...REPORT_CATEGORIES.map((c) => ({ label: c, value: c })),
];
const typeOptions = [
  { label: "All report types", value: "all" },
  ...REPORT_TYPES.map((t) => ({ label: t, value: t })),
];
const frequencyOptions = [
  { label: "All frequencies", value: "all" },
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
  { label: "Annual", value: "Annual" },
];

const generateCategoryOptions = categoryOptions.slice(1);
const generateTypeOptions = typeOptions.slice(1);
const generateFrequencyOptions = frequencyOptions.slice(1);

const categoryVariant: Record<ReportCategory, BadgeVariant> = {
  Executive: "primary",
  Board: "info",
  Management: "neutral",
  Stakeholder: "success",
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

function findOption<T extends string>(
  options: { label: string; value: string }[],
  value: T,
) {
  return options.find((o) => o.value === value) ?? options[0];
}

function ReportsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [reportType, setReportType] = useState(typeOptions[0]);
  const [frequency, setFrequency] = useState(frequencyOptions[0]);
  const [exportTarget, setExportTarget] = useState<Report | null>(null);
  const [previewTarget, setPreviewTarget] = useState<Report | null>(null);
  const [generateOpen, setGenerateOpen] = useState(false);
  const [genCategory, setGenCategory] = useState(generateCategoryOptions[0]);
  const [genType, setGenType] = useState(generateTypeOptions[0]);
  const [genFrequency, setGenFrequency] = useState(generateFrequencyOptions[0]);

  const readyCount = reports.filter((r) => r.status === "Ready").length;
  const scheduledCount = reports.filter((r) => r.status === "Scheduled").length;
  const generatingCount = reports.filter((r) => r.status === "Generating").length;
  const thisMonthCount = reports.filter(
    (r) =>
      r.status === "Ready" &&
      moment(r.date).isSame(moment("2026-06-18"), "month"),
  ).length;

  const openGenerateModal = (template?: QuickTemplate) => {
    if (template) {
      setGenCategory(findOption(generateCategoryOptions, template.category));
      setGenType(findOption(generateTypeOptions, template.type));
      setGenFrequency(findOption(generateFrequencyOptions, template.frequency));
    } else {
      setGenCategory(generateCategoryOptions[0]);
      setGenType(generateTypeOptions[0]);
      setGenFrequency(generateFrequencyOptions[0]);
    }
    setGenerateOpen(true);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return reports.filter((r) => {
      const matchesQuery =
        !q ||
        [r.name, r.description, r.scope, r.type, r.id]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory =
        category.value === "all" || r.category === category.value;
      const matchesType =
        reportType.value === "all" || r.type === reportType.value;
      const matchesFrequency =
        frequency.value === "all" || r.frequency === frequency.value;
      return matchesQuery && matchesCategory && matchesType && matchesFrequency;
    });
  }, [search, category, reportType, frequency]);

  const filtersActive =
    search.trim() !== "" ||
    category.value !== "all" ||
    reportType.value !== "all" ||
    frequency.value !== "all";

  const handleExport = (format: string) => {
    if (!exportTarget) return;
    toast.success(`Exporting “${exportTarget.name}” as ${format}…`);
    setExportTarget(null);
  };

  const handleGenerate = () => {
    toast.success(
      `${genFrequency.label} ${genType.label} report (${genCategory.label}) queued for generation.`,
    );
    setGenerateOpen(false);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Reporting Center"
        subtitle="AI-assisted portfolio summaries, construction updates, and exportable corporate reports · Rivers State pipeline"
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => openGenerateModal()}
          >
            Generate report
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Ready to export"
          value={readyCount}
          icon={CheckCircle2}
          tone="success"
          hint="Available for download"
        />
        <StatCard
          label="Scheduled"
          value={scheduledCount}
          icon={CalendarClock}
          tone="info"
          hint="Auto-generates on due date"
        />
        <StatCard
          label="In generation"
          value={generatingCount}
          icon={Clock}
          tone="warning"
          hint="Compiling latest site data"
        />
        <StatCard
          label="Published this month"
          value={thisMonthCount}
          icon={FileText}
          tone="primary"
          hint="June 2026"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          className="lg:col-span-2"
          title="AI Portfolio Executive Summary"
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
                onClick={() => toast.success("Summary regenerated from latest portfolio data")}
              >
                Regenerate
              </Button>
            </div>
          }
        >
          <p className="text-sm leading-relaxed text-foreground">{aiNarrative}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Generated as of {formatDate(aiSummaryGenerated)} · review before board
            or stakeholder distribution.
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
                Recommended actions
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

        <Card title="Forecasts & Outlook">
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
                  <p className="text-xs font-medium text-muted-foreground">
                    {p.label}
                  </p>
                  <p className="mt-0.5 text-sm text-foreground">{p.value}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3 w-3" />
            Directional estimates from portfolio data — not guaranteed.
          </p>
        </Card>
      </div>

      <Card title="Quick generate">
        <p className="mb-3 text-sm text-muted-foreground">
          Start from a common report template used across the development portfolio.
        </p>
        <div className="flex flex-wrap gap-2">
          {quickTemplates.map((template) => (
            <button
              key={template.label}
              type="button"
              onClick={() => openGenerateModal(template)}
              className="rounded-lg border border-border bg-surface px-3 py-2 text-left transition-colors hover:border-primary/40 hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <p className="text-sm font-medium text-foreground">{template.label}</p>
              <p className="text-xs text-muted-foreground">{template.description}</p>
            </button>
          ))}
        </div>
      </Card>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="text-base font-semibold text-foreground">Report library</h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:w-56">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search reports, scope…"
                aria-label="Search reports"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="w-44">
              <Select
                options={typeOptions}
                value={reportType}
                onChange={(opt) => opt && setReportType(opt)}
                isSearchable={false}
                aria-label="Filter by report type"
              />
            </div>
            <div className="w-40">
              <Select
                options={categoryOptions}
                value={category}
                onChange={(opt) => opt && setCategory(opt)}
                isSearchable={false}
                aria-label="Filter by audience"
              />
            </div>
            <div className="w-40">
              <Select
                options={frequencyOptions}
                value={frequency}
                onChange={(opt) => opt && setFrequency(opt)}
                isSearchable={false}
                aria-label="Filter by frequency"
              />
            </div>
            {filtersActive && (
              <Badge variant="info">
                {filtered.length} of {reports.length} shown
              </Badge>
            )}
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
                const TypeIcon = reportTypeIcon[report.type];
                return (
                  <li key={report.id}>
                    <button
                      type="button"
                      onClick={() => setPreviewTarget(report)}
                      className="flex w-full flex-wrap items-center gap-4 px-4 py-3.5 text-left transition-colors hover:bg-surface-muted focus:outline-none focus-visible:bg-surface-muted focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                    >
                      <span className="rounded-lg bg-primary-soft p-2 text-primary">
                        <TypeIcon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-medium text-foreground">
                            {report.name}
                          </p>
                          <Badge variant={categoryVariant[report.category]}>
                            {report.category}
                          </Badge>
                          <Badge variant="neutral">{report.type}</Badge>
                        </div>
                        <p className="truncate text-xs text-muted-foreground">
                          {report.description}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {report.id} · {report.scope}
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
                        {report.pages > 0 && (
                          <p className="text-xs text-muted-foreground">
                            {report.pages} pages
                          </p>
                        )}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          setExportTarget(report);
                        }}
                      >
                        Export
                      </Button>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>

      <Modal
        isOpen={!!previewTarget}
        onClose={() => setPreviewTarget(null)}
        title={previewTarget?.name}
        size="md"
        footer={
          previewTarget && (
            <>
              <Button variant="outline" onClick={() => setPreviewTarget(null)}>
                Close
              </Button>
              <Button
                leftIcon={<Download className="h-4 w-4" />}
                disabled={previewTarget.status !== "Ready"}
                onClick={() => {
                  setExportTarget(previewTarget);
                  setPreviewTarget(null);
                }}
              >
                Export
              </Button>
            </>
          )
        }
      >
        {previewTarget && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Report ID</dt>
              <dd className="mt-1 text-sm text-foreground">{previewTarget.id}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Scope</dt>
              <dd className="mt-1 text-sm text-foreground">{previewTarget.scope}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Type</dt>
              <dd className="mt-1 text-sm text-foreground">{previewTarget.type}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Audience</dt>
              <dd className="mt-1">
                <Badge variant={categoryVariant[previewTarget.category]}>
                  {previewTarget.category}
                </Badge>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Frequency</dt>
              <dd className="mt-1 text-sm text-foreground">{previewTarget.frequency}</dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-muted-foreground">Status</dt>
              <dd className="mt-1">
                <Badge variant={statusVariant[previewTarget.status]}>
                  {previewTarget.status}
                </Badge>
              </dd>
            </div>
            <div className="col-span-2">
              <dt className="text-xs font-medium text-muted-foreground">Description</dt>
              <dd className="mt-1 text-sm text-muted-foreground">
                {previewTarget.description}
              </dd>
            </div>
          </dl>
        )}
      </Modal>

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
              <span className="font-medium text-foreground">{exportTarget.name}</span>.
            </p>
            <div className="grid grid-cols-3 gap-3">
              {exportFormats.map((f) => (
                <button
                  key={f.label}
                  type="button"
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
            <Button
              leftIcon={<Sparkles className="h-4 w-4" />}
              onClick={handleGenerate}
            >
              Generate
            </Button>
          </>
        }
      >
        <div className="flex flex-col gap-4">
          <p className="text-sm text-muted-foreground">
            Compile an AI-assisted report from the latest development portfolio,
            site progress, and sales data.
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Report type
              </label>
              <Select
                options={generateTypeOptions}
                value={genType}
                onChange={(opt) => opt && setGenType(opt)}
                isSearchable={false}
                aria-label="Report type"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-foreground">
                Audience
              </label>
              <Select
                options={generateCategoryOptions}
                value={genCategory}
                onChange={(opt) => opt && setGenCategory(opt)}
                isSearchable={false}
                aria-label="Report audience"
              />
            </div>
            <div className="sm:col-span-2">
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
              Includes AI narrative, site insights, and recommended actions.
            </span>
          </div>
        </div>
      </Modal>

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default ReportsPage;
