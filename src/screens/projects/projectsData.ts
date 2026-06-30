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

/** Construction phases used to organise project media in the gallery. */
export const MEDIA_PHASES = [
  "Planning & Design",
  "Site Preparation",
  "Foundation Stage",
  "Structural Development",
  "Roofing Stage",
  "Finishing Stage",
  "Infrastructure Installation",
  "Handover Preparation",
  "Completed",
] as const;

export type MediaPhase = (typeof MEDIA_PHASES)[number];

export interface ProjectMedia {
  id: string;
  title: string;
  type: ProjectMediaType;
  /** Construction phase when this asset was captured. */
  phase: MediaPhase;
  category: string;
  date: string;
  /** Image URL (or video poster frame). */
  url: string;
}

export interface ProjectSpecification {
  label: string;
  value: string;
}

export interface ProjectSummary {
  /** Rich narrative describing scope, vision, and what the development delivers. */
  narrative: string;
  /** Quick-scan specification grid (unit mix, finishes, team lead, etc.). */
  specifications: ProjectSpecification[];
}

export interface Project {
  id: number;
  code: string;
  name: string;
  description: string;
  summary: ProjectSummary;
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
    summary: {
      narrative:
        "Emerald Gardens Estate is a gated premium residential development on 18 hectares along Tombia Street Extension, GRA Phase 2. The scheme delivers 240 homes across four blocks — 60 detached and semi-detached duplexes per block — targeting professionals and diaspora buyers seeking secure, serviced living in Port Harcourt's most established residential corridor. Each unit is designed for family occupancy with generous plot setbacks, dedicated parking, and estate-wide amenities including a clubhouse, swimming pool, children's play area, and 24-hour perimeter security with CCTV. Blocks A and B are structurally complete and in active finishing; Blocks C and D are on programme for Q3 2026 handover.",
      specifications: [
        { label: "Unit mix", value: "240 homes — 3 & 4-bed semi-detached and terrace duplexes" },
        { label: "Plot size", value: "450–600 sqm per lot (detached); 320 sqm (terrace)" },
        { label: "Built-up area", value: "280–420 sqm per unit" },
        { label: "Kitchen", value: "Open-plan with granite worktops, fitted cabinets, gas hob & extractor" },
        { label: "Flooring", value: "Polished porcelain tiles (living areas); engineered wood (bedrooms)" },
        { label: "Roofing", value: "Long-span aluminium sheets on reinforced concrete slab" },
        { label: "Estate infrastructure", value: "Paved roads, underground drainage, borehole & treatment plant, street lighting" },
        { label: "Lead engineer", value: "Eng. Tunde Okafor — Site Lead & Structural Supervisor" },
      ],
    },
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
        id: "p1-m0",
        title: "Masterplan & layout approval",
        type: "Image",
        phase: "Planning & Design",
        category: "Site Images",
        date: "2025-09-20",
        url: projectImage(VERIFIED_PHOTOS.estateAerial),
      },
      {
        id: "p1-m0b",
        title: "Architectural design review walkthrough",
        type: "Video",
        phase: "Planning & Design",
        category: "Progress Updates",
        date: "2025-10-05",
        url: projectImage(VERIFIED_PHOTOS.modernResidential, 800, 500),
      },
      {
        id: "p1-m0c",
        title: "Site survey — GRA Phase 2 boundary",
        type: "Image",
        phase: "Site Preparation",
        category: "Drone Footage",
        date: "2025-10-18",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p1-m0d",
        title: "Land clearing & access road formation",
        type: "Image",
        phase: "Site Preparation",
        category: "Progress Photos",
        date: "2025-11-02",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p1-m0e",
        title: "Foundation excavation — Block A",
        type: "Image",
        phase: "Foundation Stage",
        category: "Site Images",
        date: "2025-12-10",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p1-m0f",
        title: "Foundation pour — Block B time-lapse",
        type: "Video",
        phase: "Foundation Stage",
        category: "Progress Updates",
        date: "2026-01-08",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers, 800, 500),
      },
      {
        id: "p1-m0g",
        title: "Structural frame — Block C rising",
        type: "Image",
        phase: "Structural Development",
        category: "Progress Photos",
        date: "2026-01-22",
        url: projectImage(VERIFIED_PHOTOS.construction),
      },
      {
        id: "p1-m0h",
        title: "Estate aerial — structural stage",
        type: "Image",
        phase: "Structural Development",
        category: "Drone Footage",
        date: "2026-02-01",
        url: projectImage(VERIFIED_PHOTOS.housingComplex),
      },
      {
        id: "p1-m0i",
        title: "Roofing works — Block A & B",
        type: "Image",
        phase: "Roofing Stage",
        category: "Site Images",
        date: "2026-02-20",
        url: projectImage(VERIFIED_PHOTOS.houseUnderConstruction),
      },
      {
        id: "p1-m1",
        title: "Block A — external finishes",
        type: "Image",
        phase: "Finishing Stage",
        category: "Progress Photos",
        date: "2026-03-30",
        url: projectImage(VERIFIED_PHOTOS.apartmentInterior),
      },
      {
        id: "p1-m2",
        title: "Finishing works — Block B",
        type: "Image",
        phase: "Finishing Stage",
        category: "Site Images",
        date: "2026-02-14",
        url: projectImage(VERIFIED_PHOTOS.houseUnderConstruction),
      },
      {
        id: "p1-m3",
        title: "Site inspection — finishing stage",
        type: "Image",
        phase: "Finishing Stage",
        category: "Site Inspection",
        date: "2026-02-08",
        url: projectImage(VERIFIED_PHOTOS.residentialEstate),
      },
      {
        id: "p1-m3b",
        title: "Estate roads & drainage installation",
        type: "Image",
        phase: "Infrastructure Installation",
        category: "Progress Photos",
        date: "2026-03-15",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p1-m4",
        title: "Buyer walkthrough preview",
        type: "Video",
        phase: "Handover Preparation",
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
    summary: {
      narrative:
        "Greenfield Housing Scheme is an affordable residential development on 12 hectares in Obio-Akpor LGA, designed to deliver 180 two- and three-bedroom bungalows for first-time buyers and civil servants under the Rivers State housing mandate. The layout follows a grid plan with 6-metre estate roads, communal green belts, and a central drainage channel connecting to the main Obio-Akpor collector. Units are single-storey detached bungalows on 300 sqm plots with fenced compounds. Site preparation is underway — land clearing and topsoil stripping are 85% complete, with foundation works for Block 1 scheduled once the access road from the East–West Road junction is commissioned.",
      specifications: [
        { label: "Unit mix", value: "180 bungalows — 120 × 2-bed; 60 × 3-bed detached" },
        { label: "Plot size", value: "300 sqm standard lot" },
        { label: "Built-up area", value: "95 sqm (2-bed); 130 sqm (3-bed)" },
        { label: "Kitchen", value: "Compact fitted kitchen with ceramic tiles and stainless sink" },
        { label: "Flooring", value: "600 × 600 mm ceramic floor tiles throughout" },
        { label: "Roofing", value: "Stone-coated steel roofing sheets on timber truss" },
        { label: "Community amenities", value: "Estate shop, borehole, transformer substation, perimeter fence" },
        { label: "Lead engineer", value: "Eng. David Mensah — Design Architect & Site Engineer" },
      ],
    },
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
        id: "p2-m0",
        title: "Housing scheme masterplan",
        type: "Image",
        phase: "Planning & Design",
        category: "Site Images",
        date: "2025-07-10",
        url: projectImage(VERIFIED_PHOTOS.estateAerial),
      },
      {
        id: "p2-m0b",
        title: "Community liaison briefing",
        type: "Video",
        phase: "Planning & Design",
        category: "Progress Updates",
        date: "2025-07-25",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers, 800, 500),
      },
      {
        id: "p2-m1",
        title: "Site clearing — Phase A",
        type: "Image",
        phase: "Site Preparation",
        category: "Site Images",
        date: "2026-01-18",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p2-m2",
        title: "Housing scheme — aerial survey",
        type: "Image",
        phase: "Site Preparation",
        category: "Drone Footage",
        date: "2026-02-15",
        url: projectImage(VERIFIED_PHOTOS.estateAerial),
      },
      {
        id: "p2-m2b",
        title: "Topsoil stripping — drone flyover",
        type: "Video",
        phase: "Site Preparation",
        category: "Drone Footage",
        date: "2026-02-28",
        url: projectImage(VERIFIED_PHOTOS.droneAerial, 800, 500),
      },
      {
        id: "p2-m3",
        title: "Stakeholder site walkthrough",
        type: "Video",
        phase: "Site Preparation",
        category: "Progress Updates",
        date: "2026-03-10",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers, 800, 500),
      },
      {
        id: "p2-m4",
        title: "Block 1 foundation setting-out",
        type: "Image",
        phase: "Foundation Stage",
        category: "Progress Photos",
        date: "2026-04-05",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
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
    summary: {
      narrative:
        "Atlantic View Residences is a mixed-use waterfront development on 4.2 hectares along the Trans Amadi industrial waterfront, repositioning a former logistics yard into a premium live-work-play destination. The masterplan comprises two 18-storey residential towers (320 apartments), a two-level retail podium with 12,000 sqm gross lettable area, and two basement parking levels with 480 bays. Apartment types range from studio lofts to 4-bedroom penthouses with floor-to-ceiling glazing and private balconies overlooking the Bonny River channel. The project is currently at roofing stage on Tower A; Tower B substructure is 60% complete. Waterfront piling and marine works required specialist geotechnical intervention due to soft alluvial soils.",
      specifications: [
        { label: "Unit mix", value: "320 apartments — studio to 4-bed penthouse across 2 towers" },
        { label: "Tower footprint", value: "42 × 38 m per tower; 18 floors + roof plant" },
        { label: "Typical floor plate", value: "8 units per floor; 3 lifts + 2 service cores" },
        { label: "Kitchen", value: "Modular fitted kitchens — quartz worktops, integrated appliances (premium spec)" },
        { label: "Flooring", value: "Large-format porcelain (living); carpet tiles (bedrooms); anti-slip in wet areas" },
        { label: "Structure", value: "Reinforced concrete frame; curtain-wall façade with low-E glazing" },
        { label: "Retail podium", value: "Ground + mezzanine; 18 retail bays; anchor tenant provision" },
        { label: "Lead engineer", value: "Eng. Bola Adisa — Construction Lead & Structural Engineer" },
      ],
    },
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
        id: "p3-m0",
        title: "Waterfront masterplan presentation",
        type: "Image",
        phase: "Planning & Design",
        category: "Site Images",
        date: "2025-10-12",
        url: projectImage(VERIFIED_PHOTOS.apartmentBuilding),
      },
      {
        id: "p3-m0b",
        title: "Environmental impact survey — drone",
        type: "Image",
        phase: "Planning & Design",
        category: "Drone Footage",
        date: "2025-11-05",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p3-m0c",
        title: "Marine piling works commencement",
        type: "Video",
        phase: "Site Preparation",
        category: "Progress Updates",
        date: "2025-12-01",
        url: projectImage(VERIFIED_PHOTOS.crane, 800, 500),
      },
      {
        id: "p3-m0d",
        title: "Earthworks & basement excavation",
        type: "Image",
        phase: "Site Preparation",
        category: "Progress Photos",
        date: "2025-12-20",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p3-m0e",
        title: "Tower A substructure complete",
        type: "Image",
        phase: "Foundation Stage",
        category: "Site Images",
        date: "2026-01-15",
        url: projectImage(VERIFIED_PHOTOS.construction),
      },
      {
        id: "p3-m2",
        title: "Structural works — Tower A progress",
        type: "Image",
        phase: "Structural Development",
        category: "Progress Photos",
        date: "2026-05-12",
        url: projectImage(VERIFIED_PHOTOS.commercialBuild),
      },
      {
        id: "p3-m4",
        title: "Mixed-use footprint — site overview",
        type: "Image",
        phase: "Structural Development",
        category: "Site Images",
        date: "2026-03-05",
        url: projectImage(VERIFIED_PHOTOS.housingComplex),
      },
      {
        id: "p3-m1",
        title: "Waterfront towers — aerial survey",
        type: "Image",
        phase: "Roofing Stage",
        category: "Drone Footage",
        date: "2026-02-18",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p3-m3",
        title: "Roofing stage — site team briefing",
        type: "Image",
        phase: "Roofing Stage",
        category: "Site Images",
        date: "2026-04-28",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers),
      },
      {
        id: "p3-m5",
        title: "Weekly drone flyover",
        type: "Video",
        phase: "Roofing Stage",
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
    summary: {
      narrative:
        "Riverside Commercial Complex is a Grade-A office and retail development on 2.8 hectares at the Woji junction along East–West Road — a high-visibility commercial node connecting Port Harcourt's eastern suburbs to the city centre. The scheme delivers 45,000 sqm of lettable office space across two 12-storey towers, 18 ground-floor retail bays, and a 6-level structured car park with 620 bays. Floor plates are designed for flexible open-plan tenancies with raised access flooring, central air-conditioning provision, and 3-metre floor-to-ceiling heights. Structural works are progressing ahead of schedule — Level 10 slab pour is underway on Tower A with Tower B at Level 6. Target tenants include banking, oil & gas service companies, and retail franchises.",
      specifications: [
        { label: "Building type", value: "Twin 12-storey office towers + retail podium + car park" },
        { label: "Lettable area", value: "45,000 sqm office; 3,200 sqm retail GLA" },
        { label: "Typical office floor", value: "1,850 sqm open-plan; 4 toilet cores; 2 passenger lifts" },
        { label: "Floor finish", value: "Polished concrete subfloor with raised access flooring provision" },
        { label: "Façade", value: "Unitised aluminium curtain wall with integrated louvres" },
        { label: "Parking", value: "620 bays across 6-level structured car park" },
        { label: "MEP services", value: "Central chilled-water plant; 2 × 1,500 kVA generators; fibre-ready" },
        { label: "Lead engineer", value: "Eng. Yusuf Idris — Construction Lead & MEP Coordinator" },
      ],
    },
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
        id: "p4-m0",
        title: "Commercial complex concept renders",
        type: "Image",
        phase: "Planning & Design",
        category: "Site Images",
        date: "2025-08-20",
        url: projectImage(VERIFIED_PHOTOS.commercialBuild),
      },
      {
        id: "p4-m0b",
        title: "Site mobilisation — Woji junction",
        type: "Image",
        phase: "Site Preparation",
        category: "Drone Footage",
        date: "2025-09-25",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p4-m0c",
        title: "Foundation excavation — Tower A",
        type: "Image",
        phase: "Foundation Stage",
        category: "Progress Photos",
        date: "2025-10-30",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p4-m1",
        title: "Tower A — structural frame",
        type: "Image",
        phase: "Structural Development",
        category: "Progress Photos",
        date: "2025-12-01",
        url: projectImage(VERIFIED_PHOTOS.crane),
      },
      {
        id: "p4-m2",
        title: "Concrete pour — Level 8",
        type: "Image",
        phase: "Structural Development",
        category: "Site Images",
        date: "2026-04-19",
        url: projectImage(VERIFIED_PHOTOS.construction),
      },
      {
        id: "p4-m3",
        title: "Site safety briefing",
        type: "Image",
        phase: "Structural Development",
        category: "Site Inspection",
        date: "2026-03-22",
        url: projectImage(VERIFIED_PHOTOS.constructionWorkers),
      },
      {
        id: "p4-m4",
        title: "Weekly progress flyover",
        type: "Video",
        phase: "Structural Development",
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
    summary: {
      narrative:
        "Woji Estate Extension is Phase 2 of the established Woji residential community, adding 120 mid-market housing units on 8 hectares of contiguous land adjacent to the completed Phase 1 estate. The development comprises 5 clusters of 24 units each — primarily 4-bedroom detached duplexes and 5-bedroom fully detached houses — designed for growing families who already own or rent in Phase 1. Each lot includes a paved driveway, boundary wall, and space for a domestic generator enclosure. Phase 2 also funds upgraded estate infrastructure: resurfacing of the main access road, extension of the perimeter fence with electric gate, and installation of additional street lighting. Block D is weathertight and in active internal finishing; Blocks A–C are at structural stage.",
      specifications: [
        { label: "Unit mix", value: "120 homes — 72 × 4-bed detached duplex; 48 × 5-bed fully detached" },
        { label: "Plot size", value: "400 sqm (duplex); 600 sqm (fully detached)" },
        { label: "Built-up area", value: "320 sqm (duplex); 450 sqm (detached)" },
        { label: "Kitchen", value: "Separate kitchen + pantry; marble-look quartz worktops; fitted wall and base units" },
        { label: "Flooring", value: "Polished porcelain tiles (ground floor); vitrified tiles (upper floors)" },
        { label: "Roofing", value: "Aluminium long-span on RC slab; parapet wall with coping stones" },
        { label: "Estate upgrades", value: "Road resurfacing, extended perimeter fence, 40 new street lights" },
        { label: "Lead engineer", value: "Eng. Chen Wei — Site Lead & Finishing Supervisor" },
      ],
    },
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
        id: "p5-m0",
        title: "Phase 2 layout & cluster plan",
        type: "Image",
        phase: "Planning & Design",
        category: "Site Images",
        date: "2025-11-10",
        url: projectImage(VERIFIED_PHOTOS.modernResidential),
      },
      {
        id: "p5-m0b",
        title: "Phase 2 site boundary survey",
        type: "Image",
        phase: "Site Preparation",
        category: "Drone Footage",
        date: "2025-11-28",
        url: projectImage(VERIFIED_PHOTOS.estateAerial),
      },
      {
        id: "p5-m0c",
        title: "Block A–C structural progress",
        type: "Image",
        phase: "Structural Development",
        category: "Progress Photos",
        date: "2026-01-20",
        url: projectImage(VERIFIED_PHOTOS.houseUnderConstruction),
      },
      {
        id: "p5-m0d",
        title: "Roofing complete — Block C",
        type: "Image",
        phase: "Roofing Stage",
        category: "Site Images",
        date: "2026-02-25",
        url: projectImage(VERIFIED_PHOTOS.construction),
      },
      {
        id: "p5-m1",
        title: "Block D — external finishes",
        type: "Image",
        phase: "Finishing Stage",
        category: "Progress Photos",
        date: "2026-05-30",
        url: projectImage(VERIFIED_PHOTOS.apartmentInterior),
      },
      {
        id: "p5-m2",
        title: "Estate road resurfacing",
        type: "Image",
        phase: "Infrastructure Installation",
        category: "Site Images",
        date: "2026-02-10",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p5-m2b",
        title: "Perimeter fence extension",
        type: "Image",
        phase: "Infrastructure Installation",
        category: "Progress Photos",
        date: "2026-03-08",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p5-m3",
        title: "Show unit walkthrough",
        type: "Video",
        phase: "Handover Preparation",
        category: "Handover",
        date: "2026-05-15",
        url: projectImage(VERIFIED_PHOTOS.handover, 800, 500),
      },
      {
        id: "p5-m4",
        title: "Practical completion ceremony",
        type: "Image",
        phase: "Handover Preparation",
        category: "Handover",
        date: "2026-05-30",
        url: projectImage(VERIFIED_PHOTOS.handover),
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
    summary: {
      narrative:
        "Royal Crest Apartments is a premium commercial-residential development on 3.5 hectares along the Ada George Road corridor — one of Port Harcourt's fastest-growing mixed-use axes. The scheme delivers 96 apartments in two 8-storey blocks above a ground-floor retail strip of 14 units, targeting corporate tenants, young professionals, and buy-to-let investors. Apartment types are 2- and 3-bedroom units with open-plan living, en-suite master bedrooms, and dedicated laundry areas. A show unit is fitted to marketing specification to support pre-sales, which stand at 85% across the launch blocks. Substructure works are complete; superstructure erection on Block A begins Q2 2026. The development includes a rooftop lounge, gym, and co-working space on the podium level.",
      specifications: [
        { label: "Unit mix", value: "96 apartments — 56 × 2-bed; 40 × 3-bed across 2 blocks" },
        { label: "Block size", value: "8 floors + rooftop amenity deck; 6 units per typical floor" },
        { label: "Built-up area", value: "110 sqm (2-bed); 155 sqm (3-bed)" },
        { label: "Kitchen", value: "Open-plan designer kitchen; sintered stone worktops; soft-close cabinetry" },
        { label: "Flooring", value: "750 × 750 mm polished porcelain (living); laminate wood (bedrooms)" },
        { label: "Retail strip", value: "14 ground-floor units; 45–120 sqm each; roller-shutter provision" },
        { label: "Amenities", value: "Rooftop lounge, gym, co-working space, 2-level basement parking (180 bays)" },
        { label: "Lead engineer", value: "Eng. Daniel Ajayi — Project Manager & Lead Structural Engineer" },
      ],
    },
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
        id: "p6-m0",
        title: "Ada George corridor site selection",
        type: "Image",
        phase: "Planning & Design",
        category: "Drone Footage",
        date: "2026-01-10",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p6-m0b",
        title: "Architectural concept presentation",
        type: "Video",
        phase: "Planning & Design",
        category: "Progress Updates",
        date: "2026-01-22",
        url: projectImage(VERIFIED_PHOTOS.apartmentBuilding, 800, 500),
      },
      {
        id: "p6-m0c",
        title: "Site clearing & hoarding installation",
        type: "Image",
        phase: "Site Preparation",
        category: "Site Images",
        date: "2026-02-05",
        url: projectImage(VERIFIED_PHOTOS.constructionSite),
      },
      {
        id: "p6-m2",
        title: "Foundation works — Block A",
        type: "Image",
        phase: "Foundation Stage",
        category: "Progress Photos",
        date: "2026-04-10",
        url: projectImage(VERIFIED_PHOTOS.foundationWorks),
      },
      {
        id: "p6-m1",
        title: "Royal Crest — aerial overview",
        type: "Image",
        phase: "Foundation Stage",
        category: "Drone Footage",
        date: "2026-03-25",
        url: projectImage(VERIFIED_PHOTOS.droneAerial),
      },
      {
        id: "p6-m3",
        title: "Tower crane installation",
        type: "Image",
        phase: "Structural Development",
        category: "Site Images",
        date: "2026-03-18",
        url: projectImage(VERIFIED_PHOTOS.crane),
      },
      {
        id: "p6-m3b",
        title: "Block A superstructure rising",
        type: "Image",
        phase: "Structural Development",
        category: "Progress Photos",
        date: "2026-04-22",
        url: projectImage(VERIFIED_PHOTOS.commercialBuild),
      },
      {
        id: "p6-m4",
        title: "Show unit finishing preview",
        type: "Video",
        phase: "Handover Preparation",
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
