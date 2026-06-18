export const routes = {
  LOGIN: "/",
  DASHBOARD: "/dashboard/overview",
  PORTFOLIO: "/dashboard/portfolio",
  PROJECTS: "/dashboard/projects",
  PROJECT_DETAILS: "/dashboard/projects/:projectId",
  MILESTONES: "/dashboard/milestones",
  PERFORMANCE: "/dashboard/performance",
  RISKS: "/dashboard/risks",
  REPORTS: "/dashboard/reports",
  KNOWLEDGE: "/dashboard/knowledge",
  MEDIA: "/dashboard/media",
  HIGHLIGHTS: "/dashboard/highlights",
  STAKEHOLDERS: "/dashboard/stakeholders",
  COMPANY: "/dashboard/company",
  SETTINGS: "/dashboard/settings",
  NOT_FOUND: "/404",
} as const;

export type RouteKey = keyof typeof routes;

export const projectDetailsPath = (projectId: string | number): string =>
  routes.PROJECT_DETAILS.replace(":projectId", String(projectId));
