import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import {
  CalendarClock,
  CheckCircle2,
  Flag,
  Home,
  Loader,
  TriangleAlert,
} from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  PageHeader,
  Select,
  StatCard,
  Table,
  Tabs,
  type TabItem,
} from "../../components/elements";
import { cn, formatDate } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import { projects } from "../projects/projectsData";
import {
  countUpcomingHandovers,
  milestones,
  milestoneStateVariant,
  milestoneTypeOptions,
  type MilestoneState,
  type PortfolioMilestone,
} from "./milestonesData";

const tabs: TabItem[] = [
  { id: "gantt", label: "Construction Timeline" },
  { id: "register", label: "Milestone Register" },
];

const developmentOptions = [
  { label: "All developments", value: "all" },
  ...projects.map((p) => ({ label: p.name, value: p.name })),
];

const statusOptions = [
  { label: "All statuses", value: "all" },
  { label: "Completed", value: "Completed" },
  { label: "In Progress", value: "In Progress" },
  { label: "Planned", value: "Planned" },
  { label: "Delayed", value: "Delayed" },
  { label: "Cancelled", value: "Cancelled" },
];

const barClass: Record<MilestoneState, string> = {
  Completed: "bg-success",
  "In Progress": "bg-info",
  Planned: "bg-primary/50",
  Delayed: "bg-danger",
  Cancelled: "bg-surface-muted",
};

const typeBadgeVariant = {
  Construction: "neutral" as const,
  Handover: "info" as const,
  Approval: "warning" as const,
};

const columnHelper = createColumnHelper<PortfolioMilestone>();

function MilestonesPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("gantt");
  const [development, setDevelopment] = useState(developmentOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [milestoneType, setMilestoneType] = useState(milestoneTypeOptions[0]);
  const [criticalOnly, setCriticalOnly] = useState(false);

  const filtered = useMemo(
    () =>
      milestones.filter((m) => {
        const matchesDevelopment =
          development.value === "all" || m.project === development.value;
        const matchesStatus =
          status.value === "all" || m.status === status.value;
        const matchesType =
          milestoneType.value === "all" ||
          m.milestoneType === milestoneType.value;
        const matchesCritical = !criticalOnly || m.critical;
        return (
          matchesDevelopment && matchesStatus && matchesType && matchesCritical
        );
      }),
    [development, status, milestoneType, criticalOnly],
  );

  const filtersActive =
    development.value !== "all" ||
    status.value !== "all" ||
    milestoneType.value !== "all" ||
    criticalOnly;

  const kpis = useMemo(() => {
    const total = milestones.length;
    const completed = milestones.filter((m) => m.status === "Completed").length;
    const inProgress = milestones.filter(
      (m) => m.status === "In Progress",
    ).length;
    const delayed = milestones.filter((m) => m.status === "Delayed").length;
    const upcomingHandovers = countUpcomingHandovers(milestones);
    return { total, completed, inProgress, delayed, upcomingHandovers };
  }, []);

  const { minDate, totalDays, months } = useMemo(() => {
    if (filtered.length === 0) {
      return { minDate: moment(), totalDays: 1, months: [] };
    }
    const starts = filtered.map((m) => moment(m.start));
    const ends = filtered.map((m) => moment(m.end));
    const min = moment.min(starts).startOf("month");
    const max = moment.max(ends).endOf("month");
    const days = Math.max(max.diff(min, "days"), 1);
    const monthMarks: { label: string; left: number }[] = [];
    const cursor = min.clone();
    while (cursor.isBefore(max)) {
      monthMarks.push({
        label: cursor.format("MMM 'YY"),
        left: (cursor.diff(min, "days") / days) * 100,
      });
      cursor.add(1, "month");
    }
    return { minDate: min, totalDays: days, months: monthMarks };
  }, [filtered]);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Milestone",
        meta: { wrap: true, maxWidth: "260px" },
        cell: (info) => (
          <div>
            <p className="flex items-center gap-1.5 font-medium text-foreground">
              {info.row.original.critical && (
                <Flag className="h-3.5 w-3.5 shrink-0 text-primary" />
              )}
              {info.getValue()}
            </p>
            <p className="text-xs text-muted-foreground">
              {info.row.original.projectCode} · {info.row.original.phase}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("project", { header: "Development" }),
      columnHelper.accessor("location", {
        header: "Location",
        meta: { wrap: true, maxWidth: "180px" },
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("owner", { header: "Project Manager" }),
      columnHelper.accessor("milestoneType", {
        header: "Type",
        cell: (info) => (
          <Badge variant={typeBadgeVariant[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor("end", {
        header: "Target Date",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("dependsOn", {
        header: "Depends on",
        cell: (info) => (
          <span className="text-muted-foreground">
            {info.getValue() ?? "—"}
          </span>
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => (
          <Badge variant={milestoneStateVariant[info.getValue()]}>
            {info.getValue()}
          </Badge>
        ),
        meta: { align: "center" },
      }),
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Construction Milestones"
        subtitle="Cross-portfolio construction timeline, handovers, and critical path dependencies."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
        <StatCard
          label="Total Milestones"
          value={kpis.total}
          icon={CalendarClock}
          tone="primary"
        />
        <StatCard
          label="Completed"
          value={kpis.completed}
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard
          label="In Progress"
          value={kpis.inProgress}
          icon={Loader}
          tone="info"
        />
        <StatCard
          label="Delayed"
          value={kpis.delayed}
          icon={TriangleAlert}
          tone="danger"
        />
        <StatCard
          label="Upcoming Handovers"
          value={kpis.upcomingHandovers}
          icon={Home}
          tone="info"
          hint="Next 30 days"
          className="col-span-2 xl:col-span-1"
        />
      </div>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      <div className="flex flex-wrap items-center gap-3">
        <div className="w-52">
          <Select
            options={developmentOptions}
            value={development}
            onChange={(opt) => opt && setDevelopment(opt)}
            isSearchable={false}
            aria-label="Filter by development"
          />
        </div>
        <div className="w-48">
          <Select
            options={milestoneTypeOptions}
            value={milestoneType}
            onChange={(opt) => opt && setMilestoneType(opt)}
            isSearchable={false}
            aria-label="Filter by milestone type"
          />
        </div>
        <div className="w-40">
          <Select
            options={statusOptions}
            value={status}
            onChange={(opt) => opt && setStatus(opt)}
            isSearchable={false}
            aria-label="Filter by status"
          />
        </div>
        <button
          type="button"
          onClick={() => setCriticalOnly((v) => !v)}
          aria-pressed={criticalOnly}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            criticalOnly
              ? "border-primary bg-primary-soft text-primary"
              : "border-border text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          )}
        >
          <Flag className="h-4 w-4" />
          Critical path
        </button>
        {filtersActive && (
          <Badge variant="info">
            {filtered.length} of {milestones.length} shown
          </Badge>
        )}
      </div>

      {tab === "gantt" &&
        (filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={CalendarClock}
              title="No milestones match your filters"
              description="Adjust the development, type, or status filters to see the construction timeline."
            />
          </Card>
        ) : (
          <Card title="Construction Timeline">
            <div className="overflow-x-auto">
              <div className="min-w-[840px]">
                <div className="relative ml-[260px] h-6 border-b border-border">
                  {months.map((m) => (
                    <span
                      key={m.label}
                      className="absolute top-0 -translate-x-1/2 text-xs text-muted-foreground"
                      style={{ left: `${m.left}%` }}
                    >
                      {m.label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-col">
                  {filtered.map((m) => {
                    const start = moment(m.start);
                    const end = moment(m.end);
                    const left =
                      (start.diff(minDate, "days") / totalDays) * 100;
                    const width = Math.max(
                      (end.diff(start, "days") / totalDays) * 100,
                      1.5,
                    );
                    return (
                      <div
                        key={m.id}
                        className="flex items-center border-b border-border/60 py-2 last:border-0"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            navigate(projectDetailsPath(m.projectId))
                          }
                          className="w-[260px] shrink-0 pr-3 text-left transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 rounded-sm"
                        >
                          <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                            {m.critical && (
                              <Flag className="h-3 w-3 shrink-0 text-primary" />
                            )}
                            {m.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {m.project} · {m.projectCode}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {m.location}
                          </p>
                        </button>
                        <div className="relative h-7 flex-1">
                          {months.map((mm) => (
                            <span
                              key={mm.label}
                              className="absolute top-0 h-full w-px bg-border/60"
                              style={{ left: `${mm.left}%` }}
                            />
                          ))}
                          <div
                            title={`${formatDate(m.start)} → ${formatDate(m.end)} · ${m.milestoneType}`}
                            className={cn(
                              "absolute top-1/2 flex h-5 -translate-y-1/2 items-center rounded-md px-2 text-[10px] font-medium text-white",
                              barClass[m.status],
                              m.milestoneType === "Handover" &&
                                "ring-1 ring-info/60",
                              m.critical &&
                                "ring-2 ring-primary ring-offset-1 ring-offset-surface",
                              m.status === "Cancelled" &&
                                "text-muted-foreground line-through",
                            )}
                            style={{
                              left: `${left}%`,
                              width: `${width}%`,
                              minWidth: 24,
                            }}
                          >
                            <span className="truncate">{m.status}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
              {(
                [
                  "Completed",
                  "In Progress",
                  "Planned",
                  "Delayed",
                  "Cancelled",
                ] as MilestoneState[]
              ).map((s) => (
                <span key={s} className="inline-flex items-center gap-1.5">
                  <span className={cn("h-3 w-3 rounded", barClass[s])} />
                  {s}
                </span>
              ))}
              <span className="inline-flex items-center gap-1.5">
                <Flag className="h-3.5 w-3.5 text-primary" />
                Critical path
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="h-3 w-3 rounded bg-info ring-1 ring-info/60" />
                Handover milestone
              </span>
            </div>
          </Card>
        ))}

      {tab === "register" && (
        <>
          <p className="text-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "milestone" : "milestones"}
            {filtersActive ? " matching filters" : " across the portfolio"}
          </p>
          <Table<PortfolioMilestone>
            columns={columns}
            data={filtered}
            emptyMessage="No milestones match your filters."
            onRowClick={(row) => navigate(projectDetailsPath(row.projectId))}
          />
        </>
      )}

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default MilestonesPage;
