import { useState } from "react";
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
  Card,
  ChartCard,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
  Table,
} from "../../components/elements";
import { formatCurrency, cn } from "../../utils/helpers";
import { chartPalette } from "../../constants";
import { routes } from "../../router/routes";
import type { Status } from "../../utils/types";

const filterOption = (label: string) => ({ label, value: label.toLowerCase() });

const businessUnitOptions = [
  filterOption("All business units"),
  filterOption("Engineering"),
  filterOption("IT"),
  filterOption("Operations"),
  filterOption("Facilities"),
  filterOption("R&D"),
];
const regionOptions = [
  filterOption("All regions"),
  filterOption("North"),
  filterOption("South"),
  filterOption("EMEA"),
  filterOption("APAC"),
];
const statusOptions = [
  filterOption("All statuses"),
  filterOption("On Track"),
  filterOption("Attention"),
  filterOption("Critical"),
];
const departmentOptions = [
  filterOption("All departments"),
  filterOption("Delivery"),
  filterOption("Technology"),
  filterOption("Commercial"),
  filterOption("Corporate Services"),
];
const projectTypeOptions = [
  filterOption("All types"),
  filterOption("Capital"),
  filterOption("Transformation"),
  filterOption("Maintenance"),
  filterOption("Strategic"),
];
const sponsorOptions = [
  filterOption("All sponsors"),
  filterOption("Office of the CFO"),
  filterOption("Infrastructure Division"),
  filterOption("Energy Division"),
  filterOption("Digital Experience"),
  filterOption("Maritime Division"),
];

const valueTrend = [
  { month: "Jan", value: 42.1 },
  { month: "Feb", value: 43.6 },
  { month: "Mar", value: 44.9 },
  { month: "Apr", value: 46.2 },
  { month: "May", value: 47.1 },
  { month: "Jun", value: 48.2 },
];

const byBusinessUnit = [
  { name: "Engineering", value: 12 },
  { name: "IT", value: 8 },
  { name: "Operations", value: 6 },
  { name: "Facilities", value: 4 },
  { name: "R&D", value: 3 },
];

const allocation = [
  { name: "Engineering", value: 14.2 },
  { name: "IT", value: 9.8 },
  { name: "Operations", value: 7.5 },
  { name: "Facilities", value: 4.1 },
  { name: "R&D", value: 3.9 },
];
const allocationTotal = allocation.reduce((sum, a) => sum + a.value, 0);

const heatDimensions = ["Schedule", "Budget", "Scope", "Risk"] as const;
type HeatDimension = (typeof heatDimensions)[number];

const heatmap: { unit: string; values: Record<HeatDimension, Status> }[] = [
  {
    unit: "Engineering",
    values: { Schedule: "green", Budget: "amber", Scope: "green", Risk: "green" },
  },
  {
    unit: "IT",
    values: { Schedule: "green", Budget: "green", Scope: "amber", Risk: "amber" },
  },
  {
    unit: "Operations",
    values: { Schedule: "amber", Budget: "red", Scope: "amber", Risk: "red" },
  },
  {
    unit: "Facilities",
    values: { Schedule: "green", Budget: "green", Scope: "green", Risk: "green" },
  },
  {
    unit: "R&D",
    values: { Schedule: "amber", Budget: "green", Scope: "green", Risk: "amber" },
  },
];

const cellTone: Record<Status, string> = {
  green: "bg-success/15 text-success",
  amber: "bg-warning/15 text-warning",
  red: "bg-danger/15 text-danger",
};
const cellLabel: Record<Status, string> = {
  green: "Good",
  amber: "Watch",
  red: "At risk",
};

interface UnitRow {
  id: string;
  unit: string;
  projects: number;
  value: number;
  budgetUsed: number;
  performance: number;
  status: Status;
}

const unitPerformance: UnitRow[] = [
  { id: "eng", unit: "Engineering", projects: 12, value: 14.2, budgetUsed: 88, performance: 1.02, status: "green" },
  { id: "it", unit: "IT", projects: 8, value: 9.8, budgetUsed: 74, performance: 0.97, status: "amber" },
  { id: "ops", unit: "Operations", projects: 6, value: 7.5, budgetUsed: 91, performance: 0.94, status: "red" },
  { id: "fac", unit: "Facilities", projects: 4, value: 4.1, budgetUsed: 63, performance: 1.05, status: "green" },
  { id: "rnd", unit: "R&D", projects: 3, value: 3.9, budgetUsed: 80, performance: 0.99, status: "amber" },
];

const tooltipStyle = {
  background: "var(--color-surface)",
  border: "1px solid var(--color-border)",
  borderRadius: 8,
  color: "var(--color-foreground)",
};

const unitColumns: ColumnDef<UnitRow, any>[] = [
  {
    accessorKey: "unit",
    header: "Business Unit",
    cell: (info) => (
      <span className="font-medium text-foreground">
        {info.getValue() as string}
      </span>
    ),
  },
  { accessorKey: "projects", header: "Projects", meta: { align: "right" } },
  {
    accessorKey: "value",
    header: "Value",
    meta: { align: "right" },
    cell: (info) => formatCurrency((info.getValue() as number) * 1_000_000),
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
    accessorKey: "performance",
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
  const [businessUnit, setBusinessUnit] = useState(businessUnitOptions[0]);
  const [region, setRegion] = useState(regionOptions[0]);
  const [status, setStatus] = useState(statusOptions[0]);
  const [department, setDepartment] = useState(departmentOptions[0]);
  const [projectType, setProjectType] = useState(projectTypeOptions[0]);
  const [sponsor, setSponsor] = useState(sponsorOptions[0]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Portfolio Overview"
        subtitle={`Portfolio-wide visibility across all active projects · as of ${moment().format("DD MMM YYYY")}`}
      />

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3 shadow-sm">
        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          Segment
        </span>
        <div className="w-48">
          <Select
            options={businessUnitOptions}
            value={businessUnit}
            onChange={(opt) => opt && setBusinessUnit(opt)}
            isSearchable={false}
            aria-label="Filter by business unit"
          />
        </div>
        <div className="w-40">
          <Select
            options={regionOptions}
            value={region}
            onChange={(opt) => opt && setRegion(opt)}
            isSearchable={false}
            aria-label="Filter by region"
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
        <div className="w-48">
          <Select
            options={departmentOptions}
            value={department}
            onChange={(opt) => opt && setDepartment(opt)}
            isSearchable={false}
            aria-label="Filter by department"
          />
        </div>
        <div className="w-44">
          <Select
            options={projectTypeOptions}
            value={projectType}
            onChange={(opt) => opt && setProjectType(opt)}
            isSearchable={false}
            aria-label="Filter by project type"
          />
        </div>
        <div className="w-52">
          <Select
            options={sponsorOptions}
            value={sponsor}
            onChange={(opt) => opt && setSponsor(opt)}
            isSearchable={false}
            aria-label="Filter by sponsor"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard
          label="Total Portfolio Value"
          value={formatCurrency(48_200_000)}
          icon={Wallet}
          tone="primary"
          trend={{ value: "+6.4% YoY", positive: true }}
          to={routes.PROJECTS}
        />
        <StatCard
          label="Budget Allocation"
          value={formatCurrency(31_500_000)}
          icon={Banknote}
          tone="info"
          hint="65% of total value"
          to={routes.PROJECTS}
        />
        <StatCard
          label="Revenue Contribution"
          value={formatCurrency(12_800_000)}
          icon={TrendingUp}
          tone="success"
          trend={{ value: "+9.1% YTD", positive: true }}
          to={routes.REPORTS}
        />
        <StatCard
          label="Performance Index"
          value="0.98"
          icon={Gauge}
          tone="warning"
          hint="CPI · target ≥ 1.00"
        />
        <StatCard
          label="Risk Index"
          value="Medium"
          icon={ShieldAlert}
          tone="warning"
          hint="3 critical risks open"
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
              tickFormatter={(v) => `$${v}M`}
            />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ opacity: 0.1 }}
              formatter={(v: number) => [`$${v}M`, "Value"]}
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

        <Card title="Budget Allocation">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={allocation}
                dataKey="value"
                nameKey="name"
                innerRadius={58}
                outerRadius={88}
                paddingAngle={2}
              >
                {allocation.map((entry, index) => (
                  <Cell
                    key={entry.name}
                    fill={chartPalette.series[index % chartPalette.series.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={tooltipStyle}
                formatter={(v: number) => [`$${v}M`, ""]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-3 flex flex-col gap-2">
            {allocation.map((item, index) => (
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
                  <span className="font-medium">${item.value}M</span>
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
        <ChartCard title="Projects by Business Unit" height={280}>
          <BarChart data={byBusinessUnit}>
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {byBusinessUnit.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={chartPalette.series[index % chartPalette.series.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ChartCard>

        <Card title="Health Matrix">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr>
                  <th className="px-2 py-2 text-left font-medium text-muted-foreground">
                    Business Unit
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
        <h2 className="text-base font-semibold text-foreground">
          Business Unit Performance
        </h2>
        <Table<UnitRow>
          columns={unitColumns}
          data={unitPerformance}
          onRowClick={() => navigate(routes.PROJECTS)}
        />
      </div>
    </div>
  );
}

export default PortfolioPage;
