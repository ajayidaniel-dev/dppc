import { projects } from "../projects/projectsData";

export interface SchedulePoint {
  month: string;
  planned: number;
  actual: number;
}

/** Cumulative portfolio planned vs actual progress (%). */
export const scheduleTrend: SchedulePoint[] = [
  { month: "Apr", planned: 12, actual: 11 },
  { month: "May", planned: 22, actual: 19 },
  { month: "Jun", planned: 33, actual: 28 },
  { month: "Jul", planned: 44, actual: 38 },
  { month: "Aug", planned: 55, actual: 47 },
  { month: "Sep", planned: 64, actual: 54 },
];

export interface BenefitRecord {
  project: string;
  metric: string;
  plannedValue: number;
  realizedValue: number;
  roi: number;
  status: "On Track" | "At Risk" | "Realized";
}

export const benefits: BenefitRecord[] = [
  {
    project: "Corporate HQ Renovation",
    metric: "Facility opex savings",
    plannedValue: 430_000,
    realizedValue: 290_000,
    roi: 18,
    status: "On Track",
  },
  {
    project: "ERP Migration",
    metric: "Process efficiency",
    plannedValue: 620_000,
    realizedValue: 180_000,
    roi: 9,
    status: "At Risk",
  },
  {
    project: "Coastal Highway Phase II",
    metric: "Toll revenue (annual)",
    plannedValue: 1_900_000,
    realizedValue: 0,
    roi: 0,
    status: "At Risk",
  },
  {
    project: "Solar Microgrid Rollout",
    metric: "Diesel cost reduction",
    plannedValue: 540_000,
    realizedValue: 340_000,
    roi: 22,
    status: "On Track",
  },
  {
    project: "Customer Portal Revamp",
    metric: "Support cost avoidance",
    plannedValue: 280_000,
    realizedValue: 150_000,
    roi: 14,
    status: "On Track",
  },
  {
    project: "Harbor Terminal Upgrade",
    metric: "Throughput uplift",
    plannedValue: 2_300_000,
    realizedValue: 0,
    roi: 0,
    status: "At Risk",
  },
];

export interface WorkforceUnit {
  unit: string;
  allocated: number;
  capacity: number;
}

/** Headcount allocated vs available capacity by business unit. */
export const workforce: WorkforceUnit[] = [
  { unit: "Infrastructure", allocated: 48, capacity: 52 },
  { unit: "Energy", allocated: 26, capacity: 34 },
  { unit: "IT", allocated: 39, capacity: 40 },
  { unit: "Facilities", allocated: 18, capacity: 26 },
  { unit: "Maritime", allocated: 22, capacity: 20 },
];

export interface EquipmentRecord {
  name: string;
  utilization: number;
}

export const equipment: EquipmentRecord[] = [
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

export const capacityForecast: CapacityPoint[] = [
  { month: "Oct", demand: 150, capacity: 172 },
  { month: "Nov", demand: 168, capacity: 172 },
  { month: "Dec", demand: 178, capacity: 172 },
  { month: "Jan", demand: 184, capacity: 172 },
  { month: "Feb", demand: 175, capacity: 180 },
  { month: "Mar", demand: 166, capacity: 180 },
];

const round2 = (n: number) => Math.round(n * 100) / 100;

export const performanceTotals = () => {
  const budget = projects.reduce((s, p) => s + p.budget, 0);
  const spent = projects.reduce((s, p) => s + p.spent, 0);
  const forecast = projects.reduce(
    (s, p) => s + (p.progress > 0 ? Math.round(p.spent / (p.progress / 100)) : p.budget),
    0,
  );
  const avgSpi = round2(
    projects.reduce((s, p) => s + p.spi, 0) / projects.length,
  );
  const avgCpi = round2(
    projects.reduce((s, p) => s + p.cpi, 0) / projects.length,
  );
  const avgResource = Math.round(
    projects.reduce((s, p) => s + p.resourceUtil, 0) / projects.length,
  );
  const plannedBenefits = benefits.reduce((s, b) => s + b.plannedValue, 0);
  const realizedBenefits = benefits.reduce((s, b) => s + b.realizedValue, 0);
  const benefitsPct = Math.round((realizedBenefits / plannedBenefits) * 100);
  return {
    budget,
    spent,
    forecast,
    costVariance: budget - forecast,
    avgSpi,
    avgCpi,
    avgResource,
    plannedBenefits,
    realizedBenefits,
    benefitsPct,
  };
};
