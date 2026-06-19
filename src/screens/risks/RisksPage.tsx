import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import {
  AlertOctagon,
  ChevronRight,
  Plus,
  Search,
  ShieldAlert,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Badge,
  Button,
  Card,
  ChartCard,
  Modal,
  PageHeader,
  Select,
  StatCard,
  StatusBadge,
  Table,
  Tabs,
  type BadgeVariant,
  type TabItem,
} from "../../components/elements";
import { chartPalette } from "../../constants";
import { cn, formatDate } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import type { Status } from "../../utils/types";
import {
  issues,
  LEVELS,
  risks,
  riskTrend,
  RISK_CATEGORIES,
  severityLabel,
  severityZone,
  type Issue,
  type Level,
  type Risk,
  type RiskState,
} from "./risksData";
import RiskFormModal from "./RiskFormModal";
import IssueFormModal from "./IssueFormModal";

const tabs: TabItem[] = [
  { id: "risks", label: "Site Risk Register" },
  { id: "issues", label: "Site Issue Register" },
];

const categoryOptions = [
  { label: "All categories", value: "all" },
  ...RISK_CATEGORIES.map((c) => ({ label: c, value: c })),
];
const severityOptions = [
  { label: "All severities", value: "all" },
  { label: "High", value: "red" },
  { label: "Medium", value: "amber" },
  { label: "Low", value: "green" },
];
const issueStatusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Open", value: "Open" },
  { label: "In Progress", value: "In Progress" },
  { label: "Resolved", value: "Resolved" },
];

const stateVariant: Record<RiskState, BadgeVariant> = {
  Open: "warning",
  Mitigating: "info",
  Mitigated: "success",
  Closed: "neutral",
};
const priorityVariant: Record<Issue["priority"], BadgeVariant> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};
const issueStatusVariant: Record<Issue["status"], BadgeVariant> = {
  Open: "warning",
  "In Progress": "info",
  Resolved: "success",
};

const heatTone: Record<Status, string> = {
  green: "bg-success/15 text-success",
  amber: "bg-warning/15 text-warning",
  red: "bg-danger/15 text-danger",
};

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

const riskColumns = createColumnHelper<Risk>();
const issueColumns = createColumnHelper<Issue>();

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function RisksPage() {
  const [activeTab, setActiveTab] = useState("risks");
  const [riskList, setRiskList] = useState<Risk[]>(risks);
  const [issueList, setIssueList] = useState<Issue[]>(issues);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [severity, setSeverity] = useState(severityOptions[0]);
  const [issueStatus, setIssueStatus] = useState(issueStatusOptions[0]);
  const [selectedRisk, setSelectedRisk] = useState<Risk | null>(null);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [addRiskOpen, setAddRiskOpen] = useState(false);
  const [addIssueOpen, setAddIssueOpen] = useState(false);

  const activeRisks = riskList.filter((r) => r.state !== "Closed");
  const criticalCount = activeRisks.filter(
    (r) => severityZone(r.probability, r.impact) === "red",
  ).length;
  const escalations = riskList.filter((r) => r.escalated);
  const resolvedCount = riskList.filter(
    (r) => r.state === "Mitigated" || r.state === "Closed",
  ).length;
  const openIssues = issueList.filter((i) => i.status !== "Resolved");

  const nextRiskId =
    Math.max(0, ...riskList.map((r) => Number(r.id.split("-")[1]) || 0)) + 1;
  const nextIssueId =
    Math.max(0, ...issueList.map((i) => Number(i.id.split("-")[1]) || 0)) + 1;

  const filteredRisks = useMemo(() => {
    const q = search.trim().toLowerCase();
    return riskList.filter((r) => {
      const matchesQuery =
        !q ||
        [r.id, r.title, r.owner, r.project, r.location]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory =
        category.value === "all" || r.category === category.value;
      const matchesSeverity =
        severity.value === "all" ||
        severityZone(r.probability, r.impact) === severity.value;
      return matchesQuery && matchesCategory && matchesSeverity;
    });
  }, [riskList, search, category, severity]);

  const filteredIssues = useMemo(() => {
    const q = search.trim().toLowerCase();
    return issueList.filter((i) => {
      const matchesQuery =
        !q ||
        [i.id, i.description, i.owner, i.project, i.location]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus =
        issueStatus.value === "all" || i.status === issueStatus.value;
      return matchesQuery && matchesStatus;
    });
  }, [issueList, search, issueStatus]);

  const filtersActive =
    search.trim() !== "" ||
    (activeTab === "risks" &&
      (category.value !== "all" || severity.value !== "all")) ||
    (activeTab === "issues" && issueStatus.value !== "all");

  const riskCols = useMemo(
    () => [
      riskColumns.accessor("id", { header: "ID" }),
      riskColumns.accessor("title", {
        header: "Risk",
        meta: { wrap: true, maxWidth: "300px" },
        cell: (info) => (
          <div>
            <p className="font-medium text-foreground">{info.getValue()}</p>
            <p className="text-xs text-muted-foreground">
              {info.row.original.project}
              <span className="ml-1.5">· {info.row.original.location}</span>
            </p>
          </div>
        ),
      }),
      riskColumns.accessor("category", {
        header: "Category",
        cell: (info) => <Badge variant="neutral">{info.getValue()}</Badge>,
      }),
      riskColumns.accessor("probability", { header: "Prob." }),
      riskColumns.accessor("impact", { header: "Impact" }),
      riskColumns.display({
        id: "severity",
        header: "Severity",
        meta: { align: "center" },
        cell: ({ row }) => {
          const zone = severityZone(row.original.probability, row.original.impact);
          return <StatusBadge status={zone} label={severityLabel[zone]} />;
        },
      }),
      riskColumns.accessor("state", {
        header: "State",
        cell: (info) => (
          <Badge variant={stateVariant[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
      }),
    ],
    [],
  );

  const issueCols = useMemo(
    () => [
      issueColumns.accessor("id", { header: "ID" }),
      issueColumns.accessor("description", {
        header: "Issue",
        meta: { wrap: true, maxWidth: "320px" },
        cell: (info) => (
          <div>
            <p className="font-medium text-foreground">{info.getValue()}</p>
            <p className="text-xs text-muted-foreground">
              {info.row.original.project}
              <span className="ml-1.5">· {info.row.original.location}</span>
            </p>
          </div>
        ),
      }),
      issueColumns.accessor("priority", {
        header: "Priority",
        cell: (info) => (
          <Badge variant={priorityVariant[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
      }),
      issueColumns.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge variant={issueStatusVariant[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
      }),
      issueColumns.accessor("owner", { header: "Owner" }),
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Site Risks & Issues"
        subtitle="Construction site risk register, issue tracking, and portfolio-wide analytics."
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() =>
              activeTab === "issues"
                ? setAddIssueOpen(true)
                : setAddRiskOpen(true)
            }
          >
            {activeTab === "issues" ? "Raise site issue" : "Log site risk"}
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Open Site Risks"
          value={activeRisks.length}
          icon={ShieldAlert}
          tone="primary"
        />
        <StatCard
          label="Critical Site Risks"
          value={criticalCount}
          icon={AlertOctagon}
          tone="danger"
        />
        <StatCard
          label="Open Site Issues"
          value={openIssues.length}
          icon={TriangleAlert}
          tone="warning"
        />
        <StatCard
          label="Mitigated / Closed"
          value={resolvedCount}
          icon={ShieldCheck}
          tone="success"
        />
      </div>

      {escalations.length > 0 && (
        <section
          aria-label="Escalated risks"
          className="rounded-xl border border-border bg-surface shadow-sm"
        >
          <div className="flex items-center gap-2 border-b border-border px-5 py-3">
            <span className="rounded-lg bg-danger/15 p-1.5 text-danger">
              <AlertOctagon className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">
              Requires executive attention
            </h2>
            <Badge variant="danger">{escalations.length}</Badge>
          </div>
          <ul className="divide-y divide-border">
            {escalations.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => setSelectedRisk(r)}
                  className="group flex w-full items-center gap-3 px-5 py-3 text-left transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
                >
                  <StatusBadge
                    status={severityZone(r.probability, r.impact)}
                    label={severityLabel[severityZone(r.probability, r.impact)]}
                    className="shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.project} · {r.location}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {r.id} · Owner: {r.owner} · Opened {formatDate(r.opened)}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card title="Site Risk Heat Map">
          <div className="flex gap-2">
            <div className="flex items-center">
              <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl] rotate-180">
                Impact
              </span>
            </div>
            <div className="flex-1">
              <div className="flex flex-col gap-1.5">
                {[...LEVELS].reverse().map((impact) => (
                  <div key={impact} className="flex items-center gap-1.5">
                    <span className="w-14 shrink-0 text-right text-xs text-muted-foreground">
                      {impact}
                    </span>
                    {LEVELS.map((prob) => {
                      const zone = severityZone(prob as Level, impact as Level);
                      const count = activeRisks.filter(
                        (r) => r.probability === prob && r.impact === impact,
                      ).length;
                      return (
                        <div
                          key={prob}
                          title={`Probability ${prob} · Impact ${impact}: ${count} risk(s)`}
                          className={cn(
                            "flex h-12 flex-1 items-center justify-center rounded-md text-sm font-semibold",
                            heatTone[zone],
                            count === 0 && "opacity-40",
                          )}
                        >
                          {count}
                        </div>
                      );
                    })}
                  </div>
                ))}
                <div className="flex items-center gap-1.5">
                  <span className="w-14 shrink-0" />
                  {LEVELS.map((prob) => (
                    <span
                      key={prob}
                      className="flex-1 text-center text-xs text-muted-foreground"
                    >
                      {prob}
                    </span>
                  ))}
                </div>
                <p className="mt-1 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Probability
                </p>
              </div>
            </div>
          </div>
        </Card>

        <ChartCard
          title="Open Site Risk Trend"
          className="lg:col-span-2"
          height={260}
        >
          <AreaChart data={riskTrend}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={chartPalette.grid}
            />
            <XAxis
              dataKey="month"
              fontSize={12}
              stroke={chartPalette.axis}
              tickLine={false}
            />
            <YAxis
              fontSize={12}
              allowDecimals={false}
              stroke={chartPalette.axis}
              tickLine={false}
            />
            <Tooltip contentStyle={tooltipStyle} cursor={{ opacity: 0.1 }} />
            <Area
              type="monotone"
              dataKey="open"
              name="Open"
              stroke={chartPalette.primary}
              strokeWidth={2}
              fill={chartPalette.primary}
              fillOpacity={0.12}
            />
            <Area
              type="monotone"
              dataKey="critical"
              name="Critical"
              stroke={chartPalette.danger}
              strokeWidth={2}
              fill={chartPalette.danger}
              fillOpacity={0.12}
            />
          </AreaChart>
        </ChartCard>
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              activeTab === "risks"
                ? "Search risk, development, location…"
                : "Search issue, development, location…"
            }
            aria-label="Search"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {activeTab === "risks" ? (
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-48">
              <Select
                options={categoryOptions}
                value={category}
                onChange={(opt) => opt && setCategory(opt)}
                isSearchable={false}
                aria-label="Filter by category"
              />
            </div>
            <div className="w-40">
              <Select
                options={severityOptions}
                value={severity}
                onChange={(opt) => opt && setSeverity(opt)}
                isSearchable={false}
                aria-label="Filter by severity"
              />
            </div>
            {filtersActive && (
              <Badge variant="info">
                {filteredRisks.length} of {riskList.length} shown
              </Badge>
            )}
          </div>
        ) : (
          <div className="flex flex-wrap items-center gap-3">
            <div className="w-44">
              <Select
                options={issueStatusOptions}
                value={issueStatus}
                onChange={(opt) => opt && setIssueStatus(opt)}
                isSearchable={false}
                aria-label="Filter by status"
              />
            </div>
            {filtersActive && (
              <Badge variant="info">
                {filteredIssues.length} of {issueList.length} shown
              </Badge>
            )}
          </div>
        )}
      </div>

      {activeTab === "risks" ? (
        <Table<Risk>
          columns={riskCols}
          data={filteredRisks}
          emptyMessage="No site risks match your filters."
          onRowClick={(row) => setSelectedRisk(row)}
        />
      ) : (
        <Table<Issue>
          columns={issueCols}
          data={filteredIssues}
          emptyMessage="No site issues match your filters."
          onRowClick={(row) => setSelectedIssue(row)}
        />
      )}

      <Modal
        isOpen={!!selectedRisk}
        onClose={() => setSelectedRisk(null)}
        title={selectedRisk ? `${selectedRisk.id} · Risk detail` : undefined}
        size="lg"
      >
        {selectedRisk && (
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-medium text-foreground">
                {selectedRisk.title}
              </p>
              <StatusBadge
                status={severityZone(
                  selectedRisk.probability,
                  selectedRisk.impact,
                )}
                label={
                  severityLabel[
                    severityZone(selectedRisk.probability, selectedRisk.impact)
                  ]
                }
                className="shrink-0"
              />
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <Field label="Development">{selectedRisk.project}</Field>
              <Field label="Location">{selectedRisk.location}</Field>
              <Field label="Category">{selectedRisk.category}</Field>
              <Field label="Owner">{selectedRisk.owner}</Field>
              <Field label="Probability">{selectedRisk.probability}</Field>
              <Field label="Impact">{selectedRisk.impact}</Field>
              <Field label="State">
                <Badge variant={stateVariant[selectedRisk.state]}>
                  {selectedRisk.state}
                </Badge>
              </Field>
              <Field label="Opened">{formatDate(selectedRisk.opened)}</Field>
            </dl>
            <div className="border-t border-border pt-4">
              <Field label="Mitigation plan">{selectedRisk.mitigation}</Field>
            </div>
            {selectedRisk.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selectedRisk.projectId)}
                  className="text-sm font-medium text-primary hover:text-primary-700"
                >
                  View development details →
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
        title={selectedIssue ? `${selectedIssue.id} · Issue detail` : undefined}
        size="lg"
      >
        {selectedIssue && (
          <div className="flex flex-col gap-5">
            <p className="text-base font-medium text-foreground">
              {selectedIssue.description}
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
              <Field label="Development">{selectedIssue.project}</Field>
              <Field label="Location">{selectedIssue.location}</Field>
              <Field label="Priority">
                <Badge variant={priorityVariant[selectedIssue.priority]}>
                  {selectedIssue.priority}
                </Badge>
              </Field>
              <Field label="Status">
                <Badge variant={issueStatusVariant[selectedIssue.status]}>
                  {selectedIssue.status}
                </Badge>
              </Field>
              <Field label="Owner">{selectedIssue.owner}</Field>
              <Field label="Raised">{formatDate(selectedIssue.raised)}</Field>
            </dl>
            <div className="border-t border-border pt-4">
              <Field label="Resolution plan">{selectedIssue.resolution}</Field>
            </div>
            {selectedIssue.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selectedIssue.projectId)}
                  className="text-sm font-medium text-primary hover:text-primary-700"
                >
                  View development details →
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      <RiskFormModal
        isOpen={addRiskOpen}
        onClose={() => setAddRiskOpen(false)}
        nextId={nextRiskId}
        onCreate={(risk) => setRiskList((prev) => [risk, ...prev])}
      />
      <IssueFormModal
        isOpen={addIssueOpen}
        onClose={() => setAddIssueOpen(false)}
        nextId={nextIssueId}
        onCreate={(issue) => setIssueList((prev) => [issue, ...prev])}
      />

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default RisksPage;
