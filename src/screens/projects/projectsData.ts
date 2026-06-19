import type { SyntheticEvent } from "react";
import type { Status } from "../../utils/types";

export type MilestoneStatus =
  | "Completed"
  | "In Progress"
  | "Planned"
  | "Delayed";

export type RiskSeverity = "Critical" | "High" | "Medium" | "Low";

export interface Milestone {
  name: string;
  owner: string;
  due: string;
  status: MilestoneStatus;
}

export interface ProjectRisk {
  title: string;
  severity: RiskSeverity;
  owner: string;
  state: "Open" | "Mitigated";
}

export interface TeamMember {
  name: string;
  role: string;
}

export type ProjectMediaType = "Image" | "Video";

export interface ProjectMedia {
  id: string;
  title: string;
  type: ProjectMediaType;
  category: string;
  date: string;
  /** Image URL (or video poster frame). */
  url: string;
}

export interface Project {
  id: number;
  code: string;
  name: string;
  description: string;
  manager: string;
  sponsor: string;
  client: string;
  location: string;
  businessUnit: string;
  phase: string;
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  progress: number;
  spi: number;
  cpi: number;
  resourceUtil: number;
  status: Status;
  strategicObjective: string;
  businessDriver: string;
  expectedBenefits: string;
  coverImage: string;
  media: ProjectMedia[];
  milestones: Milestone[];
  risks: ProjectRisk[];
  team: TeamMember[];
}

/** Verified Unsplash photo IDs — real estate & construction only. */
export const VERIFIED_PHOTOS = {
  /** Active construction site — structure and scaffolding */
  constructionSite: "1503387762-592deb58ef4e",
  /** Building frame and structural works */
  construction: "1541888946425-d81bb19240f5",
  /** Site crew on a development project */
  constructionWorkers: "1581092160562-40aa08e78837",
  /** Tower crane at a high-rise development */
  crane: "1565008576549-57569a49371d",
  /** Drone aerial of a construction site */
  droneAerial: "1591488320449-011701bb6704",
  /** Finished apartment / unit interior */
  apartmentInterior: "1600585154340-be6161a56a0c",
  /** Luxury residential estate exterior */
  luxuryHome: "1600596542815-ffad4c1539a9",
  /** Modern detached residential property */
  modernResidential: "1512917774080-9991f1c4c750",
  /** Multi-storey apartment / estate block */
  apartmentBuilding: "1545324418-cc1a3fa10c00",
  /** Commercial / mixed-use building under construction */
  commercialBuild: "1486712590848-f76fc98ce960",
  /** Property handover — keys and new home */
  handover: "1560518883-ce09059eeffa",
  /** Housing estate aerial — suburban development */
  estateAerial: "1449824913935-59a10b8d2000",
  /** Foundation and early structural works */
  foundationWorks: "1504307651254-35680f356dfd",
  /** House under construction — roof and framing stage */
  houseUnderConstruction: "1605276374104-de8862ebb076",
  /** Residential housing complex */
  housingComplex: "1582268611958-ebfd161ef210",
  /** Tropical / premium residential development */
  residentialEstate: "1564013799919-ab600027ffc6",
} as const;

/** Unsplash image helper — real photos for a lively demo. */
export const projectImage = (
  photoId: string,
  width = 800,
  height?: number,
): string => {
  const h = height ? `&h=${height}` : "";
  return `https://images.unsplash.com/photo-${photoId}?ixlib=rb-4.0.3&auto=format&fit=crop&w=${width}${h}&q=80`;
};

/** Safe fallback when an image fails to load. */
export const PROJECT_IMAGE_FALLBACK = projectImage(VERIFIED_PHOTOS.constructionSite);

export const handleProjectImageError = (
  e: SyntheticEvent<HTMLImageElement>,
) => {
  if (e.currentTarget.src !== PROJECT_IMAGE_FALLBACK) {
    e.currentTarget.src = PROJECT_IMAGE_FALLBACK;
  }
};

export const PROJECT_PHASES = [
  "Site Preparation",
  "Foundation Stage",
  "Structural Development",
  "Roofing Stage",
  "Finishing Stage",
  "Infrastructure Installation",
  "Handover Preparation",
  "Completed",
] as const;

export const DEVELOPMENT_TYPES = [
  "Residential",
  "Commercial",
  "Mixed-Use",
  "Infrastructure",
  "Land Bank",
] as const;

export const projects: Project[] = [
  {
    id: 1,
    code: "DEV-001",
    name: "Emerald Gardens Estate",
    description:
      "Premium residential estate development with 240 housing units across four blocks in GRA Phase 2.",
    manager: "Amara Bello",
    sponsor: "Residential Development",
    client: "Internal — Property Sales",
    location: "GRA Phase 2, Port Harcourt",
    businessUnit: "Residential",
    phase: "Finishing Stage",
    startDate: "2025-10-01",
    endDate: "2026-09-30",
    budget: 12_400_000_000,
    spent: 8_928_000_000,
    progress: 72,
    spi: 0.98,
    cpi: 1.02,
    resourceUtil: 84,
    status: "green",
    strategicObjective: "Deliver premium housing in GRA Phase 2",
    businessDriver: "High-demand residential corridor in Port Harcourt",
    expectedBenefits: "240 units · ₦18B projected sales revenue",
    coverImage: projectImage(VERIFIED_PHOTOS.luxuryHome, 1200),
    media: [
      {
        id: "p1-m1",
        title: "Block A — external finishes",
        type: "Image",
        category: "Progress Photos",
        date: "2026-03-30",
        url: projectImage(VERIFIED_PHOTOS.apartmentInterior),
      },
      {
        id: "p1-m2",
        title: "Finishing works — Block B",
        type: "Image",
        category: "Site Images",
        date: "2026-02-14",
        url: projectImage(VERIFIED_PHOTOS.houseUnderConstruction),
      },
      {
        id: "p1-m3",
        title: "Site inspection — finishing stage",
        type: "Image",
        category: "Site Inspection",
        date: "2026-02-08",
        url: projectImage(VERIFIED_PHOTOS.residentialEstate),
      },
      {
        id: "p1-m4",
        title: "Buyer walkthrough preview",
        type: "Video",
        category: "Handover",
        date: "2026-04-02",
        url: projectImage(VERIFIED_PHOTOS.handover, 800, 500),
      },
    ],
    milestones: [
      { name: "Design sign-off", owner: "Amara Bello", due: "2025-11-15", status: "Completed" },
      { name: "Phase 1 fit-out", owner: "Tunde Okafor", due: "2026-03-30", status: "Completed" },
      { name: "Phase 2 fit-out", owner: "Tunde Okafor", due: "2026-07-20", status: "In Progress" },
      { name: "Handover & closeout", owner: "Amara Bello", due: "2026-09-30", status: "Planned" },
    ],
    risks: [
      { title: "Material lead times slipping", severity: "Medium", owner: "Tunde Okafor", state: "Open" },
      { title: "Asbestos remediation cost", severity: "Low", owner: "Amara Bello", state: "Mitigated" },
    ],
    team: [
      { name: "Amara Bello", role: "Project Manager" },
      { name: "Tunde Okafor", role: "Site Lead" },
      { name: "Grace Eze", role: "Cost Controller" },
      { name: "David Mensah", role: "Architect" },
    ],
  },
  {
    id: 2,
    code: "DEV-002",
    name: "Greenfield Housing Scheme",
    description:
      "Affordable housing scheme delivering 180 units across Obio-Akpor with on-site infrastructure and community amenities.",
    manager: "Tunde Okafor",
    sponsor: "Residential Development",
    client: "Internal — Property Sales",
    location: "Obio-Akpor, Port Harcourt",
    businessUnit: "Residential",
    phase: "Site Preparation",
    startDate: "2025-08-01",
    endDate: "2026-07-15",
    budget: 6_800_000_000,
    spent: 3_264_000_000,
    progress: 48,
    spi: 0.92,
    cpi: 0.97,
    resourceUtil: 88,
    status: "amber",
    strategicObjective: "Expand affordable housing supply in Obio-Akpor",
    businessDriver: "State housing mandate and land bank activation",
    expectedBenefits: "180 units · community roads and drainage",
    coverImage: projectImage(VERIFIED_PHOTOS.estateAerial, 1200),
    media: [
      {
        id: "p2-m1",
        title: "Site clearing — Phase A",
        type: "Image",
        category: "Site Images",
        date: "2026-01-18",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p2-m2",
        title: "Housing scheme — aerial survey",
        type: "Image",
        category: "Drone Footage",
        date: "2026-02-15",
        url: projectImage(VERIFIED_PHOTOS.estateAerial),
      },
      {
        id: "p2-m3",
        title: "Stakeholder site walkthrough",
        type: "Video",
        category: "Progress Updates",
        date: "2026-03-10",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers, 800, 500),
      },
    ],
    milestones: [
      { name: "Land acquisition close", owner: "Tunde Okafor", due: "2025-09-10", status: "Completed" },
      { name: "Site preparation complete", owner: "Tunde Okafor", due: "2026-04-01", status: "Delayed" },
      { name: "Foundation works — Block 1", owner: "Grace Eze", due: "2026-06-20", status: "Planned" },
    ],
    risks: [
      { title: "Community access road delays", severity: "High", owner: "Tunde Okafor", state: "Open" },
      { title: "Topsoil removal cost overrun", severity: "Medium", owner: "Grace Eze", state: "Open" },
    ],
    team: [
      { name: "Tunde Okafor", role: "Project Manager" },
      { name: "Grace Eze", role: "Cost Controller" },
      { name: "David Mensah", role: "Architect" },
    ],
  },
  {
    id: 3,
    code: "DEV-003",
    name: "Atlantic View Residences",
    description:
      "Mixed-use waterfront development combining residential towers, retail podium, and underground parking.",
    manager: "Stephen Okoro",
    sponsor: "Commercial Development",
    client: "Internal — Property Investment",
    location: "Trans Amadi, Port Harcourt",
    businessUnit: "Mixed-Use",
    phase: "Roofing Stage",
    startDate: "2025-11-01",
    endDate: "2027-01-20",
    budget: 11_100_000_000,
    spent: 3_441_000_000,
    progress: 31,
    spi: 0.84,
    cpi: 0.94,
    resourceUtil: 92,
    status: "red",
    strategicObjective: "Deliver mixed-use waterfront asset in Trans Amadi",
    businessDriver: "Corporate tenant demand and retail footfall growth",
    expectedBenefits: "320 units · 12,000 sqm retail GLA",
    coverImage: projectImage(VERIFIED_PHOTOS.apartmentBuilding, 1200),
    media: [
      {
        id: "p3-m1",
        title: "Waterfront towers — aerial survey",
        type: "Image",
        category: "Drone Footage",
        date: "2026-02-18",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p3-m2",
        title: "Structural works — Tower A progress",
        type: "Image",
        category: "Progress Photos",
        date: "2026-05-12",
        url: projectImage(VERIFIED_PHOTOS.commercialBuild),
      },
      {
        id: "p3-m3",
        title: "Roofing stage — site team briefing",
        type: "Image",
        category: "Site Images",
        date: "2026-04-28",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers),
      },
      {
        id: "p3-m4",
        title: "Mixed-use footprint — site overview",
        type: "Image",
        category: "Site Images",
        date: "2026-03-05",
        url: projectImage(VERIFIED_PHOTOS.housingComplex),
      },
      {
        id: "p3-m5",
        title: "Weekly drone flyover",
        type: "Video",
        category: "Drone Footage",
        date: "2026-05-20",
        url: projectImage(VERIFIED_PHOTOS.crane, 800, 500),
      },
    ],
    milestones: [
      { name: "Environmental approval", owner: "Stephen Okoro", due: "2025-12-15", status: "Completed" },
      { name: "Earthworks complete", owner: "Bola Adisa", due: "2026-06-30", status: "Delayed" },
      { name: "Interchange A structure", owner: "Bola Adisa", due: "2026-10-15", status: "Planned" },
    ],
    risks: [
      { title: "Forecast budget overrun +12%", severity: "Critical", owner: "Stephen Okoro", state: "Open" },
      { title: "Rainy-season schedule slip", severity: "High", owner: "Bola Adisa", state: "Open" },
    ],
    team: [
      { name: "Stephen Okoro", role: "Project Manager" },
      { name: "Bola Adisa", role: "Construction Lead" },
      { name: "Helen Park", role: "QA / HSE" },
      { name: "Femi Lawal", role: "Quantity Surveyor" },
    ],
  },
  {
    id: 4,
    code: "DEV-004",
    name: "Riverside Commercial Complex",
    description:
      "Grade-A commercial complex with office towers, ground-floor retail, and structured parking in Woji.",
    manager: "Lola Adeyemi",
    sponsor: "Commercial Development",
    client: "Internal — Property Investment",
    location: "Woji, Port Harcourt",
    businessUnit: "Commercial",
    phase: "Structural Development",
    startDate: "2025-09-15",
    endDate: "2026-11-05",
    budget: 5_200_000_000,
    spent: 3_120_000_000,
    progress: 60,
    spi: 1.01,
    cpi: 1.04,
    resourceUtil: 79,
    status: "green",
    strategicObjective: "Anchor commercial hub in Woji district",
    businessDriver: "Office vacancy demand along East–West Road corridor",
    expectedBenefits: "45,000 sqm lettable area · 18 retail bays",
    coverImage: projectImage(VERIFIED_PHOTOS.commercialBuild, 1200),
    media: [
      {
        id: "p4-m1",
        title: "Tower A — structural frame",
        type: "Image",
        category: "Progress Photos",
        date: "2025-12-01",
        url: projectImage(VERIFIED_PHOTOS.crane),
      },
      {
        id: "p4-m2",
        title: "Concrete pour — Level 8",
        type: "Image",
        category: "Site Images",
        date: "2026-04-19",
        url: projectImage(VERIFIED_PHOTOS.construction),
      },
      {
        id: "p4-m3",
        title: "Site safety briefing",
        type: "Image",
        category: "Site Inspection",
        date: "2026-03-22",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers),
      },
      {
        id: "p4-m4",
        title: "Weekly progress flyover",
        type: "Video",
        category: "Drone Footage",
        date: "2025-12-03",
        url: projectImage(VERIFIED_PHOTOS.droneAerial, 800, 500),
      },
    ],
    milestones: [
      { name: "Foundation complete", owner: "Lola Adeyemi", due: "2025-12-01", status: "Completed" },
      { name: "Level 10 slab", owner: "Yusuf Idris", due: "2026-06-15", status: "In Progress" },
      { name: "Structural topping out", owner: "Lola Adeyemi", due: "2026-11-05", status: "Planned" },
    ],
    risks: [
      { title: "Steel price volatility", severity: "Medium", owner: "Yusuf Idris", state: "Mitigated" },
    ],
    team: [
      { name: "Lola Adeyemi", role: "Project Manager" },
      { name: "Yusuf Idris", role: "Construction Lead" },
      { name: "Nadia Haddad", role: "Procurement" },
    ],
  },
  {
    id: 5,
    code: "DEV-005",
    name: "Woji Estate Extension",
    description:
      "Second-phase residential extension adding 120 units with upgraded estate roads and perimeter security.",
    manager: "Maria Santos",
    sponsor: "Residential Development",
    client: "Internal — Property Sales",
    location: "Woji, Port Harcourt",
    businessUnit: "Residential",
    phase: "Finishing Stage",
    startDate: "2025-12-01",
    endDate: "2026-08-30",
    budget: 3_800_000_000,
    spent: 2_090_000_000,
    progress: 55,
    spi: 0.95,
    cpi: 0.98,
    resourceUtil: 86,
    status: "amber",
    strategicObjective: "Extend Woji estate footprint with mid-market units",
    businessDriver: "Strong off-plan sales from Phase 1 buyers",
    expectedBenefits: "120 units · 92% Phase 1 occupancy",
    coverImage: projectImage(VERIFIED_PHOTOS.modernResidential, 1200),
    media: [
      {
        id: "p5-m1",
        title: "Block D — external finishes",
        type: "Image",
        category: "Progress Photos",
        date: "2026-05-30",
        url: projectImage(VERIFIED_PHOTOS.apartmentInterior),
      },
      {
        id: "p5-m2",
        title: "Estate road resurfacing",
        type: "Image",
        category: "Site Images",
        date: "2026-02-10",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p5-m3",
        title: "Show unit walkthrough",
        type: "Video",
        category: "Handover",
        date: "2026-05-15",
        url: projectImage(VERIFIED_PHOTOS.handover, 800, 500),
      },
    ],
    milestones: [
      { name: "Block D weathertight", owner: "Maria Santos", due: "2026-02-10", status: "Completed" },
      { name: "Internal finishes — Block D", owner: "Chen Wei", due: "2026-05-30", status: "In Progress" },
      { name: "Phase 2 handover", owner: "Maria Santos", due: "2026-08-30", status: "Planned" },
    ],
    risks: [
      { title: "Finishing materials lead time", severity: "Medium", owner: "Maria Santos", state: "Open" },
      { title: "Estate access during road works", severity: "Low", owner: "Maria Santos", state: "Mitigated" },
    ],
    team: [
      { name: "Maria Santos", role: "Project Manager" },
      { name: "Chen Wei", role: "Site Lead" },
      { name: "Priya Nair", role: "Sales Coordinator" },
    ],
  },
  {
    id: 6,
    code: "DEV-006",
    name: "Royal Crest Apartments",
    description:
      "Commercial apartment complex with ground-floor retail, targeting corporate tenants and owner-occupiers.",
    manager: "Daniel Ajayi",
    sponsor: "Commercial Development",
    client: "Internal — Property Sales",
    location: "Ada George, Port Harcourt",
    businessUnit: "Commercial",
    phase: "Handover Preparation",
    startDate: "2026-03-01",
    endDate: "2027-05-30",
    budget: 9_100_000_000,
    spent: 1_365_000_000,
    progress: 15,
    spi: 0.88,
    cpi: 0.9,
    resourceUtil: 95,
    status: "red",
    strategicObjective: "Premium commercial apartments on Ada George corridor",
    businessDriver: "Corporate rental demand and ground-floor retail",
    expectedBenefits: "96 units · 85% pre-sales on launch blocks",
    coverImage: projectImage(VERIFIED_PHOTOS.housingComplex, 1200),
    media: [
      {
        id: "p6-m1",
        title: "Royal Crest — aerial overview",
        type: "Image",
        category: "Drone Footage",
        date: "2026-03-25",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p6-m2",
        title: "Foundation works — Block A",
        type: "Image",
        category: "Progress Photos",
        date: "2026-04-10",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p6-m3",
        title: "Tower crane installation",
        type: "Image",
        category: "Site Images",
        date: "2026-03-18",
        url: projectImage(VERIFIED_PHOTOS.crane),
      },
      {
        id: "p6-m4",
        title: "Show unit finishing preview",
        type: "Video",
        category: "Handover",
        date: "2026-03-25",
        url: projectImage(VERIFIED_PHOTOS.apartmentInterior, 800, 500),
      },
    ],
    milestones: [
      { name: "Substructure complete", owner: "Daniel Ajayi", due: "2026-04-30", status: "Completed" },
      { name: "Retail fit-out", owner: "Ngozi Obi", due: "2026-09-30", status: "In Progress" },
      { name: "Block handover — Phase 1", owner: "Ngozi Obi", due: "2027-01-15", status: "Planned" },
    ],
    risks: [
      { title: "Unmitigated high-severity risk open 21 days", severity: "Critical", owner: "Daniel Ajayi", state: "Open" },
      { title: "Vendor capacity constraints", severity: "High", owner: "Ngozi Obi", state: "Open" },
    ],
    team: [
      { name: "Daniel Ajayi", role: "Project Manager" },
      { name: "Ngozi Obi", role: "Procurement Lead" },
      { name: "Marcus Cole", role: "Sales Coordinator" },
    ],
  },
];

export const getProjectById = (id: number | string): Project | undefined =>
  projects.find((p) => p.id === Number(id));

/** Estimate at completion via simple cost-extrapolation from progress. */
export const estimateAtCompletion = (project: Project): number =>
  project.progress > 0
    ? Math.round(project.spent / (project.progress / 100))
    : project.budget;
