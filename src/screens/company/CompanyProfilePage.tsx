import moment from "moment";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Award,
  CalendarDays,
  CheckCircle2,
  Download,
  Globe2,
  MapPin,
  Pencil,
  PlayCircle,
  Quote,
  Rocket,
  Trophy,
} from "lucide-react";
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
import { routes } from "../../router/routes";
import { handleProjectImageError } from "../projects/projectsData";
import {
  awards,
  company,
  companyStats,
  coreValues,
  developmentSegments,
  featuredMedia,
  leadership,
  mission,
  strategicGoals,
  timeline,
  timelineTone,
  vision,
} from "./companyProfileData";

function CompanyProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Corporate Profile"
        subtitle="Property development company overview, history, leadership, and portfolio credentials · Rivers State, Nigeria"
        action={
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Download className="h-4 w-4" />}
              onClick={() => toast.success("Downloading corporate profile (demo)")}
            >
              Download profile
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
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">
                {company.legalName}
              </h2>
              <Badge variant="primary">{company.name}</Badge>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{company.tagline}</p>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Founded {company.founded}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                HQ {company.headquarters}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe2 className="h-3.5 w-3.5" />
                {company.markets}
              </span>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
        {companyStats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            tone={stat.tone}
            hint={stat.hint}
          />
        ))}
      </div>

      <Card title="Development portfolio segments">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {developmentSegments.map((seg) => (
            <div
              key={seg.label}
              className="rounded-lg border border-border bg-surface-muted/50 p-4"
            >
              <p className="text-sm font-medium text-foreground">{seg.label}</p>
              <p className="mt-1 text-2xl font-semibold text-primary">
                {seg.count} active
              </p>
              <p className="mt-1 text-xs text-muted-foreground">{seg.examples}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Mission">
          <div className="flex gap-3">
            <Quote className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">{mission}</p>
          </div>
        </Card>
        <Card title="Vision">
          <div className="flex gap-3">
            <Quote className="h-5 w-5 shrink-0 text-primary" />
            <p className="text-sm leading-relaxed text-muted-foreground">{vision}</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card title="Strategic goals">
          <ul className="flex flex-col gap-3">
            {strategicGoals.map((goal) => (
              <li key={goal} className="flex gap-3 text-sm text-muted-foreground">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {goal}
              </li>
            ))}
          </ul>
        </Card>
        <Card title="Core values">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {coreValues.map((value) => (
              <div key={value.name} className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
                  <value.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-foreground">{value.name}</p>
                  <p className="text-xs text-muted-foreground">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card title="Corporate timeline">
        <ol className="relative ml-2 border-l border-border">
          {timeline.map((item) => (
            <li key={item.year + item.title} className="mb-6 ml-6 last:mb-0">
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
                <span className="text-sm font-semibold text-foreground">{item.year}</span>
                <span className="text-sm font-medium text-foreground">{item.title}</span>
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
              <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
            </li>
          ))}
        </ol>
      </Card>

      <Card title="Awards & recognition">
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
                <p className="text-sm font-medium text-foreground">{award.title}</p>
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
                <p className="text-sm font-medium text-foreground">{leader.name}</p>
                <p className="text-xs text-muted-foreground">{leader.title}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card
        title="Corporate media"
        action={
          <Link
            to={routes.MEDIA}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-700"
          >
            View full gallery
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        }
      >
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {featuredMedia.map((item) => (
              <Link
                key={item.id}
                to={routes.MEDIA}
                className="group flex flex-col gap-2 focus:outline-none"
              >
                <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-surface-muted transition-colors group-hover:border-primary/40 group-focus-visible:ring-2 group-focus-visible:ring-ring/40">
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    onError={handleProjectImageError}
                  />
                  {item.type === "video" && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/25">
                      <PlayCircle className="h-10 w-10 text-white/90" />
                    </span>
                  )}
                  {item.type === "event" && (
                    <span className="absolute left-2 top-2">
                      <Badge variant="primary">Event</Badge>
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-foreground">{item.caption}</p>
                  <Badge variant="neutral" className="shrink-0 capitalize">
                    {item.type}
                  </Badge>
                </div>
              </Link>
          ))}
        </div>
      </Card>

      <p className="text-xs text-muted-foreground">
        Source: Corporate Communications · Updated {moment().format("DD MMM YYYY")}
      </p>
    </div>
  );
}

export default CompanyProfilePage;
