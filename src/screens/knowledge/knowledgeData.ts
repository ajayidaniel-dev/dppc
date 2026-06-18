import type { BadgeVariant } from "../../components/elements";

export type DocType = "Charter" | "Contract" | "Drawing" | "Plan" | "Report";

export interface DocumentRecord {
  id: string;
  name: string;
  type: DocType;
  project: string;
  owner: string;
  updated: string;
  size: string;
  tags: string[];
}

export const documents: DocumentRecord[] = [
  {
    id: "DOC-001",
    name: "HQ Renovation — Project Charter",
    type: "Charter",
    project: "Corporate HQ Renovation",
    owner: "Amara Bello",
    updated: "2025-10-05",
    size: "1.2 MB",
    tags: ["governance", "scope"],
  },
  {
    id: "DOC-002",
    name: "ERP Implementation Plan v3",
    type: "Plan",
    project: "ERP Migration",
    owner: "Kwame Mensah",
    updated: "2026-01-18",
    size: "3.4 MB",
    tags: ["schedule", "delivery"],
  },
  {
    id: "DOC-003",
    name: "Coastal Highway — Main Works Contract",
    type: "Contract",
    project: "Coastal Highway Phase II",
    owner: "Stephen Okoro",
    updated: "2025-11-12",
    size: "5.1 MB",
    tags: ["legal", "procurement"],
  },
  {
    id: "DOC-004",
    name: "Interchange A — Structural Drawings",
    type: "Drawing",
    project: "Coastal Highway Phase II",
    owner: "Bola Adisa",
    updated: "2026-02-02",
    size: "12.7 MB",
    tags: ["engineering", "design"],
  },
  {
    id: "DOC-005",
    name: "Solar Microgrid — Commissioning Report",
    type: "Report",
    project: "Solar Microgrid Rollout",
    owner: "Yusuf Idris",
    updated: "2025-12-03",
    size: "2.0 MB",
    tags: ["quality", "energy"],
  },
  {
    id: "DOC-006",
    name: "Customer Portal — Solution Architecture",
    type: "Plan",
    project: "Customer Portal Revamp",
    owner: "Chen Wei",
    updated: "2026-01-29",
    size: "1.8 MB",
    tags: ["architecture", "security"],
  },
  {
    id: "DOC-007",
    name: "Harbor Terminal — Feasibility Study",
    type: "Report",
    project: "Harbor Terminal Upgrade",
    owner: "Daniel Ajayi",
    updated: "2026-03-22",
    size: "4.6 MB",
    tags: ["feasibility", "maritime"],
  },
  {
    id: "DOC-008",
    name: "Crane Supply & Install — Contract",
    type: "Contract",
    project: "Harbor Terminal Upgrade",
    owner: "Ngozi Obi",
    updated: "2026-04-10",
    size: "3.9 MB",
    tags: ["procurement", "legal"],
  },
];

export type LessonCategory = "Best Practice" | "Case Study" | "Closeout";

export interface Lesson {
  id: string;
  title: string;
  project: string;
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
    title: "Early vendor onboarding cut mobilization time",
    project: "Solar Microgrid Rollout",
    category: "Best Practice",
    summary:
      "Pre-qualifying suppliers before funding approval removed a 3-week delay at the pilot site and became the template for later sites.",
    impact: "−3 weeks mobilization, replicated to 5 sites",
    date: "2025-12-10",
    tags: ["procurement", "scheduling"],
  },
  {
    id: "LL-002",
    title: "Data migration rehearsals reduced go-live defects",
    project: "ERP Migration",
    category: "Case Study",
    summary:
      "Two full dress-rehearsals of the finance data migration exposed mapping gaps early; remaining defects were addressed before cutover.",
    impact: "−40% post go-live defects (projected)",
    date: "2026-02-15",
    tags: ["data", "quality"],
  },
  {
    id: "LL-003",
    title: "Weather-buffered schedule for coastal earthworks",
    project: "Coastal Highway Phase II",
    category: "Best Practice",
    summary:
      "Building rainy-season contingency into the earthworks baseline avoided repeated re-baselining and improved forecast credibility.",
    impact: "More stable forecast, fewer re-baselines",
    date: "2026-01-20",
    tags: ["scheduling", "risk"],
  },
  {
    id: "LL-004",
    title: "Phase 1 fit-out closeout report",
    project: "Corporate HQ Renovation",
    category: "Closeout",
    summary:
      "Documented snagging process and handover checklist that shortened acceptance for Phase 1 and will be reused for Phase 2.",
    impact: "Faster acceptance, reusable checklist",
    date: "2026-04-02",
    tags: ["handover", "quality"],
  },
];
