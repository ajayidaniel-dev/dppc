import type { BadgeVariant } from "../../components/elements";

export type RoleId =
  | "admin"
  | "executive"
  | "portfolio"
  | "project"
  | "risk"
  | "stakeholder";

export interface Role {
  id: RoleId;
  name: string;
  description: string;
}

export const roles: Role[] = [
  {
    id: "admin",
    name: "Administrator",
    description: "Full platform access, including user and role management.",
  },
  {
    id: "executive",
    name: "Executive",
    description: "Strategic, read-only view of dashboards and reports.",
  },
  {
    id: "portfolio",
    name: "Portfolio Manager",
    description: "Manages the portfolio, projects, and stakeholder reporting.",
  },
  {
    id: "project",
    name: "Project Manager",
    description: "Manages assigned projects, milestones, and risks.",
  },
  {
    id: "risk",
    name: "Risk Manager",
    description: "Owns the risk and issue registers across the portfolio.",
  },
  {
    id: "stakeholder",
    name: "Stakeholder",
    description: "External access to curated project information only.",
  },
];

export type CapabilityId =
  | "view"
  | "projects"
  | "risks"
  | "reports"
  | "stakeholders"
  | "users";

export interface Capability {
  id: CapabilityId;
  name: string;
}

export const capabilities: Capability[] = [
  { id: "view", name: "View Dashboards" },
  { id: "projects", name: "Manage Projects" },
  { id: "risks", name: "Manage Risks" },
  { id: "reports", name: "Generate Reports" },
  { id: "stakeholders", name: "Manage Stakeholders" },
  { id: "users", name: "Manage Users & Roles" },
];

export const defaultRoleCaps: Record<RoleId, CapabilityId[]> = {
  admin: ["view", "projects", "risks", "reports", "stakeholders", "users"],
  executive: ["view", "reports"],
  portfolio: ["view", "projects", "reports", "stakeholders"],
  project: ["view", "projects", "risks"],
  risk: ["view", "risks"],
  stakeholder: ["view"],
};

export const roleVariant: Record<RoleId, BadgeVariant> = {
  admin: "primary",
  executive: "info",
  portfolio: "success",
  project: "neutral",
  risk: "warning",
  stakeholder: "neutral",
};

export type MemberStatus = "Active" | "Invited" | "Suspended";

export const statusVariant: Record<MemberStatus, BadgeVariant> = {
  Active: "success",
  Invited: "info",
  Suspended: "neutral",
};

export interface Member {
  id: string;
  name: string;
  email: string;
  role: RoleId;
  status: MemberStatus;
  lastActive: string;
}

export const seedMembers: Member[] = [
  { id: "u1", name: "Adaeze Nwosu", email: "adaeze.nwosu@dppc.com", role: "executive", status: "Active", lastActive: "2026-06-18" },
  { id: "u2", name: "Tunde Okafor", email: "tunde.okafor@dppc.com", role: "admin", status: "Active", lastActive: "2026-06-18" },
  { id: "u3", name: "Daniel Ajayi", email: "daniel.ajayi@dppc.com", role: "portfolio", status: "Active", lastActive: "2026-06-17" },
  { id: "u4", name: "Amara Bello", email: "amara.bello@dppc.com", role: "project", status: "Active", lastActive: "2026-06-16" },
  { id: "u5", name: "Priya Nair", email: "priya.nair@dppc.com", role: "risk", status: "Active", lastActive: "2026-06-15" },
  { id: "u6", name: "Helen Park", email: "h.park@worksministry.gov", role: "stakeholder", status: "Invited", lastActive: "—" },
];

export const roleName = (id: RoleId): string =>
  roles.find((r) => r.id === id)?.name ?? id;
