import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createColumnHelper } from "@tanstack/react-table";
import { Briefcase, CheckCircle2, Plus, Search, TriangleAlert, Wallet } from "lucide-react";
import {
  Button,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  StatusBadge,
  Table,
} from "../../components/elements";
import { formatCurrency, formatDate } from "../../utils/helpers";
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

type SortKey = "name" | "progress" | "budget" | "endDate";
const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Name (A–Z)", value: "name" },
  { label: "Progress (high→low)", value: "progress" },
  { label: "Budget (high→low)", value: "budget" },
  { label: "End date (soonest)", value: "endDate" },
];

const columnHelper = createColumnHelper<Project>();

function ProjectsPage() {
  const navigate = useNavigate();
  const [projectList, setProjectList] = useState<Project[]>(projects);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState(statusFilterOptions[0]);
  const [sort, setSort] = useState(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);

  const totalBudget = projectList.reduce((sum, p) => sum + p.budget, 0);
  const onTrack = projectList.filter((p) => p.status === "green").length;
  const needAttention = projectList.filter((p) => p.status !== "green").length;

  useEffect(() => {
    setCurrentPage(1);
  }, [search, status, sort]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    const result = projectList.filter((p) => {
      const matchesQuery =
        !q ||
        [p.name, p.code, p.manager, p.businessUnit]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesStatus =
        status.value === "all" || p.status === (status.value as Status);
      return matchesQuery && matchesStatus;
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
  }, [projectList, search, status, sort]);

  const totalPage = Math.max(1, Math.ceil(filtered.length / LIMIT));
  const page = Math.min(currentPage, totalPage);
  const pageData = filtered.slice((page - 1) * LIMIT, page * LIMIT);

  const columns = useMemo(
    () => [
      columnHelper.accessor("name", {
        header: "Project",
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
      columnHelper.accessor("manager", { header: "Manager" }),
      columnHelper.accessor("phase", {
        header: "Phase",
        cell: (info) => (
          <span className="text-muted-foreground">{info.getValue()}</span>
        ),
      }),
      columnHelper.accessor("budget", {
        header: "Budget",
        cell: (info) => formatCurrency(info.getValue()),
        meta: { align: "right" },
      }),
      columnHelper.accessor("endDate", {
        header: "End Date",
        cell: (info) => formatDate(info.getValue()),
      }),
      columnHelper.accessor("progress", {
        header: "Progress",
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
        title="Projects"
        subtitle="All projects across the portfolio."
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setAddOpen(true)}
          >
            New Project
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Projects"
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
          label="Total Budget"
          value={formatCurrency(totalBudget)}
          icon={Wallet}
          tone="info"
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:max-w-xs">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, code, manager…"
            aria-label="Search projects"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex items-center gap-3">
          <div className="w-40">
            <Select
              options={statusFilterOptions}
              value={status}
              onChange={(opt) => opt && setStatus(opt)}
              isSearchable={false}
              aria-label="Filter by status"
            />
          </div>
          <div className="w-52">
            <Select
              options={sortOptions}
              value={sort}
              onChange={(opt) => opt && setSort(opt)}
              isSearchable={false}
              aria-label="Sort projects"
            />
          </div>
        </div>
      </div>

      <p className="-mt-2 text-sm text-muted-foreground">
        Showing {pageData.length} of {filtered.length}{" "}
        {filtered.length === 1 ? "project" : "projects"}
      </p>

      <Table<Project>
        columns={columns}
        data={pageData}
        emptyMessage="No projects match your filters."
        onRowClick={(row) => navigate(projectDetailsPath(row.id))}
        currentPage={page}
        setCurrentPage={setCurrentPage}
        totalPage={totalPage}
        count={filtered.length}
        limit={LIMIT}
      />

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
