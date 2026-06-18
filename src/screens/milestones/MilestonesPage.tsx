import { useMemo, useState } from "react";
import moment from "moment";
import { createColumnHelper } from "@tanstack/react-table";
import {
  CalendarClock,
  CheckCircle2,
  Flag,
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
import { projects } from "../projects/projectsData";
import {
  milestones,
  milestoneStateVariant,
  type MilestoneState,
  type PortfolioMilestone,
} from "./milestonesData";

const tabs: TabItem[] = [
  { id: "gantt", label: "Timeline (Gantt)" },
  { id: "register", label: "Milestone Register" },
];

const projectOptions = [
  { label: "All projects", value: "all" },
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

const columnHelper = createColumnHelper<PortfolioMilestone>();

function MilestonesPage() {
  const [tab, setTab] = useState("gantt");
  const [project, setProject] = useState(projectOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [criticalOnly, setCriticalOnly] = useState(false);

  const filtered = useMemo(
    () =>
      milestones.filter((m) => {
        const matchesProject =
          project.value === "all" || m.project === project.value;
        const matchesStatus =
          status.value === "all" || m.status === status.value;
        const matchesCritical = !criticalOnly || m.critical;
        return matchesProject && matchesStatus && matchesCritical;
      }),
    [project, status, criticalOnly],
  );

  const kpis = useMemo(() => {
    const total = milestones.length;
    const completed = milestones.filter((m) => m.status === "Completed").length;
    const inProgress = milestones.filter(
      (m) => m.status === "In Progress",
    ).length;
    const delayed = milestones.filter((m) => m.status === "Delayed").length;
    return { total, completed, inProgress, delayed };
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
                <Flag className="h-3.5 w-3.5 text-primary" />
              )}
              {info.getValue()}
            </p>
            <p className="text-xs text-muted-foreground">
              {info.row.original.projectCode} · {info.row.original.phase}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("project", { header: "Project" }),
      columnHelper.accessor("owner", { header: "Owner" }),
      columnHelper.accessor("end", {
        header: "Due",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("dependsOn", {
        header: "Depends on",
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue() ?? "—"}</span>
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
        title="Milestones"
        subtitle="Cross-portfolio milestone timeline, critical path, and dependencies."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
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
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Tabs tabs={tabs} value={tab} onChange={setTab} className="border-b-0" />
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              options={projectOptions}
              value={project}
              onChange={(opt) => opt && setProject(opt)}
              isSearchable={false}
              aria-label="Filter by project"
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
        </div>
      </div>

      {tab === "gantt" &&
        (filtered.length === 0 ? (
          <Card>
            <EmptyState
              icon={CalendarClock}
              title="No milestones match your filters"
              description="Adjust the project or status filters to see the timeline."
            />
          </Card>
        ) : (
          <Card>
            <div className="overflow-x-auto">
              <div className="min-w-[760px]">
                {/* Month axis */}
                <div className="relative ml-[220px] h-6 border-b border-border">
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

                {/* Rows */}
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
                        <div className="w-[220px] shrink-0 pr-3">
                          <p className="flex items-center gap-1.5 truncate text-sm font-medium text-foreground">
                            {m.critical && (
                              <Flag className="h-3 w-3 shrink-0 text-primary" />
                            )}
                            {m.name}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {m.projectCode} · {m.owner}
                          </p>
                        </div>
                        <div className="relative h-7 flex-1">
                          {/* month gridlines */}
                          {months.map((mm) => (
                            <span
                              key={mm.label}
                              className="absolute top-0 h-full w-px bg-border/60"
                              style={{ left: `${mm.left}%` }}
                            />
                          ))}
                          <div
                            title={`${formatDate(m.start)} → ${formatDate(m.end)}`}
                            className={cn(
                              "absolute top-1/2 flex h-5 -translate-y-1/2 items-center rounded-md px-2 text-[10px] font-medium text-white",
                              barClass[m.status],
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

            {/* Legend */}
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
            </div>
          </Card>
        ))}

      {tab === "register" && (
        <Table<PortfolioMilestone>
          columns={columns}
          data={filtered}
          emptyMessage="No milestones match your filters."
        />
      )}
    </div>
  );
}

export default MilestonesPage;
