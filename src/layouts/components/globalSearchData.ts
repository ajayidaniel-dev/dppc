import type { LucideIcon } from "lucide-react";
import {
  BookOpen,
  Building2,
  FileBarChart,
  Flag,
  Images,
  LayoutDashboard,
  TriangleAlert,
  Users,
} from "lucide-react";
import { navSections } from "../../constants";
import { projectDetailsPath, routes } from "../../router/routes";
import { documents, lessons } from "../../screens/knowledge/knowledgeData";
import { mediaItems } from "../../screens/media/mediaData";
import { milestones } from "../../screens/milestones/milestonesData";
import { projects } from "../../screens/projects/projectsData";
import { reports } from "../../screens/reports/reportsData";
import { risks } from "../../screens/risks/risksData";
import { stakeholders } from "../../screens/stakeholders/stakeholdersData";

export type SearchCategory =
  | "Developments"
  | "Site Risks"
  | "Milestones"
  | "Reports"
  | "Documents"
  | "Media"
  | "Stakeholders"
  | "Pages";

export interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  category: SearchCategory;
  path: string;
  searchText: string;
}

export const categoryMeta: Record<
  SearchCategory,
  { icon: LucideIcon; label: string }
> = {
  Developments: { icon: Building2, label: "Developments" },
  "Site Risks": { icon: TriangleAlert, label: "Site Risks" },
  Milestones: { icon: Flag, label: "Milestones" },
  Reports: { icon: FileBarChart, label: "Reports" },
  Documents: { icon: BookOpen, label: "Documents" },
  Media: { icon: Images, label: "Media" },
  Stakeholders: { icon: Users, label: "Stakeholders" },
  Pages: { icon: LayoutDashboard, label: "Pages" },
};

export const suggestedSearches = [
  "Emerald Gardens",
  "Site risks",
  "Handover",
  "Board report",
  "Atlantic View",
];

const categoryOrder: SearchCategory[] = [
  "Pages",
  "Developments",
  "Site Risks",
  "Milestones",
  "Reports",
  "Documents",
  "Media",
  "Stakeholders",
];

function buildIndex(): SearchResult[] {
  const items: SearchResult[] = [];

  for (const section of navSections) {
    for (const item of section.items) {
      items.push({
        id: `page-${item.path}`,
        title: item.label,
        subtitle: section.label
          ? `${section.label} · Portfolio navigation`
          : "Portfolio navigation",
        category: "Pages",
        path: item.path,
        searchText: [item.label, section.label, "page navigation"]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      });
    }
  }

  for (const p of projects) {
    items.push({
      id: `dev-${p.id}`,
      title: p.name,
      subtitle: `${p.code} · ${p.location} · ${p.phase}`,
      category: "Developments",
      path: projectDetailsPath(p.id),
      searchText: [
        p.name,
        p.code,
        p.location,
        p.phase,
        p.manager,
        p.businessUnit,
        "development estate",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const r of risks) {
    items.push({
      id: r.id,
      title: r.title,
      subtitle: `${r.project} · ${r.location}`,
      category: "Site Risks",
      path: routes.RISKS,
      searchText: [r.id, r.title, r.project, r.location, r.category, r.owner, "risk"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const m of milestones) {
    items.push({
      id: m.id,
      title: m.name,
      subtitle: `${m.project} · ${m.phase}`,
      category: "Milestones",
      path: routes.MILESTONES,
      searchText: [
        m.id,
        m.name,
        m.project,
        m.projectCode,
        m.location,
        m.phase,
        m.milestoneType,
        "milestone handover construction",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const r of reports) {
    items.push({
      id: r.id,
      title: r.name,
      subtitle: `${r.type} · ${r.scope}`,
      category: "Reports",
      path: routes.REPORTS,
      searchText: [r.id, r.name, r.description, r.scope, r.type, r.category, "report"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const d of documents) {
    items.push({
      id: d.id,
      title: d.name,
      subtitle: `${d.project} · ${d.type}`,
      category: "Documents",
      path: routes.KNOWLEDGE,
      searchText: [d.id, d.name, d.project, d.location, d.type, ...d.tags, "document"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const l of lessons) {
    items.push({
      id: l.id,
      title: l.title,
      subtitle: `${l.project} · Lesson learned`,
      category: "Documents",
      path: routes.KNOWLEDGE,
      searchText: [l.id, l.title, l.project, l.summary, ...l.tags, "lesson"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const m of mediaItems) {
    items.push({
      id: m.id,
      title: m.title,
      subtitle: `${m.project} · ${m.category}`,
      category: "Media",
      path: routes.MEDIA,
      searchText: [m.id, m.title, m.project, m.location, m.category, "photo video media"]
        .join(" ")
        .toLowerCase(),
    });
  }

  for (const s of stakeholders) {
    items.push({
      id: s.id,
      title: s.name,
      subtitle: `${s.role} · ${s.organization}`,
      category: "Stakeholders",
      path: routes.STAKEHOLDERS,
      searchText: [
        s.id,
        s.name,
        s.role,
        s.organization,
        s.category,
        ...s.developments,
        "stakeholder",
      ]
        .join(" ")
        .toLowerCase(),
    });
  }

  return items;
}

export const searchIndex = buildIndex();

export function searchGlobal(query: string, limit = 24): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const scored = searchIndex
    .map((item) => {
      const titleMatch = item.title.toLowerCase().includes(q);
      const subtitleMatch = item.subtitle.toLowerCase().includes(q);
      const textMatch = item.searchText.includes(q);
      if (!titleMatch && !subtitleMatch && !textMatch) return null;

      let score = 0;
      if (item.title.toLowerCase().startsWith(q)) score += 10;
      else if (titleMatch) score += 6;
      if (item.subtitle.toLowerCase().includes(q)) score += 3;
      if (textMatch) score += 1;
      if (item.category === "Developments") score += 1;

      return { item, score };
    })
    .filter((x): x is { item: SearchResult; score: number } => x !== null)
    .sort((a, b) => b.score - a.score || a.item.title.localeCompare(b.item.title));

  return scored.slice(0, limit).map((x) => x.item);
}

export function groupResults(results: SearchResult[]): Map<SearchCategory, SearchResult[]> {
  const grouped = new Map<SearchCategory, SearchResult[]>();
  for (const cat of categoryOrder) {
    const items = results.filter((r) => r.category === cat);
    if (items.length > 0) grouped.set(cat, items);
  }
  return grouped;
}
