import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ColumnDef } from "@tanstack/react-table";
import {
  Area,
  AreaChart,
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
import {
  Banknote,
  Gauge,
  ShieldAlert,
  SlidersHorizontal,
  TrendingUp,
  Wallet,
} from "lucide-react";
import moment from "moment";
import {
  Badge,
  Card,
  ChartCard,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
  Table,
} from "../../components/elements";
import {
  cn,
  formatCompactCurrency,
} from "../../utils/helpers";
import { chartPalette } from "../../constants";
import { routes } from "../../router/routes";
import type { Status } from "../../utils/types";
import {
  allocationByType,
  allocationTotal,
  byState,
  cellLabel,
  cellTone,
  developmentTypeOptions,
  filterSegments,
  heatDimensions,
  heatmap,
  isFiltered,
  phaseOptions,
  portfolioStats,
  segmentPerformance,
  stateOptions,
  statusOptions,
  valueTrend,
  type SegmentRow,
} from "./portfolioData";

const BILLION = 1_000_000_000;

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

const segmentColumns: ColumnDef<SegmentRow, unknown>[] = [
  {
    accessorKey: "segment",
    header: "Development Segment",
    cell: (info) => (
      <span className="font-medium text-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  {
    accessorKey: "developments",
    header: "Developments",
    meta: { align: "right" },
  },
  {
    accessorKey: "value",
    header: "Portfolio Value",
    meta: { align: "right" },
    cell: (info) =>
      formatCompactCurrency((info.getValue() as number) * BILLION),
  },
  {
    id: "budgetUsed",
    header: "Budget Used",
    meta: { maxWidth: "160px" },
    cell: ({ row }) => (
      <ProgressBar value={row.original.budgetUsed} showLabel />
    ),
  },
  {
    accessorKey: "cpi",
    header: "CPI",
    meta: { align: "right" },
    cell: (info) => {
      const v = info.getValue() as number;
      return (
        <span
          className={cn(
            "font-medium",
            v >= 1 ? "text-success" : "text-danger",
          )}
        >
          {v.toFixed(2)}
        </span>
      );
    },
  },
  {
    id: "status",
    header: "Status",
    meta: { align: "right" },
    cell: ({ row }) => <StatusBadge status={row.original.status} />,
  },
];

function PortfolioPage() {
  const navigate = useNavigate();
  const [developmentType, setDevelopmentType] = useState(
    developmentTypeOptions[0],
  );
  const [state, setState] = useState(stateOptions[0]);
  const [phase, setPhase] = useState(phaseOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);

  const filters = useMemo(
    () => ({
      developmentType: developmentType.value,
      state: state.value,
      phase: phase.value,
      status: status.value,
    }),
    [developmentType, state, phase, status],
  );

  const filteredSegments = useMemo(
    () => filterSegments(segmentPerformance, filters),
    [filters],
  );

  const filtersActive = isFiltered(filters);

  const filteredDevelopments = filteredSegments.reduce(
    (sum, s) => sum + s.developments,
    0,
  );
  const filteredValue = filteredSegments.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Portfolio"
        subtitle={`Portfolio-wide visibility across active developments · Nigeria · as of ${moment().format("DD MMM YYYY")}`}
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Segment
        </span>
        <div className="w-48">
          <Select
            options={developmentTypeOptions}
            value={developmentType}
            onChange={(opt) => opt && setDevelopmentType(opt)}
            isSearchable={false}
            aria-label="Filter by development type"
          />
        </div>
        <div className="w-40">
          <Select
            options={stateOptions}
            value={state}
            onChange={(opt) => opt && setState(opt)}
            isSearchable={false}
            aria-label="Filter by state"
          />
        </div>
        <div className="w-48">
          <Select
            options={phaseOptions}
            value={phase}
            onChange={(opt) => opt && setPhase(opt)}
            isSearchable={false}
            aria-label="Filter by construction phase"
          />
        </div>
        <div className="w-44">
          <Select
            options={statusOptions}
            value={status}
            onChange={(opt) => opt && setStatus(opt)}
            isSearchable={false}
            aria-label="Filter by status"
          />
        </div>
        {filtersActive && (
          <Badge variant="info">
            {filteredSegments.length} segment
            {filteredSegments.length !== 1 ? "s" : ""} ·{" "}
            {filteredDevelopments} developments ·{" "}
            {formatCompactCurrency(filteredValue * BILLION)}
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Total Portfolio Value"
          value={formatCompactCurrency(portfolioStats.totalValue)}
          icon={Wallet}
          tone="primary"
          trend={{ value: "+6.4% YoY", positive: true }}
          to={routes.PROJECTS}
        />
        <StatCard
          label="Development Cost Committed"
          value={formatCompactCurrency(portfolioStats.costCommitted)}
          icon={Banknote}
          tone="info"
          hint={`${portfolioStats.costCommittedPct}% of portfolio value`}
          to={routes.PROJECTS}
        />
        <StatCard
          label="Property Sales Revenue"
          value={formatCompactCurrency(portfolioStats.salesRevenue)}
          icon={TrendingUp}
          tone="success"
          trend={{ value: "+9.1% YTD", positive: true }}
          to={routes.REPORTS}
        />
        <StatCard
          label="Cost Performance (CPI)"
          value={portfolioStats.cpi.toFixed(2)}
          icon={Gauge}
          tone="warning"
          hint="Target ≥ 1.00"
        />
        <StatCard
          label="Site Risk Level"
          value={portfolioStats.riskLevel}
          icon={ShieldAlert}
          tone="warning"
          hint={`${portfolioStats.criticalRisks} critical site risks open`}
          to={routes.RISKS}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ChartCard
          title="Portfolio Value Trend"
          className="lg:col-span-2"
          height={280}
        >
          <AreaChart data={valueTrend}>
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
              formatter={(v: number) => [
                formatCompactCurrency(v * BILLION),
                "Portfolio value",
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartPalette.primary}
              strokeWidth={2}
              fill={chartPalette.primary}
              fillOpacity={0.12}
            />
          </AreaChart>
        </ChartCard>

        <Card title="Allocation by Development Type">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={allocationByType}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
              >
                {allocationByType.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={
                      chartPalette.series[index % chartPalette.series.length]
                    }
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [
                  formatCompactCurrency(v * BILLION),
                  "",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-col gap-2">
            {allocationByType.map((item, index) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <span className="flex items-center gap-2 text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor:
                        chartPalette.series[index % chartPalette.series.length],
                    }}
                  />
                  {item.name}
                </span>
                <span className="text-foreground">
                  <span className="font-medium">
                    {formatCompactCurrency(item.value * BILLION)}
                  </span>
                  <span className="ml-1.5 text-xs text-muted-foreground">
                    {Math.round((item.value / allocationTotal) * 100)}%
                  </span>
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ChartCard title="Developments by State" height={280}>
          <BarChart data={byState}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={chartPalette.grid}
            />
            <XAxis
              dataKey="name"
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
            <Bar dataKey="value" name="Developments" radius={[4, 4, 0, 0]}>
              {byState.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartPalette.series[index % chartPalette.series.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <Card title="Construction Health Matrix">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground">
                    Development Type
                  </th>
                  {heatDimensions.map((dim) => (
                    <th
                      key={dim}
                      className="px-2 py-2 text-center font-medium text-muted-foreground"
                    >
                      {dim}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {heatmap.map((row) => (
                  <tr key={row.unit}>
                    <td className="whitespace-nowrap px-2 py-1.5 font-medium text-foreground">
                      {row.unit}
                    </td>
                    {heatDimensions.map((dim) => (
                      <td key={dim} className="px-1 py-1.5">
                        <div
                          className={cn(
                            "rounded-md px-2 py-1.5 text-center text-xs font-medium",
                            cellTone[row.values[dim]],
                          )}
                          title={`${row.unit} · ${dim}: ${cellLabel[row.values[dim]]}`}
                        >
                          {cellLabel[row.values[dim]]}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border pt-3 text-xs text-muted-foreground">
            {(["green", "amber", "red"] as Status[]).map((s) => (
              <span key={s} className="flex items-center gap-1.5">
                <span
                  className={cn("h-2.5 w-2.5 rounded-full", cellTone[s])}
                  aria-hidden
                />
                {cellLabel[s]}
              </span>
            ))}
          </div>
        </Card>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">
            Segment Performance
          </h2>
          {filtersActive && (
            <p className="text-xs text-muted-foreground">
              Showing {filteredSegments.length} of {segmentPerformance.length}{" "}
              segments
            </p>
          )}
        </div>
        <Table<SegmentRow>
          columns={segmentColumns}
          data={filteredSegments}
          onRowClick={() => navigate(routes.PROJECTS)}
          emptyMessage="No segments match the current filters."
        />
        <p className="text-xs text-muted-foreground">
          Source: PMO · Updated {moment().format("DD MMM YYYY")}
        </p>
      </div>
    </div>
  );
}

export default PortfolioPage;
