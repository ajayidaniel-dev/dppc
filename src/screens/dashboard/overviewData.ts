import { chartPalette } from "../../constants";
import { projectDetailsPath, routes } from "../../router/routes";
import type { Status } from "../../utils/types";

export type Period = "month" | "quarter" | "ytd";

export const periodOptions = [
  { label: "This month", value: "month" as Period },
  { label: "This quarter", value: "quarter" as Period },
  { label: "Year to date", value: "ytd" as Period },
];

export interface AttentionItem {
  project: string;
  type: string;
  location: string;
  reason: string;
  status: Status;
  to: string;
}

export interface HandoverItem {
  name: string;
  project: string;
  location: string;
  phase: string;
  owner: string;
  due: string;
  eta: string;
  units: number;
  status: Status;
  projectId: number;
}

export interface PeriodMetrics {
  totalBudget: number;
  spent: number;
  variancePct: number;
  varianceLabel: "Under plan" | "Over plan";
  utilization: number;
  budgetChart: { month: string; planned: number; actual: number }[];
  activeDevelopments: number;
  activeTrend: string;
  unitsDelivered: number;
  unitsTrend: string;
  atRisk: number;
  atRiskTrend: string;
  upcomingHandovers: number;
  mitigatedRisks: number;
}

/** Chart values are cumulative spend in billions NGN. */
export const metricsByPeriod: Record<Period, PeriodMetrics> = {
  month: {
    totalBudget: 48_200_000_000,
    spent: 4_800_000_000,
    variancePct: 2.1,
    varianceLabel: "Under plan",
    utilization: 84,
    budgetChart: [
      { month: "Wk 1", planned: 0.9, actual: 0.85 },
      { month: "Wk 2", planned: 1.8, actual: 1.7 },
      { month: "Wk 3", planned: 2.7, actual: 2.55 },
      { month: "Wk 4", planned: 3.6, actual: 3.4 },
    ],
    activeDevelopments: 28,
    activeTrend: "+1 this month",
    unitsDelivered: 842,
    unitsTrend: "+6 this month",
    atRisk: 3,
    atRiskTrend: "No change",
    upcomingHandovers: 9,
    mitigatedRisks: 4,
  },
  quarter: {
    totalBudget: 48_200_000_000,
    spent: 14_200_000_000,
    variancePct: 2.8,
    varianceLabel: "Under plan",
    utilization: 87,
    budgetChart: [
      { month: "Apr", planned: 9.8, actual: 9.2 },
      { month: "May", planned: 12.1, actual: 11.4 },
      { month: "Jun", planned: 14.8, actual: 14.2 },
    ],
    activeDevelopments: 28,
    activeTrend: "+3 this quarter",
    unitsDelivered: 842,
    unitsTrend: "+18 this quarter",
    atRisk: 3,
    atRiskTrend: "+1 this quarter",
    upcomingHandovers: 9,
    mitigatedRisks: 12,
  },
  ytd: {
    totalBudget: 48_200_000_000,
    spent: 40_500_000_000,
    variancePct: 3.2,
    varianceLabel: "Under plan",
    utilization: 84,
    budgetChart: [
      { month: "Jan", planned: 6.2, actual: 5.9 },
      { month: "Feb", planned: 12.8, actual: 12.1 },
      { month: "Mar", planned: 19.5, actual: 18.6 },
      { month: "Apr", planned: 28.4, actual: 27.0 },
      { month: "May", planned: 38.1, actual: 34.8 },
      { month: "Jun", planned: 48.2, actual: 40.5 },
    ],
    activeDevelopments: 28,
    activeTrend: "+3 this quarter",
    unitsDelivered: 842,
    unitsTrend: "+48 YTD",
    atRisk: 3,
    atRiskTrend: "+1 this week",
    upcomingHandovers: 9,
    mitigatedRisks: 18,
  },
};

export const attentionItems: AttentionItem[] = [
  {
    project: "Emerald Gardens Estate",
    type: "Residential",
    location: "GRA Phase 2",
    reason: "Finishing stage — development cost +12% vs approved budget",
    status: "red",
    to: projectDetailsPath(1),
  },
  {
    project: "Atlantic View Residences",
    type: "Mixed-Use",
    location: "Trans Amadi",
    reason: "Roofing stage milestone slipped 3 weeks",
    status: "red",
    to: projectDetailsPath(3),
  },
  {
    project: "Royal Crest Apartments",
    type: "Commercial",
    location: "Ada George",
    reason: "Unmitigated high-severity site risk open 21 days",
    status: "amber",
    to: projectDetailsPath(6),
  },
];

export const TOTAL_DEVELOPMENTS = 28;

export const pipelinePhases = [
  { name: "Site Preparation", value: 4, color: chartPalette.teal },
  { name: "Structural Development", value: 8, color: chartPalette.primary },
  { name: "Finishing Stage", value: 9, color: chartPalette.warning },
  { name: "Handover Preparation", value: 4, color: chartPalette.primarySoft },
  { name: "Completed", value: 3, color: chartPalette.success },
];

export const riskSummary: { label: string; count: number; barClass: string }[] = [
  { label: "Critical", count: 3, barClass: "bg-danger" },
  { label: "High", count: 8, barClass: "bg-warning" },
  { label: "Medium", count: 14, barClass: "bg-info" },
  { label: "Low", count: 9, barClass: "bg-success" },
];

export const maxRisk = Math.max(...riskSummary.map((r) => r.count));
export const openRisks = riskSummary.reduce((sum, r) => sum + r.count, 0);

export const handovers: HandoverItem[] = [
  {
    name: "Block A — Phase 1 Handover",
    project: "Emerald Gardens Estate",
    location: "GRA Phase 2",
    phase: "Finishing Stage",
    owner: "Amara Bello",
    due: "24 Jun",
    eta: "in 6 days",
    units: 48,
    status: "green",
    projectId: 1,
  },
  {
    name: "Tower B — Shell & Core Handover",
    project: "Atlantic View Residences",
    location: "Trans Amadi",
    phase: "Roofing Stage",
    owner: "Stephen Okoro",
    due: "28 Jun",
    eta: "in 10 days",
    units: 72,
    status: "amber",
    projectId: 3,
  },
  {
    name: "Retail Wing — Fit-out Complete",
    project: "Royal Crest Apartments",
    location: "Ada George",
    phase: "Handover Preparation",
    owner: "Daniel Ajayi",
    due: "02 Jul",
    eta: "in 14 days",
    units: 16,
    status: "red",
    projectId: 6,
  },
  {
    name: "Greenfield Scheme — Block C",
    project: "Greenfield Housing Scheme",
    location: "Obio-Akpor",
    phase: "Infrastructure Installation",
    owner: "Tunde Okafor",
    due: "08 Jul",
    eta: "in 20 days",
    units: 36,
    status: "green",
    projectId: 1,
  },
];

export const contractorCapacity: { trade: string; value: number }[] = [
  { trade: "Structural works", value: 92 },
  { trade: "MEP / infrastructure", value: 78 },
  { trade: "Finishing & fit-out", value: 64 },
  { trade: "Sales & marketing", value: 85 },
];

export const overallCapacity = Math.round(
  contractorCapacity.reduce((sum, r) => sum + r.value, 0) /
    contractorCapacity.length,
);

export const risksRoute = routes.RISKS;
export const milestonesRoute = routes.MILESTONES;
export const projectsRoute = routes.PROJECTS;
