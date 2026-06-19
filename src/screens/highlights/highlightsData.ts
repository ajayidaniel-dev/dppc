import type { LucideIcon } from "lucide-react";
import {
  Building2,
  Handshake,
  HardHat,
  Home,
  Landmark,
  TrendingUp,
} from "lucide-react";
import type { BadgeVariant } from "../../components/elements";

export type HighlightType =
  | "Handover"
  | "Sales Milestone"
  | "Construction Milestone"
  | "Community Impact"
  | "Strategic Win";

export const HIGHLIGHT_TYPES: HighlightType[] = [
  "Handover",
  "Sales Milestone",
  "Construction Milestone",
  "Community Impact",
  "Strategic Win",
];

export const highlightTypeVariant: Record<HighlightType, BadgeVariant> = {
  Handover: "success",
  "Sales Milestone": "primary",
  "Construction Milestone": "info",
  "Community Impact": "success",
  "Strategic Win": "warning",
};

export const highlightTypeIcon: Record<HighlightType, LucideIcon> = {
  Handover: Home,
  "Sales Milestone": TrendingUp,
  "Construction Milestone": HardHat,
  "Community Impact": Handshake,
  "Strategic Win": Landmark,
};

export interface Highlight {
  id: string;
  title: string;
  project: string;
  projectId: number;
  location: string;
  month: string;
  type: HighlightType;
  detail: string;
  impact: string;
}

export const highlights: Highlight[] = [
  {
    id: "HL-001",
    title: "142 housing units delivered year-to-date",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    month: "June 2026",
    type: "Handover",
    detail:
      "Units handed over across Emerald Gardens, Woji Estate Extension, and completed phases of Greenfield — exceeding the H1 target by 12 units.",
    impact: "142 units · H1 target exceeded",
  },
  {
    id: "HL-002",
    title: "Emerald Gardens Block A reached weathertight",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    month: "May 2026",
    type: "Construction Milestone",
    detail:
      "Block A achieved weathertight status ahead of the revised programme, clearing the path for internal finishes and Q3 buyer walkthroughs.",
    impact: "2 weeks ahead of recovery schedule",
  },
  {
    id: "HL-003",
    title: "Royal Crest off-plan sales exceeded Q2 target",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    month: "June 2026",
    type: "Sales Milestone",
    detail:
      "Corporate tenant interest and owner-occupier reservations pushed Q2 sales 18% above plan, strengthening the handover preparation business case.",
    impact: "+18% vs Q2 sales plan",
  },
  {
    id: "HL-004",
    title: "Riverside Commercial structural progress ahead of plan",
    project: "Riverside Commercial Complex",
    projectId: 4,
    location: "Woji, Port Harcourt",
    month: "June 2026",
    type: "Construction Milestone",
    detail:
      "Level 10 slab pour completed with CPI 1.04 and SPI 1.01 — the best cost and schedule performance in the active portfolio.",
    impact: "CPI 1.04 · SPI 1.01",
  },
  {
    id: "HL-005",
    title: "Zero delivery stoppages during estate road programme",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    month: "May 2026",
    type: "Community Impact",
    detail:
      "Fortnightly community liaison forums during the eight-week estate road resurfacing kept material access open with no contractor downtime.",
    impact: "0 stoppages · 8-week programme",
  },
  {
    id: "HL-006",
    title: "Building permit secured ahead of schedule",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    month: "December 2025",
    type: "Strategic Win",
    detail:
      "Rivers State Ministry of Housing approval landed six weeks early, unblocking structural works on the waterfront tower package.",
    impact: "−6 weeks on approval timeline",
  },
  {
    id: "HL-007",
    title: "Buyer walkthrough programme launched for Q3 handovers",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    month: "June 2026",
    type: "Handover",
    detail:
      "Off-plan buyers invited to finishing-stage walkthroughs before formal inspection — reducing expected snagging at practical completion.",
    impact: "−35% projected snag items",
  },
];

export interface FeaturedDevelopment {
  projectId: number;
  reason: string;
  tags: string[];
}

export const featured: FeaturedDevelopment[] = [
  {
    projectId: 4,
    reason:
      "Best cost and schedule performance — structural works ahead of plan with CPI 1.04.",
    tags: ["Best Performing", "Commercial"],
  },
  {
    projectId: 1,
    reason:
      "High impact — Q3 handover pipeline with strong off-plan sales and buyer engagement.",
    tags: ["Handover Focus", "Residential"],
  },
  {
    projectId: 6,
    reason:
      "Strategic asset — handover preparation with corporate tenant and owner-occupier demand.",
    tags: ["Handover Prep", "Mixed-Use"],
  },
];

export interface SuccessMetric {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone: "success" | "info" | "primary" | "warning";
}

export const successMetrics: SuccessMetric[] = [
  {
    label: "Property sales (YTD)",
    value: "₦2.4B",
    hint: "Off-plan and completed unit sales",
    icon: TrendingUp,
    tone: "success",
  },
  {
    label: "Units delivered",
    value: "142",
    hint: "Housing units handed over YTD",
    icon: Home,
    tone: "primary",
  },
  {
    label: "Under development budget",
    value: "₦405M",
    hint: "Tracking 3.2% under plan portfolio-wide",
    icon: Building2,
    tone: "info",
  },
  {
    label: "Active reservations",
    value: "318",
    hint: "Off-plan units reserved across pipeline",
    icon: Handshake,
    tone: "warning",
  },
];

export const portfolioWinNarrative =
  "The Rivers State development portfolio delivered 142 housing units in the first half of 2026, with property sales reaching ₦2.4B. Riverside Commercial leads on cost performance while Emerald Gardens and Royal Crest drive the Q3 handover and sales pipeline.";
