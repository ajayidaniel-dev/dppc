import {
  LayoutDashboard,
  FolderKanban,
  HardHat,
  Flag,
  Gauge,
  TriangleAlert,
  FileBarChart,
  BookOpen,
  Images,
  Trophy,
  Users,
  Building2,
  ShieldCheck,
  Landmark,
  type LucideIcon,
} from "lucide-react";
import { routes } from "../router/routes";
import type { SelectOption } from "../utils/types";

export const LIMIT = 10;

export const BASEURL: string = import.meta.env.VITE_API_URL ?? "";

export const projectStatusOptions: SelectOption[] = [
  { label: "On Track", value: "green" },
  { label: "Attention Required", value: "amber" },
  { label: "Critical", value: "red" },
];

export interface SidebarItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export interface NavSection {
  /** Group heading. When omitted the items render as flat top-level links. */
  label?: string;
  icon?: LucideIcon;
  items: SidebarItem[];
}

/**
 * Grouped navigation for the real estate development portfolio portal.
 */
export const navSections: NavSection[] = [
  {
    items: [
      {
        label: "Portfolio Overview",
        path: routes.DASHBOARD,
        icon: LayoutDashboard,
      },
    ],
  },
  {
    label: "Development",
    icon: HardHat,
    items: [
      {
        label: "Development Portfolio",
        path: routes.PORTFOLIO,
        icon: FolderKanban,
      },
      { label: "Developments", path: routes.PROJECTS, icon: Building2 },
      {
        label: "Construction Milestones",
        path: routes.MILESTONES,
        icon: Flag,
      },
      {
        label: "Development Performance",
        path: routes.PERFORMANCE,
        icon: Gauge,
      },
    ],
  },
  {
    label: "Governance",
    icon: ShieldCheck,
    items: [
      {
        label: "Site Risks & Issues",
        path: routes.RISKS,
        icon: TriangleAlert,
      },
      {
        label: "Reporting Center",
        path: routes.REPORTS,
        icon: FileBarChart,
      },
      {
        label: "Knowledge Repository",
        path: routes.KNOWLEDGE,
        icon: BookOpen,
      },
    ],
  },
  {
    label: "Corporate",
    icon: Landmark,
    items: [
      { label: "Stakeholders", path: routes.STAKEHOLDERS, icon: Users },
      {
        label: "Success Stories",
        path: routes.HIGHLIGHTS,
        icon: Trophy,
      },
      {
        label: "Media Gallery",
        path: routes.MEDIA,
        icon: Images,
      },
      {
        label: "Corporate Profile",
        path: routes.COMPANY,
        icon: Building2,
      },
    ],
  },
];

export const quickActions: SelectOption[] = [
  { label: "New development", value: "new-project" },
  { label: "Generate report", value: "new-report" },
  { label: "Log site risk", value: "add-risk" },
];

/**
 * Chart colors as CSS-variable references so series stay on-brand and remain
 * legible after a light/dark theme switch (the vars are redefined per theme).
 */
export const chartPalette = {
  primary: "var(--color-primary)",
  primarySoft: "var(--color-primary-200)",
  blue: "var(--color-accent-blue)",
  violet: "var(--color-accent-violet)",
  teal: "var(--color-accent-teal)",
  amber: "var(--color-accent-amber)",
  pink: "var(--color-accent-pink)",
  success: "var(--color-success)",
  warning: "var(--color-warning)",
  danger: "var(--color-danger)",
  grid: "var(--color-border)",
  axis: "var(--color-muted-foreground)",
  series: [
    "var(--color-primary)",
    "var(--color-accent-blue)",
    "var(--color-accent-violet)",
    "var(--color-accent-teal)",
    "var(--color-accent-amber)",
    "var(--color-accent-pink)",
  ],
};
