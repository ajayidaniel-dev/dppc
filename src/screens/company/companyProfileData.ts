import type { LucideIcon } from "lucide-react";
import {
  Building2,
  CalendarDays,
  Gem,
  Handshake,
  HardHat,
  Home,
  Leaf,
  ShieldCheck,
} from "lucide-react";
import { projectImage, VERIFIED_PHOTOS } from "../projects/projectsData";

export const company = {
  name: "DPPC",
  legalName: "Development & Property Portfolio Corporation",
  tagline:
    "Premium residential, commercial, and mixed-use property development across Rivers State and Nigeria.",
  founded: 2002,
  headquarters: "Port Harcourt, Rivers State",
  markets: "Rivers State · Lagos · Abuja",
  segments: "Residential · Commercial · Mixed-Use",
};

export const mission =
  "To develop quality estates and properties that create lasting value for homeowners, investors, and the communities we build in.";

export const vision =
  "To be Nigeria's most trusted property development company — known for delivery excellence, transparent handovers, and urban growth across the Niger Delta.";

export const strategicGoals = [
  "Deliver 500+ housing units annually across the Rivers State development pipeline.",
  "Grow active land bank in GRA, Obio-Akpor, and Ada George corridors.",
  "Maintain portfolio development cost performance at or above plan (CPI ≥ 1.0).",
  "Achieve 95% on-time handover rate for off-plan buyers and institutional investors.",
];

export const coreValues: {
  name: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    name: "Integrity",
    description: "Transparent delivery, honest sales, and accountable site governance.",
    icon: ShieldCheck,
  },
  {
    name: "Excellence",
    description: "Premium construction quality from foundation through handover.",
    icon: Gem,
  },
  {
    name: "Community",
    description: "Developments that respect local stakeholders and create shared value.",
    icon: Handshake,
  },
  {
    name: "Sustainability",
    description: "Responsible land use, estate infrastructure, and long-term asset stewardship.",
    icon: Leaf,
  },
];

export type TimelineType = "Founded" | "Milestone" | "Expansion";

export const timeline: {
  year: string;
  title: string;
  description: string;
  type: TimelineType;
}[] = [
  {
    year: "2002",
    title: "Founded in Port Harcourt",
    description:
      "Established as a property development firm with a focus on residential estates in Rivers State.",
    type: "Founded",
  },
  {
    year: "2008",
    title: "First major estate delivered — 120 units",
    description:
      "Completed the company's first gated residential estate in GRA Phase 2, establishing the DPPC delivery model.",
    type: "Milestone",
  },
  {
    year: "2014",
    title: "Entered commercial & mixed-use development",
    description:
      "Expanded beyond residential into commercial complexes and mixed-use waterfront assets in Port Harcourt.",
    type: "Expansion",
  },
  {
    year: "2019",
    title: "Launched corporate development portal",
    description:
      "Centralized portfolio governance, site reporting, and stakeholder communication on a unified platform.",
    type: "Milestone",
  },
  {
    year: "2023",
    title: "₦48B active development pipeline",
    description:
      "Six active sites across Rivers State with 2,400+ units in delivery and a national investor base.",
    type: "Milestone",
  },
];

export const awards = [
  {
    title: "Best Residential Developer",
    org: "Nigeria Property Awards",
    year: "2025",
  },
  {
    title: "Excellence in Estate Delivery",
    org: "Rivers State Housing Forum",
    year: "2024",
  },
  {
    title: "Corporate Developer of the Year",
    org: "West Africa Real Estate Summit",
    year: "2024",
  },
];

export const leadership = [
  { name: "Adaeze Nwosu", title: "Chief Executive Officer" },
  { name: "Amara Bello", title: "Chief Development Officer" },
  { name: "Grace Eze", title: "Chief Financial Officer" },
  { name: "Daniel Ajayi", title: "Commercial Development Director" },
];

export const companyStats = [
  {
    label: "Year founded",
    value: "2002",
    icon: CalendarDays,
    tone: "primary" as const,
    hint: "Port Harcourt, Rivers State",
  },
  {
    label: "Active developments",
    value: 6,
    icon: HardHat,
    tone: "info" as const,
    hint: "Sites under construction",
  },
  {
    label: "Units delivered",
    value: "2,400+",
    icon: Home,
    tone: "success" as const,
    hint: "Lifetime across portfolio",
  },
  {
    label: "Employees",
    value: "480+",
    icon: Building2,
    tone: "primary" as const,
    hint: "Site, sales & corporate",
  },
  {
    label: "Estates completed",
    value: 18,
    icon: Gem,
    tone: "warning" as const,
    hint: "Residential & commercial",
  },
];

export const developmentSegments = [
  { label: "Residential estates", count: 3, examples: "Emerald Gardens, Greenfield, Woji" },
  { label: "Commercial", count: 2, examples: "Riverside Complex, Royal Crest" },
  { label: "Mixed-use", count: 1, examples: "Atlantic View Residences" },
];

/** Featured corporate media — real construction & estate imagery. */
export const featuredMedia = [
  {
    id: "corp-m1",
    caption: "Emerald Gardens — estate exterior",
    type: "image" as const,
    url: projectImage(VERIFIED_PHOTOS.luxuryHome),
  },
  {
    id: "corp-m2",
    caption: "Atlantic View — drone site survey",
    type: "video" as const,
    url: projectImage(VERIFIED_PHOTOS.droneAerial),
  },
  {
    id: "corp-m3",
    caption: "Riverside Commercial — tower crane",
    type: "image" as const,
    url: projectImage(VERIFIED_PHOTOS.crane),
  },
  {
    id: "corp-m4",
    caption: "Property handover ceremony",
    type: "event" as const,
    url: projectImage(VERIFIED_PHOTOS.handover),
  },
];

export const timelineTone: Record<TimelineType, string> = {
  Founded: "bg-primary text-primary-foreground",
  Milestone: "bg-info/15 text-info",
  Expansion: "bg-success/15 text-success",
};
