import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  Flag,
  Gauge,
  TriangleAlert,
  FileBarChart,
  BookOpen,
  Images,
  Trophy,
  Users,
  Building2,
  Rocket,
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
 * Grouped navigation keeps the rail short: one flat entry plus three
 * collapsible groups that map to the PRD's 12 main-nav destinations.
 */
export const navSections: NavSection[] = [
  {
    items: [
      { label: "Overview", path: routes.DASHBOARD, icon: LayoutDashboard },
    ],
  },
  {
    label: "Delivery",
    icon: Rocket,
    items: [
      { label: "Portfolio", path: routes.PORTFOLIO, icon: FolderKanban },
      { label: "Projects", path: routes.PROJECTS, icon: Briefcase },
      { label: "Milestones", path: routes.MILESTONES, icon: Flag },
      { label: "Performance", path: routes.PERFORMANCE, icon: Gauge },
    ],
  },
  {
    label: "Governance",
    icon: ShieldCheck,
    items: [
      { label: "Risks & Issues", path: routes.RISKS, icon: TriangleAlert },
      { label: "Reports", path: routes.REPORTS, icon: FileBarChart },
      { label: "Knowledge", path: routes.KNOWLEDGE, icon: BookOpen },
    ],
  },
  {
    label: "Corporate",
    icon: Landmark,
    items: [
      { label: "Stakeholders", path: routes.STAKEHOLDERS, icon: Users },
      { label: "Highlights", path: routes.HIGHLIGHTS, icon: Trophy },
      { label: "Media Gallery", path: routes.MEDIA, icon: Images },
      { label: "Company Profile", path: routes.COMPANY, icon: Building2 },
    ],
  },
];

export const quickActions: SelectOption[] = [
  { label: "New Project", value: "new-project" },
  { label: "New Report", value: "new-report" },
  { label: "Add Risk", value: "add-risk" },
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
