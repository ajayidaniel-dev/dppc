import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  ChevronRight,
  Home,
  TriangleAlert,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import moment from "moment";
import {
  Avatar,
  Badge,
  Card,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
} from "../../components/elements";
import { chartPalette } from "../../constants";
import { projectDetailsPath } from "../../router/routes";
import { cn, formatCompactCurrency, formatCurrency } from "../../utils/helpers";
import {
  attentionItems,
  contractorCapacity,
  handovers,
  maxRisk,
  metricsByPeriod,
  milestonesRoute,
  openRisks,
  overallCapacity,
  periodOptions,
  pipelinePhases,
  projectsRoute,
  riskSummary,
  risksRoute,
  TOTAL_DEVELOPMENTS,
  type Period,
} from "./overviewData";

const BILLION = 1_000_000_000;

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

const statusOrder = { red: 0, amber: 1, green: 2 } as const;

function CardLink({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1 rounded text-sm font-medium text-primary transition-colors hover:text-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
    >
      {label}
      <ArrowRight className="h-4 w-4" />
    </Link>
  );
}

function OverviewPage() {
  const [period, setPeriod] = useState(periodOptions[2]);
  const metrics = metricsByPeriod[period.value as Period];

  const sortedAttention = useMemo(
    () =>
      [...attentionItems].sort(
        (a, b) => statusOrder[a.status] - statusOrder[b.status],
      ),
    [],
  );

  const varianceTone =
    metrics.varianceLabel === "Under plan" ? "text-success" : "text-danger";
  const varianceBadge =
    metrics.varianceLabel === "Under plan" ? "success" : "danger";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Portfolio Overview"
        subtitle={`Property development portfolio · Rivers State & national pipeline · as of ${moment().format("DD MMM YYYY, h:mm A")}`}
        action={
          <div className="w-44">
            <Select
              options={periodOptions}
              value={period}
              onChange={(opt) => opt && setPeriod(opt)}
              isSearchable={false}
              aria-label="Reporting period"
            />
          </div>
        }
      />

      <section
        aria-label="Developments needing attention"
        className="rounded-xl border border-border bg-surface shadow-sm"
      >
        <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-danger/15 p-1.5 text-danger">
              <TriangleAlert className="h-4 w-4" />
            </span>
            <h2 className="text-sm font-semibold text-foreground">
              Needs attention
            </h2>
            <Badge variant="danger">{sortedAttention.length}</Badge>
          </div>
          <CardLink to={risksRoute} label="View all risks" />
        </div>
        <ul className="divide-y divide-border">
          {sortedAttention.map((item) => (
            <li key={item.project}>
              <Link
                to={item.to}
                className="group flex items-center gap-3 px-5 py-3 transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
              >
                <StatusBadge status={item.status} className="shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {item.project}
                    <span className="ml-2 text-xs font-normal text-muted-foreground">
                      {item.type}
                    </span>
                    <span className="ml-1.5 text-xs font-normal text-muted-foreground">
                      · {item.location}
                    </span>
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {item.reason}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Active Developments"
          value={metrics.activeDevelopments}
          icon={Briefcase}
          tone="primary"
          trend={{ value: metrics.activeTrend, positive: true }}
          to={projectsRoute}
        />
        <StatCard
          label="Units Delivered"
          value={metrics.unitsDelivered.toLocaleString("en-NG")}
          icon={Home}
          tone="success"
          trend={{ value: metrics.unitsTrend, positive: true }}
          to={projectsRoute}
        />
        <StatCard
          label="Developments at Risk"
          value={metrics.atRisk}
          icon={TriangleAlert}
          tone="danger"
          {...(metrics.atRiskTrend === "No change"
            ? { hint: metrics.atRiskTrend }
            : {
                trend: {
                  value: metrics.atRiskTrend,
                  positive: !metrics.atRiskTrend.startsWith("+"),
                },
              })}
          to={risksRoute}
        />
        <StatCard
          label="Upcoming Handovers"
          value={metrics.upcomingHandovers}
          icon={CalendarClock}
          tone="info"
          hint="Next 30 days"
          to={milestonesRoute}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          title="Development Cost Performance"
          className="lg:col-span-2"
          action={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: chartPalette.primarySoft }}
                />
                Approved
              </span>
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: chartPalette.primary }}
                />
                Actual
              </span>
            </div>
          }
        >
          <div className="grid grid-cols-1 gap-4 border-b border-border pb-4 sm:grid-cols-3">
            <div>
              <p className="text-xs text-muted-foreground">Total approved budget</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {formatCurrency(metrics.totalBudget)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Spent to date</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {formatCurrency(metrics.spent)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Variance vs plan</p>
              <p
                className={cn(
                  "mt-1 flex flex-wrap items-center gap-2 text-lg font-semibold",
                  varianceTone,
                )}
              >
                {metrics.variancePct}%
                <Badge variant={varianceBadge}>{metrics.varianceLabel}</Badge>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <ResponsiveContainer width="100%" height={232}>
              <BarChart data={metrics.budgetChart}>
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
                  stroke={chartPalette.axis}
                  tickLine={false}
                  tickFormatter={(v) => formatCompactCurrency(v * BILLION)}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ opacity: 0.1 }}
                  formatter={(v: number, name: string) => [
                    formatCompactCurrency(v * BILLION),
                    name === "planned" ? "Approved" : "Actual",
                  ]}
                />
                <Bar
                  dataKey="planned"
                  name="planned"
                  fill={chartPalette.primarySoft}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="actual"
                  name="actual"
                  fill={chartPalette.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                Budget utilization across active developments
              </span>
              <span className="font-medium text-foreground">
                {metrics.utilization}%
              </span>
            </div>
            <ProgressBar value={metrics.utilization} />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Source: PMO · Updated {moment().format("DD MMM YYYY")}
          </p>
        </Card>

        <Card title="Development Pipeline">
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pipelinePhases}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {pipelinePhases.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-foreground">
                {TOTAL_DEVELOPMENTS}
              </span>
              <span className="text-xs text-muted-foreground">Developments</span>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {pipelinePhases.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.name}
                </span>
                <span className="text-foreground">
                  <span className="font-medium">{item.value}</span>
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {Math.round((item.value / TOTAL_DEVELOPMENTS) * 100)}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          title="Site Risk Overview"
          action={<CardLink to={risksRoute} label="Details" />}
        >
          <div className="flex flex-col gap-3">
            {riskSummary.map((risk) => (
              <div key={risk.label}>
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{risk.label}</span>
                  <span className="font-medium text-foreground">
                    {risk.count}
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={cn("h-full rounded-full", risk.barClass)}
                    style={{ width: `${(risk.count / maxRisk) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{openRisks}</span> open
            site risks ·{" "}
            <span className="font-medium text-foreground">
              {metrics.mitigatedRisks}
            </span>{" "}
            mitigated {period.label.toLowerCase()}
          </p>
        </Card>

        <Card
          title="Upcoming Handovers"
          className="lg:col-span-2"
          action={<CardLink to={milestonesRoute} label="All handovers" />}
        >
          <div className="divide-y divide-border">
            {handovers.map((h) => (
              <Link
                key={`${h.name}-${h.due}`}
                to={projectDetailsPath(h.projectId)}
                className="group flex items-center justify-between gap-3 py-3 transition-colors first:pt-0 last:pb-0 hover:bg-surface-muted/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring/40"
              >
                <div className="flex min-w-0 items-center gap-3 px-1">
                  <Avatar name={h.owner} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {h.name}
                      <span className="ml-2 text-xs font-normal text-muted-foreground">
                        {h.units} units
                      </span>
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {h.project} · {h.location} · {h.phase}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {h.owner} · Due {h.due} · {h.eta}
                    </p>
                  </div>
                </div>
                <StatusBadge status={h.status} className="shrink-0" />
              </Link>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Contractor Capacity">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {contractorCapacity.map((r) => {
            const constrained = r.value >= 90;
            return (
              <div key={r.trade}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {r.trade}
                    {constrained && (
                      <Badge variant="warning">Capacity constrained</Badge>
                    )}
                  </span>
                  <span className="font-medium text-foreground">{r.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={cn(
                      "h-full rounded-full motion-safe:transition-[width]",
                      constrained ? "bg-warning" : "bg-primary",
                    )}
                    style={{ width: `${r.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          Average capacity across trades:{" "}
          <span className="font-medium text-foreground">{overallCapacity}%</span>
        </p>
      </Card>
    </div>
  );
}

export default OverviewPage;
