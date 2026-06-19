# DPPC — Development & Property Portfolio Corporation

A **corporate real estate development dashboard** for a property development
company headquartered in **Port Harcourt, Rivers State, Nigeria**.

The platform unifies **development portfolio, construction delivery, governance,
and corporate showcase** into one portal — giving executives, PMO teams, site
managers, and stakeholders a single source of truth across active estates and
commercial developments.

> **Status:** UI demo. This build showcases the full product experience with
> realistic in-memory data. There are no live API calls yet — it is intended to
> demonstrate UX and domain alignment before backend integration.

For domain rules, terminology, and content standards, see
[`context.md`](./context.md).

---

## What this platform is

- Corporate **property portfolio** dashboard
- **Construction site** and development monitoring
- Executive **decision support** for handovers, cost, and risk
- **Stakeholder communication** portal (investors, buyers, regulators, contractors)
- **Reporting center** and property development **knowledge repository**
- **Corporate profile** and media showcase

## What this platform is not

This is **not** a SaaS product dashboard, CRM, accounting tool, or generic IT
project tracker. Avoid software-startup metrics (MAU, subscriptions, feature
releases, user acquisition). All copy, data, and visuals should reflect
**Nigerian real estate development**.

**Design check for every screen:**

> *Would a Nigerian real estate development company in Port Harcourt realistically use this?*

---

## Domain at a glance

| Topic | Convention in this repo |
| --- | --- |
| **Company** | DPPC — Development & Property Portfolio Corporation |
| **HQ** | Port Harcourt, Rivers State |
| **Currency** | Nigerian Naira (₦) — compact labels e.g. ₦4.8B, ₦405M |
| **Developments** | Emerald Gardens Estate, Greenfield Housing Scheme, Atlantic View Residences, Riverside Commercial Complex, Woji Estate Extension, Royal Crest Apartments |
| **Phases** | Site Preparation → Foundation → Structural → Roofing → Finishing → Handover |
| **Locations** | GRA Phase 2, Trans Amadi, Obio-Akpor, Woji, Ada George, and other Nigerian cities |
| **Imagery** | Construction sites, estates, drone footage, handovers — no office/SaaS stock photos |

---

## Highlights

- **Decision-first dashboards** — status, exceptions, and trends before detail
- **Three-tier navigation** — Portfolio Overview → Development Portfolio → individual development drill-down
- **Real-estate terminology** — developments, housing units, handovers, site risks (not generic “projects” / ERP language)
- **Global search (⌘K)** — developments, site risks, milestones, reports, documents, media, stakeholders, and pages
- **Light & dark themes** — system default with persisted preference
- **Accessible by design** — WCAG 2.1 AA targets, keyboard focus, reduced-motion support
- **Responsive** — desktop sidebar rail + mobile drawer

---

## Modules

| Area | What's inside |
| --- | --- |
| **Portfolio Overview** | Active developments, cost performance, pipeline phases, handovers, attention items, contractor capacity |
| **Development Portfolio** | Segmentation by type/state/phase, allocation charts, construction health matrix, segment performance (NGN) |
| **Developments** | Searchable development list (DEV-001…), filters, NGN budgets, construction phases |
| **Construction Milestones** | Cross-portfolio Gantt, register, type filters, links to development details |
| **Development Performance** | Construction progress, development cost, site capacity, property sales tabs |
| **Site Risks & Issues** | Risk heat map, trend, escalation panel, site risk & issue registers |
| **Reporting Center** | AI portfolio summary, forecasts, report library, quick-generate templates |
| **Knowledge Repository** | Project documents (briefs, contracts, drawings, site reports), lessons learned |
| **Media Gallery** | Site photos, drone footage, handover imagery, portfolio infographics |
| **Success Stories** | Development highlights, featured developments, portfolio wins (NGN metrics) |
| **Stakeholders** | Directory (investors, contractors, regulators, buyers), communication, surveys, engagement map |
| **Corporate Profile** | Mission/vision, timeline, awards, leadership, corporate media |
| **Settings** | Profile, team, roles, preferences, notifications |

Create flows (development, site risk, issue, stakeholder, etc.) use form modals
that update in-session lists.

---

## Sample data

Demo data lives in colocated `*Data.ts` files under each screen (and shared
`projectsData.ts` for the six active developments). Values are aligned to
Rivers State locations, construction phases, and NGN-scale budgets (~₦48B
portfolio).

---

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** — semantic tokens via `@theme`, light/dark variants
- **React Router v7**
- **Recharts** · **TanStack Table** · **react-hook-form** · **react-select**
- **react-hot-toast** · **lucide-react**

---

## Getting started

**Prerequisites:** Node.js `>= 20`.

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (default `http://localhost:5173`).

### Demo login

Authentication is mocked (cookie-based). Any valid-looking credentials on the
login screen will sign you in.

---

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier write |
| `npm run format:check` | Prettier check |

---

## Project structure

```
src/
├─ components/elements/     # Reusable UI (Button, Card, Table, Modal, …)
├─ constants/               # Nav, chart palette, quick actions
├─ layouts/
│  ├─ DashboardLayout.tsx
│  ├─ components/
│  │  ├─ Sidebar.tsx        # DPPC · Property Development
│  │  ├─ Header.tsx         # Notifications, global search
│  │  ├─ GlobalSearchModal.tsx
│  │  └─ globalSearchData.ts
├─ router/                  # Routes + PageRouter
├─ screens/                 # Feature screens + *Data.ts modules
│  ├─ dashboard/  portfolio/  projects/  milestones/  performance/
│  ├─ risks/  reports/  knowledge/  media/  highlights/
│  ├─ stakeholders/  company/  settings/  auth/
└─ utils/                   # helpers (NGN formatting), hooks, types
context.md                  # Domain & design alignment guide (read first)
```

---

## Contributing

1. Read [`context.md`](./context.md) before adding screens, copy, charts, or mock data.
2. Use **development / estate / site / handover** language — not SaaS or IT portfolio terms.
3. Use **Nigerian locations** and **NGN** for financial figures.
4. Use **construction and real-estate imagery** only (`VERIFIED_PHOTOS` in `projectsData.ts`).
5. Keep demo data in `*Data.ts` modules; share developments via `projectsData.ts` where possible.

---

## Theming

Colors are CSS variables in `src/index.css` (`@theme` + `dark` variant).
Components use semantic tokens (`bg-surface`, `text-foreground`, `border-border`, …).

---

## Notes

- Front-end demo only — data is in-memory and resets on reload.
- Recharts adds bundle weight; route-level code splitting can be added before production launch.
