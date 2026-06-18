import {
  Award,
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Download,
  Factory,
  Gem,
  Globe2,
  Image as ImageIcon,
  Leaf,
  Lightbulb,
  MapPin,
  Pencil,
  PlayCircle,
  Quote,
  Rocket,
  ShieldCheck,
  Trophy,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  Avatar,
  Badge,
  Button,
  Card,
  PageHeader,
  StatCard,
} from "../../components/elements";
import { cn } from "../../utils/helpers";

const strategicGoals = [
  "Grow portfolio value 15% year over year through disciplined delivery.",
  "Reach carbon-neutral operations across all regional sites by 2030.",
  "Expand into two new markets while deepening existing client relationships.",
  "Digitize 100% of project governance on a single source of truth.",
];

const coreValues: { name: string; description: string; icon: LucideIcon }[] = [
  { name: "Integrity", description: "We do what we say, transparently and accountably.", icon: ShieldCheck },
  { name: "Excellence", description: "We hold a high bar for quality and delivery.", icon: Gem },
  { name: "Innovation", description: "We modernize how projects are planned and run.", icon: Lightbulb },
  { name: "Sustainability", description: "We build for lasting community and ESG impact.", icon: Leaf },
];

type TimelineType = "Founded" | "Milestone" | "Expansion";
const timeline: { year: string; title: string; description: string; type: TimelineType }[] = [
  { year: "2002", title: "Founded in Lagos", description: "Established as a regional project delivery firm with 12 employees.", type: "Founded" },
  { year: "2008", title: "First $100M portfolio", description: "Crossed nine figures in active portfolio value across infrastructure and energy.", type: "Milestone" },
  { year: "2014", title: "Expanded across West Africa", description: "Opened offices in three new countries to serve growing demand.", type: "Expansion" },
  { year: "2019", title: "Launched digital PMO", description: "Centralized governance and reporting onto a unified platform.", type: "Milestone" },
  { year: "2023", title: "Reached eight-country footprint", description: "Extended operations into East Africa and the Gulf region.", type: "Expansion" },
];

const awards: { title: string; org: string; year: string }[] = [
  { title: "Project Excellence Award", org: "Regional PM Institute", year: "2025" },
  { title: "Sustainability Leadership", org: "Green Build Council", year: "2024" },
  { title: "Top Employer", org: "Workplace Index", year: "2024" },
];

const leadership: { name: string; title: string }[] = [
  { name: "Adaeze Nwosu", title: "Chief Executive Officer" },
  { name: "Daniel Ajayi", title: "Chief Operating Officer" },
  { name: "Grace Eze", title: "Chief Financial Officer" },
  { name: "Kwame Mensah", title: "Chief Technology Officer" },
];

const media: { caption: string; type: "image" | "video" | "event" }[] = [
  { caption: "HQ ribbon-cutting ceremony", type: "event" },
  { caption: "Coastal Highway aerial tour", type: "video" },
  { caption: "Solar microgrid site", type: "image" },
  { caption: "Annual leadership summit", type: "event" },
];

const timelineTone: Record<TimelineType, string> = {
  Founded: "bg-primary text-primary-foreground",
  Milestone: "bg-info/15 text-info",
  Expansion: "bg-success/15 text-success",
};

const mediaIcon = { image: ImageIcon, video: PlayCircle, event: CalendarDays };

function CompanyProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Company Profile"
        subtitle="Corporate overview, history, and key statistics."
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Downloading company profile (demo)")}
            >
              Download
            </Button>
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Pencil className="h-4 w-4" />}
              onClick={() => toast.success("Edit profile (demo)")}
            >
              Edit
            </Button>
          </div>
        }
      />

      <Card>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary text-2xl font-bold text-primary-foreground">
            D
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-semibold text-foreground">
              Digital Project & Portfolio Corporation
            </h2>
            <p className="text-sm text-muted-foreground">
              Strategic project and portfolio delivery across infrastructure,
              energy, and technology.
            </p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" /> Founded 2002
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" /> HQ Lagos, Nigeria
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5" /> 8 countries
              </span>
              <span className="flex items-center gap-1.5">
                <Factory className="h-3.5 w-3.5" /> 6 industries
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        <StatCard label="Year Founded" value={2002} icon={CalendarDays} tone="primary" />
        <StatCard label="Geographic Presence" value="8 countries" icon={Globe2} tone="info" />
        <StatCard label="Employees" value="3,200+" icon={Users} tone="success" />
        <StatCard label="Projects Completed" value={142} icon={Briefcase} tone="primary" />
        <StatCard label="Industries Served" value={6} icon={Factory} tone="warning" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Mission">
          <div className="flex gap-3">
            <Quote className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              To deliver transformative projects that create lasting value for
              our clients, communities, and stakeholders.
            </p>
          </div>
        </Card>
        <Card title="Vision">
          <div className="flex gap-3">
            <Quote className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              To be the most trusted partner for strategic project and portfolio
              delivery across the region.
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Strategic Goals">
          <ul className="flex flex-col gap-3">
            {strategicGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {goal}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Core Values">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {coreValues.map((value) => (
              <div key={value.name} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <value.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {value.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Corporate Timeline">
        <ol className="relative ml-2 border-l border-border">
          {timeline.map((item) => (
            <li key={item.year} className="mb-6 ml-6 last:mb-0">
              <span
                className={cn(
                  "absolute -left-3 flex h-6 w-6 items-center justify-center rounded-full ring-4 ring-surface",
                  timelineTone[item.type],
                )}
              >
                {item.type === "Founded" ? (
                  <Rocket className="h-3 w-3" />
                ) : item.type === "Expansion" ? (
                  <Globe2 className="h-3 w-3" />
                ) : (
                  <CheckCircle2 className="h-3 w-3" />
                )}
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-foreground">
                  {item.year}
                </span>
                <span className="text-sm font-medium text-foreground">
                  {item.title}
                </span>
                <Badge
                  variant={
                    item.type === "Founded"
                      ? "primary"
                      : item.type === "Expansion"
                        ? "success"
                        : "info"
                  }
                >
                  {item.type}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Awards & Recognition">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {awards.map((award) => (
            <div
              key={award.title}
              className="flex items-start gap-3 rounded-lg border border-border p-4"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-warning/15 text-warning">
                <Trophy className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {award.title}
                </p>
                <p className="text-xs text-muted-foreground">{award.org}</p>
                <Badge variant="neutral" className="mt-1.5">
                  <Award className="h-3 w-3" />
                  {award.year}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Leadership">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((leader) => (
            <div
              key={leader.name}
              className="flex flex-col items-center gap-2 rounded-lg border border-border p-4 text-center"
            >
              <Avatar name={leader.name} size="lg" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {leader.name}
                </p>
                <p className="text-xs text-muted-foreground">{leader.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card title="Media Gallery">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {media.map((item) => {
            const Icon = mediaIcon[item.type];
            return (
              <button
                key={item.caption}
                onClick={() => toast("Media preview (demo)")}
                className="group flex flex-col gap-2 text-left focus:outline-none"
              >
                <div className="flex aspect-video items-center justify-center rounded-lg border border-border bg-surface-muted text-muted-foreground transition-colors group-hover:border-primary/40 group-hover:text-primary group-focus-visible:ring-2 group-focus-visible:ring-ring/40">
                  <Icon className="h-8 w-8" />
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-foreground">
                    {item.caption}
                  </p>
                  <Badge variant="neutral" className="shrink-0 capitalize">
                    {item.type}
                  </Badge>
                </div>
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

export default CompanyProfilePage;
