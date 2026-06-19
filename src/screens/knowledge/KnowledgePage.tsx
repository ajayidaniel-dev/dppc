import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  BookOpen,
  Download,
  FolderOpen,
  HardHat,
  Lightbulb,
  MapPin,
  Search,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  Modal,
  PageHeader,
  Select,
  StatCard,
  Tabs,
  type TabItem,
} from "../../components/elements";
import { cn, formatDate } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import {
  developmentNames,
  DOCUMENT_TYPES,
  docTypeIcon,
  documents,
  LESSON_CATEGORIES,
  lessonCategoryVariant,
  lessons,
  type DocumentRecord,
  type DocType,
  type Lesson,
} from "./knowledgeData";

const tabs: TabItem[] = [
  { id: "documents", label: "Project Documents" },
  { id: "lessons", label: "Lessons Learned" },
];

const typeOptions = [
  { label: "All document types", value: "all" },
  ...DOCUMENT_TYPES.map((t) => ({ label: t, value: t })),
];

const developmentOptions = [
  { label: "All developments", value: "all" },
  ...developmentNames.map((d) => ({ label: d, value: d })),
];

const lessonCategoryOptions = [
  { label: "All categories", value: "all" },
  ...LESSON_CATEGORIES.map((c) => ({ label: c, value: c })),
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function KnowledgePage() {
  const [tab, setTab] = useState("documents");
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [development, setDevelopment] = useState(developmentOptions[0]);
  const [lessonCategory, setLessonCategory] = useState(lessonCategoryOptions[0]);
  const [selectedDoc, setSelectedDoc] = useState<DocumentRecord | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  const filteredDocs = useMemo(() => {
    const q = search.trim().toLowerCase();
    return documents.filter((d) => {
      const matchesQuery =
        !q ||
        [d.name, d.project, d.location, d.owner, d.type, ...d.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesType = type.value === "all" || d.type === type.value;
      const matchesDevelopment =
        development.value === "all" || d.project === development.value;
      return matchesQuery && matchesType && matchesDevelopment;
    });
  }, [search, type, development]);

  const filteredLessons = useMemo(() => {
    const q = search.trim().toLowerCase();
    return lessons.filter((l) => {
      const matchesQuery =
        !q ||
        [l.title, l.project, l.location, l.summary, ...l.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesCategory =
        lessonCategory.value === "all" || l.category === lessonCategory.value;
      const matchesDevelopment =
        development.value === "all" || l.project === development.value;
      return matchesQuery && matchesCategory && matchesDevelopment;
    });
  }, [search, lessonCategory, development]);

  const developmentCount = developmentNames.length;
  const recentDocCount = documents.filter((d) =>
    moment(d.updated).isAfter(moment("2026-06-18").subtract(30, "days")),
  ).length;

  const filtersActive =
    search.trim() !== "" ||
    development.value !== "all" ||
    (tab === "documents" && type.value !== "all") ||
    (tab === "lessons" && lessonCategory.value !== "all");

  const handleDownload = (item: { id: string; name: string }) => {
    toast.success(`Downloading ${item.id} — ${item.name}`);
  };

  const setTypeQuickFilter = (docType: DocType) => {
    setTab("documents");
    setType(typeOptions.find((o) => o.value === docType) ?? typeOptions[0]);
  };

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Knowledge Repository"
        subtitle="Project documents, construction drawings, site reports, and lessons learned across the Rivers State development portfolio"
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Project documents"
          value={documents.length}
          icon={FolderOpen}
          tone="primary"
          hint="Briefs, contracts, drawings & reports"
        />
        <StatCard
          label="Lessons captured"
          value={lessons.length}
          icon={Lightbulb}
          tone="info"
          hint="Reusable across developments"
        />
        <StatCard
          label="Developments covered"
          value={developmentCount}
          icon={BookOpen}
          tone="success"
          hint="Active & recent sites"
        />
        <StatCard
          label="Updated this month"
          value={recentDocCount}
          icon={HardHat}
          tone="warning"
          hint="June 2026"
        />
      </div>

      <Card title="Browse by document type">
        <p className="mb-3 text-sm text-muted-foreground">
          Jump to common document categories used on construction sites and development projects.
        </p>
        <div className="flex flex-wrap gap-2">
          {DOCUMENT_TYPES.map((docType) => {
            const Icon = docTypeIcon[docType];
            const count = documents.filter((d) => d.type === docType).length;
            const active = tab === "documents" && type.value === docType;
            return (
              <button
                key={docType}
                type="button"
                onClick={() => setTypeQuickFilter(docType)}
                className={cn(
                  "inline-flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                  active
                    ? "border-primary bg-primary-soft text-primary"
                    : "border-border bg-surface text-foreground hover:border-primary/40 hover:bg-surface-muted",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {docType}
                <span className="text-xs text-muted-foreground">({count})</span>
              </button>
            );
          })}
        </div>
      </Card>

      <Tabs tabs={tabs} value={tab} onChange={setTab} />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-md">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              tab === "documents"
                ? "Search documents, development, location…"
                : "Search lessons, development, tags…"
            }
            aria-label="Search knowledge repository"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-48">
            <Select
              options={developmentOptions}
              value={development}
              onChange={(opt) => opt && setDevelopment(opt)}
              isSearchable={false}
              aria-label="Filter by development"
            />
          </div>
          {tab === "documents" ? (
            <div className="w-48">
              <Select
                options={typeOptions}
                value={type}
                onChange={(opt) => opt && setType(opt)}
                isSearchable={false}
                aria-label="Filter by document type"
              />
            </div>
          ) : (
            <div className="w-44">
              <Select
                options={lessonCategoryOptions}
                value={lessonCategory}
                onChange={(opt) => opt && setLessonCategory(opt)}
                isSearchable={false}
                aria-label="Filter by lesson category"
              />
            </div>
          )}
          {filtersActive && (
            <Badge variant="info">
              {tab === "documents"
                ? `${filteredDocs.length} of ${documents.length} shown`
                : `${filteredLessons.length} of ${lessons.length} shown`}
            </Badge>
          )}
        </div>
      </div>

      {tab === "documents" &&
        (filteredDocs.length === 0 ? (
          <Card>
            <EmptyState
              icon={FolderOpen}
              title="No documents found"
              description="Try a different search term, development, or document type."
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredDocs.map((d) => {
              const Icon = docTypeIcon[d.type];
              const isRecent = moment(d.updated).isAfter(
                moment("2026-06-18").subtract(14, "days"),
              );
              return (
                <Card
                  key={d.id}
                  className="flex cursor-pointer flex-col gap-3 transition-shadow hover:shadow-md"
                  onClick={() => setSelectedDoc(d)}
                >
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-medium text-foreground">
                        {d.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted-foreground">
                        {d.project}
                      </p>
                      <p className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {d.location}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      <Badge variant="neutral">{d.type}</Badge>
                      {isRecent && <Badge variant="info">Recent</Badge>}
                    </div>
                  </div>
                  {d.phase && (
                    <p className="text-xs text-muted-foreground">
                      Phase: {d.phase}
                    </p>
                  )}
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
                    <span className="truncate">
                      {d.id} · {d.owner} · {formatDate(d.updated)} · {d.size}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDownload(d);
                      }}
                      className="inline-flex shrink-0 items-center gap-1 font-medium text-primary hover:underline"
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
              description="Try a different search term, development, or category."
            />
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {filteredLessons.map((l) => (
              <Card
                key={l.id}
                className="flex cursor-pointer flex-col gap-3 transition-shadow hover:shadow-md"
                onClick={() => setSelectedLesson(l)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-medium text-foreground">{l.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {l.project} · {formatDate(l.date)}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {l.location}
                    </p>
                  </div>
                  <Badge variant={lessonCategoryVariant[l.category]} className="shrink-0">
                    {l.category}
                  </Badge>
                </div>
                <p className="line-clamp-3 text-sm text-muted-foreground">{l.summary}</p>
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

      <Modal
        isOpen={!!selectedDoc}
        onClose={() => setSelectedDoc(null)}
        title={selectedDoc?.name}
        size="md"
        footer={
          selectedDoc && (
            <>
              <Button variant="outline" onClick={() => setSelectedDoc(null)}>
                Close
              </Button>
              <Button
                leftIcon={<Download className="h-4 w-4" />}
                onClick={() => {
                  handleDownload(selectedDoc);
                  setSelectedDoc(null);
                }}
              >
                Download
              </Button>
            </>
          )
        }
      >
        {selectedDoc && (
          <div className="flex flex-col gap-5">
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Document ID">{selectedDoc.id}</Field>
              <Field label="Type">{selectedDoc.type}</Field>
              <Field label="Development">{selectedDoc.project}</Field>
              <Field label="Location">{selectedDoc.location}</Field>
              <Field label="Owner">{selectedDoc.owner}</Field>
              <Field label="Last updated">{formatDate(selectedDoc.updated)}</Field>
              <Field label="File size">{selectedDoc.size}</Field>
              {selectedDoc.phase && <Field label="Project phase">{selectedDoc.phase}</Field>}
            </dl>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Tags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedDoc.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            {selectedDoc.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selectedDoc.projectId)}
                  className="text-sm font-medium text-primary hover:text-primary-700"
                >
                  View development details →
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      <Modal
        isOpen={!!selectedLesson}
        onClose={() => setSelectedLesson(null)}
        title={selectedLesson ? `${selectedLesson.id} · Lesson detail` : undefined}
        size="md"
        footer={
          selectedLesson && (
            <Button variant="outline" onClick={() => setSelectedLesson(null)}>
              Close
            </Button>
          )
        }
      >
        {selectedLesson && (
          <div className="flex flex-col gap-5">
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-medium text-foreground">
                {selectedLesson.title}
              </p>
              <Badge variant={lessonCategoryVariant[selectedLesson.category]}>
                {selectedLesson.category}
              </Badge>
            </div>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Development">{selectedLesson.project}</Field>
              <Field label="Location">{selectedLesson.location}</Field>
              <Field label="Captured">{formatDate(selectedLesson.date)}</Field>
            </dl>
            <Field label="Summary">{selectedLesson.summary}</Field>
            <div className="flex items-center gap-2 rounded-lg bg-success/10 px-3 py-2 text-sm text-success">
              <Lightbulb className="h-4 w-4 shrink-0" />
              {selectedLesson.impact}
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">Tags</p>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {selectedLesson.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-surface-muted px-2 py-0.5 text-xs text-muted-foreground"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
            {selectedLesson.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selectedLesson.projectId)}
                  className="text-sm font-medium text-primary hover:text-primary-700"
                >
                  View development details →
                </Link>
              </div>
            )}
          </div>
        )}
      </Modal>

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default KnowledgePage;
