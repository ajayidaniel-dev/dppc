import {
  MEDIA_PHASES,
  projects,
  projectImage,
  VERIFIED_PHOTOS,
  type MediaPhase,
} from "../projects/projectsData";

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
  phase: MediaPhase | "Portfolio";
  project: string;
  projectId: number;
  location: string;
  category: string;
  date: string;
  meta: string;
  url: string;
}

export interface PhaseMediaGroup {
  phase: MediaPhase | "Portfolio";
  items: MediaItem[];
}

export interface ProjectGallery {
  projectId: number;
  projectCode: string;
  name: string;
  location: string;
  currentPhase: string;
  coverImage: string;
  mediaCount: number;
  phaseGroups: PhaseMediaGroup[];
}

const portfolioInfographics: MediaItem[] = [
  {
    id: "MED-IG-001",
    title: "H1 development portfolio KPI summary",
    type: "Infographic",
    phase: "Portfolio",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "KPI Reports",
    date: "2026-06-15",
    meta: "Infographic",
    url: projectImage(VERIFIED_PHOTOS.estateAerial),
  },
  {
    id: "MED-IG-002",
    title: "Development budget utilization by site",
    type: "Infographic",
    phase: "Portfolio",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "Budget Summaries",
    date: "2026-06-01",
    meta: "Infographic",
    url: projectImage(VERIFIED_PHOTOS.droneAerial),
  },
  {
    id: "MED-IG-003",
    title: "Construction progress heatmap — June",
    type: "Infographic",
    phase: "Portfolio",
    project: "Portfolio-wide",
    projectId: 0,
    location: "Rivers State pipeline",
    category: "KPI Reports",
    date: "2026-06-10",
    meta: "Infographic",
    url: projectImage(VERIFIED_PHOTOS.constructionSite, 800, 600),
  },
];

const toMediaItem = (
  m: (typeof projects)[number]["media"][number],
  project: (typeof projects)[number],
): MediaItem => ({
  id: m.id,
  title: m.title,
  type: m.type,
  phase: m.phase,
  project: project.name,
  projectId: project.id,
  location: project.location,
  category: m.category,
  date: m.date,
  meta:
    m.type === "Video"
      ? m.category === "Drone Footage"
        ? "Drone video"
        : "Video"
      : m.category === "Drone Footage"
        ? "Drone photo"
        : "Photo",
  url: m.url,
});

/** All media items — project assets plus portfolio infographics. */
export const mediaItems: MediaItem[] = [
  ...projects.flatMap((p) => p.media.map((m) => toMediaItem(m, p))),
  ...portfolioInfographics,
];

const phaseOrder = (phase: MediaPhase | "Portfolio"): number => {
  if (phase === "Portfolio") return MEDIA_PHASES.length;
  const idx = MEDIA_PHASES.indexOf(phase);
  return idx === -1 ? MEDIA_PHASES.length - 1 : idx;
};

export const groupMediaByPhase = (items: MediaItem[]): PhaseMediaGroup[] => {
  const map = new Map<MediaPhase | "Portfolio", MediaItem[]>();

  for (const item of items) {
    const list = map.get(item.phase) ?? [];
    list.push(item);
    map.set(item.phase, list);
  }

  return [...map.entries()]
    .sort(([a], [b]) => phaseOrder(a) - phaseOrder(b))
    .map(([phase, phaseItems]) => ({
      phase,
      items: [...phaseItems].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    }));
};

/** Project-scoped galleries with media grouped by construction phase. */
export const projectGalleries: ProjectGallery[] = projects.map((p) => {
  const media = p.media.map((m) => toMediaItem(m, p));
  return {
    projectId: p.id,
    projectCode: p.code,
    name: p.name,
    location: p.location,
    currentPhase: p.phase,
    coverImage: p.coverImage,
    mediaCount: media.length,
    phaseGroups: groupMediaByPhase(media),
  };
});

export const portfolioGallery: PhaseMediaGroup[] = groupMediaByPhase(
  portfolioInfographics,
);

export const developmentNames = projects.map((p) => p.name);

export const sitesWithMedia = projects.filter((p) => p.media.length > 0).length;

export const getProjectGallery = (projectId: number): ProjectGallery | undefined =>
  projectGalleries.find((g) => g.projectId === projectId);
