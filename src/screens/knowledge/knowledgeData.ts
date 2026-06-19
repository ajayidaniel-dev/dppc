import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  FileBarChart,
  FileSignature,
  FileText,
  PackageCheck,
  Ruler,
} from "lucide-react";
import type { BadgeVariant } from "../../components/elements";

export type DocType =
  | "Development Brief"
  | "Works Contract"
  | "Drawing"
  | "Construction Plan"
  | "Site Report"
  | "Handover Pack";

export const DOCUMENT_TYPES: DocType[] = [
  "Development Brief",
  "Works Contract",
  "Drawing",
  "Construction Plan",
  "Site Report",
  "Handover Pack",
];

export const docTypeIcon: Record<DocType, LucideIcon> = {
  "Development Brief": FileText,
  "Works Contract": FileSignature,
  Drawing: Ruler,
  "Construction Plan": ClipboardList,
  "Site Report": FileBarChart,
  "Handover Pack": PackageCheck,
};

export interface DocumentRecord {
  id: string;
  name: string;
  type: DocType;
  project: string;
  projectId: number;
  location: string;
  owner: string;
  updated: string;
  size: string;
  tags: string[];
  phase?: string;
}

export const documents: DocumentRecord[] = [
  {
    id: "DOC-001",
    name: "Emerald Gardens — Development Brief",
    type: "Development Brief",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    owner: "Amara Bello",
    updated: "2026-05-12",
    size: "2.4 MB",
    tags: ["governance", "scope", "residential"],
    phase: "Finishing Stage",
  },
  {
    id: "DOC-002",
    name: "Greenfield Scheme — Master Construction Plan",
    type: "Construction Plan",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    owner: "Tunde Okafor",
    updated: "2026-04-18",
    size: "5.8 MB",
    tags: ["schedule", "phasing", "housing"],
    phase: "Foundation Stage",
  },
  {
    id: "DOC-003",
    name: "Atlantic View — Main Works Contract",
    type: "Works Contract",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    owner: "Stephen Okoro",
    updated: "2025-11-12",
    size: "6.2 MB",
    tags: ["legal", "procurement", "contractor"],
    phase: "Roofing Stage",
  },
  {
    id: "DOC-004",
    name: "Atlantic View — Structural Drawings Set B",
    type: "Drawing",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    owner: "David Mensah",
    updated: "2026-02-02",
    size: "14.1 MB",
    tags: ["engineering", "structural", "design"],
    phase: "Roofing Stage",
  },
  {
    id: "DOC-005",
    name: "Emerald Gardens — June Site Inspection Report",
    type: "Site Report",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    owner: "Helen Park",
    updated: "2026-06-08",
    size: "3.1 MB",
    tags: ["inspection", "quality", "hse"],
    phase: "Finishing Stage",
  },
  {
    id: "DOC-006",
    name: "Royal Crest — Finishing Specifications Pack",
    type: "Drawing",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    owner: "Daniel Ajayi",
    updated: "2026-05-22",
    size: "8.7 MB",
    tags: ["finishing", "specifications", "commercial"],
    phase: "Handover Preparation",
  },
  {
    id: "DOC-007",
    name: "Riverside Commercial — Development Brief",
    type: "Development Brief",
    project: "Riverside Commercial Complex",
    projectId: 4,
    location: "Woji, Port Harcourt",
    owner: "Lola Adeyemi",
    updated: "2026-03-15",
    size: "1.9 MB",
    tags: ["governance", "commercial", "scope"],
    phase: "Structural Development",
  },
  {
    id: "DOC-008",
    name: "Woji Estate Extension — Handover Checklist Pack",
    type: "Handover Pack",
    project: "Woji Estate Extension",
    projectId: 5,
    location: "Woji, Port Harcourt",
    owner: "Maria Santos",
    updated: "2026-06-01",
    size: "1.4 MB",
    tags: ["handover", "snagging", "residential"],
    phase: "Finishing Stage",
  },
  {
    id: "DOC-009",
    name: "Greenfield — Foundation Drawings Block 1",
    type: "Drawing",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    owner: "David Mensah",
    updated: "2026-06-10",
    size: "9.3 MB",
    tags: ["foundation", "engineering", "housing"],
    phase: "Foundation Stage",
  },
  {
    id: "DOC-010",
    name: "Portfolio Standard — Works Contract Template",
    type: "Works Contract",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Corporate PMO",
    owner: "Ngozi Obi",
    updated: "2026-01-20",
    size: "2.6 MB",
    tags: ["template", "legal", "procurement"],
  },
  {
    id: "DOC-011",
    name: "Royal Crest — May Site Inspection Report",
    type: "Site Report",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    owner: "Helen Park",
    updated: "2026-05-28",
    size: "2.8 MB",
    tags: ["inspection", "handover", "quality"],
    phase: "Handover Preparation",
  },
  {
    id: "DOC-012",
    name: "Riverside Commercial — Structural Progress Report",
    type: "Site Report",
    project: "Riverside Commercial Complex",
    projectId: 4,
    location: "Woji, Port Harcourt",
    owner: "Yusuf Idris",
    updated: "2026-06-14",
    size: "4.2 MB",
    tags: ["progress", "structural", "commercial"],
    phase: "Structural Development",
  },
];

export type LessonCategory = "Best Practice" | "Case Study" | "Closeout";

export const LESSON_CATEGORIES: LessonCategory[] = [
  "Best Practice",
  "Case Study",
  "Closeout",
];

export interface Lesson {
  id: string;
  title: string;
  project: string;
  projectId: number;
  location: string;
  category: LessonCategory;
  summary: string;
  impact: string;
  date: string;
  tags: string[];
}

export const lessonCategoryVariant: Record<LessonCategory, BadgeVariant> = {
  "Best Practice": "success",
  "Case Study": "info",
  Closeout: "neutral",
};

export const lessons: Lesson[] = [
  {
    id: "LL-001",
    title: "Rainy-season buffer protected earthworks schedule",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    category: "Best Practice",
    summary:
      "Building a six-week rainy-season contingency into the Greenfield earthworks baseline avoided repeated re-baselining and kept forecast credibility with the board.",
    impact: "Stable forecast, fewer re-baselines across two wet seasons",
    date: "2026-01-20",
    tags: ["scheduling", "risk", "earthworks"],
  },
  {
    id: "LL-002",
    title: "Early buyer walkthroughs reduced finishing snags",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    category: "Best Practice",
    summary:
      "Inviting off-plan buyers to finishing-stage walkthroughs before final inspection surfaced defect lists early and aligned expectations for Q3 handovers.",
    impact: "−35% snagging items at formal handover",
    date: "2026-03-08",
    tags: ["handover", "quality", "sales"],
  },
  {
    id: "LL-003",
    title: "Local subcontractor pre-qualification cut mobilization delay",
    project: "Atlantic View Residences",
    projectId: 3,
    location: "Trans Amadi, Port Harcourt",
    category: "Case Study",
    summary:
      "Pre-qualifying Rivers State roofing subcontractors before contract award removed a three-week mobilization gap when the primary bidder withdrew.",
    impact: "−3 weeks mobilization, template reused on Royal Crest",
    date: "2026-02-15",
    tags: ["procurement", "contractor", "roofing"],
  },
  {
    id: "LL-004",
    title: "Estate snagging workflow shortened Phase 1 acceptance",
    project: "Woji Estate Extension",
    projectId: 5,
    location: "Woji, Port Harcourt",
    category: "Closeout",
    summary:
      "A structured snagging register with photographic evidence and 48-hour contractor response SLAs shortened Phase 1 acceptance and will be reused for Block D.",
    impact: "−12 days to practical completion on Phase 1",
    date: "2026-04-02",
    tags: ["handover", "snagging", "residential"],
  },
  {
    id: "LL-005",
    title: "BOQ review gate before foundation mobilization",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    category: "Best Practice",
    summary:
      "Mandatory quantity surveyor sign-off on the bill of quantities before foundation works mobilization caught scope gaps that would have triggered variation orders mid-pour.",
    impact: "Avoided projected ₦180M in variation exposure",
    date: "2026-05-18",
    tags: ["cost", "foundation", "governance"],
  },
  {
    id: "LL-006",
    title: "Community liaison eased estate access during road works",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    category: "Case Study",
    summary:
      "Appointing a community liaison before estate road resurfacing reduced access disputes and kept material deliveries on schedule through the rainy season.",
    impact: "Zero delivery stoppages during 8-week road programme",
    date: "2026-02-28",
    tags: ["community", "access", "logistics"],
  },
];

/** Distinct developments referenced across documents and lessons. */
export const developmentNames = [
  ...new Set([
    ...documents.map((d) => d.project),
    ...lessons.map((l) => l.project),
  ]),
].filter((p) => p !== "Portfolio-wide");
