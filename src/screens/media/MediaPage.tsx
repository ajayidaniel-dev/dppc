import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Aperture,
  BarChart3,
  Image as ImageIcon,
  Images,
  MapPin,
  Play,
  Search,
  Video,
} from "lucide-react";
import {
  Badge,
  Card,
  EmptyState,
  Modal,
  PageHeader,
  Select,
  StatCard,
} from "../../components/elements";
import { formatDate } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import { handleProjectImageError } from "../projects/projectsData";
import {
  developmentNames,
  MEDIA_CATEGORIES,
  mediaItems,
  sitesWithMedia,
  type MediaItem,
} from "./mediaData";

const typeOptions = [
  { label: "All media", value: "all" },
  { label: "Photos", value: "Image" },
  { label: "Videos", value: "Video" },
  { label: "Infographics", value: "Infographic" },
];

const developmentOptions = [
  { label: "All developments", value: "all" },
  { label: "Portfolio-wide", value: "Portfolio-wide" },
  ...developmentNames.map((d) => ({ label: d, value: d })),
];

const categoryOptions = [
  { label: "All categories", value: "all" },
  ...MEDIA_CATEGORIES.map((c) => ({ label: c, value: c })),
];

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

function MediaPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [development, setDevelopment] = useState(developmentOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return mediaItems.filter((m) => {
      const matchesQuery =
        !q ||
        [m.title, m.project, m.location, m.category, m.type]
          .join(" ")
          .toLowerCase()
          .includes(q);
      const matchesType = type.value === "all" || m.type === type.value;
      const matchesDevelopment =
        development.value === "all" || m.project === development.value;
      const matchesCategory =
        category.value === "all" || m.category === category.value;
      return matchesQuery && matchesType && matchesDevelopment && matchesCategory;
    });
  }, [search, type, development, category]);

  const counts = useMemo(
    () => ({
      images: mediaItems.filter((m) => m.type === "Image").length,
      videos: mediaItems.filter((m) => m.type === "Video").length,
      infographics: mediaItems.filter((m) => m.type === "Infographic").length,
      drone: mediaItems.filter((m) => m.category === "Drone Footage").length,
    }),
    [],
  );

  const filtersActive =
    search.trim() !== "" ||
    type.value !== "all" ||
    development.value !== "all" ||
    category.value !== "all";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Media Gallery"
        subtitle="Construction site photos, drone footage, handover imagery, and portfolio reports across Rivers State developments"
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Site photos"
          value={counts.images}
          icon={ImageIcon}
          tone="info"
          hint="Progress, inspection & handover"
        />
        <StatCard
          label="Site videos"
          value={counts.videos}
          icon={Video}
          tone="primary"
          hint="Walkthroughs & flyovers"
        />
        <StatCard
          label="Drone footage"
          value={counts.drone}
          icon={Aperture}
          tone="success"
          hint="Aerial site surveys"
        />
        <StatCard
          label="Total assets"
          value={mediaItems.length}
          icon={Images}
          tone="warning"
          hint={`${sitesWithMedia} developments documented`}
        />
      </div>

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media, development, location…"
            aria-label="Search media gallery"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="w-40">
            <Select
              options={typeOptions}
              value={type}
              onChange={(opt) => opt && setType(opt)}
              isSearchable={false}
              aria-label="Filter by media type"
            />
          </div>
          <div className="w-48">
            <Select
              options={categoryOptions}
              value={category}
              onChange={(opt) => opt && setCategory(opt)}
              isSearchable={false}
              aria-label="Filter by category"
            />
          </div>
          <div className="w-52">
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
              {filtered.length} of {mediaItems.length} shown
            </Badge>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={Images}
            title="No media found"
            description="Try a different search term, category, or development filter."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setSelected(m)}
              className="group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <div className="relative aspect-video overflow-hidden bg-surface-muted">
                <img
                  src={m.url}
                  alt={m.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  onError={handleProjectImageError}
                />
                {m.type === "Video" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="h-5 w-5 translate-x-0.5" />
                    </span>
                  </span>
                )}
                {m.type === "Infographic" && (
                  <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <BarChart3 className="h-10 w-10 text-white/80" />
                  </span>
                )}
                <span className="absolute left-2 top-2">
                  <Badge variant="neutral">{m.category}</Badge>
                </span>
                <span className="absolute right-2 top-2">
                  <Badge variant="primary">{m.meta}</Badge>
                </span>
              </div>
              <div className="p-3">
                <p className="line-clamp-2 text-sm font-medium text-foreground">
                  {m.title}
                </p>
                <p className="mt-0.5 truncate text-xs text-muted-foreground">
                  {m.project}
                </p>
                <p className="mt-0.5 flex items-center gap-1 truncate text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 shrink-0" />
                  {m.location}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        size="lg"
      >
        {selected && (
          <div className="flex flex-col gap-4">
            <div className="relative overflow-hidden rounded-lg bg-surface-muted">
              <img
                src={selected.url.replace(/w=\d+/, "w=1200")}
                alt={selected.title}
                className="max-h-[60vh] w-full object-contain"
                onError={handleProjectImageError}
              />
              {selected.type === "Video" && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </span>
                </span>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Media ID">{selected.id}</Field>
              <Field label="Type">{selected.type}</Field>
              <Field label="Category">{selected.category}</Field>
              <Field label="Development">{selected.project}</Field>
              <Field label="Location">{selected.location}</Field>
              <Field label="Captured">{formatDate(selected.date)}</Field>
            </dl>
            {selected.type === "Video" && (
              <p className="text-xs text-muted-foreground">
                Video playback is illustrative for this demo — poster frame shown.
              </p>
            )}
            {selected.projectId > 0 && (
              <div className="border-t border-border pt-4">
                <Link
                  to={projectDetailsPath(selected.projectId)}
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

export default MediaPage;
