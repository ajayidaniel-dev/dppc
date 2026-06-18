import type { BadgeVariant } from "../../components/elements";

export type MilestoneState =
  | "Completed"
  | "In Progress"
  | "Planned"
  | "Delayed"
  | "Cancelled";

export interface PortfolioMilestone {
  id: string;
  name: string;
  project: string;
  projectCode: string;
  phase: string;
  owner: string;
  start: string;
  end: string;
  status: MilestoneState;
  critical: boolean;
  dependsOn?: string;
}

export const milestoneStateVariant: Record<MilestoneState, BadgeVariant> = {
  Completed: "success",
  "In Progress": "info",
  Planned: "neutral",
  Delayed: "danger",
  Cancelled: "warning",
};

export const milestones: PortfolioMilestone[] = [
  {
    id: "M-01",
    name: "HQ design sign-off",
    project: "Corporate HQ Renovation",
    projectCode: "PRJ-001",
    phase: "Planning",
    owner: "Amara Bello",
    start: "2025-10-01",
    end: "2025-11-15",
    status: "Completed",
    critical: true,
  },
  {
    id: "M-02",
    name: "Phase 1 fit-out",
    project: "Corporate HQ Renovation",
    projectCode: "PRJ-001",
    phase: "Execution",
    owner: "Tunde Okafor",
    start: "2025-11-16",
    end: "2026-03-30",
    status: "Completed",
    critical: true,
    dependsOn: "HQ design sign-off",
  },
  {
    id: "M-03",
    name: "Phase 2 fit-out",
    project: "Corporate HQ Renovation",
    projectCode: "PRJ-001",
    phase: "Execution",
    owner: "Tunde Okafor",
    start: "2026-04-01",
    end: "2026-07-20",
    status: "In Progress",
    critical: true,
    dependsOn: "Phase 1 fit-out",
  },
  {
    id: "M-04",
    name: "Vendor selection",
    project: "ERP Migration",
    projectCode: "PRJ-002",
    phase: "Planning",
    owner: "Kwame Mensah",
    start: "2025-08-01",
    end: "2025-09-10",
    status: "Completed",
    critical: false,
  },
  {
    id: "M-05",
    name: "Finance module go-live",
    project: "ERP Migration",
    projectCode: "PRJ-002",
    phase: "Execution",
    owner: "Ireti Bankole",
    start: "2025-12-01",
    end: "2026-04-01",
    status: "Delayed",
    critical: true,
    dependsOn: "Vendor selection",
  },
  {
    id: "M-06",
    name: "HR & procurement cutover",
    project: "ERP Migration",
    projectCode: "PRJ-002",
    phase: "Execution",
    owner: "Kwame Mensah",
    start: "2026-04-02",
    end: "2026-06-20",
    status: "Planned",
    critical: true,
    dependsOn: "Finance module go-live",
  },
  {
    id: "M-07",
    name: "Environmental approval",
    project: "Coastal Highway Phase II",
    projectCode: "PRJ-003",
    phase: "Initiation",
    owner: "Stephen Okoro",
    start: "2025-11-01",
    end: "2025-12-15",
    status: "Completed",
    critical: true,
  },
  {
    id: "M-08",
    name: "Earthworks complete",
    project: "Coastal Highway Phase II",
    projectCode: "PRJ-003",
    phase: "Execution",
    owner: "Bola Adisa",
    start: "2025-12-16",
    end: "2026-06-30",
    status: "Delayed",
    critical: true,
    dependsOn: "Environmental approval",
  },
  {
    id: "M-09",
    name: "Pilot site live",
    project: "Solar Microgrid Rollout",
    projectCode: "PRJ-004",
    phase: "Execution",
    owner: "Lola Adeyemi",
    start: "2025-09-15",
    end: "2025-12-01",
    status: "Completed",
    critical: false,
  },
  {
    id: "M-10",
    name: "Sites 2–4 commissioned",
    project: "Solar Microgrid Rollout",
    projectCode: "PRJ-004",
    phase: "Execution",
    owner: "Yusuf Idris",
    start: "2025-12-02",
    end: "2026-06-15",
    status: "In Progress",
    critical: false,
    dependsOn: "Pilot site live",
  },
  {
    id: "M-11",
    name: "Beta release",
    project: "Customer Portal Revamp",
    projectCode: "PRJ-005",
    phase: "Execution",
    owner: "Chen Wei",
    start: "2026-02-11",
    end: "2026-05-30",
    status: "In Progress",
    critical: false,
  },
  {
    id: "M-12",
    name: "On-prem hosting option",
    project: "Customer Portal Revamp",
    projectCode: "PRJ-005",
    phase: "Planning",
    owner: "Maria Santos",
    start: "2026-01-05",
    end: "2026-02-10",
    status: "Cancelled",
    critical: false,
  },
  {
    id: "M-13",
    name: "Feasibility & funding",
    project: "Harbor Terminal Upgrade",
    projectCode: "PRJ-006",
    phase: "Initiation",
    owner: "Daniel Ajayi",
    start: "2026-03-01",
    end: "2026-04-30",
    status: "In Progress",
    critical: true,
  },
  {
    id: "M-14",
    name: "Crane procurement",
    project: "Harbor Terminal Upgrade",
    projectCode: "PRJ-006",
    phase: "Planning",
    owner: "Ngozi Obi",
    start: "2026-05-01",
    end: "2026-09-30",
    status: "Planned",
    critical: true,
    dependsOn: "Feasibility & funding",
  },
];
