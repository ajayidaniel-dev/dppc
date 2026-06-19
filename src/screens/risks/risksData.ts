import type { Status } from "../../utils/types";

export type Level = "Low" | "Medium" | "High";

export type RiskCategory =
  | "Construction Schedule"
  | "Development Cost"
  | "Site & Safety"
  | "Contractor"
  | "Regulatory"
  | "Supply Chain";

export const RISK_CATEGORIES: RiskCategory[] = [
  "Construction Schedule",
  "Development Cost",
  "Site & Safety",
  "Contractor",
  "Regulatory",
  "Supply Chain",
];

export type RiskState = "Open" | "Mitigating" | "Mitigated" | "Closed";

export type Priority = "Low" | "Medium" | "High" | "Critical";
export type IssueStatus = "Open" | "In Progress" | "Resolved";

export interface Risk {
  id: string;
  title: string;
  project: string;
  projectId: number;
  location: string;
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
  projectId: number;
  location: string;
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
    title: "Finishing stage development cost overrun",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    category: "Development Cost",
    probability: "High",
    impact: "High",
    owner: "Amara Bello",
    mitigation:
      "Re-baseline finishing packages, negotiate fixed-price subcontracts, and defer non-critical landscaping to next phase.",
    state: "Open",
    opened: "2026-05-28",
    escalated: true,
  },
  {
    id: "RSK-002",
    title: "Unmitigated high-severity site risk — Ada George",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    category: "Site & Safety",
    probability: "High",
    impact: "High",
    owner: "Daniel Ajayi",
    mitigation:
      "Engage third-party HSE audit, implement daily toolbox talks, and pause works on affected zone until remediation sign-off.",
    state: "Open",
    opened: "2026-05-26",
    escalated: true,
  },
  {
    id: "RSK-003",
    title: "Roofing stage schedule slip — rainy season",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    category: "Construction Schedule",
    probability: "High",
    impact: "Medium",
    owner: "Stephen Okoro",
    mitigation:
      "Front-load weather-sensitive roofing, add night-shift option, and pre-position drainage protection on Tower B.",
    state: "Mitigating",
    opened: "2026-04-12",
  },
  {
    id: "RSK-004",
    title: "Site preparation delays — community access road",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Port Harcourt",
    category: "Construction Schedule",
    probability: "Medium",
    impact: "High",
    owner: "Tunde Okafor",
    mitigation:
      "Coordinate with local authority on temporary access route and accelerate topsoil removal on alternate entry.",
    state: "Open",
    opened: "2026-05-02",
  },
  {
    id: "RSK-005",
    title: "Steel price volatility affecting structural package",
    project: "Riverside Commercial Complex",
    projectId: 4,
    location: "Woji, Port Harcourt",
    category: "Supply Chain",
    probability: "Medium",
    impact: "Medium",
    owner: "Lola Adeyemi",
    mitigation:
      "Lock in remaining steel orders at agreed rates and qualify a secondary supplier for long-lead sections.",
    state: "Mitigating",
    opened: "2026-03-20",
  },
  {
    id: "RSK-006",
    title: "Contractor crew shortage — finishing trades",
    project: "Woji Estate Extension",
    projectId: 5,
    location: "Woji, Port Harcourt",
    category: "Contractor",
    probability: "Medium",
    impact: "Medium",
    owner: "Maria Santos",
    mitigation:
      "Onboard secondary finishing subcontractor and stagger Block D internal works to protect handover date.",
    state: "Open",
    opened: "2026-04-30",
  },
  {
    id: "RSK-007",
    title: "Environmental permit renewal delay",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    category: "Regulatory",
    probability: "Low",
    impact: "Medium",
    owner: "Stephen Okoro",
    mitigation:
      "Maintain regulator liaison and submit revised EIA documentation ahead of statutory deadline.",
    state: "Mitigated",
    opened: "2026-02-15",
  },
  {
    id: "RSK-008",
    title: "Imported finishing materials lead time",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    category: "Supply Chain",
    probability: "Medium",
    impact: "Low",
    owner: "Tunde Okafor",
    mitigation:
      "Place long-lead orders for tiles and sanitary ware; qualify local alternatives for non-premium units.",
    state: "Mitigating",
    opened: "2026-04-08",
  },
  {
    id: "RSK-009",
    title: "FX exposure on crane procurement",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    category: "Development Cost",
    probability: "Low",
    impact: "Low",
    owner: "Grace Eze",
    mitigation: "Hedge FX on confirmed plant hire and crane mobilisation contracts.",
    state: "Closed",
    opened: "2026-01-22",
  },
];

export const issues: Issue[] = [
  {
    id: "ISS-001",
    description: "Tower B structural clash blocking roofing works",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    priority: "Critical",
    status: "Open",
    resolution:
      "Coordinate clash-detection workshop with structural engineer and issue revised IFC drawings before resuming roofing.",
    owner: "Bola Adisa",
    raised: "2026-06-02",
  },
  {
    id: "ISS-002",
    description: "Substation capacity shortfall for Block A handover",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    priority: "High",
    status: "In Progress",
    resolution:
      "Expedite transformer procurement and schedule DISCO inspection for provisional energisation.",
    owner: "Tunde Okafor",
    raised: "2026-05-18",
  },
  {
    id: "ISS-003",
    description: "Estate road resurfacing blocking resident access",
    project: "Woji Estate Extension",
    projectId: 5,
    location: "Woji, Port Harcourt",
    priority: "Medium",
    status: "In Progress",
    resolution:
      "Implement phased road closure with signed diversion routes and communicate schedule to Phase 1 residents.",
    owner: "Maria Santos",
    raised: "2026-05-25",
  },
  {
    id: "ISS-004",
    description: "Concrete test failure — Level 8 slab",
    project: "Riverside Commercial Complex",
    projectId: 4,
    location: "Woji, Port Harcourt",
    priority: "Medium",
    status: "Resolved",
    resolution:
      "Core test confirmed isolated batch issue; remedial grouting completed and QA sign-off obtained.",
    owner: "Yusuf Idris",
    raised: "2026-03-30",
  },
  {
    id: "ISS-005",
    description: "Land compensation dispute — Obio-Akpor boundary",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Port Harcourt",
    priority: "High",
    status: "Open",
    resolution:
      "Engage community liaison and legal team to finalize compensation schedule before earthworks resume.",
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
