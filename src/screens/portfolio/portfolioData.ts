import type { Status } from "../../utils/types";

export const filterOption = (label: string) => ({
  label,
  value: label.toLowerCase(),
});

export const developmentTypeOptions = [
  filterOption("All development types"),
  filterOption("Residential"),
  filterOption("Commercial"),
  filterOption("Mixed-Use"),
  filterOption("Infrastructure"),
];

export const stateOptions = [
  filterOption("All states"),
  filterOption("Rivers State"),
  filterOption("Lagos"),
  filterOption("Abuja"),
  filterOption("Uyo"),
];

export const phaseOptions = [
  filterOption("All phases"),
  filterOption("Site Preparation"),
  filterOption("Structural Development"),
  filterOption("Roofing Stage"),
  filterOption("Finishing Stage"),
  filterOption("Handover Preparation"),
];

export const statusOptions = [
  filterOption("All statuses"),
  filterOption("On Track"),
  filterOption("Attention"),
  filterOption("Critical"),
];

export const statusFilterToStatus: Record<string, Status | null> = {
  "all statuses": null,
  "on track": "green",
  attention: "amber",
  critical: "red",
};

export interface PortfolioStats {
  totalValue: number;
  costCommitted: number;
  salesRevenue: number;
  cpi: number;
  riskLevel: string;
  criticalRisks: number;
  costCommittedPct: number;
}

export const portfolioStats: PortfolioStats = {
  totalValue: 48_200_000_000,
  costCommitted: 31_500_000_000,
  salesRevenue: 12_800_000_000,
  cpi: 0.98,
  riskLevel: "Medium",
  criticalRisks: 3,
  costCommittedPct: 65,
};

/** Portfolio value trend — billions NGN. */
export const valueTrend = [
  { month: "Jan", value: 42.1 },
  { month: "Feb", value: 43.6 },
  { month: "Mar", value: 44.9 },
  { month: "Apr", value: 46.2 },
  { month: "May", value: 47.1 },
  { month: "Jun", value: 48.2 },
];

export const allocationByType = [
  { name: "Residential", value: 22.4 },
  { name: "Commercial", value: 9.8 },
  { name: "Mixed-Use", value: 8.2 },
  { name: "Infrastructure", value: 4.1 },
  { name: "Land Bank", value: 3.7 },
];

export const allocationTotal = allocationByType.reduce(
  (sum, a) => sum + a.value,
  0,
);

export const byState = [
  { name: "Rivers State", value: 24 },
  { name: "Lagos", value: 2 },
  { name: "Abuja", value: 1 },
  { name: "Uyo", value: 1 },
];

export const heatDimensions = [
  "Schedule",
  "Budget",
  "Quality",
  "Site Risk",
] as const;

export type HeatDimension = (typeof heatDimensions)[number];

export const cellTone: Record<Status, string> = {
  green: "bg-success/15 text-success",
  amber: "bg-warning/15 text-warning",
  red: "bg-danger/15 text-danger",
};

export const cellLabel: Record<Status, string> = {
  green: "Good",
  amber: "Watch",
  red: "At risk",
};

export interface SegmentRow {
  id: string;
  segment: string;
  developments: number;
  /** Portfolio value in billions NGN. */
  value: number;
  budgetUsed: number;
  cpi: number;
  status: Status;
  developmentType: string;
  state: string;
  phase: string;
}

export const segmentPerformance: SegmentRow[] = [
  {
    id: "res-ph",
    segment: "Residential · Rivers State",
    developments: 14,
    value: 22.4,
    budgetUsed: 85,
    cpi: 1.02,
    status: "green",
    developmentType: "residential",
    state: "rivers state",
    phase: "finishing stage",
  },
  {
    id: "com-ph",
    segment: "Commercial · Rivers State",
    developments: 6,
    value: 9.8,
    budgetUsed: 78,
    cpi: 0.97,
    status: "amber",
    developmentType: "commercial",
    state: "rivers state",
    phase: "structural development",
  },
  {
    id: "mix-ph",
    segment: "Mixed-Use · Rivers State",
    developments: 5,
    value: 8.2,
    budgetUsed: 91,
    cpi: 0.94,
    status: "red",
    developmentType: "mixed-use",
    state: "rivers state",
    phase: "roofing stage",
  },
  {
    id: "infra-ph",
    segment: "Infrastructure · Rivers State",
    developments: 2,
    value: 4.1,
    budgetUsed: 63,
    cpi: 1.05,
    status: "green",
    developmentType: "infrastructure",
    state: "rivers state",
    phase: "structural development",
  },
  {
    id: "res-lag",
    segment: "Residential · Lagos",
    developments: 2,
    value: 3.7,
    budgetUsed: 80,
    cpi: 0.99,
    status: "amber",
    developmentType: "residential",
    state: "lagos",
    phase: "site preparation",
  },
];

export const heatmap: {
  unit: string;
  values: Record<HeatDimension, Status>;
}[] = [
  {
    unit: "Residential",
    values: {
      Schedule: "green",
      Budget: "amber",
      Quality: "green",
      "Site Risk": "green",
    },
  },
  {
    unit: "Commercial",
    values: {
      Schedule: "green",
      Budget: "green",
      Quality: "amber",
      "Site Risk": "amber",
    },
  },
  {
    unit: "Mixed-Use",
    values: {
      Schedule: "amber",
      Budget: "red",
      Quality: "amber",
      "Site Risk": "red",
    },
  },
  {
    unit: "Infrastructure",
    values: {
      Schedule: "green",
      Budget: "green",
      Quality: "green",
      "Site Risk": "green",
    },
  },
  {
    unit: "Land Bank",
    values: {
      Schedule: "amber",
      Budget: "green",
      Quality: "green",
      "Site Risk": "amber",
    },
  },
];

export function filterSegments(
  rows: SegmentRow[],
  filters: {
    developmentType: string;
    state: string;
    phase: string;
    status: string;
  },
): SegmentRow[] {
  return rows.filter((row) => {
    if (
      filters.developmentType !== "all development types" &&
      row.developmentType !== filters.developmentType
    ) {
      return false;
    }
    if (filters.state !== "all states" && row.state !== filters.state) {
      return false;
    }
    if (filters.phase !== "all phases" && row.phase !== filters.phase) {
      return false;
    }
    const statusMatch = statusFilterToStatus[filters.status];
    if (statusMatch && row.status !== statusMatch) {
      return false;
    }
    return true;
  });
}

export function isFiltered(filters: {
  developmentType: string;
  state: string;
  phase: string;
  status: string;
}): boolean {
  return (
    filters.developmentType !== "all development types" ||
    filters.state !== "all states" ||
    filters.phase !== "all phases" ||
    filters.status !== "all statuses"
  );
}
