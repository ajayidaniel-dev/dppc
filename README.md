# DPPC — Digital Project Portfolio & Corporate Dashboard

A single source of truth that unifies **project, portfolio, and corporate
performance** into one platform, organized across three tiers — Executive
(strategic), Portfolio (management), and Project (operational).

> **Status:** UI demo. This build showcases the full product experience with
> realistic in-memory data. There are no live API calls yet — it is intended
> to demonstrate the PRD's UX before backend integration.

---

## Highlights

- **Decision-first dashboards** — every screen leads with status, exceptions,
  and trend before exposing detail.
- **Three-tier architecture** — Executive → Portfolio → Project drill-down
  without losing context.
- **Light & dark themes** — defaults to the user's system preference and
  remembers the last choice.
- **Accessible by design** — WCAG 2.1 AA targets: status never relies on color
  alone, visible keyboard focus, labeled controls, and `prefers-reduced-motion`
  support.
- **Responsive** — desktop rail collapses to a mobile drawer.

## Modules

| Area | What's inside |
| --- | --- |
| **Overview** | Executive summary, "needs attention", portfolio health, financial snapshot, risk summary, milestone & resource widgets |
| **Portfolio** | KPIs, segmentation filters (BU, region, status, department, type, sponsor), value trend, budget allocation, health matrix, BU performance |
| **Projects** | Searchable/sortable list with KPIs + full project profile (Overview, Milestones, Financials, Risks & Issues, Team) |
| **Milestones** | Cross-portfolio Gantt timeline, critical path, dependencies, register |
| **Performance Center** | Schedule, Financial, Resource, and Benefits/ROI performance |
| **Risks & Issues** | KPI strip, escalation banner, risk heat map, trend, tabbed registers with detail modals |
| **Reporting Center** | AI-generated summaries, insights, predictions, multi-format export & generation flows |
| **Knowledge** | Document repository, lessons-learned library, enterprise search |
| **Media Gallery** | Images, videos, and infographics with filters and a preview lightbox |
| **Highlights** | Monthly wins, featured projects, realized business benefits |
| **Stakeholders** | Directory, communication center, feedback portal, engagement map |
| **Company Profile** | Identity, statistics, mission/vision/values, timeline, awards, leadership, media |
| **Settings** | Profile, team members, roles & permissions matrix, preferences, notifications |

Create flows (Project, Risk, Issue, Stakeholder, and more) are demonstrated with
form modals that update the relevant lists in-session.

## Tech stack

- **React 19** + **TypeScript** + **Vite 6**
- **Tailwind CSS v4** (semantic theme tokens via `@theme`, OKLCH-friendly,
  light/dark variants)
- **React Router v7** for routing
- **Recharts** for data visualization
- **TanStack Table** for data grids
- **react-hook-form**, **react-select**, **react-hot-toast**, **lucide-react**

## Getting started

**Prerequisites:** Node.js `>= 20`.

```bash
# install dependencies
npm install

# start the dev server
npm run dev
```

Then open the URL printed in the terminal (default `http://localhost:5173`).

### Demo login

Authentication is mocked for the demo (cookie-based). Use the login screen to
enter the dashboard — any valid-looking credentials will sign you in.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |

## Project structure

```
src/
├─ components/elements/   # Reusable UI (Button, Card, Table, StatCard, Modal, …)
├─ constants/             # Nav structure, chart palette, shared options
├─ layouts/               # DashboardLayout, Sidebar, Header
├─ router/                # Routes + PageRouter
├─ screens/               # Feature screens (+ colocated data modules)
│  ├─ dashboard/  portfolio/  projects/  milestones/  performance/
│  ├─ risks/  reports/  knowledge/  media/  highlights/
│  ├─ stakeholders/  company/  settings/  auth/
└─ utils/                 # helpers, hooks (useAuth, useTheme), types
```

Each feature screen keeps its demo data in a colocated `*Data.ts` module so the
list and detail views read from one source of truth.

## Theming

Colors are defined as CSS variables in `src/index.css` under Tailwind's
`@theme`, with a `dark` variant. Components reference semantic tokens
(`bg-surface`, `text-foreground`, `border-border`, …) so the entire UI flips
cleanly between light and dark.

## Notes

- This is a front-end demo; data is in-memory and resets on reload.
- The production bundle is Recharts-heavy; route-level code splitting can be
  added before launch if needed.
