import type { BadgeVariant } from "../../components/elements";

export type StakeholderType = "Internal" | "External";

export type StakeholderCategory =
  | "Corporate"
  | "Investor"
  | "Contractor"
  | "Regulator"
  | "Community"
  | "Buyer";

export const STAKEHOLDER_CATEGORIES: StakeholderCategory[] = [
  "Corporate",
  "Investor",
  "Contractor",
  "Regulator",
  "Community",
  "Buyer",
];

export type Level = "High" | "Low";

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  type: StakeholderType;
  category: StakeholderCategory;
  email: string;
  phone: string;
  responsibilities: string;
  /** Development names this stakeholder is engaged with. */
  developments: string[];
  projectIds: number[];
  location?: string;
  influence: Level;
  interest: Level;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  type: "Announcement" | "Update";
  scope: string;
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
  location: string;
  development?: string;
}

export interface Survey {
  id: string;
  title: string;
  responses: number;
  total: number;
  status: "Open" | "Closed";
  closes: string;
  audience: string;
}

export interface Suggestion {
  id: string;
  text: string;
  author: string;
  date: string;
  status: "New" | "Under review" | "Planned";
  development?: string;
}

export interface EngagementInsight {
  id: string;
  title: string;
  development: string;
  summary: string;
}

export const categoryVariant: Record<StakeholderCategory, BadgeVariant> = {
  Corporate: "neutral",
  Investor: "primary",
  Contractor: "info",
  Regulator: "warning",
  Community: "success",
  Buyer: "primary",
};

export const stakeholders: Stakeholder[] = [
  {
    id: "STK-001",
    name: "Amara Bello",
    role: "Portfolio Director",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "amara.bello@dppc.com.ng",
    phone: "+234 801 234 5670",
    responsibilities:
      "Owns development portfolio delivery, executive reporting, and board packs.",
    developments: ["Emerald Gardens Estate", "Portfolio-wide"],
    projectIds: [1],
    location: "Port Harcourt",
    influence: "High",
    interest: "High",
  },
  {
    id: "STK-002",
    name: "Stephen Okoro",
    role: "Development Manager",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "stephen.okoro@dppc.com.ng",
    phone: "+234 803 441 2200",
    responsibilities:
      "Leads Atlantic View delivery, contractor coordination, and schedule recovery.",
    developments: ["Atlantic View Residences"],
    projectIds: [3],
    location: "Trans Amadi, Port Harcourt",
    influence: "High",
    interest: "High",
  },
  {
    id: "STK-003",
    name: "Grace Eze",
    role: "Cost Controller",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "grace.eze@dppc.com.ng",
    phone: "+234 802 998 1145",
    responsibilities:
      "Controls development budgets, variation approvals, and cost reporting.",
    developments: ["Emerald Gardens Estate", "Greenfield Housing Scheme"],
    projectIds: [1, 2],
    location: "Port Harcourt",
    influence: "High",
    interest: "Low",
  },
  {
    id: "STK-004",
    name: "Marcus Cole",
    role: "Investor Relations Director",
    organization: "Meridian Property Fund",
    type: "External",
    category: "Investor",
    email: "m.cole@meridianproperty.ng",
    phone: "+234 708 555 2200",
    responsibilities:
      "Represents institutional investor interests across Rivers State residential pipeline.",
    developments: ["Emerald Gardens Estate", "Royal Crest Apartments"],
    projectIds: [1, 6],
    location: "Lagos · Rivers portfolio",
    influence: "High",
    interest: "Low",
  },
  {
    id: "STK-005",
    name: "Helen Park",
    role: "Director of Urban Development",
    organization: "Rivers State Ministry of Housing",
    type: "External",
    category: "Regulator",
    email: "h.park@rivershousing.gov.ng",
    phone: "+234 700 555 0101",
    responsibilities:
      "Approves building permits, estate layouts, and handover compliance for Rivers developments.",
    developments: ["Greenfield Housing Scheme", "Atlantic View Residences"],
    projectIds: [2, 3],
    location: "Port Harcourt",
    influence: "High",
    interest: "High",
  },
  {
    id: "STK-006",
    name: "Femi Lawal",
    role: "Project Director",
    organization: "BuildCo Nigeria Ltd",
    type: "External",
    category: "Contractor",
    email: "f.lawal@buildco.ng",
    phone: "+234 805 117 6633",
    responsibilities:
      "Main works contractor for structural and roofing packages on waterfront developments.",
    developments: ["Atlantic View Residences", "Riverside Commercial Complex"],
    projectIds: [3, 4],
    location: "Trans Amadi · Woji sites",
    influence: "Low",
    interest: "Low",
  },
  {
    id: "STK-007",
    name: "Priya Nair",
    role: "Community Liaison Officer",
    organization: "Obio-Akpor Community Forum",
    type: "External",
    category: "Community",
    email: "p.nair@obioakporforum.org",
    phone: "+234 706 440 9912",
    responsibilities:
      "Coordinates community access, estate road works, and local stakeholder consultation.",
    developments: ["Greenfield Housing Scheme"],
    projectIds: [2],
    location: "Obio-Akpor, Rivers State",
    influence: "Low",
    interest: "High",
  },
  {
    id: "STK-008",
    name: "Chidi Okonkwo",
    role: "Off-plan Buyers Representative",
    organization: "Emerald Gardens Owners Association",
    type: "External",
    category: "Buyer",
    email: "c.okonkwo@emeraldowners.ng",
    phone: "+234 813 882 4410",
    responsibilities:
      "Represents off-plan buyers on finishing standards, handover timelines, and defect resolution.",
    developments: ["Emerald Gardens Estate"],
    projectIds: [1],
    location: "GRA Phase 2, Port Harcourt",
    influence: "Low",
    interest: "High",
  },
  {
    id: "STK-009",
    name: "Tunde Okafor",
    role: "Site Project Manager",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "tunde.okafor@dppc.com.ng",
    phone: "+234 807 334 9901",
    responsibilities:
      "Manages Greenfield site preparation, foundation works, and contractor day-to-day delivery.",
    developments: ["Greenfield Housing Scheme"],
    projectIds: [2],
    location: "Obio-Akpor, Rivers State",
    influence: "High",
    interest: "High",
  },
  {
    id: "STK-010",
    name: "Daniel Ajayi",
    role: "Commercial Development Lead",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "daniel.ajayi@dppc.com.ng",
    phone: "+234 809 221 7780",
    responsibilities:
      "Leads Royal Crest handover preparation, tenant fit-out, and property sales coordination.",
    developments: ["Royal Crest Apartments"],
    projectIds: [6],
    location: "Ada George, Port Harcourt",
    influence: "High",
    interest: "High",
  },
  {
    id: "STK-011",
    name: "Ngozi Obi",
    role: "Procurement & Legal Manager",
    organization: "DPPC",
    type: "Internal",
    category: "Corporate",
    email: "ngozi.obi@dppc.com.ng",
    phone: "+234 802 110 4455",
    responsibilities:
      "Manages works contracts, subcontractor awards, and compliance across the portfolio.",
    developments: ["Portfolio-wide"],
    projectIds: [],
    location: "Port Harcourt",
    influence: "High",
    interest: "Low",
  },
  {
    id: "STK-012",
    name: "Yusuf Idris",
    role: "Construction Lead",
    organization: "SteelFrame Contractors",
    type: "External",
    category: "Contractor",
    email: "y.idris@steelframe.ng",
    phone: "+234 803 667 1122",
    responsibilities:
      "Structural steel and concrete packages for Riverside Commercial Complex.",
    developments: ["Riverside Commercial Complex"],
    projectIds: [4],
    location: "Woji, Port Harcourt",
    influence: "Low",
    interest: "Low",
  },
];

export const developmentNames = [
  ...new Set(
    stakeholders.flatMap((s) =>
      s.developments.filter((d) => d !== "Portfolio-wide"),
    ),
  ),
];

export const announcements: Announcement[] = [
  {
    id: "ANN-001",
    title: "Q3 handover schedule published for Emerald Gardens",
    body: "Block A and B finishing timelines are confirmed. Off-plan buyers will receive walkthrough invitations two weeks before practical completion.",
    author: "Amara Bello",
    date: "2026-06-16",
    type: "Announcement",
    scope: "Emerald Gardens Estate",
  },
  {
    id: "ANN-002",
    title: "Atlantic View roofing subcontractor awarded",
    body: "Contract award clears the critical path item flagged in the Q2 risk register. Mobilization expected within 10 working days.",
    author: "Stephen Okoro",
    date: "2026-06-12",
    type: "Update",
    scope: "Atlantic View Residences",
  },
  {
    id: "ANN-003",
    title: "Updated site safety protocol for Port Harcourt developments",
    body: "Revised HSE procedures apply to all active construction sites from this week, including mandatory toolbox talks before height works.",
    author: "Helen Park",
    date: "2026-06-09",
    type: "Announcement",
    scope: "All active sites",
  },
  {
    id: "ANN-004",
    title: "Greenfield community forum — estate road programme",
    body: "Community liaison sessions scheduled for 22 June to align on access routes during the eight-week resurfacing programme.",
    author: "Priya Nair",
    date: "2026-06-08",
    type: "Update",
    scope: "Greenfield Housing Scheme",
  },
];

export const meetings: Meeting[] = [
  {
    id: "MTG-001",
    title: "Emerald Gardens Q3 handover steering",
    date: "2026-06-20",
    time: "14:00 WAT",
    attendees: 8,
    location: "GRA Phase 2 site office",
    development: "Emerald Gardens Estate",
  },
  {
    id: "MTG-002",
    title: "Q2 Board — Development Portfolio Review",
    date: "2026-06-24",
    time: "10:00 WAT",
    attendees: 11,
    location: "DPPC headquarters, Port Harcourt",
    development: "Portfolio-wide",
  },
  {
    id: "MTG-003",
    title: "Atlantic View contractor progress review",
    date: "2026-06-22",
    time: "09:30 WAT",
    attendees: 6,
    location: "Trans Amadi site office",
    development: "Atlantic View Residences",
  },
  {
    id: "MTG-004",
    title: "Greenfield community liaison forum",
    date: "2026-06-22",
    time: "16:00 WAT",
    attendees: 14,
    location: "Obio-Akpor community hall",
    development: "Greenfield Housing Scheme",
  },
  {
    id: "MTG-005",
    title: "Royal Crest buyer walkthrough planning",
    date: "2026-06-26",
    time: "11:00 WAT",
    attendees: 5,
    location: "Ada George sales centre",
    development: "Royal Crest Apartments",
  },
];

export const surveys: Survey[] = [
  {
    id: "SRV-001",
    title: "Off-plan buyer satisfaction — Emerald Gardens",
    responses: 38,
    total: 52,
    status: "Open",
    closes: "2026-06-30",
    audience: "Off-plan buyers",
  },
  {
    id: "SRV-002",
    title: "Contractor performance review — Q2",
    responses: 14,
    total: 18,
    status: "Open",
    closes: "2026-07-05",
    audience: "Site contractors",
  },
  {
    id: "SRV-003",
    title: "Community impact — Greenfield estate access",
    responses: 46,
    total: 60,
    status: "Open",
    closes: "2026-07-12",
    audience: "Community stakeholders",
  },
  {
    id: "SRV-004",
    title: "Investor quarterly confidence pulse",
    responses: 12,
    total: 12,
    status: "Closed",
    closes: "2026-05-20",
    audience: "Institutional investors",
  },
];

export const suggestions: Suggestion[] = [
  {
    id: "SG-001",
    text: "Provide monthly investor digest with construction photos and sales updates.",
    author: "Marcus Cole",
    date: "2026-06-11",
    status: "Under review",
    development: "Portfolio-wide",
  },
  {
    id: "SG-002",
    text: "Share community updates in Pidgin and Ikwerre for Obio-Akpor residents.",
    author: "Priya Nair",
    date: "2026-06-07",
    status: "Planned",
    development: "Greenfield Housing Scheme",
  },
  {
    id: "SG-003",
    text: "Add a buyer portal showing unit finishing progress and snag status.",
    author: "Chidi Okonkwo",
    date: "2026-06-03",
    status: "New",
    development: "Emerald Gardens Estate",
  },
  {
    id: "SG-004",
    text: "Hold quarterly contractor performance forums with lessons shared across sites.",
    author: "Femi Lawal",
    date: "2026-05-28",
    status: "Planned",
    development: "Atlantic View Residences",
  },
];

export const engagementInsights: EngagementInsight[] = [
  {
    id: "EI-001",
    title: "Buyer walkthroughs reduced handover friction",
    development: "Emerald Gardens Estate",
    summary:
      "Early finishing-stage walkthroughs with off-plan buyers surfaced defect lists before formal inspection and improved trust scores in the Q2 survey.",
  },
  {
    id: "EI-002",
    title: "Community liaison prevented access disputes",
    development: "Greenfield Housing Scheme",
    summary:
      "Fortnightly community forums during estate road works kept material deliveries on schedule with zero stoppages reported.",
  },
  {
    id: "EI-003",
    title: "Investor digest pilot increased engagement",
    development: "Portfolio-wide",
    summary:
      "A monthly construction photo digest sent to institutional investors improved survey response rates from 58% to 82%.",
  },
];

export const engagementQuadrant = (
  influence: Level,
  interest: Level,
): string => {
  if (influence === "High" && interest === "High") return "Manage closely";
  if (influence === "High" && interest === "Low") return "Keep satisfied";
  if (influence === "Low" && interest === "High") return "Keep informed";
  return "Monitor";
};

export const QUADRANTS: {
  influence: Level;
  interest: Level;
  label: string;
  tone: string;
}[] = [
  {
    influence: "High",
    interest: "Low",
    label: "Keep satisfied",
    tone: "bg-warning/10",
  },
  {
    influence: "High",
    interest: "High",
    label: "Manage closely",
    tone: "bg-primary-soft",
  },
  {
    influence: "Low",
    interest: "Low",
    label: "Monitor",
    tone: "bg-surface-muted",
  },
  {
    influence: "Low",
    interest: "High",
    label: "Keep informed",
    tone: "bg-info/10",
  },
];
