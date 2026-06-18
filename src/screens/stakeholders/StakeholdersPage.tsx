import { useMemo, useState } from "react";
import {
  Building2,
  CalendarDays,
  Lightbulb,
  Mail,
  Megaphone,
  MessageSquarePlus,
  Phone,
  Plus,
  Search,
  Users,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Modal,
  PageHeader,
  ProgressBar,
  Select,
  StatCard,
  Tabs,
  type BadgeVariant,
  type TabItem,
} from "../../components/elements";
import { cn, formatDate } from "../../utils/helpers";
import {
  announcements,
  engagementQuadrant,
  lessons,
  meetings,
  stakeholders,
  suggestions,
  surveys,
  type Level,
  type Stakeholder,
} from "./stakeholdersData";
import StakeholderFormModal from "./StakeholderFormModal";

const tabs: TabItem[] = [
  { id: "directory", label: "Directory" },
  { id: "communication", label: "Communication" },
  { id: "feedback", label: "Feedback" },
];

const typeOptions = [
  { label: "All stakeholders", value: "all" },
  { label: "Internal", value: "Internal" },
  { label: "External", value: "External" },
];

const typeVariant: Record<Stakeholder["type"], BadgeVariant> = {
  Internal: "neutral",
  External: "primary",
};

const suggestionVariant: Record<string, BadgeVariant> = {
  New: "warning",
  "Under review": "info",
  Planned: "success",
};

const quadrants: {
  influence: Level;
  interest: Level;
  label: string;
  tone: string;
}[] = [
  { influence: "High", interest: "Low", label: "Keep satisfied", tone: "bg-warning/10" },
  { influence: "High", interest: "High", label: "Manage closely", tone: "bg-primary-soft" },
  { influence: "Low", interest: "Low", label: "Monitor", tone: "bg-surface-muted" },
  { influence: "Low", interest: "High", label: "Keep informed", tone: "bg-info/10" },
];

function StakeholdersPage() {
  const [activeTab, setActiveTab] = useState("directory");
  const [people, setPeople] = useState<Stakeholder[]>(stakeholders);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [selected, setSelected] = useState<Stakeholder | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const organizations = new Set(people.map((s) => s.organization));
  const externalCount = people.filter((s) => s.type === "External").length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return people.filter((s) => {
      const matchesQuery =
        !q ||
        [s.name, s.role, s.organization].join(" ").toLowerCase().includes(q);
      const matchesType = type.value === "all" || s.type === type.value;
      return matchesQuery && matchesType;
    });
  }, [people, search, type]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Stakeholders"
        subtitle="Directory, communication, and feedback across the portfolio."
        action={
          <Button
            leftIcon={<Plus className="h-4 w-4" />}
            onClick={() => setAddOpen(true)}
          >
            Add stakeholder
          </Button>
        }
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard label="Stakeholders" value={people.length} icon={Users} tone="primary" />
        <StatCard label="External Partners" value={externalCount} icon={Building2} tone="info" />
        <StatCard label="Organizations" value={organizations.size} icon={Building2} tone="success" />
        <StatCard label="Upcoming Meetings" value={meetings.length} icon={CalendarDays} tone="warning" />
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {activeTab === "directory" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 sm:max-w-xs">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, role, organization…"
                aria-label="Search stakeholders"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="w-48">
              <Select
                options={typeOptions}
                value={type}
                onChange={(opt) => opt && setType(opt)}
                isSearchable={false}
                aria-label="Filter by type"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card>
              <p className="py-8 text-center text-sm text-muted-foreground">
                No stakeholders match your filters.
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((person) => (
                <button
                  key={person.id}
                  onClick={() => setSelected(person)}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <Avatar name={person.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">
                        {person.name}
                      </p>
                      <Badge variant={typeVariant[person.type]}>
                        {person.type}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.role}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.organization}
                    </p>
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {person.responsibilities}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <Card title="Engagement Map">
            <div className="flex gap-2">
              <div className="flex items-center">
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground [writing-mode:vertical-rl] rotate-180">
                  Influence
                </span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2">
                  {quadrants.map((q) => {
                    const quadrantPeople = people.filter(
                      (s) =>
                        s.influence === q.influence &&
                        s.interest === q.interest,
                    );
                    return (
                      <div
                        key={q.label}
                        className={cn(
                          "min-h-28 rounded-lg border border-border p-3",
                          q.tone,
                        )}
                      >
                        <p className="mb-2 text-xs font-semibold text-foreground">
                          {q.label}
                          <span className="ml-1.5 font-normal text-muted-foreground">
                            {q.influence} influence · {q.interest} interest
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {quadrantPeople.map((p) => (
                            <button
                              key={p.id}
                              onClick={() => setSelected(p)}
                              title={p.name}
                              className="flex items-center gap-1.5 rounded-full border border-border bg-surface py-0.5 pl-0.5 pr-2 text-xs text-foreground transition-colors hover:border-primary/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                            >
                              <Avatar name={p.name} size="sm" />
                              {p.name.split(" ")[0]}
                            </button>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="mt-2 text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Interest
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "communication" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <Card
            title="Announcements & Updates"
            className="lg:col-span-2"
            action={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Megaphone className="h-4 w-4" />}
                onClick={() => toast.success("New announcement (demo)")}
              >
                Post
              </Button>
            }
          >
            <div className="divide-y divide-border">
              {announcements.map((a) => (
                <div key={a.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={a.type === "Announcement" ? "primary" : "info"}
                    >
                      {a.type}
                    </Badge>
                    <p className="text-sm font-medium text-foreground">
                      {a.title}
                    </p>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {a.author} · {formatDate(a.date)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Meeting Calendar">
            <div className="flex flex-col gap-3">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className="flex items-center gap-3 rounded-lg border border-border p-3"
                >
                  <span className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">
                      {m.title}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {formatDate(m.date)} · {m.time} · {m.attendees} attendees
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {activeTab === "feedback" && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <Card title="Surveys" className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {surveys.map((s) => (
                  <div key={s.id}>
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-foreground">
                        {s.title}
                      </p>
                      <Badge variant={s.status === "Open" ? "info" : "neutral"}>
                        {s.status}
                      </Badge>
                    </div>
                    <ProgressBar
                      value={Math.round((s.responses / s.total) * 100)}
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      {s.responses}/{s.total} responses ·{" "}
                      {s.status === "Open"
                        ? `closes ${formatDate(s.closes)}`
                        : `closed ${formatDate(s.closes)}`}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            <Card
              title="Suggestions"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<MessageSquarePlus className="h-4 w-4" />}
                  onClick={() => toast.success("New suggestion (demo)")}
                >
                  Add
                </Button>
              }
            >
              <div className="divide-y divide-border">
                {suggestions.map((g) => (
                  <div key={g.id} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm text-foreground">{g.text}</p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <Badge variant={suggestionVariant[g.status]}>
                        {g.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {g.author} · {formatDate(g.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card title="Lessons Learned">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {lessons.map((l) => (
                <div
                  key={l.id}
                  className="flex gap-3 rounded-lg border border-border p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {l.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{l.project}</p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {l.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title="Stakeholder detail"
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-base font-medium text-foreground">
                    {selected.name}
                  </p>
                  <Badge variant={typeVariant[selected.type]}>
                    {selected.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selected.role} · {selected.organization}
                </p>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Engagement
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {engagementQuadrant(selected.influence, selected.interest)} (
                  {selected.influence} influence · {selected.interest} interest)
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Projects
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {selected.projects.join(", ")}
                </dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Responsibilities
                </dt>
                <dd className="mt-1 text-sm text-foreground">
                  {selected.responsibilities}
                </dd>
              </div>
            </dl>

            <div className="flex flex-col gap-2 border-t border-border pt-4 sm:flex-row">
              <a
                href={`mailto:${selected.email}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <Mail className="h-4 w-4" />
                {selected.email}
              </a>
              <a
                href={`tel:${selected.phone.replace(/\s/g, "")}`}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <Phone className="h-4 w-4" />
                {selected.phone}
              </a>
            </div>
          </div>
        )}
      </Modal>

      <StakeholderFormModal
        isOpen={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={(stakeholder) => setPeople((prev) => [stakeholder, ...prev])}
      />
    </div>
  );
}

export default StakeholdersPage;
