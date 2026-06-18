import type { BadgeVariant } from "../../components/elements";

export type HighlightType =
  | "Achievement"
  | "Deliverable"
  | "Innovation"
  | "Strategic Win";

export interface Highlight {
  id: string;
  title: string;
  project: string;
  month: string;
  type: HighlightType;
  detail: string;
}

export const highlightTypeVariant: Record<HighlightType, BadgeVariant> = {
  Achievement: "success",
  Deliverable: "info",
  Innovation: "primary",
  "Strategic Win": "warning",
};

export const highlights: Highlight[] = [
  {
    id: "H-01",
    title: "Pilot microgrid achieved 99.9% uptime",
    project: "Solar Microgrid Rollout",
    month: "December 2025",
    type: "Achievement",
    detail:
      "First site exceeded reliability target in its first full month, validating the rollout model for remaining sites.",
  },
  {
    id: "H-02",
    title: "HQ Phase 1 fit-out delivered on budget",
    project: "Corporate HQ Renovation",
    month: "March 2026",
    type: "Deliverable",
    detail:
      "Three floors handed over with a CPI of 1.02 and zero safety incidents during the fit-out window.",
  },
  {
    id: "H-03",
    title: "Automated month-end close prototype",
    project: "ERP Migration",
    month: "February 2026",
    type: "Innovation",
    detail:
      "Finance team demonstrated a 5-day faster close in a controlled prototype ahead of full go-live.",
  },
  {
    id: "H-04",
    title: "Environmental approval secured early",
    project: "Coastal Highway Phase II",
    month: "December 2025",
    type: "Strategic Win",
    detail:
      "Regulatory approval landed ahead of schedule, unblocking earthworks mobilization for the corridor.",
  },
  {
    id: "H-05",
    title: "Customer portal beta to 500 pilot users",
    project: "Customer Portal Revamp",
    month: "May 2026",
    type: "Deliverable",
    detail:
      "Beta opened to a pilot cohort with single sign-on and real-time status tracking enabled.",
  },
];

export interface FeaturedProject {
  projectId: number;
  reason: string;
  tags: string[];
}

export const featured: FeaturedProject[] = [
  {
    projectId: 4,
    reason: "Best performing — ahead of schedule and under budget.",
    tags: ["Best Performing", "ESG"],
  },
  {
    projectId: 1,
    reason: "High impact — modern workplace driving retention gains.",
    tags: ["High Impact", "Executive Spotlight"],
  },
  {
    projectId: 5,
    reason: "Strategic — digital engagement for external customers.",
    tags: ["Strategic", "Customer"],
  },
];

export interface SuccessMetric {
  label: string;
  value: string;
  hint: string;
}

export const successMetrics: SuccessMetric[] = [
  { label: "Revenue Generated", value: "$3.2M", hint: "New toll & service revenue (annualized)" },
  { label: "Cost Savings", value: "$1.1M", hint: "Opex and diesel reductions realized" },
  { label: "Benefits Realized", value: "$960K", hint: "Tracked against $4.7M planned" },
  { label: "Efficiency Gain", value: "+24%", hint: "Process and operational improvements" },
];
