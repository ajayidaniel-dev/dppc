export type MediaType = "Image" | "Video" | "Infographic";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  project: string;
  category: string;
  date: string;
  meta: string;
}

export const mediaItems: MediaItem[] = [
  {
    id: "MED-01",
    title: "HQ atrium — after renovation",
    type: "Image",
    project: "Corporate HQ Renovation",
    category: "Before & After",
    date: "2026-03-30",
    meta: "4 photos",
  },
  {
    id: "MED-02",
    title: "Coastal corridor — aerial survey",
    type: "Video",
    project: "Coastal Highway Phase II",
    category: "Drone Footage",
    date: "2026-02-18",
    meta: "2:14",
  },
  {
    id: "MED-03",
    title: "Pilot microgrid commissioning",
    type: "Video",
    project: "Solar Microgrid Rollout",
    category: "Completion Events",
    date: "2025-12-01",
    meta: "3:48",
  },
  {
    id: "MED-04",
    title: "September portfolio KPI summary",
    type: "Infographic",
    project: "Portfolio",
    category: "KPI Reports",
    date: "2026-09-30",
    meta: "1 page",
  },
  {
    id: "MED-05",
    title: "Earthworks site progress",
    type: "Image",
    project: "Coastal Highway Phase II",
    category: "Site Images",
    date: "2026-05-12",
    meta: "9 photos",
  },
  {
    id: "MED-06",
    title: "Sponsor interview — ERP vision",
    type: "Video",
    project: "ERP Migration",
    category: "Interviews",
    date: "2026-01-22",
    meta: "5:02",
  },
  {
    id: "MED-07",
    title: "Budget utilization breakdown",
    type: "Infographic",
    project: "Portfolio",
    category: "Budget Summaries",
    date: "2026-08-31",
    meta: "1 page",
  },
  {
    id: "MED-08",
    title: "HQ fit-out team on site",
    type: "Image",
    project: "Corporate HQ Renovation",
    category: "Team Activities",
    date: "2026-02-08",
    meta: "6 photos",
  },
  {
    id: "MED-09",
    title: "Portal beta — progress update",
    type: "Video",
    project: "Customer Portal Revamp",
    category: "Progress Updates",
    date: "2026-05-30",
    meta: "1:36",
  },
  {
    id: "MED-10",
    title: "Resource utilization heatmap",
    type: "Infographic",
    project: "Portfolio",
    category: "Resource Utilization",
    date: "2026-09-15",
    meta: "1 page",
  },
  {
    id: "MED-11",
    title: "Solar array installation",
    type: "Image",
    project: "Solar Microgrid Rollout",
    category: "Progress Photos",
    date: "2026-04-19",
    meta: "11 photos",
  },
  {
    id: "MED-12",
    title: "Harbor terminal — concept flythrough",
    type: "Video",
    project: "Harbor Terminal Upgrade",
    category: "Progress Updates",
    date: "2026-03-25",
    meta: "2:50",
  },
];
