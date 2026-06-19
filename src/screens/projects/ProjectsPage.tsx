import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import {
  Briefcase,
  CheckCircle2,
  Plus,
  Search,
  TriangleAlert,
  Wallet,
} from "lucide-react";
import moment from "moment";
import {
  Badge,
  Button,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
  Table,
} from "../../components/elements";
import {
  formatCompactCurrency,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import { LIMIT } from "../../constants";
import { projects, type Project } from "./projectsData";
import ProjectFormModal from "./ProjectFormModal";
import type { Status } from "../../utils/types";

const statusFilterOptions = [
  { label: "All statuses", value: "all" },
  { label: "On Track", value: "green" },
  { label: "Attention", value: "amber" },
  { label: "Critical", value: "red" },
];

const developmentTypeOptions = [
  { label: "All types", value: "all" },
  { label: "Residential", value: "Residential" },
  { label: "Commercial", value: "Commercial" },
  { label: "Mixed-Use", value: "Mixed-Use" },
  { label: "Infrastructure", value: "Infrastructure" },
  { label: "Land Bank", value: "Land Bank" },
];

type SortKey = "name" | "progress" | "budget" | "endDate";
const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Name (A–Z)", value: "name" },
  { label: "Site progress (high→low)", value: "progress" },
  { label: "Development cost (high→low)", value: "budget" },
  { label: "Handover date (soonest)", value: "endDate" },
];

const columnHelper = createColumnHelper<Project>();

function ProjectsPage() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusFilterOptions[0]);
  const [developmentType, setDevelopmentType] = useState(
    developmentTypeOptions[0],
  );
  const [sort, setSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const totalBudget = projectList.reduce((sum, p) => sum + p.budget, 0);
  const onTrack = projectList.filter((p) => p.status === "green").length;
  const needAttention = projectList.filter((p) => p.status !== "green").length;

  const filtersActive =
    status.value !== "all" || developmentType.value !== "all" || search.trim() !== "";

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, developmentType, sort]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = projectList.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.code, p.manager, p.businessUnit, p.location, p.phase]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus =
        status.value === "all" || p.status === (status.value as Status);
      const matchesType =
        developmentType.value === "all" ||
        p.businessUnit === developmentType.value;
      return matchesQuery && matchesStatus && matchesType;
    });

    return [...result].sort((a, b) => {
      switch (sort.value) {
        case "progress":
          return b.progress - a.progress;
        case "budget":
          return b.budget - a.budget;
        case "endDate":
          return a.endDate.localeCompare(b.endDate);
        default:
          return a.name.localeCompare(b.name);
      }
    });
  }, [projectList, search, status, developmentType, sort]);

  const totalPage = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const page = Math.min(currentPage, totalPage);
  const pageData = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Development",
        meta: { wrap: true, maxWidth: "280px" },
        cell: (info) => (
          <div>
            <p className="font-medium text-foreground">{info.getValue()}</p>
            <p className="text-xs text-muted-foreground">
              {info.row.original.code} · {info.row.original.businessUnit}
            </p>
          </div>
        ),
      }),
      columnHelper.accessor("location", {
        header: "Location",
        meta: { wrap: true, maxWidth: "200px" },
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("manager", { header: "Project Manager" }),
      columnHelper.accessor("phase", {
        header: "Construction Phase",
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("budget", {
        header: "Development Cost",
        cell: (info) => formatCompactCurrency(info.getValue()),
        meta: { align: "right" },
      }),
      columnHelper.accessor("endDate", {
        header: "Target Handover",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("progress", {
        header: "Site Progress",
        cell: (info) => (
          <ProgressBar value={info.getValue()} showLabel className="w-36" />
        ),
      }),
      columnHelper.accessor("status", {
        header: "Status",
        cell: (info) => <StatusBadge status={info.getValue()} />,
        meta: { align: "center" },
      }),
    ],
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Projects"
        subtitle="Active property developments across the portfolio · Port Harcourt & national sites"
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setAddOpen(true)}
          >
            New Development
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Active Developments"
          value={projectList.length}
          icon={Briefcase}
          tone="primary"
        />
        <StatCard
          label="On Track"
          value={onTrack}
          icon={CheckCircle2}
          tone="success"
        />
        <StatCard
          label="Need Attention"
          value={needAttention}
          icon={TriangleAlert}
          tone="warning"
        />
        <StatCard
          label="Total Development Cost"
          value={formatCompactCurrency(totalBudget)}
          icon={Wallet}
          tone="info"
          hint={formatCurrency(totalBudget)}
        />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search development, location, manager…"
            aria-label="Search developments"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-40">
            <Select
              options={developmentTypeOptions}
              value={developmentType}
              onChange={(opt) => opt && setDevelopmentType(opt)}
              isSearchable={false}
              aria-label="Filter by development type"
            />
          </div>
          <div className="w-40">
            <Select
              options={statusFilterOptions}
              value={status}
              onChange={(opt) => opt && setStatus(opt)}
              isSearchable={false}
              aria-label="Filter by status"
            />
          </div>
          <div className="w-56">
            <Select
              options={sortOptions}
              value={sort}
              onChange={(opt) => opt && setSort(opt)}
              isSearchable={false}
              aria-label="Sort developments"
            />
          </div>
          {filtersActive && (
            <Badge variant="info">
              {filtered.length} of {projectList.length} shown
            </Badge>
          )}
        </div>
      </div>

      <p className="-mt-2 text-sm text-muted-foreground">
        Showing {pageData.length} of {filtered.length}{" "}
        {filtered.length === 1 ? "development" : "developments"}
      </p>

      <Table<Project>
        columns={columns}
        data={pageData}
        emptyMessage="No developments match your filters."
        onRowClick={(row) => navigate(projectDetailsPath(row.id))}
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        count={filtered.length}
        limit={LIMIT}
      />

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>

      <ProjectFormModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        nextId={Math.max(0, ...projectList.map((p) => p.id)) + 1}
        onCreate={(project) => {
          setProjectList((prev) => [project, ...prev]);
          setCurrentPage(1);
        }}
      />
    </div>
  );
}

export default ProjectsPage;
