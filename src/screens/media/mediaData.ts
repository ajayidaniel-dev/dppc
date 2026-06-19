import { projects, projectImage, VERIFIED_PHOTOS } from "../projects/projectsData";

export type MediaType = "Image" | "Video" | "Infographic";

export const MEDIA_CATEGORIES = [
  "Site Images",
  "Drone Footage",
  "Progress Photos",
  "Progress Updates",
  "Site Inspection",
  "Handover",
  "KPI Reports",
  "Budget Summaries",
] as const;

export type MediaCategory = (typeof MEDIA_CATEGORIES)[number];

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  project: string;
  projectId: number;
  location: string;
  category: string;
  date: string;
  meta: string;
  url: string;
}

const portfolioInfographics: MediaItem[] = [
  {
    id: "MED-IG-001",
    title: "H1 development portfolio KPI summary",
    type: "Infographic",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "KPI Reports",
    date: "2026-06-15",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.estateAerial),
  },
  {
    id: "MED-IG-002",
    title: "Development budget utilization by site",
    type: "Infographic",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "Budget Summaries",
    date: "2026-06-01",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.droneAerial),
  },
  {
    id: "MED-IG-003",
    title: "Construction progress heatmap — June",
    type: "Infographic",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "KPI Reports",
    date: "2026-06-10",
    meta: "1 page",
    url: projectImage(VERIFIED_PHOTOS.constructionSite, 800, 600),
  },
];

const extraGalleryItems: MediaItem[] = [
  {
    id: "MED-EX-001",
    title: "Woji Estate — practical completion ceremony",
    type: "Image",
    project: "Woji Estate Extension",
    projectId: 5,
    location: "Woji, Port Harcourt",
    category: "Handover",
    date: "2026-05-30",
    meta: "Photo",
    url: projectImage(VERIFIED_PHOTOS.handover),
  },
  {
    id: "MED-EX-002",
    title: "Greenfield — community liaison site visit",
    type: "Image",
    project: "Greenfield Housing Scheme",
    projectId: 2,
    location: "Obio-Akpor, Rivers State",
    category: "Site Inspection",
    date: "2026-06-05",
    meta: "Photo",
    url: projectImage(VERIFIED_PHOTOS.foundationWorks),
  },
  {
    id: "MED-EX-003",
    title: "Emerald Gardens — estate exterior",
    type: "Image",
    project: "Emerald Gardens Estate",
    projectId: 1,
    location: "GRA Phase 2, Port Harcourt",
    category: "Site Images",
    date: "2026-06-12",
    meta: "Photo",
    url: projectImage(VERIFIED_PHOTOS.luxuryHome),
  },
  {
    id: "MED-EX-004",
    title: "Royal Crest — apartment block progress",
    type: "Image",
    project: "Royal Crest Apartments",
    projectId: 6,
    location: "Ada George, Port Harcourt",
    category: "Progress Photos",
    date: "2026-06-14",
    meta: "Photo",
    url: projectImage(VERIFIED_PHOTOS.apartmentBuilding),
  },
];

/** Flatten project media + portfolio infographics for the gallery page. */
export const mediaItems: MediaItem[] = [
  ...projects.flatMap((p) =>
    p.media.map((m) => ({
      id: m.id,
      title: m.title,
      type: m.type,
      project: p.name,
      projectId: p.id,
      location: p.location,
      category: m.category,
      date: m.date,
      meta: m.type === "Video" ? "Video" : "Photo",
      url: m.url,
    })),
  ),
  ...extraGalleryItems,
  ...portfolioInfographics,
];

export const developmentNames = [
  ...new Set(
    mediaItems.map((m) => m.project).filter((p) => p !== "Portfolio-wide"),
  ),
];

export const sitesWithMedia = developmentNames.length;
