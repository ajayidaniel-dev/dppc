import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Images,
  Pencil,
  Play,
  ShieldAlert,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Avatar,
  Badge,
  Button,
  Card,
  EmptyState,
  Modal,
  ProgressBar,
  StatCard,
  StatusBadge,
  Tabs,
  type BadgeVariant,
  type TabItem,
} from "../../components/elements";
import { routes } from "../../router/routes";
import { cn, formatCurrency, formatDate } from "../../utils/helpers";
import { chartPalette } from "../../constants";
import type { Status } from "../../utils/types";
import {
  estimateAtCompletion,
  getProjectById,
  handleProjectImageError,
  PROJECT_PHASES,
  type MilestoneStatus,
  type ProjectMedia,
  type RiskSeverity,
} from "./projectsData";

const tabs: TabItem[] = [
  { id: "overview", label: "Overview" },
  { id: "milestones", label: "Milestones" },
  { id: "financials", label: "Financials" },
  { id: "risks", label: "Risks & Issues" },
  { id: "media", label: "Media" },
  { id: "team", label: "Team" },
];

const statTone = (s: Status): "success" | "warning" | "danger" =>
  s === "green" ? "success" : s === "amber" ? "warning" : "danger";

const scheduleStatus = (spi: number): Status =>
  spi >= 1 ? "green" : spi >= 0.9 ? "amber" : "red";
const budgetStatus = (cpi: number): Status =>
  cpi >= 1 ? "green" : cpi >= 0.95 ? "amber" : "red";
const resourceStatus = (util: number): Status =>
  util < 90 ? "green" : util <= 100 ? "amber" : "red";

const milestoneVariant: Record<MilestoneStatus, BadgeVariant> = {
  Completed: "success",
  "In Progress": "info",
  Planned: "neutral",
  Delayed: "danger",
};

const riskVariant: Record<RiskSeverity, BadgeVariant> = {
  Critical: "danger",
  High: "warning",
  Medium: "info",
  Low: "neutral",
};

function StatusRow({
  label,
  value,
  status,
}: {
  label: string;
  value: string;
  status: Status;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-sm font-medium text-foreground">{value}</span>
        <StatusBadge status={status} />
      </span>
    </div>
  );
}

function ProjectDetailsPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedMedia, setSelectedMedia] = useState<ProjectMedia | null>(null);
  const project = getProjectById(projectId ?? "");

  if (!project) {
    return (
      <Card>
        <EmptyState
          icon={ShieldAlert}
          title="Project not found"
          description="This project may have been removed or the link is incorrect."
          action={
            <Button
              variant="outline"
              size="sm"
              leftIcon={<ArrowLeft className="h-4 w-4" />}
              onClick={() => navigate(routes.PROJECTS)}
            >
              Back to projects
            </Button>
          }
        />
      </Card>
    );
  }

  const eac = estimateAtCompletion(project);
  const remaining = project.budget - project.spent;
  const eacVariance = eac - project.budget;
  const currentPhaseIdx = PROJECT_PHASES.indexOf(
    project.phase as (typeof PROJECT_PHASES)[number],
  );

  const financialData = [
    { name: "Budget", value: project.budget },
    { name: "Spent", value: project.spent },
    { name: "Forecast", value: eac },
  ];
  const financialColors = [
    chartPalette.primarySoft,
    chartPalette.primary,
    eacVariance > 0 ? chartPalette.danger : chartPalette.success,
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Button
          variant="ghost"
          size="sm"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
          onClick={() => navigate(routes.PROJECTS)}
          className="-ml-2 mb-3 text-muted-foreground"
        >
          Projects
        </Button>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold text-foreground">
                {project.name}
              </h1>
              <StatusBadge status={project.status} />
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {project.code} · {project.phase} · {project.businessUnit} ·
              Managed by {project.manager}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Pencil className="h-4 w-4" />}
          >
            Edit project
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl border border-border">
        <img
          src={project.coverImage}
          alt={`${project.name} — site overview`}
          className="h-44 w-full object-cover sm:h-52"
          loading="eager"
          onError={handleProjectImageError}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-3 p-4">
          <p className="text-sm text-white/90">{project.location}</p>
          <span className="rounded-full bg-black/40 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
            {project.media.length} media assets
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="% Complete"
          value={`${project.progress}%`}
          tone="primary"
          hint={`Ends ${formatDate(project.endDate)}`}
        />
        <StatCard
          label="Schedule (SPI)"
          value={project.spi.toFixed(2)}
          tone={statTone(scheduleStatus(project.spi))}
          hint="Target ≥ 1.00"
        />
        <StatCard
          label="Budget (CPI)"
          value={project.cpi.toFixed(2)}
          tone={statTone(budgetStatus(project.cpi))}
          hint="Target ≥ 1.00"
        />
        <StatCard
          label="Resource Util."
          value={`${project.resourceUtil}%`}
          tone={statTone(resourceStatus(project.resourceUtil))}
          hint="Healthy < 90%"
        />
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card title="General Information" className="lg:col-span-2">
            <dl className="grid grid-cols-1 gap-x-8 gap-y-3 text-sm sm:grid-cols-2">
              {[
                ["Project Code", project.code],
                ["Current Phase", project.phase],
                ["Project Manager", project.manager],
                ["Sponsor", project.sponsor],
                ["Client", project.client],
                ["Location", project.location],
                ["Start Date", formatDate(project.startDate)],
                ["End Date", formatDate(project.endDate)],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="text-right font-medium text-foreground">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-4 border-t border-border pt-4">
              <p className="text-sm text-muted-foreground">
                {project.description}
              </p>
            </div>
          </Card>

          <Card title="Project Status">
            <div className="mb-3">
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion</span>
                <span className="font-medium text-foreground">
                  {project.progress}%
                </span>
              </div>
              <ProgressBar value={project.progress} />
            </div>
            <div className="divide-y divide-border">
              <StatusRow
                label="Schedule"
                value={`SPI ${project.spi.toFixed(2)}`}
                status={scheduleStatus(project.spi)}
              />
              <StatusRow
                label="Budget"
                value={`CPI ${project.cpi.toFixed(2)}`}
                status={budgetStatus(project.cpi)}
              />
              <StatusRow
                label="Resources"
                value={`${project.resourceUtil}%`}
                status={resourceStatus(project.resourceUtil)}
              />
            </div>
          </Card>

          <Card title="Strategic Alignment" className="lg:col-span-3">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Strategic Objective
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  {project.strategicObjective}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Business Driver
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  {project.businessDriver}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Expected Benefits
                </p>
                <p className="mt-1.5 text-sm text-foreground">
                  {project.expectedBenefits}
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "milestones" && (
        <div className="flex flex-col gap-6">
          <Card title="Phase Completion">
            <div className="flex items-center">
              {PROJECT_PHASES.map((phase, i) => {
                const done = i < currentPhaseIdx;
                const active = i === currentPhaseIdx;
                return (
                  <Fragment key={phase}>
                    <div className="flex flex-col items-center gap-1.5">
                      <span
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold",
                          done
                            ? "bg-success text-white"
                            : active
                              ? "bg-primary text-primary-foreground"
                              : "bg-surface-muted text-muted-foreground",
                        )}
                      >
                        {done ? <Check className="h-4 w-4" /> : i + 1}
                      </span>
                      <span
                        className={cn(
                          "text-center text-xs",
                          active
                            ? "font-medium text-foreground"
                            : "text-muted-foreground",
                        )}
                      >
                        {phase}
                      </span>
                    </div>
                    {i < PROJECT_PHASES.length - 1 && (
                      <div
                        className={cn(
                          "mx-2 h-0.5 flex-1 rounded-full",
                          i < currentPhaseIdx ? "bg-success" : "bg-border",
                        )}
                      />
                    )}
                  </Fragment>
                );
              })}
            </div>
          </Card>

          <Card title="Milestone Register">
            <div className="divide-y divide-border">
              {project.milestones.map((m) => (
                <div
                  key={m.name}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {m.name}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {m.owner} · Due {formatDate(m.due)}
                    </p>
                  </div>
                  <Badge variant={milestoneVariant[m.status]}>{m.status}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "financials" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card title="Cost Summary">
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Total budget</dt>
                <dd className="font-medium text-foreground">
                  {formatCurrency(project.budget)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Spent to date</dt>
                <dd className="font-medium text-foreground">
                  {formatCurrency(project.spent)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Remaining</dt>
                <dd className="font-medium text-foreground">
                  {formatCurrency(remaining)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3">
                <dt className="text-muted-foreground">Forecast (EAC)</dt>
                <dd className="flex items-center gap-2 font-medium text-foreground">
                  {formatCurrency(eac)}
                  <Badge variant={eacVariance > 0 ? "danger" : "success"}>
                    {eacVariance > 0 ? "Over" : "Under"}{" "}
                    {formatCurrency(Math.abs(eacVariance))}
                  </Badge>
                </dd>
              </div>
            </dl>
            <div className="mt-4 border-t border-border pt-4">
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Budget utilization</span>
                <span className="font-medium text-foreground">
                  {Math.round((project.spent / project.budget) * 100)}%
                </span>
              </div>
              <ProgressBar
                value={Math.round((project.spent / project.budget) * 100)}
              />
            </div>
          </Card>

          <Card title="Budget vs Spent vs Forecast" className="lg:col-span-2">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={financialData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke={chartPalette.grid}
                />
                <XAxis
                  dataKey="name"
                  fontSize={12}
                  stroke={chartPalette.axis}
                  tickLine={false}
                />
                <YAxis
                  fontSize={12}
                  stroke={chartPalette.axis}
                  tickLine={false}
                  tickFormatter={(v) => `$${(v / 1_000_000).toFixed(1)}M`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    color: "var(--color-foreground)",
                  }}
                  cursor={{ opacity: 0.1 }}
                  formatter={(v: number) => [formatCurrency(v), ""]}
                />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {financialData.map((entry, i) => (
                    <Cell key={entry.name} fill={financialColors[i]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}

      {activeTab === "risks" && (
        <Card
          title="Risks & Issues"
          action={
            <Button
              variant="ghost"
              size="sm"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate(routes.RISKS)}
            >
              Risk register
            </Button>
          }
        >
          {project.risks.length === 0 ? (
            <EmptyState
              icon={ShieldAlert}
              title="No open risks"
              description="No risks or issues are currently logged against this project."
            />
          ) : (
            <div className="divide-y divide-border">
              {project.risks.map((r) => (
                <div
                  key={r.title}
                  className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {r.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      Owner: {r.owner}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant={riskVariant[r.severity]}>
                      {r.severity}
                    </Badge>
                    <Badge variant={r.state === "Open" ? "warning" : "success"}>
                      {r.state}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      )}

      {activeTab === "team" && (
        <Card title="Project Team">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.team.map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 rounded-lg border border-border p-3"
              >
                <Avatar name={member.name} size="md" />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-foreground">
                    {member.name}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {activeTab === "media" && (
        <div className="flex flex-col gap-4">
          {project.media.length === 0 ? (
            <Card>
              <EmptyState
                icon={Images}
                title="No media yet"
                description="Photos and videos from the field will appear here."
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.media.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedMedia(item)}
                  className="group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <div className="relative aspect-video overflow-hidden bg-surface-muted">
                    <img
                      src={item.url}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={handleProjectImageError}
                    />
                    {item.type === "Video" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                          <Play className="h-5 w-5 translate-x-0.5" />
                        </span>
                      </span>
                    )}
                    <span className="absolute left-2 top-2">
                      <Badge variant="neutral">{item.category}</Badge>
                    </span>
                  </div>
                  <div className="p-3">
                    <p className="truncate text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {item.type} · {formatDate(item.date)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        title={selectedMedia?.title}
        size="lg"
      >
        {selectedMedia && (
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-lg bg-surface-muted">
              <img
                src={selectedMedia.url.replace(/w=\d+/, "w=1200")}
                alt={selectedMedia.title}
                className="max-h-[60vh] w-full object-contain"
                onError={handleProjectImageError}
              />
              {selectedMedia.type === "Video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </span>
                </span>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Type</dt>
                <dd className="font-medium text-foreground">
                  {selectedMedia.type}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Category</dt>
                <dd className="font-medium text-foreground">
                  {selectedMedia.category}
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-muted-foreground">Captured</dt>
                <dd className="font-medium text-foreground">
                  {formatDate(selectedMedia.date)}
                </dd>
              </div>
            </dl>
            {selectedMedia.type === "Video" && (
              <p className="text-xs text-muted-foreground">
                Video playback is illustrative for this demo.
              </p>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

export default ProjectDetailsPage;
