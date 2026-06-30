# Digital Project Portfolio & Corporate Dashboard Platform
## Design, Frontend & Backend — Project Timeline

**Prepared for:** DPPC (Development & Property Portfolio Corporation)  
**Document version:** 1.0  
**Date:** June 2026  
**Estimated total duration:** 10–12 months to production launch (v1.0)

---

## Executive Summary

This timeline outlines a phased delivery plan for the **Digital Project Portfolio & Corporate Dashboard Platform** — an enterprise web application spanning executive, portfolio, and project-level views, corporate showcase, reporting, stakeholder engagement, and knowledge management.

The schedule is organized into **seven phases** across three workstreams: **Design**, **Frontend**, and **Backend**. Workstreams run in parallel where dependencies allow, to reduce overall calendar time while maintaining quality gates at each milestone.

| Workstream | Focus | Duration |
| --- | --- | --- |
| **Design** | UX research, information architecture, design system, high-fidelity screens, prototypes | 8–10 weeks |
| **Frontend** | Production UI, API integration, forms, responsiveness, accessibility | 14–16 weeks |
| **Backend** | APIs, database, auth, file storage, reporting engine, integrations | 16–20 weeks |

> **Current status:** A fully navigable **UI prototype** already exists with realistic demo data across all major modules. This accelerates the design and frontend phases — remaining work centers on production design refinement, backend build-out, and live data integration.

---

## Scope Reference

The timeline covers all modules defined in the product requirements:

| # | Module | Tier |
| --- | --- | --- |
| 1 | Dashboard Home | Executive |
| 2 | Company Profile | Corporate |
| 3 | Portfolio Overview | Portfolio |
| 4 | Individual Project Pages | Project |
| 5 | Milestone Management | Project |
| 6 | Project Highlights & Success Stories | Corporate |
| 7 | Visual Media Gallery | Shared |
| 8 | Performance & KPI Dashboard | Portfolio / Project |
| 9 | Risk & Issue Management | Project / Portfolio |
| 10 | Reporting Center | Executive |
| 11 | Stakeholder Engagement | Shared |
| 12 | Knowledge & Document Repository | Shared |
| 13 | Website Integration (public + secure areas) | Corporate |
| 14 | Mobile & Executive Dashboard | Executive |
| 15 | Administration & Settings | Platform |

**Out of scope for v1.0** (planned as future phases): AI predictive analytics, Power BI / Tableau integration, ERP / GIS / Digital Twin integrations, and advanced client portal features.

---

## Assumptions & Prerequisites

The following assumptions underpin this schedule. Changes to any item may affect dates.

| # | Assumption |
| --- | --- |
| 1 | Client provides brand assets (logo, colors, typography guidance) within **Week 1** of the design phase |
| 2 | Client nominates a **single point of contact** for feedback with **5 business-day** review turnaround |
| 3 | Sample project data, document templates, and corporate content are supplied before backend data migration |
| 4 | Hosting environment (cloud or on-premise) is confirmed by **Month 2** |
| 5 | A dedicated team of **2 designers, 2–3 frontend engineers, 2–3 backend engineers, 1 QA engineer, 1 project manager** is available |
| 6 | Third-party services (email/SMS notifications, file storage, PDF generation) are approved without procurement delays |
| 7 | The existing UI prototype is accepted as the **functional and navigational baseline** for v1.0 |

---

## High-Level Phase Overview

```
Month:  1        2        3        4        5        6        7        8        9       10       11       12
        ├────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┼────────┤
Phase 0 Discovery & Planning          ████
Phase 1 Design                        ████████████
Phase 2 Backend Foundation                      ████████████████
Phase 3 Frontend Production                     ████████████████████████
Phase 4 Core Module Development                           ████████████████████████
Phase 5 Advanced Features & Reporting                               ████████████
Phase 6 QA, UAT & Hardening                                                   ████████
Phase 7 Deployment & Launch                                                           ████
```

---

## Phase 0 — Discovery & Planning
**Duration:** 2 weeks  
**Workstreams:** All (joint)

### Objectives
- Validate requirements against the PRD and existing UI prototype
- Confirm user roles, permissions model, and data ownership
- Finalize technical architecture and hosting approach
- Agree on v1.0 scope boundaries and success metrics

### Key Activities
| Activity | Owner | Deliverable |
| --- | --- | --- |
| Kickoff workshop | PM + Client | Signed scope confirmation |
| User role mapping (Executive, PMO, Site Manager, Stakeholder, Admin) | Design + Client | Role & permission matrix |
| Technical architecture review | Backend lead | Architecture decision record |
| Environment & DevOps planning | Backend + DevOps | Infrastructure plan |
| Sprint cadence & communication plan | PM | Project charter |

### Milestone
**M0 — Project Kickoff Complete:** Scope, roles, architecture, and communication plan approved.

---

## Phase 1 — Design
**Duration:** 8–10 weeks (Weeks 1–10)  
**Workstream:** Design (primary)

### Objectives
- Translate the existing prototype into a production-ready design system
- Produce high-fidelity designs for all priority screens
- Define responsive behavior, accessibility standards, and interaction patterns
- Deliver developer-ready specifications

### Sub-Phases

#### 1A — UX Foundation (Weeks 1–3)
| Deliverable | Description |
| --- | --- |
| Information architecture map | Validated sitemap and navigation hierarchy |
| User journey maps | Flows for Executive, Portfolio Manager, Project Manager, Stakeholder |
| Wireframes — Tier 1 screens | Dashboard Home, Portfolio Overview, Project Detail, Login |
| Wireframes — Tier 2 screens | Milestones, Performance, Risks, Reports, Knowledge, Media |
| Wireframes — Tier 3 screens | Stakeholders, Company Profile, Settings, Admin |

#### 1B — Visual Design & Design System (Weeks 4–7)
| Deliverable | Description |
| --- | --- |
| Design system | Color tokens, typography, spacing, component library (buttons, cards, tables, charts, modals, forms) |
| High-fidelity mockups — Executive tier | Dashboard Home, Executive summary widgets, mobile executive view |
| High-fidelity mockups — Portfolio tier | Portfolio dashboard, segmentation filters, analytics charts |
| High-fidelity mockups — Project tier | Project profile, milestone Gantt, risk heat map, financial panels |
| High-fidelity mockups — Supporting modules | Reports, Knowledge, Media, Stakeholders, Company Profile |
| Dark / light theme specifications | Full token set for both modes |
| Responsive breakpoints | Desktop (1280px+), tablet (768px), mobile (375px) layouts |

#### 1C — Prototype & Design Sign-Off (Weeks 8–10)
| Deliverable | Description |
| --- | --- |
| Interactive prototype (Figma) | Clickable flows for primary user journeys |
| Accessibility specification | WCAG 2.1 AA checklist per screen |
| Design handoff package | Annotated specs, assets, icon set, export guidelines |
| Client design review sessions | Two formal review rounds with documented feedback |

### Client Dependencies
- Brand guidelines and logo files by Week 1
- Feedback on wireframes within 5 business days (Week 3)
- Design sign-off by end of Week 10

### Milestone
**M1 — Design Approved:** Design system and all v1.0 screens signed off; handoff package delivered to engineering.

---

## Phase 2 — Backend Foundation
**Duration:** 8 weeks (Weeks 5–12, overlaps with Design Phase 1B–1C)  
**Workstream:** Backend (primary)

### Objectives
- Establish the API platform, database, and authentication layer
- Define and implement core data models shared across all modules
- Set up CI/CD pipeline, staging environment, and API documentation

### Sub-Phases

#### 2A — Platform Setup (Weeks 5–6)
| Deliverable | Description |
| --- | --- |
| Database schema (v1) | Entities: Users, Roles, Projects, Milestones, Risks, Issues, Documents, Stakeholders |
| REST API scaffolding | Versioned API (`/api/v1`), OpenAPI/Swagger documentation |
| Authentication & authorization | JWT-based auth, role-based access control (RBAC), session management |
| Dev / staging environments | Containerized deployment, environment configuration |
| CI/CD pipeline | Automated build, test, and deploy to staging |

#### 2B — Core Services (Weeks 7–10)
| Deliverable | Description |
| --- | --- |
| User & team management API | CRUD users, roles, permissions, team assignments |
| Project management API | Project CRUD, status, phases, traffic-light indicators, filtering |
| Portfolio aggregation API | Portfolio KPIs, segmentation, cross-project metrics |
| Milestone management API | Milestone CRUD, status categories, dependencies |
| Notification service | In-app notifications, email alerts (milestone due, risk escalation) |
| File upload service | Secure storage for documents, images, videos (S3-compatible) |

#### 2C — Search & Audit (Weeks 11–12)
| Deliverable | Description |
| --- | --- |
| Global search API | Full-text search across projects, documents, stakeholders, media |
| Audit logging | Activity trail for sensitive actions (financial edits, permission changes) |
| API integration tests | Automated test suite for all foundation endpoints |
| Staging API available | Frontend team can begin integration |

### Milestone
**M2 — Backend Foundation Ready:** Auth, core project/portfolio/milestone APIs, file storage, and search available on staging.

---

## Phase 3 — Frontend Production
**Duration:** 14–16 weeks (Weeks 8–23, overlaps with Backend Phases 2–4)  
**Workstream:** Frontend (primary)

### Objectives
- Evolve the existing UI prototype into a production application
- Integrate all screens with live APIs
- Implement forms, validation, error handling, and loading states
- Achieve responsive, accessible, performant UI across all modules

### Sub-Phases

#### 3A — Foundation & Integration Layer (Weeks 8–11)
| Deliverable | Description |
| --- | --- |
| Design system implementation | Align existing components with approved design tokens |
| API client layer | Axios + TanStack Query hooks for all core endpoints |
| Authentication flow | Real login, token refresh, protected routes, permission gates |
| Error & loading patterns | Consistent skeleton loaders, empty states, toast notifications |
| Global search integration | Wire ⌘K search modal to live search API |

#### 3B — Tier 1 Screens — Executive & Portfolio (Weeks 12–16)
| Module | Key Integration Work |
| --- | --- |
| Dashboard Home | Live KPI widgets, executive summary panel, notification center |
| Portfolio Overview | Segmentation filters, portfolio KPIs, analytics charts (Recharts) |
| Company Profile | CMS-driven content, timeline, statistics, media gallery |
| Development / Project List | Searchable table, filters, NGN formatting, create/edit modals |

#### 3C — Tier 2 Screens — Project Operations (Weeks 17–20)
| Module | Key Integration Work |
| --- | --- |
| Project Detail Page | Full profile, status indicators, progress bars, tabbed sections |
| Construction Milestones | Gantt chart, milestone register, status filters, CRUD forms |
| Performance & KPI | Schedule, financial, resource, and benefits tabs with live data |
| Site Risks & Issues | Risk heat map, registers, escalation panel, create/edit flows |
| Success Stories & Highlights | Featured developments, monthly highlights, benefit metrics |

#### 3D — Tier 3 Screens — Supporting Modules (Weeks 21–23)
| Module | Key Integration Work |
| --- | --- |
| Reporting Center | Report library, generation triggers, download (PDF/Excel) |
| Knowledge Repository | Document upload, categorization, full-text search, lessons learned |
| Media Gallery | Image/video upload, categorization, lightbox viewer |
| Stakeholder Hub | Directory, communication feed, survey/feedback forms |
| Settings & Admin | Profile, team management, role assignment, notification preferences |

### Milestone
**M3 — Frontend Feature Complete:** All v1.0 screens integrated with live APIs; forms and CRUD flows operational on staging.

---

## Phase 4 — Core Module Backend (Extended APIs)
**Duration:** 10 weeks (Weeks 11–20, parallel with Frontend Phase 3)  
**Workstream:** Backend (primary)

### Objectives
- Build module-specific APIs for all remaining features
- Implement business logic for KPI calculations, risk scoring, and portfolio aggregation
- Support file generation and export workflows

### Module Delivery Schedule

| Weeks | Backend Module | API Endpoints & Logic |
| --- | --- | --- |
| 11–12 | Performance & KPI | Schedule variance, budget tracking, resource utilization, benefits realization calculations |
| 13–14 | Risk & Issue Management | Risk register, issue register, severity scoring, heat map data, escalation rules |
| 15–16 | Reporting Engine | Report templates, scheduled generation, PDF/Excel/PPT export |
| 17–18 | Knowledge & Documents | Document versioning, categorization, full-text indexing, lessons learned |
| 19–20 | Stakeholders & Communications | Stakeholder directory, announcements, meeting calendar, feedback/survey collection |
| 19–20 | Media Management | Image/video metadata, categorization, thumbnail generation, gallery APIs |
| 19–20 | Company Profile CMS | Editable corporate content, timeline events, statistics, leadership profiles |

### Milestone
**M4 — All Module APIs Complete:** Every frontend screen has a corresponding production API on staging.

---

## Phase 5 — Advanced Features, Integrations & Polish
**Duration:** 6 weeks (Weeks 21–26)  
**Workstreams:** Frontend + Backend (joint)

### Objectives
- Deliver website integration (public showcase + secure internal area)
- Implement mobile-optimized executive dashboard
- Add reporting automation and export polish
- Performance optimization and security hardening

### Deliverables

| Feature | Description | Owner |
| --- | --- | --- |
| Public website widgets | Embeddable KPI cards, project counters, news feed for corporate website | Frontend + Backend |
| Secure internal portal | Role-gated access to financial and internal reports | Backend |
| Mobile executive dashboard | One-page strategic summary optimized for phone/tablet | Frontend |
| Field photo upload | Mobile-friendly image capture and upload to project media | Frontend + Backend |
| Automated report scheduling | Weekly/monthly/quarterly report generation and email delivery | Backend |
| Report export polish | Branded PDF templates, Excel data exports, PowerPoint summaries | Backend |
| Performance optimization | Route-level code splitting, chart lazy loading, API response caching | Frontend |
| Security review | OWASP top-10 audit, penetration test, RBAC validation | Backend + QA |

### Milestone
**M5 — Feature Freeze:** No new features; platform ready for formal QA and UAT.

---

## Phase 6 — Quality Assurance, UAT & Hardening
**Duration:** 6 weeks (Weeks 27–32)  
**Workstreams:** QA (primary), all teams (support)

### Objectives
- Systematic testing across all modules, roles, and devices
- Client-led user acceptance testing
- Bug resolution and performance tuning
- Documentation and training material preparation

### Testing Plan

| Test Type | Scope | Duration |
| --- | --- | --- |
| Functional testing | All modules, CRUD flows, permissions, edge cases | Weeks 27–29 |
| Cross-browser testing | Chrome, Firefox, Safari, Edge (latest 2 versions) | Week 28 |
| Responsive testing | Desktop, tablet, mobile breakpoints | Week 28 |
| Accessibility audit | WCAG 2.1 AA compliance verification | Week 29 |
| Performance testing | Load testing on portfolio aggregation and report generation | Week 29 |
| Security testing | Auth flows, data isolation, file access controls | Week 30 |
| UAT — Round 1 | Client tests against acceptance criteria | Weeks 30–31 |
| UAT — Round 2 | Re-test after bug fixes | Week 32 |
| Regression testing | Full regression after UAT fixes | Week 32 |

### Documentation Deliverables
- Administrator guide (user management, roles, content management)
- End-user guide (per role: Executive, Portfolio Manager, Project Manager)
- API documentation (for future integrations)
- Deployment runbook

### Milestone
**M6 — UAT Sign-Off:** Client formally accepts the platform against agreed acceptance criteria.

---

## Phase 7 — Deployment, Data Migration & Launch
**Duration:** 3 weeks (Weeks 33–35)  
**Workstreams:** All (joint)

### Objectives
- Deploy to production environment
- Migrate initial data (projects, stakeholders, documents)
- Conduct user training and go-live support

### Activities

| Week | Activity | Deliverable |
| --- | --- | --- |
| 33 | Production environment setup | Live environment with SSL, monitoring, backups |
| 33 | Data migration | Historical projects, milestones, documents imported |
| 33–34 | User training sessions | Executive briefing, PMO training, admin training |
| 34 | Soft launch | Limited user group validates production environment |
| 35 | Go-live | Full platform available to all authorized users |
| 35 | Hypercare support | Dedicated support for 2 weeks post-launch |

### Milestone
**M7 — Production Launch:** Platform live; hypercare support active.

---

## Milestone Summary

| # | Milestone | Target | Gate |
| --- | --- | --- | --- |
| M0 | Project Kickoff Complete | Week 2 | Scope & architecture approved |
| M1 | Design Approved | Week 10 | Client sign-off on all screens |
| M2 | Backend Foundation Ready | Week 12 | Core APIs on staging |
| M3 | Frontend Feature Complete | Week 23 | All screens API-integrated |
| M4 | All Module APIs Complete | Week 20 | Full backend on staging |
| M5 | Feature Freeze | Week 26 | Ready for QA |
| M6 | UAT Sign-Off | Week 32 | Client acceptance |
| M7 | Production Launch | Week 35 | Go-live |

---

## Parallel Workstream Calendar

Detailed week-by-week view of how Design, Frontend, and Backend run in parallel.

| Week | Design | Frontend | Backend |
| --- | --- | --- | --- |
| 1–2 | Discovery, IA, user flows | — | — |
| 3–4 | Wireframes (all tiers) | — | — |
| 5–6 | Design system, hi-fi (Tier 1) | — | Platform setup, DB schema, auth |
| 7–8 | Hi-fi (Tier 2–3), responsive specs | Foundation, API layer, auth flow | Core services (users, projects, portfolio) |
| 9–10 | Prototype, design sign-off | — | Milestones, notifications, file storage |
| 11–12 | Design support & QA | Global search, layout polish | Search, audit logging, staging ready |
| 13–16 | Design support | Tier 1 screens (Dashboard, Portfolio, Company, Projects) | Performance/KPI APIs, Risk/Issue APIs |
| 17–20 | — | Tier 2 screens (Project Detail, Milestones, Performance, Risks) | Reporting engine, Knowledge, Stakeholders, Media |
| 21–23 | — | Tier 3 screens (Reports, Knowledge, Media, Stakeholders, Settings) | Company CMS, remaining APIs |
| 24–26 | — | Website widgets, mobile exec dashboard, optimization | Public/secure portal, report scheduling |
| 27–32 | — | Bug fixes, UAT support | Bug fixes, UAT support, security hardening |
| 33–35 | — | Launch support | Data migration, production deploy |

---

## Client Review & Approval Gates

To keep the project on schedule, the following formal approvals are required:

| Gate | When | What Client Reviews | Turnaround |
| --- | --- | --- | --- |
| G1 — Scope Confirmation | Week 2 | Final v1.0 scope, roles, success metrics | 3 business days |
| G2 — Wireframe Approval | Week 4 | All wireframes and user flows | 5 business days |
| G3 — Design Sign-Off | Week 10 | Design system, hi-fi screens, prototype | 5 business days |
| G4 — Staging Demo | Week 16 | Tier 1 screens with live data on staging | 5 business days |
| G5 — Feature Complete Demo | Week 23 | Full platform walkthrough on staging | 5 business days |
| G6 — UAT Sign-Off | Week 32 | Formal acceptance against test plan | 5 business days |
| G7 — Go-Live Approval | Week 34 | Production readiness checklist | 3 business days |

---

## Team Composition

| Role | Count | Responsibility |
| --- | --- | --- |
| Project Manager | 1 | Schedule, client communication, risk management |
| UX Designer | 1 | Research, wireframes, user flows |
| UI Designer | 1 | Visual design, design system, prototypes |
| Frontend Engineer (Senior) | 1 | Architecture, API integration, complex components |
| Frontend Engineer | 1–2 | Screen implementation, forms, responsive UI |
| Backend Engineer (Senior) | 1 | Architecture, auth, core APIs, DevOps |
| Backend Engineer | 1–2 | Module APIs, reporting, file services |
| QA Engineer | 1 | Test planning, automation, UAT coordination |

---

## Risk Factors & Mitigations

| Risk | Impact | Mitigation |
| --- | --- | --- |
| Delayed client feedback on designs | Pushes frontend start | Fixed review windows; prototype used as fallback baseline |
| Scope creep (AI, BI integrations) | Extends timeline 4–8 weeks | Firm v1.0 boundary; future phases documented separately |
| Data migration complexity | Delays launch | Begin data audit in Month 3; migrate iteratively on staging |
| Third-party procurement delays | Blocks notifications, storage | Identify vendors in Phase 0; use dev alternatives on staging |
| Gantt chart / advanced timeline features | Adds 2–3 weeks frontend | Evaluate library early (Week 8); simplify if needed |
| Report template complexity | Adds 2 weeks backend | Start with 3 core templates; expand post-launch |

---

## Future Phases (Post v1.0)

The following capabilities are documented in the product vision but scheduled **after** production launch:

| Phase | Features | Estimated Duration |
| --- | --- | --- |
| **v1.1 — AI & Automation** | AI-generated summaries, risk prediction, performance forecasting, smart recommendations | 8–10 weeks |
| **v1.2 — BI Integration** | Power BI / Tableau embedded dashboards, custom analytics | 6–8 weeks |
| **v1.3 — Enterprise Integration** | ERP sync, GIS mapping, digital twin, real-time field reporting | 12–16 weeks |
| **v1.4 — Client Portal** | External client access, branded client views, document sharing | 8–10 weeks |

---

## Success Criteria (v1.0)

The platform will be considered successfully delivered when:

- [ ] 100% of v1.0 modules are functional with live data
- [ ] All user roles can access appropriate views per the permission matrix
- [ ] Manual reporting effort reduced by at least 70% (automated weekly/monthly reports)
- [ ] Real-time portfolio reporting available to executives
- [ ] Platform passes WCAG 2.1 AA accessibility audit
- [ ] Platform passes security review (OWASP top 10)
- [ ] Client UAT sign-off obtained
- [ ] Administrator and end-user documentation delivered
- [ ] Production environment live with hypercare support

---

## Next Steps

1. **Review this timeline** and confirm scope, duration, and assumptions
2. **Schedule kickoff workshop** (Phase 0) to finalize roles, permissions, and hosting
3. **Provide brand assets** to begin the design phase
4. **Nominate client stakeholders** for each review gate (G1–G7)
5. **Confirm team availability** and agree on sprint cadence (recommended: 2-week sprints)

---

*This document is a planning estimate. Final dates will be confirmed in the project charter following the Phase 0 kickoff workshop.*
