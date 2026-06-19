import type { LucideIcon } from "lucide-react";
import {
  AlertTriangle,
  Building2,
  CalendarClock,
  ClipboardCheck,
  Gauge,
  HardHat,
  Home,
  TrendingUp,
  Wallet,
} from "lucide-react";

export type ReportCategory =
  | "Executive"
  | "Board"
  | "Management"
  | "Stakeholder";

export type ReportType =
  | "Development Progress"
  | "Estate Delivery"
  | "Construction Update"
  | "Site Inspection"
  | "Budget Performance"
  | "Property Sales"
  | "Executive Portfolio";

export type Frequency = "Weekly" | "Monthly" | "Quarterly" | "Annual";
export type ReportStatus = "Ready" | "Scheduled" | "Generating";

export interface Report {
  id: string;
  name: string;
  description: string;
  category: ReportCategory;
  type: ReportType;
  frequency: Frequency;
  status: ReportStatus;
  date: string;
  scope: string;
  pages: number;
}

export const REPORT_TYPES: ReportType[] = [
  "Development Progress",
  "Estate Delivery",
  "Construction Update",
  "Site Inspection",
  "Budget Performance",
  "Property Sales",
  "Executive Portfolio",
];

export const REPORT_CATEGORIES: ReportCategory[] = [
  "Executive",
  "Board",
  "Management",
  "Stakeholder",
];

export const reportTypeIcon: Record<ReportType, LucideIcon> = {
  "Development Progress": TrendingUp,
  "Estate Delivery": Home,
  "Construction Update": HardHat,
  "Site Inspection": ClipboardCheck,
  "Budget Performance": Wallet,
  "Property Sales": Building2,
  "Executive Portfolio": Gauge,
};

export const reports: Report[] = [
  {
    id: "RPT-001",
    name: "Q2 2026 Executive Portfolio Report",
    description:
      "Portfolio-wide development progress, cost performance, and handover outlook for leadership.",
    category: "Executive",
    type: "Executive Portfolio",
    frequency: "Quarterly",
    status: "Ready",
    date: "2026-06-15",
    scope: "Portfolio-wide",
    pages: 24,
  },
  {
    id: "RPT-002",
    name: "June Board Pack — Development Governance",
    description:
      "Governance, development cost summary, site risks, and estate delivery for the board.",
    category: "Board",
    type: "Executive Portfolio",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-10",
    scope: "Portfolio-wide",
    pages: 18,
  },
  {
    id: "RPT-003",
    name: "May Development Portfolio Report",
    description:
      "Active developments, construction milestones, budget utilization, and unit delivery.",
    category: "Management",
    type: "Development Progress",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-01",
    scope: "Portfolio-wide",
    pages: 16,
  },
  {
    id: "RPT-004",
    name: "Week 24 Construction Site Update",
    description:
      "Weekly site progress, contractor activity, blockers, and upcoming handovers.",
    category: "Management",
    type: "Construction Update",
    frequency: "Weekly",
    status: "Ready",
    date: "2026-06-16",
    scope: "All active sites",
    pages: 8,
  },
  {
    id: "RPT-005",
    name: "Emerald Gardens — Investor Progress Update",
    description:
      "Finishing-stage progress, unit availability, and Q3 handover timeline for stakeholders.",
    category: "Stakeholder",
    type: "Development Progress",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-08",
    scope: "Emerald Gardens Estate",
    pages: 6,
  },
  {
    id: "RPT-006",
    name: "2025 Annual Estate Delivery Report",
    description:
      "Full-year housing units delivered, revenue, and completed developments across Rivers State.",
    category: "Executive",
    type: "Estate Delivery",
    frequency: "Annual",
    status: "Ready",
    date: "2026-02-01",
    scope: "Portfolio-wide",
    pages: 32,
  },
  {
    id: "RPT-007",
    name: "Atlantic View — Site Inspection Summary",
    description:
      "Structural and roofing-stage inspection findings, corrective actions, and sign-off status.",
    category: "Management",
    type: "Site Inspection",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-12",
    scope: "Atlantic View Residences",
    pages: 10,
  },
  {
    id: "RPT-008",
    name: "Greenfield Housing — Property Sales Report",
    description:
      "Units sold, reservations, pricing performance, and sales pipeline for the scheme.",
    category: "Management",
    type: "Property Sales",
    frequency: "Monthly",
    status: "Ready",
    date: "2026-06-05",
    scope: "Greenfield Housing Scheme",
    pages: 7,
  },
  {
    id: "RPT-009",
    name: "Q3 Executive Portfolio Report",
    description: "Auto-generates at quarter close with AI narrative and forecasts.",
    category: "Executive",
    type: "Executive Portfolio",
    frequency: "Quarterly",
    status: "Scheduled",
    date: "2026-09-30",
    scope: "Portfolio-wide",
    pages: 0,
  },
  {
    id: "RPT-010",
    name: "Week 25 Construction Site Update",
    description: "Compiling latest site progress across Port Harcourt developments.",
    category: "Management",
    type: "Construction Update",
    frequency: "Weekly",
    status: "Generating",
    date: "2026-06-18",
    scope: "All active sites",
    pages: 0,
  },
];

export const aiSummaryGenerated = "2026-06-18";

export const aiNarrative =
  "Development portfolio value reached ₦48.2B this quarter across six active sites in Rivers State, with four of six developments on schedule. Development cost performance is healthy overall (CPI 1.02), but finishing-stage overruns at Emerald Gardens Estate and contractor delays at Atlantic View Residences are driving most schedule and cost risk — both escalated to executive review.";

export const aiInsights = [
  "Development budget utilization at 84%, tracking 3.2% under plan.",
  "3 critical site risks concentrated at Emerald Gardens and Atlantic View.",
  "Finishing crews over-allocated at 92% — handover bottleneck for Q3.",
  "142 housing units delivered year-to-date across the Rivers State pipeline.",
];

export const aiRecommendations = [
  "Re-baseline Emerald Gardens finishing scope before the Q3 handover window.",
  "Reallocate contractor capacity from Greenfield (64% utilization) toward Atlantic View.",
  "Accelerate roofing subcontractor award at Royal Crest to clear critical schedule risk.",
];

export const predictions: {
  icon: LucideIcon;
  label: string;
  value: string;
  tone: string;
}[] = [
  {
    icon: AlertTriangle,
    label: "Site risk forecast",
    value: "2 site risks likely to escalate within 30 days",
    tone: "bg-danger/15 text-danger",
  },
  {
    icon: Gauge,
    label: "Cost performance forecast",
    value: "Portfolio development cost index 0.99 by Q3 close",
    tone: "bg-warning/15 text-warning",
  },
  {
    icon: CalendarClock,
    label: "Handover forecast",
    value: "82% of construction milestones on track for Q3",
    tone: "bg-info/15 text-info",
  },
];

export interface QuickTemplate {
  label: string;
  description: string;
  type: ReportType;
  frequency: Frequency;
  category: ReportCategory;
}

export const quickTemplates: QuickTemplate[] = [
  {
    label: "Weekly construction update",
    description: "All active sites · progress & blockers",
    type: "Construction Update",
    frequency: "Weekly",
    category: "Management",
  },
  {
    label: "Monthly portfolio brief",
    description: "Developments, milestones & budget",
    type: "Development Progress",
    frequency: "Monthly",
    category: "Management",
  },
  {
    label: "Site inspection report",
    description: "Findings, photos & corrective actions",
    type: "Site Inspection",
    frequency: "Monthly",
    category: "Management",
  },
  {
    label: "Property sales summary",
    description: "Units sold, pipeline & pricing",
    type: "Property Sales",
    frequency: "Monthly",
    category: "Management",
  },
  {
    label: "Executive portfolio brief",
    description: "Leadership summary with AI insights",
    type: "Executive Portfolio",
    frequency: "Quarterly",
    category: "Executive",
  },
];
