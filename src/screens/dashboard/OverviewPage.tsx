import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Briefcase,
  CalendarClock,
  CheckCircle2,
  ChevronRight,
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
import { routes } from "../../router/routes";
import { cn, formatCurrency } from "../../utils/helpers";
import type { Status } from "../../utils/types";

const periodOptions = [
  { label: "This month", value: "month" },
  { label: "This quarter", value: "quarter" },
  { label: "Year to date", value: "ytd" },
];

const attentionItems: {
  project: string;
  unit: string;
  reason: string;
  status: Status;
  to: string;
}[] = [
  {
    project: "Coastal Rail Extension",
    unit: "Infrastructure",
    reason: "Forecast budget overrun +12% vs plan",
    status: "red",
    to: routes.PROJECTS,
  },
  {
    project: "Grid Modernization",
    unit: "Energy",
    reason: "Critical milestone slipped 3 weeks",
    status: "red",
    to: routes.PROJECTS,
  },
  {
    project: "Harbor Terminal Upgrade",
    unit: "Maritime",
    reason: "Unmitigated high-severity risk open 21 days",
    status: "amber",
    to: routes.RISKS,
  },
];

const budgetData = [
  { month: "Jan", planned: 6.2, actual: 5.9 },
  { month: "Feb", planned: 12.8, actual: 12.1 },
  { month: "Mar", planned: 19.5, actual: 18.6 },
  { month: "Apr", planned: 28.4, actual: 27.0 },
  { month: "May", planned: 38.1, actual: 34.8 },
  { month: "Jun", planned: 48.2, actual: 40.5 },
];

const TOTAL_BUDGET = 48_200_000;
const SPENT = 40_500_000;
const UTILIZATION = Math.round((SPENT / TOTAL_BUDGET) * 100);

const TOTAL_PROJECTS = 28;
const healthData = [
  { name: "On Track", value: 18, status: "green" as const, color: chartPalette.success },
  { name: "Attention", value: 7, status: "amber" as const, color: chartPalette.warning },
  { name: "Critical", value: 3, status: "red" as const, color: chartPalette.danger },
];

const riskSummary: { label: string; count: number; barClass: string }[] = [
  { label: "Critical", count: 3, barClass: "bg-danger" },
  { label: "High", count: 8, barClass: "bg-warning" },
  { label: "Medium", count: 14, barClass: "bg-info" },
  { label: "Low", count: 9, barClass: "bg-success" },
];
const maxRisk = Math.max(...riskSummary.map((r) => r.count));
const openRisks = riskSummary.reduce((sum, r) => sum + r.count, 0);

const milestones: {
  name: string;
  owner: string;
  due: string;
  eta: string;
  status: Status;
}[] = [
  { name: "Phase 1 Handover", owner: "Amara Bello", due: "24 Jun", eta: "in 6 days", status: "green" },
  { name: "Vendor Onboarding", owner: "Daniel Ajayi", due: "28 Jun", eta: "in 10 days", status: "amber" },
  { name: "Compliance Review", owner: "Priya Nair", due: "02 Jul", eta: "in 14 days", status: "red" },
  { name: "Q3 Kickoff", owner: "Marcus Cole", due: "08 Jul", eta: "in 20 days", status: "green" },
];

const resourceUtil: { unit: string; value: number }[] = [
  { unit: "Engineering", value: 92 },
  { unit: "Delivery", value: 78 },
  { unit: "Advisory", value: 64 },
  { unit: "Operations", value: 85 },
];
const overallUtil = Math.round(
  resourceUtil.reduce((sum, r) => sum + r.value, 0) / resourceUtil.length,
);

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

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
  const [period, setPeriod] = useState(periodOptions[1]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Executive Overview"
        subtitle={`Organization-wide portfolio health · as of ${moment().format("DD MMM YYYY, h:mm A")}`}
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
        aria-label="Items needing attention"
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
            <Badge variant="danger">{attentionItems.length}</Badge>
          </div>
          <CardLink to={routes.RISKS} label="View all" />
        </div>
        <ul className="divide-y divide-border">
          {attentionItems.map((item) => (
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
                      {item.unit}
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
          label="Active Projects"
          value={28}
          icon={Briefcase}
          tone="primary"
          trend={{ value: "+3 this quarter", positive: true }}
          to={routes.PROJECTS}
        />
        <StatCard
          label="Completed"
          value={142}
          icon={CheckCircle2}
          tone="success"
          trend={{ value: "+12 YTD", positive: true }}
          to={routes.PROJECTS}
        />
        <StatCard
          label="At Risk"
          value={3}
          icon={TriangleAlert}
          tone="danger"
          trend={{ value: "+1 this week", positive: false }}
          to={routes.RISKS}
        />
        <StatCard
          label="Upcoming Milestones"
          value={9}
          icon={CalendarClock}
          tone="info"
          hint="Next 30 days"
          to={routes.PROJECTS}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          title="Financial Snapshot"
          className="lg:col-span-2"
          action={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span
                  className="h-2.5 w-2.5 rounded-sm"
                  style={{ backgroundColor: chartPalette.primarySoft }}
                />
                Planned
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
          <div className="grid grid-cols-3 gap-4 border-b border-border pb-4">
            <div>
              <p className="text-xs text-muted-foreground">Total budget</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {formatCurrency(TOTAL_BUDGET)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Spent</p>
              <p className="mt-1 text-lg font-semibold text-foreground">
                {formatCurrency(SPENT)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Variance</p>
              <p className="mt-1 flex items-center gap-2 text-lg font-semibold text-success">
                3.2%
                <Badge variant="success">Under plan</Badge>
              </p>
            </div>
          </div>

          <div className="pt-4">
            <ResponsiveContainer width="100%" height={232}>
              <BarChart data={budgetData}>
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
                  tickFormatter={(v) => `$${v}M`}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  cursor={{ opacity: 0.1 }}
                  formatter={(v: number) => [`$${v}M`, ""]}
                />
                <Bar
                  dataKey="planned"
                  name="Planned"
                  fill={chartPalette.primarySoft}
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="actual"
                  name="Actual"
                  fill={chartPalette.primary}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 border-t border-border pt-4">
            <div className="mb-1.5 flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Budget utilization</span>
              <span className="font-medium text-foreground">
                {UTILIZATION}%
              </span>
            </div>
            <ProgressBar value={UTILIZATION} />
          </div>
        </Card>

        <Card title="Portfolio Health">
          <div className="relative">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={healthData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={62}
                  outerRadius={90}
                  paddingAngle={2}
                >
                  {healthData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-semibold text-foreground">
                {TOTAL_PROJECTS}
              </span>
              <span className="text-xs text-muted-foreground">Projects</span>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2.5">
            {healthData.map((item) => (
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
                    {Math.round((item.value / TOTAL_PROJECTS) * 100)}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card
          title="Risk Summary"
          action={<CardLink to={routes.RISKS} label="Details" />}
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
            · <span className="font-medium text-foreground">18</span> mitigated
            this quarter
          </p>
        </Card>

        <Card
          title="Milestone Tracker"
          className="lg:col-span-2"
          action={<CardLink to={routes.PROJECTS} label="All milestones" />}
        >
          <div className="divide-y divide-border">
            {milestones.map((m) => (
              <div
                key={m.name}
                className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <Avatar name={m.owner} size="sm" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {m.owner} · Due {m.due} · {m.eta}
                    </p>
                  </div>
                </div>
                <StatusBadge status={m.status} className="shrink-0" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Resource Utilization">
        <div className="grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
          {resourceUtil.map((r) => {
            const over = r.value >= 90;
            return (
              <div key={r.unit}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    {r.unit}
                    {over && <Badge variant="warning">Over-allocated</Badge>}
                  </span>
                  <span className="font-medium text-foreground">{r.value}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
                  <div
                    className={cn(
                      "h-full rounded-full motion-safe:transition-[width]",
                      over ? "bg-warning" : "bg-primary",
                    )}
                    style={{ width: `${r.value}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 border-t border-border pt-3 text-xs text-muted-foreground">
          Average utilization across business units:{" "}
          <span className="font-medium text-foreground">{overallUtil}%</span>
        </p>
      </Card>
    </div>
  );
}

export default OverviewPage;
