import { projects } from "../projects/projectsData";

export interface SchedulePoint {
  month: string;
  planned: number;
  actual: number;
}

/** Cumulative portfolio construction progress vs plan (%). */
export const scheduleTrend: SchedulePoint[] = [
  { month: "Apr", planned: 12, actual: 11 },
  { month: "May", planned: 22, actual: 19 },
  { month: "Jun", planned: 33, actual: 28 },
  { month: "Jul", planned: 44, actual: 38 },
  { month: "Aug", planned: 55, actual: 47 },
  { month: "Sep", planned: 64, actual: 54 },
];

export interface SalesRecord {
  project: string;
  code: string;
  metric: string;
  plannedValue: number;
  realizedValue: number;
  roi: number;
  status: "On Track" | "At Risk" | "Realized";
}

/** Property sales and investment performance by development (NGN). */
export const salesPerformance: SalesRecord[] = [
  {
    project: "Emerald Gardens Estate",
    code: "DEV-001",
    metric: "Property sales revenue",
    plannedValue: 18_000_000_000,
    realizedValue: 12_600_000_000,
    roi: 24,
    status: "On Track",
  },
  {
    project: "Greenfield Housing Scheme",
    code: "DEV-002",
    metric: "Off-plan unit sales (180 units)",
    plannedValue: 8_200_000_000,
    realizedValue: 3_280_000_000,
    roi: 12,
    status: "At Risk",
  },
  {
    project: "Atlantic View Residences",
    code: "DEV-003",
    metric: "Pre-sales & retail leasing",
    plannedValue: 22_000_000_000,
    realizedValue: 6_600_000_000,
    roi: 8,
    status: "At Risk",
  },
  {
    project: "Riverside Commercial Complex",
    code: "DEV-004",
    metric: "Commercial lettings revenue",
    plannedValue: 6_500_000_000,
    realizedValue: 4_550_000_000,
    roi: 19,
    status: "On Track",
  },
  {
    project: "Woji Estate Extension",
    code: "DEV-005",
    metric: "Phase 2 unit sales",
    plannedValue: 4_800_000_000,
    realizedValue: 2_880_000_000,
    roi: 16,
    status: "On Track",
  },
  {
    project: "Royal Crest Apartments",
    code: "DEV-006",
    metric: "Corporate tenant pre-letting",
    plannedValue: 9_100_000_000,
    realizedValue: 910_000_000,
    roi: 4,
    status: "At Risk",
  },
];

export interface ContractorCrew {
  trade: string;
  allocated: number;
  capacity: number;
}

/** On-site contractor crews allocated vs available capacity. */
export const contractorCrews: ContractorCrew[] = [
  { trade: "Structural works", allocated: 142, capacity: 155 },
  { trade: "MEP / infrastructure", allocated: 98, capacity: 126 },
  { trade: "Finishing & fit-out", allocated: 88, capacity: 138 },
  { trade: "Site management", allocated: 36, capacity: 40 },
  { trade: "Sales & marketing", allocated: 28, capacity: 32 },
];

export interface EquipmentRecord {
  name: string;
  utilization: number;
}

export const siteEquipment: EquipmentRecord[] = [
  { name: "Heavy plant & cranes", utilization: 91 },
  { name: "Survey & instrumentation", utilization: 64 },
  { name: "Fleet & logistics", utilization: 78 },
  { name: "Site offices & power", utilization: 55 },
];

export interface CapacityPoint {
  month: string;
  demand: number;
  capacity: number;
}

/** Contractor crew demand vs capacity forecast. */
export const crewCapacityForecast: CapacityPoint[] = [
  { month: "Oct", demand: 420, capacity: 450 },
  { month: "Nov", demand: 445, capacity: 450 },
  { month: "Dec", demand: 468, capacity: 450 },
  { month: "Jan", demand: 482, capacity: 460 },
  { month: "Feb", demand: 455, capacity: 480 },
  { month: "Mar", demand: 438, capacity: 480 },
];

const round2 = (n: number) => Math.round(n * 100) / 100;

export const performanceTotals = () => {
  const budget = projects.reduce((s, p) => s + p.budget, 0);
  const spent = projects.reduce((s, p) => s + p.spent, 0);
  const forecast = projects.reduce(
    (s, p) =>
      s + (p.progress > 0 ? Math.round(p.spent / (p.progress / 100)) : p.budget),
    0,
  );
  const avgSpi = round2(
    projects.reduce((s, p) => s + p.spi, 0) / projects.length,
  );
  const avgCpi = round2(
    projects.reduce((s, p) => s + p.cpi, 0) / projects.length,
  );
  const avgContractorCapacity = Math.round(
    contractorCrews.reduce(
      (s, c) => s + Math.round((c.allocated / c.capacity) * 100),
      0,
    ) / contractorCrews.length,
  );
  const plannedSales = salesPerformance.reduce((s, b) => s + b.plannedValue, 0);
  const realizedSales = salesPerformance.reduce(
    (s, b) => s + b.realizedValue,
    0,
  );
  const salesPct = Math.round((realizedSales / plannedSales) * 100);
  return {
    budget,
    spent,
    forecast,
    costVariance: budget - forecast,
    avgSpi,
    avgCpi,
    avgContractorCapacity,
    plannedSales,
    realizedSales,
    salesPct,
  };
};
