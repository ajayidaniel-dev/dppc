import { useMemo, useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import {
  Aperture,
  BarChart3,
  ChevronRight,
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
import { cn, formatDate } from "../../utils/helpers";
import { projectDetailsPath } from "../../router/routes";
import { handleProjectImageError } from "../projects/projectsData";
import {
  MEDIA_CATEGORIES,
  mediaItems,
  portfolioGallery,
  projectGalleries,
  sitesWithMedia,
  type MediaItem,
  type PhaseMediaGroup,
  type ProjectGallery,
} from "./mediaData";

const PORTFOLIO_ID = 0;

const typeOptions = [
  { label: "All media", value: "all" },
  { label: "Photos", value: "Image" },
  { label: "Videos", value: "Video" },
  { label: "Infographics", value: "Infographic" },
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

function filterItems(
  items: MediaItem[],
  search: string,
  type: string,
  category: string,
): MediaItem[] {
  const q = search.trim().toLowerCase();
  return items.filter((m) => {
    const matchesQuery =
      !q ||
      [m.title, m.project, m.location, m.category, m.type, m.phase, m.meta]
        .join(" ")
        .toLowerCase()
        .includes(q);
    const matchesType = type === "all" || m.type === type;
    const matchesCategory = category === "all" || m.category === category;
    return matchesQuery && matchesType && matchesCategory;
  });
}

function filterPhaseGroups(
  groups: PhaseMediaGroup[],
  search: string,
  type: string,
  category: string,
): PhaseMediaGroup[] {
  return groups
    .map((g) => ({
      ...g,
      items: filterItems(g.items, search, type, category),
    }))
    .filter((g) => g.items.length > 0);
}

function MediaThumb({
  item,
  onSelect,
}: {
  item: MediaItem;
  onSelect: (item: MediaItem) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(item)}
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
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
              <Play className="h-5 w-5 translate-x-0.5" />
            </span>
          </span>
        )}
        {item.type === "Infographic" && (
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <BarChart3 className="h-10 w-10 text-white/80" />
          </span>
        )}
        <span className="absolute left-2 top-2">
          <Badge variant="neutral">{item.category}</Badge>
        </span>
        <span className="absolute right-2 top-2">
          <Badge variant="primary">{item.meta}</Badge>
        </span>
      </div>
      <div className="p-3">
        <p className="line-clamp-2 text-sm font-medium text-foreground">
          {item.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {formatDate(item.date)}
        </p>
      </div>
    </button>
  );
}

function PhaseSection({
  group,
  onSelect,
}: {
  group: PhaseMediaGroup;
  onSelect: (item: MediaItem) => void;
}) {
  const photos = group.items.filter((m) => m.type === "Image").length;
  const videos = group.items.filter((m) => m.type === "Video").length;
  const drones = group.items.filter((m) => m.category === "Drone Footage").length;

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-foreground">{group.phase}</h3>
          <Badge variant="neutral">{group.items.length} assets</Badge>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {photos > 0 && (
            <Badge variant="info">
              {photos} photo{photos !== 1 ? "s" : ""}
            </Badge>
          )}
          {videos > 0 && (
            <Badge variant="primary">
              {videos} video{videos !== 1 ? "s" : ""}
            </Badge>
          )}
          {drones > 0 && (
            <Badge variant="success">
              {drones} drone{drones !== 1 ? "s" : ""}
            </Badge>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {group.items.map((m) => (
          <MediaThumb key={m.id} item={m} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function ProjectGalleryView({
  gallery,
  search,
  type,
  category,
  onSelect,
}: {
  gallery: ProjectGallery;
  search: string;
  type: string;
  category: string;
  onSelect: (item: MediaItem) => void;
}) {
  const phaseGroups = useMemo(
    () => filterPhaseGroups(gallery.phaseGroups, search, type, category),
    [gallery.phaseGroups, search, type, category],
  );

  const visibleCount = phaseGroups.reduce((n, g) => n + g.items.length, 0);

  if (visibleCount === 0) {
    return (
      <Card>
        <EmptyState
          icon={Images}
          title="No media found"
          description="Try a different search term, category, or media type for this development."
        />
      </Card>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {phaseGroups.map((group) => (
        <PhaseSection key={group.phase} group={group} onSelect={onSelect} />
      ))}
    </div>
  );
}

function MediaPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<number>(
    projectGalleries[0]?.projectId ?? PORTFOLIO_ID,
  );
  const [search, setSearch] = useState("");
  const [type, setType] = useState(typeOptions[0]);
  const [category, setCategory] = useState(categoryOptions[0]);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const isPortfolio = selectedProjectId === PORTFOLIO_ID;
  const activeGallery = projectGalleries.find(
    (g) => g.projectId === selectedProjectId,
  );

  const scopedItems = useMemo(() => {
    if (isPortfolio) {
      return mediaItems.filter((m) => m.projectId === PORTFOLIO_ID);
    }
    return mediaItems.filter((m) => m.projectId === selectedProjectId);
  }, [isPortfolio, selectedProjectId]);

  const filteredScoped = useMemo(
    () => filterItems(scopedItems, search, type.value, category.value),
    [scopedItems, search, type.value, category.value],
  );

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
    search.trim() !== "" || type.value !== "all" || category.value !== "all";

  const portfolioPhaseGroups = useMemo(
    () =>
      filterPhaseGroups(portfolioGallery, search, type.value, category.value),
    [search, type.value, category.value],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Development Media Gallery"
        subtitle="Site photos, drone footage, and progress videos organised by development and construction phase"
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

      {/* Project selector */}
      <div className="flex flex-col gap-3">
        <h2 className="text-sm font-semibold text-foreground">
          Select development
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setSelectedProjectId(PORTFOLIO_ID)}
            className={cn(
              "flex w-44 shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-colors",
              isPortfolio
                ? "border-primary ring-2 ring-primary/20"
                : "border-border hover:border-primary/40",
            )}
          >
            <div className="relative aspect-[16/10] bg-surface-muted">
              <img
                src={projectGalleries[0]?.coverImage}
                alt="Portfolio reports"
                className="h-full w-full object-cover opacity-60"
                onError={handleProjectImageError}
              />
              <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                <BarChart3 className="h-8 w-8 text-white" />
              </span>
            </div>
            <div className="p-3">
              <p className="truncate text-sm font-medium text-foreground">
                Portfolio Reports
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {portfolioGallery.reduce((n, g) => n + g.items.length, 0)} infographics
              </p>
            </div>
          </button>

          {projectGalleries.map((g) => {
            const active = g.projectId === selectedProjectId;
            return (
              <button
                key={g.projectId}
                type="button"
                onClick={() => setSelectedProjectId(g.projectId)}
                className={cn(
                  "flex w-52 shrink-0 flex-col overflow-hidden rounded-xl border text-left transition-colors",
                  active
                    ? "border-primary ring-2 ring-primary/20"
                    : "border-border hover:border-primary/40",
                )}
              >
                <div className="relative aspect-[16/10] bg-surface-muted">
                  <img
                    src={g.coverImage}
                    alt={g.name}
                    className="h-full w-full object-cover"
                    onError={handleProjectImageError}
                  />
                  <span className="absolute bottom-2 left-2">
                    <Badge variant="neutral">{g.projectCode}</Badge>
                  </span>
                </div>
                <div className="p-3">
                  <p className="line-clamp-1 text-sm font-medium text-foreground">
                    {g.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {g.mediaCount} assets · {g.phaseGroups.length} phases
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active project header */}
      {!isPortfolio && activeGallery && (
        <Card className="!p-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-semibold text-foreground">
                  {activeGallery.name}
                </h2>
                <Badge variant="neutral">{activeGallery.projectCode}</Badge>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3.5 w-3.5 shrink-0" />
                {activeGallery.location}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Current phase:{" "}
                <span className="font-medium text-foreground">
                  {activeGallery.currentPhase}
                </span>
                {" · "}
                {activeGallery.mediaCount} documented assets across{" "}
                {activeGallery.phaseGroups.length} construction phases
              </p>
            </div>
            <Link
              to={projectDetailsPath(activeGallery.projectId)}
              className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:text-primary-700"
            >
              View development details
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      )}

      {isPortfolio && (
        <Card className="!p-4">
          <h2 className="text-lg font-semibold text-foreground">
            Portfolio-wide reports
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Cross-development KPI summaries, budget infographics, and portfolio
            progress heatmaps.
          </p>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 lg:max-w-sm">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={
              isPortfolio
                ? "Search portfolio reports…"
                : "Search media, phase, category…"
            }
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
          {filtersActive && (
            <Badge variant="info">
              {filteredScoped.length} of {scopedItems.length} shown
            </Badge>
          )}
        </div>
      </div>

      {/* Phase-grouped content */}
      {isPortfolio ? (
        portfolioPhaseGroups.length === 0 ? (
          <Card>
            <EmptyState
              icon={Images}
              title="No reports found"
              description="Try a different search term or filter."
            />
          </Card>
        ) : (
          <div className="flex flex-col gap-8">
            {portfolioPhaseGroups.map((group) => (
              <PhaseSection
                key={group.phase}
                group={group}
                onSelect={setSelected}
              />
            ))}
          </div>
        )
      ) : activeGallery ? (
        <ProjectGalleryView
          gallery={activeGallery}
          search={search}
          type={type.value}
          category={category.value}
          onSelect={setSelected}
        />
      ) : null}

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
              <Field label="Construction phase">{selected.phase}</Field>
              <Field label="Category">{selected.category}</Field>
              <Field label="Development">{selected.project}</Field>
              <Field label="Location">{selected.location}</Field>
              <Field label="Captured">{formatDate(selected.date)}</Field>
              <Field label="Format">{selected.meta}</Field>
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
