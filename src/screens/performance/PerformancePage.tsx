import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Banknote, Gauge, Target, TrendingUp } from "lucide-react";
import {
  Badge,
  Card,
  ChartCard,
  PageHeader,
  ProgressBar,
  StatCard,
  Tabs,
  type BadgeVariant,
  type TabItem,
} from "../../components/elements";
import { cn, formatCurrency } from "../../utils/helpers";
import { chartPalette } from "../../constants";
import { projects } from "../projects/projectsData";
import {
  benefits,
  capacityForecast,
  equipment,
  performanceTotals,
  scheduleTrend,
  workforce,
} from "./performanceData";

const tabs: TabItem[] = [
  { id: "schedule", label: "Schedule" },
  { id: "financial", label: "Financial" },
  { id: "resource", label: "Resource" },
  { id: "benefits", label: "Benefits" },
];

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

const indexTone = (v: number): BadgeVariant =>
  v >= 1 ? "success" : v >= 0.9 ? "warning" : "danger";

function PerformancePage() {
  const [tab, setTab] = useState("schedule");
  const t = useMemo(() => performanceTotals(), []);

  const financialData = useMemo(
    () =>
      projects.map((p) => ({
        name: p.code,
        Budget: p.budget,
        Spent: p.spent,
        Forecast:
          p.progress > 0 ? Math.round(p.spent / (p.progress / 100)) : p.budget,
      })),
    [],
  );

  const benefitsChart = useMemo(
    () =>
      benefits.map((b) => ({
        name: b.project.split(" ")[0],
        Planned: b.plannedValue,
        Realized: b.realizedValue,
      })),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Performance Center"
        subtitle="Schedule, cost, resource, and benefits performance across the portfolio."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Schedule (SPI)"
          value={t.avgSpi.toFixed(2)}
          icon={Gauge}
          tone={t.avgSpi >= 1 ? "success" : "warning"}
          hint={t.avgSpi >= 1 ? "Ahead of plan" : "Behind plan"}
        />
        <StatCard
          label="Cost (CPI)"
          value={t.avgCpi.toFixed(2)}
          icon={Banknote}
          tone={t.avgCpi >= 1 ? "success" : "warning"}
          hint={t.avgCpi >= 1 ? "Under budget" : "Over budget"}
        />
        <StatCard
          label="Resource Utilization"
          value={`${t.avgResource}%`}
          icon={TrendingUp}
          tone={t.avgResource > 90 ? "danger" : "info"}
          hint="Portfolio average"
        />
        <StatCard
          label="Benefits Realized"
          value={`${t.benefitsPct}%`}
          icon={Target}
          tone={t.benefitsPct >= 50 ? "success" : "warning"}
          hint={`${formatCurrency(t.realizedBenefits)} of ${formatCurrency(t.plannedBenefits)}`}
        />
      </div>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "schedule" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard
            title="Planned vs Actual Progress"
            className="lg:col-span-2"
          >
            <AreaChart data={scheduleTrend}>
              <defs>
                <linearGradient id="plannedFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartPalette.blue} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartPalette.blue} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartPalette.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={chartPalette.primary} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
              <XAxis dataKey="month" stroke={chartPalette.axis} fontSize={12} />
              <YAxis stroke={chartPalette.axis} fontSize={12} unit="%" />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Area
                type="monotone"
                dataKey="planned"
                name="Planned"
                stroke={chartPalette.blue}
                fill="url(#plannedFill)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke={chartPalette.primary}
                fill="url(#actualFill)"
                strokeWidth={2}
              />
            </AreaChart>
          </ChartCard>

          <Card title="Schedule Index by Project">
            <div className="flex flex-col gap-3">
              {projects.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">
                      {p.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{p.code}</p>
                  </div>
                  <Badge variant={indexTone(p.spi)}>SPI {p.spi.toFixed(2)}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "financial" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard
            title="Budget vs Spent vs Forecast"
            className="lg:col-span-2"
          >
            <BarChart data={financialData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
              <XAxis dataKey="name" stroke={chartPalette.axis} fontSize={12} />
              <YAxis
                stroke={chartPalette.axis}
                fontSize={12}
                tickFormatter={(v) => `${v / 1_000_000}M`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => formatCurrency(v)}
              />
              <Legend />
              <Bar dataKey="Budget" fill={chartPalette.blue} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Spent" fill={chartPalette.primary} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Forecast" fill={chartPalette.amber} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>

          <Card title="Cost Summary">
            <dl className="flex flex-col divide-y divide-border">
              <SummaryRow label="Approved budget" value={formatCurrency(t.budget)} />
              <SummaryRow label="Actual spend" value={formatCurrency(t.spent)} />
              <SummaryRow
                label="Forecast at completion"
                value={formatCurrency(t.forecast)}
              />
              <div className="flex items-center justify-between py-3">
                <dt className="text-sm text-muted-foreground">Cost variance</dt>
                <dd>
                  <Badge variant={t.costVariance >= 0 ? "success" : "danger"}>
                    {t.costVariance >= 0 ? "+" : "−"}
                    {formatCurrency(Math.abs(t.costVariance))}
                  </Badge>
                </dd>
              </div>
            </dl>
            <p className="mt-3 text-xs text-muted-foreground">
              Forecast extrapolated from spend-to-date against reported progress.
            </p>
          </Card>
        </div>
      )}

      {tab === "resource" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard title="Capacity Forecast" className="lg:col-span-2">
            <LineChart data={capacityForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
              <XAxis dataKey="month" stroke={chartPalette.axis} fontSize={12} />
              <YAxis stroke={chartPalette.axis} fontSize={12} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend />
              <Line
                type="monotone"
                dataKey="demand"
                name="Demand (FTE)"
                stroke={chartPalette.primary}
                strokeWidth={2}
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="capacity"
                name="Capacity (FTE)"
                stroke={chartPalette.success}
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ChartCard>

          <Card title="Workforce Allocation">
            <div className="flex flex-col gap-3">
              {workforce.map((w) => {
                const pct = Math.round((w.allocated / w.capacity) * 100);
                const over = w.allocated > w.capacity;
                return (
                  <div key={w.unit}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-foreground">{w.unit}</span>
                      <span
                        className={cn(
                          "text-xs",
                          over ? "text-danger" : "text-muted-foreground",
                        )}
                      >
                        {w.allocated}/{w.capacity} {over && "· over"}
                      </span>
                    </div>
                    <ProgressBar value={pct} />
                  </div>
                );
              })}
            </div>
          </Card>

          <Card title="Equipment Utilization" className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {equipment.map((e) => (
                <div
                  key={e.name}
                  className="rounded-lg border border-border p-4"
                >
                  <p className="text-sm text-muted-foreground">{e.name}</p>
                  <p className="mb-2 mt-1 text-xl font-semibold text-foreground">
                    {e.utilization}%
                  </p>
                  <ProgressBar value={e.utilization} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {tab === "benefits" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ChartCard
            title="Planned vs Realized Benefits"
            className="lg:col-span-2"
          >
            <BarChart data={benefitsChart}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartPalette.grid} />
              <XAxis dataKey="name" stroke={chartPalette.axis} fontSize={12} />
              <YAxis
                stroke={chartPalette.axis}
                fontSize={12}
                tickFormatter={(v) => `${v / 1_000_000}M`}
              />
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => formatCurrency(v)}
              />
              <Legend />
              <Bar dataKey="Planned" fill={chartPalette.violet} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Realized" fill={chartPalette.teal} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ChartCard>

          <Card title="Value Realization & ROI">
            <div className="flex flex-col gap-4">
              {benefits.map((b) => {
                const pct =
                  b.plannedValue > 0
                    ? Math.round((b.realizedValue / b.plannedValue) * 100)
                    : 0;
                return (
                  <div key={b.project}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-foreground">
                          {b.project}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {b.metric}
                        </p>
                      </div>
                      <Badge
                        variant={
                          b.status === "At Risk"
                            ? "warning"
                            : b.status === "Realized"
                              ? "success"
                              : "info"
                        }
                      >
                        ROI {b.roi}%
                      </Badge>
                    </div>
                    <div className="mt-1.5">
                      <ProgressBar value={pct} showLabel />
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3">
      <dt className="text-sm text-muted-foreground">{label}</dt>
      <dd className="text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

export default PerformancePage;
