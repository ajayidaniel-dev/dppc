import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  BookOpen,
  ClipboardList,
  Download,
  FileBarChart,
  FileSignature,
  FileText,
  FolderOpen,
  Lightbulb,
  Ruler,
  Search,
  Tags,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  PageHeader,
  Select,
  StatCard,
  Tabs,
  type TabItem,
} from "../../components/elements";
import { formatDate } from "../../utils/helpers";
import {
  documents,
  lessonCategoryVariant,
  lessons,
  type DocType,
} from "./knowledgeData";

const tabs: TabItem[] = [
  { id: "documents", label: "Documents" },
  { id: "lessons", label: "Lessons Learned" },
];

const typeOptions = [
  { label: "All types", value: "all" },
  { label: "Charter", value: "Charter" },
  { label: "Contract", value: "Contract" },
  { label: "Drawing", value: "Drawing" },
  { label: "Plan", value: "Plan" },
  { label: "Report", value: "Report" },
];

const docIcon: Record<DocType, LucideIcon> = {
  Charter: FileText,
  Contract: FileSignature,
  Drawing: Ruler,
  Plan: ClipboardList,
  Report: FileBarChart,
};

function KnowledgePage() {
  const [tab, setTab] = useState("documents");
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);

  const filteredDocs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((d) => {
      const matchesQuery =
        !q ||
        [d.name, d.project, d.owner, ...d.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesType = type.value === "all" || d.type === type.value;
      return matchesQuery && matchesType;
    });
  }, [search, type]);

  const filteredLessons = useMemo(() => {
    const q = search.trim().toLowerCase();
    return lessons.filter(
      (l) =>
        !q ||
        [l.title, l.project, l.summary, ...l.tags]
          .join(" ")
          .toLowerCase()
          .includes(q),
    );
  }, [search]);

  const tagCount = new Set(documents.flatMap((d) => d.tags)).size;
  const projectCount = new Set(documents.map((d) => d.project)).size;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Knowledge Repository"
        subtitle="Documents, drawings, and lessons learned across the portfolio."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Documents"
          value={documents.length}
          icon={FolderOpen}
          tone="primary"
        />
        <StatCard
          label="Lessons Learned"
          value={lessons.length}
          icon={Lightbulb}
          tone="info"
        />
        <StatCard label="Tags" value={tagCount} icon={Tags} tone="success" />
        <StatCard
          label="Projects Covered"
          value={projectCount}
          icon={BookOpen}
          tone="warning"
        />
      </div>

      {/* Enterprise search */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:max-w-md">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search documents, lessons, tags…"
            aria-label="Search knowledge repository"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        {tab === "documents" && (
          <div className="w-44">
            <Select
              options={typeOptions}
              value={type}
              onChange={(opt) => opt && setType(opt)}
              isSearchable={false}
              aria-label="Filter by document type"
            />
          </div>
        )}
      </div>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      {tab === "documents" &&
        (filteredDocs.length === 0 ? (
          <Card>
            <EmptyState
              icon={FolderOpen}
              title="No documents found"
              description="Try a different search term or document type."
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredDocs.map((d) => {
              const Icon = docIcon[d.type];
              return (
                <Card key={d.id} className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-foreground">
                        {d.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {d.project}
                      </p>
                    </div>
                    <Badge variant="neutral">{d.type}</Badge>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {d.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
                    <span>
                      {d.owner} · {formatDate(d.updated)} · {d.size}
                    </span>
                    <button
                      onClick={() => toast.success(`Downloading ${d.id} (demo)`)}
                      className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        ))}

      {tab === "lessons" &&
        (filteredLessons.length === 0 ? (
          <Card>
            <EmptyState
              icon={Lightbulb}
              title="No lessons found"
              description="Try a different search term."
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredLessons.map((l) => (
              <Card key={l.id} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{l.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.project} · {formatDate(l.date)}
                    </p>
                  </div>
                  <Badge variant={lessonCategoryVariant[l.category]}>
                    {l.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{l.summary}</p>
                <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
                  <Lightbulb className="h-4 w-4 shrink-0" />
                  {l.impact}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {l.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ))}
    </div>
  );
}

export default KnowledgePage;
