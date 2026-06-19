import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Building2,
  CalendarDays,
  HardHat,
  Lightbulb,
  Mail,
  MapPin,
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
  EmptyState,
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
import { projectDetailsPath, routes } from "../../router/routes";
import {
  announcements,
  categoryVariant,
  developmentNames,
  engagementInsights,
  engagementQuadrant,
  meetings,
  QUADRANTS,
  STAKEHOLDER_CATEGORIES,
  stakeholders,
  suggestions,
  surveys,
  type Stakeholder,
} from "./stakeholdersData";
import StakeholderFormModal from "./StakeholderFormModal";

const tabs: TabItem[] = [
  { id: "directory", label: "Stakeholder Directory" },
  { id: "communication", label: "Communication" },
  { id: "feedback", label: "Feedback & Insights" },
];

const typeOptions = [
  { label: "All stakeholders", value: "all" },
  { label: "Internal", value: "Internal" },
  { label: "External", value: "External" },
];

const categoryOptions = [
  { label: "All categories", value: "all" },
  ...STAKEHOLDER_CATEGORIES.map((c) => ({ label: c, value: c })),
];

const developmentOptions = [
  { label: "All developments", value: "all" },
  ...developmentNames.map((d) => ({ label: d, value: d })),
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function StakeholdersPage() {
  const [activeTab, setActiveTab] = useState("directory");
  const [people, setPeople] = useState<Stakeholder[]>(stakeholders);
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [development, setDevelopment] = useState(developmentOptions[0]);
  const [selected, setSelected] = useState<Stakeholder | null>(null);
  const [addOpen, setAddOpen] = useState(false);

  const organizations = new Set(people.map((s) => s.organization));
  const externalCount = people.filter((s) => s.type === "External").length;
  const contractorCount = people.filter((s) => s.category === "Contractor").length;
  const upcomingMeetings = meetings.filter((m) =>
    moment(m.date).isSameOrAfter(moment("2026-06-18"), "day"),
  ).length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return people.filter((s) => {
      const matchesQuery =
        !q ||
        [
          s.name,
          s.role,
          s.organization,
          s.category,
          s.location ?? "",
          ...s.developments,
        ]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesType = type.value === "all" || s.type === type.value;
      const matchesCategory =
        category.value === "all" || s.category === category.value;
      const matchesDevelopment =
        development.value === "all" ||
        s.developments.includes(development.value) ||
        s.developments.includes("Portfolio-wide");
      return matchesQuery && matchesType && matchesCategory && matchesDevelopment;
    });
  }, [people, search, type, category, development]);

  const filtersActive =
    search.trim() !== "" ||
    type.value !== "all" ||
    category.value !== "all" ||
    development.value !== "all";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Stakeholders"
        subtitle="Investors, contractors, regulators, buyers, and community partners across the Rivers State development portfolio"
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
        <StatCard
          label="Stakeholders"
          value={people.length}
          icon={Users}
          tone="primary"
          hint="Directory contacts"
        />
        <StatCard
          label="External partners"
          value={externalCount}
          icon={Building2}
          tone="info"
          hint={`${contractorCount} contractors`}
        />
        <StatCard
          label="Organizations"
          value={organizations.size}
          icon={HardHat}
          tone="success"
          hint="Corporate & partner orgs"
        />
        <StatCard
          label="Upcoming meetings"
          value={upcomingMeetings}
          icon={CalendarDays}
          tone="warning"
          hint="Next 30 days"
        />
      </div>

      <Tabs tabs={tabs} value={activeTab} onChange={setActiveTab} />

      {activeTab === "directory" && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-sm">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, role, development…"
                aria-label="Search stakeholders"
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-40">
                <Select
                  options={categoryOptions}
                  value={category}
                  onChange={(opt) => opt && setCategory(opt)}
                  isSearchable={false}
                  aria-label="Filter by category"
                />
              </div>
              <div className="w-40">
                <Select
                  options={typeOptions}
                  value={type}
                  onChange={(opt) => opt && setType(opt)}
                  isSearchable={false}
                  aria-label="Filter by type"
                />
              </div>
              <div className="w-48">
                <Select
                  options={developmentOptions}
                  value={development}
                  onChange={(opt) => opt && setDevelopment(opt)}
                  isSearchable={false}
                  aria-label="Filter by development"
                />
              </div>
              {filtersActive && (
                <Badge variant="info">
                  {filtered.length} of {people.length} shown
                </Badge>
              )}
            </div>
          </div>

          {filtered.length === 0 ? (
            <Card>
              <EmptyState
                icon={Users}
                title="No stakeholders found"
                description="Try a different search term, category, or development."
              />
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((person) => (
                <button
                  key={person.id}
                  type="button"
                  onClick={() => setSelected(person)}
                  className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4 text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                >
                  <Avatar name={person.name} size="lg" />
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <p className="truncate text-sm font-medium text-foreground">
                        {person.name}
                      </p>
                      <Badge variant={categoryVariant[person.category]}>
                        {person.category}
                      </Badge>
                    </div>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.role}
                    </p>
                    <p className="truncate text-xs text-muted-foreground">
                      {person.organization}
                    </p>
                    {person.location && (
                      <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3 shrink-0" />
                        {person.location}
                      </p>
                    )}
                    <p className="mt-2 line-clamp-2 text-xs text-muted-foreground">
                      {person.developments.slice(0, 2).join(" · ")}
                    </p>
                    <p className="mt-1.5 text-xs font-medium text-primary">
                      {engagementQuadrant(person.influence, person.interest)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          )}

          <Card title="Stakeholder Engagement Map">
            <p className="mb-4 text-sm text-muted-foreground">
              Influence–interest matrix for development portfolio engagement planning.
            </p>
            <div className="flex gap-2">
              <div className="flex items-center">
                <span className="text-xs font-medium text-muted-foreground [writing-mode:vertical-rl] rotate-180">
                  Influence
                </span>
              </div>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-2">
                  {QUADRANTS.map((q) => {
                    const quadrantPeople = people.filter(
                      (s) =>
                        s.influence === q.influence && s.interest === q.interest,
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
                            · {q.influence} / {q.interest}
                          </span>
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {quadrantPeople.map((p) => (
                            <button
                              key={p.id}
                              type="button"
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
                <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
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
            title="Portfolio Announcements"
            className="lg:col-span-2"
            action={
              <Button
                variant="ghost"
                size="sm"
                leftIcon={<Megaphone className="h-4 w-4" />}
                onClick={() => toast.success("New announcement posted (demo)")}
              >
                Post update
              </Button>
            }
          >
            <div className="divide-y divide-border">
              {announcements.map((a) => (
                <div key={a.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex flex-wrap items-center gap-2">
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
                    {a.scope} · {a.author} · {formatDate(a.date)}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card title="Engagement Calendar">
            <div className="flex flex-col gap-3">
              {meetings.map((m) => (
                <div
                  key={m.id}
                  className="flex items-start gap-3 rounded-lg border border-border p-3"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                    <CalendarDays className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">{m.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatDate(m.date)} · {m.time}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3 shrink-0" />
                      {m.location}
                    </p>
                    {m.development && (
                      <Badge variant="neutral" className="mt-1.5">
                        {m.development}
                      </Badge>
                    )}
                    <p className="mt-1 text-xs text-muted-foreground">
                      {m.attendees} attendees
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
            <Card title="Stakeholder Surveys" className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {surveys.map((s) => (
                  <div key={s.id}>
                    <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {s.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Audience: {s.audience}
                        </p>
                      </div>
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
              title="Stakeholder Suggestions"
              action={
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<MessageSquarePlus className="h-4 w-4" />}
                  onClick={() => toast.success("New suggestion submitted (demo)")}
                >
                  Add
                </Button>
              }
            >
              <div className="divide-y divide-border">
                {suggestions.map((g) => (
                  <div key={g.id} className="py-3 first:pt-0 last:pb-0">
                    <p className="text-sm text-foreground">{g.text}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      <Badge variant={suggestionVariant[g.status]}>
                        {g.status}
                      </Badge>
                      {g.development && (
                        <span className="text-xs text-muted-foreground">
                          {g.development}
                        </span>
                      )}
                      <span className="text-xs text-muted-foreground">
                        {g.author} · {formatDate(g.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <Card
            title="Engagement Insights"
            action={
              <Link
                to={routes.KNOWLEDGE}
                className="text-sm font-medium text-primary hover:text-primary-700"
              >
                View knowledge repository →
              </Link>
            }
          >
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {engagementInsights.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 rounded-lg border border-border p-4"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
                    <Lightbulb className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.development}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.summary}
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
        title={selected ? `${selected.name}` : undefined}
        size="md"
      >
        {selected && (
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Avatar name={selected.name} size="lg" />
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-base font-medium text-foreground">
                    {selected.name}
                  </p>
                  <Badge variant={categoryVariant[selected.category]}>
                    {selected.category}
                  </Badge>
                  <Badge variant={typeVariant[selected.type]}>
                    {selected.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {selected.role} · {selected.organization}
                </p>
                {selected.location && (
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {selected.location}
                  </p>
                )}
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
              <Field label="Engagement strategy">
                {engagementQuadrant(selected.influence, selected.interest)} (
                {selected.influence} influence · {selected.interest} interest)
              </Field>
              <Field label="Stakeholder ID">{selected.id}</Field>
              <Field label="Developments">
                {selected.developments.join(", ")}
              </Field>
              <div className="sm:col-span-2">
                <Field label="Responsibilities">{selected.responsibilities}</Field>
              </div>
            </dl>

            {selected.projectIds.length > 0 && (
              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">
                  Linked developments
                </p>
                <div className="flex flex-wrap gap-2">
                  {selected.projectIds.map((id) => (
                    <Link
                      key={id}
                      to={projectDetailsPath(id)}
                      className="text-sm font-medium text-primary hover:text-primary-700"
                    >
                      View development {id} →
                    </Link>
                  ))}
                </div>
              </div>
            )}

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

      <p className="text-xs text-muted-foreground">
        Source: PMO · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default StakeholdersPage;
