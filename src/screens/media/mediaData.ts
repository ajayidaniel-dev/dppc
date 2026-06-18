import { projects, projectImage, VERIFIED_PHOTOS } from "../projects/projectsData";

export type MediaType = "Image" | "Video" | "Infographic";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  project: string;
  category: string;
  date: string;
  meta: string;
  url: string;
}

/** Flatten project media + portfolio infographics for the gallery page. */
export const mediaItems: MediaItem[] = [
  ...projects.flatMap((p) =>
    p.media.map((m) => ({
      id: m.id,
      title: m.title,
      type: m.type,
      project: p.name,
      category: m.category,
      date: m.date,
      meta: m.type === "Video" ? "Video" : "Photo",
      url: m.url,
    })),
  ),
  {
    id: "MED-04",
    title: "September portfolio KPI summary",
    type: "Infographic",
    project: "Portfolio",
    category: "KPI Reports",
    date: "2026-09-30",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.analytics),
  },
  {
    id: "MED-07",
    title: "Budget utilization breakdown",
    type: "Infographic",
    project: "Portfolio",
    category: "Budget Summaries",
    date: "2026-08-31",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.charts),
  },
  {
    id: "MED-10",
    title: "Resource utilization heatmap",
    type: "Infographic",
    project: "Portfolio",
    category: "Resource Utilization",
    date: "2026-09-15",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.analytics, 800, 600),
  },
];
