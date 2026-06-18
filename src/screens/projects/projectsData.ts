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
  milestones: Milestone[];
  risks: ProjectRisk[];
  team: TeamMember[];
}

export const PROJECT_PHASES = [
  "Initiation",
  "Planning",
  "Execution",
  "Monitoring",
  "Closure",
] as const;

export const projects: Project[] = [
  {
    id: 1,
    code: "PRJ-001",
    name: "Corporate HQ Renovation",
    description:
      "Modernize the headquarters to improve workplace efficiency, energy performance, and employee experience across all floors.",
    manager: "Amara Bello",
    sponsor: "Corporate Services",
    client: "Internal — Facilities",
    location: "Head Office, Lagos",
    businessUnit: "Facilities",
    phase: "Execution",
    startDate: "2025-10-01",
    endDate: "2026-09-30",
    budget: 2_400_000,
    spent: 1_650_000,
    progress: 72,
    spi: 0.98,
    cpi: 1.02,
    resourceUtil: 84,
    status: "green",
    strategicObjective: "Optimize corporate real-estate footprint",
    businessDriver: "Reduce operating costs and improve retention",
    expectedBenefits: "18% lower facility opex, +12 NPS workplace score",
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
    code: "PRJ-002",
    name: "ERP Migration",
    description:
      "Migrate finance, HR, and procurement onto a unified cloud ERP with consolidated reporting and automated controls.",
    manager: "Kwame Mensah",
    sponsor: "Office of the CFO",
    client: "Internal — Finance",
    location: "Remote / HQ",
    businessUnit: "IT",
    phase: "Monitoring",
    startDate: "2025-08-01",
    endDate: "2026-07-15",
    budget: 980_000,
    spent: 520_000,
    progress: 48,
    spi: 0.92,
    cpi: 0.97,
    resourceUtil: 88,
    status: "amber",
    strategicObjective: "Single source of truth for corporate data",
    businessDriver: "Eliminate fragmented spreadsheets and manual close",
    expectedBenefits: "5-day faster month-end close, 30% less manual effort",
    milestones: [
      { name: "Vendor selection", owner: "Kwame Mensah", due: "2025-09-10", status: "Completed" },
      { name: "Finance module go-live", owner: "Ireti Bankole", due: "2026-04-01", status: "Delayed" },
      { name: "HR & procurement cutover", owner: "Kwame Mensah", due: "2026-06-20", status: "Planned" },
    ],
    risks: [
      { title: "Data migration quality gaps", severity: "High", owner: "Ireti Bankole", state: "Open" },
      { title: "Change-management adoption", severity: "Medium", owner: "Kwame Mensah", state: "Open" },
    ],
    team: [
      { name: "Kwame Mensah", role: "Project Manager" },
      { name: "Ireti Bankole", role: "Solution Architect" },
      { name: "Sara Lin", role: "Data Lead" },
    ],
  },
  {
    id: 3,
    code: "PRJ-003",
    name: "Coastal Highway Phase II",
    description:
      "Construct the second phase of the coastal expressway, including two interchanges and coastal drainage works.",
    manager: "Stephen Okoro",
    sponsor: "Infrastructure Division",
    client: "State Ministry of Works",
    location: "Coastal Corridor",
    businessUnit: "Infrastructure",
    phase: "Planning",
    startDate: "2025-11-01",
    endDate: "2027-01-20",
    budget: 5_600_000,
    spent: 2_300_000,
    progress: 31,
    spi: 0.84,
    cpi: 0.94,
    resourceUtil: 92,
    status: "red",
    strategicObjective: "Expand regional transport capacity",
    businessDriver: "Government infrastructure mandate and toll revenue",
    expectedBenefits: "−25% commute time, new toll revenue stream",
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
    code: "PRJ-004",
    name: "Solar Microgrid Rollout",
    description:
      "Deploy solar microgrids across six regional sites to reduce diesel dependency and improve power reliability.",
    manager: "Lola Adeyemi",
    sponsor: "Energy Division",
    client: "Regional Operations",
    location: "Six regional sites",
    businessUnit: "Energy",
    phase: "Execution",
    startDate: "2025-09-15",
    endDate: "2026-11-05",
    budget: 1_750_000,
    spent: 1_000_000,
    progress: 60,
    spi: 1.01,
    cpi: 1.04,
    resourceUtil: 79,
    status: "green",
    strategicObjective: "Decarbonize regional operations",
    businessDriver: "Energy cost reduction and ESG commitments",
    expectedBenefits: "40% diesel reduction, 99.9% uptime target",
    milestones: [
      { name: "Pilot site live", owner: "Lola Adeyemi", due: "2025-12-01", status: "Completed" },
      { name: "Sites 2–4 commissioned", owner: "Yusuf Idris", due: "2026-06-15", status: "In Progress" },
      { name: "Full rollout complete", owner: "Lola Adeyemi", due: "2026-11-05", status: "Planned" },
    ],
    risks: [
      { title: "Grid interconnection permits", severity: "Medium", owner: "Yusuf Idris", state: "Mitigated" },
    ],
    team: [
      { name: "Lola Adeyemi", role: "Project Manager" },
      { name: "Yusuf Idris", role: "Electrical Lead" },
      { name: "Nadia Haddad", role: "Procurement" },
    ],
  },
  {
    id: 5,
    code: "PRJ-005",
    name: "Customer Portal Revamp",
    description:
      "Rebuild the customer self-service portal with a modern UX, single sign-on, and real-time status tracking.",
    manager: "Maria Santos",
    sponsor: "Digital Experience",
    client: "External — Customers",
    location: "Remote",
    businessUnit: "IT",
    phase: "Execution",
    startDate: "2025-12-01",
    endDate: "2026-08-30",
    budget: 1_200_000,
    spent: 740_000,
    progress: 55,
    spi: 0.95,
    cpi: 0.98,
    resourceUtil: 86,
    status: "amber",
    strategicObjective: "Improve customer digital engagement",
    businessDriver: "Reduce support load and improve retention",
    expectedBenefits: "−20% support tickets, +15 CSAT",
    milestones: [
      { name: "UX design complete", owner: "Maria Santos", due: "2026-02-10", status: "Completed" },
      { name: "Beta release", owner: "Chen Wei", due: "2026-05-30", status: "In Progress" },
      { name: "General availability", owner: "Maria Santos", due: "2026-08-30", status: "Planned" },
    ],
    risks: [
      { title: "SSO integration complexity", severity: "Medium", owner: "Chen Wei", state: "Open" },
      { title: "Legacy data parity", severity: "Low", owner: "Maria Santos", state: "Mitigated" },
    ],
    team: [
      { name: "Maria Santos", role: "Project Manager" },
      { name: "Chen Wei", role: "Tech Lead" },
      { name: "Priya Nair", role: "UX Designer" },
    ],
  },
  {
    id: 6,
    code: "PRJ-006",
    name: "Harbor Terminal Upgrade",
    description:
      "Upgrade harbor terminal cranes, yard automation, and customs systems to increase throughput capacity.",
    manager: "Daniel Ajayi",
    sponsor: "Maritime Division",
    client: "Port Authority",
    location: "Harbor Terminal 3",
    businessUnit: "Maritime",
    phase: "Initiation",
    startDate: "2026-03-01",
    endDate: "2027-05-30",
    budget: 4_100_000,
    spent: 500_000,
    progress: 15,
    spi: 0.88,
    cpi: 0.9,
    resourceUtil: 95,
    status: "red",
    strategicObjective: "Increase port throughput capacity",
    businessDriver: "Trade volume growth and SLA penalties",
    expectedBenefits: "+30% throughput, −15% dwell time",
    milestones: [
      { name: "Feasibility & funding", owner: "Daniel Ajayi", due: "2026-04-30", status: "In Progress" },
      { name: "Crane procurement", owner: "Ngozi Obi", due: "2026-09-30", status: "Planned" },
      { name: "Yard automation pilot", owner: "Ngozi Obi", due: "2027-01-15", status: "Planned" },
    ],
    risks: [
      { title: "Unmitigated high-severity risk open 21 days", severity: "Critical", owner: "Daniel Ajayi", state: "Open" },
      { title: "Vendor capacity constraints", severity: "High", owner: "Ngozi Obi", state: "Open" },
    ],
    team: [
      { name: "Daniel Ajayi", role: "Project Manager" },
      { name: "Ngozi Obi", role: "Operations Lead" },
      { name: "Marcus Cole", role: "Automation Engineer" },
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
