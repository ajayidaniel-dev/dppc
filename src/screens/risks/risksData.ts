import type { Status } from "../../utils/types";

export type Level = "Low" | "Medium" | "High";

export type RiskCategory =
  | "Schedule"
  | "Budget"
  | "Technical"
  | "Resource"
  | "Compliance"
  | "External";

export type RiskState = "Open" | "Mitigating" | "Mitigated" | "Closed";

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type IssueStatus = "Open" | "In Progress" | "Resolved";

export interface Risk {
  id: string;
  title: string;
  project: string;
  category: RiskCategory;
  probability: Level;
  impact: Level;
  owner: string;
  mitigation: string;
  state: RiskState;
  opened: string;
  escalated?: boolean;
}

export interface Issue {
  id: string;
  description: string;
  project: string;
  priority: Priority;
  status: IssueStatus;
  resolution: string;
  owner: string;
  raised: string;
}

export const LEVELS: Level[] = ["Low", "Medium", "High"];
const levelScore: Record<Level, number> = { Low: 1, Medium: 2, High: 3 };

/** Map a probability × impact pair to a traffic-light severity zone. */
export const severityZone = (probability: Level, impact: Level): Status => {
  const score = levelScore[probability] * levelScore[impact];
  if (score >= 6) return "red";
  if (score >= 3) return "amber";
  return "green";
};

export const severityLabel: Record<Status, string> = {
  green: "Low",
  amber: "Medium",
  red: "High",
};

export const risks: Risk[] = [
  {
    id: "RSK-001",
    title: "Forecast budget overrun on Coastal Highway",
    project: "Coastal Highway Phase II",
    category: "Budget",
    probability: "High",
    impact: "High",
    owner: "Stephen Okoro",
    mitigation:
      "Re-baseline scope with client, negotiate fixed-price subcontracts, and stage non-critical works to next fiscal year.",
    state: "Open",
    opened: "2026-05-28",
    escalated: true,
  },
  {
    id: "RSK-002",
    title: "Unmitigated high-severity risk on Harbor Terminal",
    project: "Harbor Terminal Upgrade",
    category: "External",
    probability: "High",
    impact: "High",
    owner: "Daniel Ajayi",
    mitigation:
      "Secure alternate crane vendor and add penalty clauses; escalate to steering committee for funding decision.",
    state: "Open",
    opened: "2026-05-26",
    escalated: true,
  },
  {
    id: "RSK-003",
    title: "ERP data migration quality gaps",
    project: "ERP Migration",
    category: "Technical",
    probability: "High",
    impact: "Medium",
    owner: "Ireti Bankole",
    mitigation:
      "Run automated reconciliation, add a parallel-run cycle, and freeze legacy edits before final cutover.",
    state: "Mitigating",
    opened: "2026-04-12",
  },
  {
    id: "RSK-004",
    title: "Rainy-season schedule slip on earthworks",
    project: "Coastal Highway Phase II",
    category: "Schedule",
    probability: "Medium",
    impact: "High",
    owner: "Bola Adisa",
    mitigation:
      "Front-load weather-sensitive activities and pre-position drainage to protect the critical path.",
    state: "Open",
    opened: "2026-05-02",
  },
  {
    id: "RSK-005",
    title: "SSO integration complexity (Customer Portal)",
    project: "Customer Portal Revamp",
    category: "Technical",
    probability: "Medium",
    impact: "Medium",
    owner: "Chen Wei",
    mitigation:
      "Spike the identity provider integration early and engage vendor support for edge cases.",
    state: "Mitigating",
    opened: "2026-03-20",
  },
  {
    id: "RSK-006",
    title: "Change-management adoption (ERP)",
    project: "ERP Migration",
    category: "Resource",
    probability: "Medium",
    impact: "Medium",
    owner: "Kwame Mensah",
    mitigation:
      "Roll out role-based training, identify champions per department, and track adoption metrics weekly.",
    state: "Open",
    opened: "2026-04-30",
  },
  {
    id: "RSK-007",
    title: "Grid interconnection permit delays",
    project: "Solar Microgrid Rollout",
    category: "Compliance",
    probability: "Low",
    impact: "Medium",
    owner: "Yusuf Idris",
    mitigation:
      "Submit applications in parallel and maintain a regulator liaison to expedite approvals.",
    state: "Mitigated",
    opened: "2026-02-15",
  },
  {
    id: "RSK-008",
    title: "Material lead times slipping (HQ fit-out)",
    project: "Corporate HQ Renovation",
    category: "Schedule",
    probability: "Medium",
    impact: "Low",
    owner: "Tunde Okafor",
    mitigation:
      "Place long-lead orders early and qualify a secondary supplier for critical materials.",
    state: "Mitigating",
    opened: "2026-04-08",
  },
  {
    id: "RSK-009",
    title: "Currency fluctuation on imported equipment",
    project: "Solar Microgrid Rollout",
    category: "External",
    probability: "Low",
    impact: "Low",
    owner: "Finance",
    mitigation: "Hedge FX exposure on confirmed purchase orders.",
    state: "Closed",
    opened: "2026-01-22",
  },
];

export const issues: Issue[] = [
  {
    id: "ISS-001",
    description: "Interchange A design clash blocking earthworks",
    project: "Coastal Highway Phase II",
    priority: "Critical",
    status: "Open",
    resolution:
      "Coordinate clash-detection workshop with design and survey teams; issue revised IFC drawings.",
    owner: "Bola Adisa",
    raised: "2026-06-02",
  },
  {
    id: "ISS-002",
    description: "Finance go-live defects in tax reporting",
    project: "ERP Migration",
    priority: "High",
    status: "In Progress",
    resolution:
      "Patch tax configuration, retest reporting pack, and validate with finance before sign-off.",
    owner: "Ireti Bankole",
    raised: "2026-05-18",
  },
  {
    id: "ISS-003",
    description: "Beta portal performance under load",
    project: "Customer Portal Revamp",
    priority: "Medium",
    status: "In Progress",
    resolution:
      "Profile slow endpoints, add caching, and scale the staging environment for load tests.",
    owner: "Chen Wei",
    raised: "2026-05-25",
  },
  {
    id: "ISS-004",
    description: "Pilot site inverter firmware mismatch",
    project: "Solar Microgrid Rollout",
    priority: "Medium",
    status: "Resolved",
    resolution: "Standardized firmware version across units and updated commissioning checklist.",
    owner: "Yusuf Idris",
    raised: "2026-03-30",
  },
  {
    id: "ISS-005",
    description: "Furniture delivery shortfall on floor 3",
    project: "Corporate HQ Renovation",
    priority: "Low",
    status: "Open",
    resolution: "Confirm revised delivery schedule with vendor and resequence floor handovers.",
    owner: "Tunde Okafor",
    raised: "2026-06-05",
  },
];

export const riskTrend = [
  { month: "Jan", open: 11, critical: 1 },
  { month: "Feb", open: 13, critical: 2 },
  { month: "Mar", open: 12, critical: 2 },
  { month: "Apr", open: 15, critical: 3 },
  { month: "May", open: 14, critical: 4 },
  { month: "Jun", open: 12, critical: 3 },
];
