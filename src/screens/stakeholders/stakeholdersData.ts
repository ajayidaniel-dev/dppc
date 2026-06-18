export type StakeholderType = "Internal" | "External";
export type Level = "High" | "Low";

export interface Stakeholder {
  id: string;
  name: string;
  role: string;
  organization: string;
  type: StakeholderType;
  email: string;
  phone: string;
  responsibilities: string;
  projects: string[];
  influence: Level;
  interest: Level;
}

export interface Announcement {
  id: string;
  title: string;
  body: string;
  author: string;
  date: string;
  type: "Announcement" | "Update";
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  attendees: number;
}

export interface Survey {
  id: string;
  title: string;
  responses: number;
  total: number;
  status: "Open" | "Closed";
  closes: string;
}

export interface Suggestion {
  id: string;
  text: string;
  author: string;
  date: string;
  status: "New" | "Under review" | "Planned";
}

export interface Lesson {
  id: string;
  title: string;
  project: string;
  summary: string;
}

export const stakeholders: Stakeholder[] = [
  {
    id: "s1",
    name: "Amara Bello",
    role: "Program Director",
    organization: "DPPC",
    type: "Internal",
    email: "amara.bello@dppc.com",
    phone: "+234 801 234 5670",
    responsibilities: "Owns portfolio delivery and executive reporting.",
    projects: ["Corporate HQ Renovation"],
    influence: "High",
    interest: "High",
  },
  {
    id: "s2",
    name: "Kwame Mensah",
    role: "IT Lead",
    organization: "DPPC",
    type: "Internal",
    email: "kwame.mensah@dppc.com",
    phone: "+233 244 887 110",
    responsibilities: "Leads ERP migration and digital systems.",
    projects: ["ERP Migration"],
    influence: "High",
    interest: "High",
  },
  {
    id: "s3",
    name: "Helen Park",
    role: "Client Sponsor",
    organization: "State Ministry of Works",
    type: "External",
    email: "h.park@worksministry.gov",
    phone: "+234 700 555 0101",
    responsibilities: "Approves scope and funding for highway works.",
    projects: ["Coastal Highway Phase II"],
    influence: "High",
    interest: "High",
  },
  {
    id: "s4",
    name: "Grace Eze",
    role: "Finance Controller",
    organization: "DPPC",
    type: "Internal",
    email: "grace.eze@dppc.com",
    phone: "+234 802 998 1145",
    responsibilities: "Controls portfolio budgets and approvals.",
    projects: ["Corporate HQ Renovation", "ERP Migration"],
    influence: "High",
    interest: "Low",
  },
  {
    id: "s5",
    name: "Marcus Cole",
    role: "Investor Relations",
    organization: "Apex Capital",
    type: "External",
    email: "m.cole@apexcapital.com",
    phone: "+1 415 555 2200",
    responsibilities: "Represents investor interests and returns.",
    projects: ["Harbor Terminal Upgrade"],
    influence: "High",
    interest: "Low",
  },
  {
    id: "s6",
    name: "Lola Adeyemi",
    role: "Sustainability Lead",
    organization: "DPPC",
    type: "Internal",
    email: "lola.adeyemi@dppc.com",
    phone: "+234 803 221 7788",
    responsibilities: "Drives ESG outcomes across the portfolio.",
    projects: ["Solar Microgrid Rollout"],
    influence: "Low",
    interest: "High",
  },
  {
    id: "s7",
    name: "Priya Nair",
    role: "Community Liaison",
    organization: "Coastal Council",
    type: "External",
    email: "p.nair@coastalcouncil.org",
    phone: "+234 706 440 9912",
    responsibilities: "Coordinates community impact and consultation.",
    projects: ["Coastal Highway Phase II"],
    influence: "Low",
    interest: "High",
  },
  {
    id: "s8",
    name: "Femi Lawal",
    role: "Vendor Lead",
    organization: "BuildCo",
    type: "External",
    email: "f.lawal@buildco.com",
    phone: "+234 805 117 6633",
    responsibilities: "Supplies construction materials and labor.",
    projects: ["Coastal Highway Phase II"],
    influence: "Low",
    interest: "Low",
  },
];

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "Q2 board review scheduled for 24 June",
    body: "The quarterly board pack is being finalized; pre-reads will be shared 48 hours ahead.",
    author: "Amara Bello",
    date: "2026-06-16",
    type: "Announcement",
  },
  {
    id: "a2",
    title: "Coastal Highway re-baseline in progress",
    body: "Scope and budget are being re-baselined with the client sponsor following the cost review.",
    author: "Stephen Okoro",
    date: "2026-06-12",
    type: "Update",
  },
  {
    id: "a3",
    title: "New site safety protocol now in effect",
    body: "Updated HSE procedures apply to all active construction sites from this week.",
    author: "Lola Adeyemi",
    date: "2026-06-09",
    type: "Announcement",
  },
];

export const meetings: Meeting[] = [
  { id: "m1", title: "Coastal Highway client sync", date: "2026-06-20", time: "14:00", attendees: 6 },
  { id: "m2", title: "Q2 Board Review", date: "2026-06-24", time: "10:00", attendees: 9 },
  { id: "m3", title: "Portfolio steering committee", date: "2026-06-26", time: "09:30", attendees: 7 },
];

export const surveys: Survey[] = [
  { id: "v1", title: "Stakeholder satisfaction — Q2", responses: 42, total: 60, status: "Open", closes: "2026-06-30" },
  { id: "v2", title: "Vendor performance review", responses: 18, total: 25, status: "Open", closes: "2026-07-05" },
  { id: "v3", title: "HQ workplace feedback", responses: 120, total: 120, status: "Closed", closes: "2026-05-20" },
];

export const suggestions: Suggestion[] = [
  { id: "g1", text: "Add a public-facing project status page for clients.", author: "Helen Park", date: "2026-06-11", status: "Under review" },
  { id: "g2", text: "Send a monthly investor digest email.", author: "Marcus Cole", date: "2026-06-07", status: "Planned" },
  { id: "g3", text: "Provide community updates in local language.", author: "Priya Nair", date: "2026-06-03", status: "New" },
];

export const lessons: Lesson[] = [
  {
    id: "l1",
    title: "Early permit submission cut approval delays",
    project: "Solar Microgrid Rollout",
    summary: "Submitting applications in parallel saved an estimated 6 weeks on the critical path.",
  },
  {
    id: "l2",
    title: "Parallel-run reduced ERP cutover risk",
    project: "ERP Migration",
    summary: "Running legacy and new systems together surfaced data gaps before go-live.",
  },
];

export const engagementQuadrant = (
  influence: Level,
  interest: Level,
): string => {
  if (influence === "High" && interest === "High") return "Manage closely";
  if (influence === "High" && interest === "Low") return "Keep satisfied";
  if (influence === "Low" && interest === "High") return "Keep informed";
  return "Monitor";
};
