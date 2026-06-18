import { useMemo, useState } from "react";
import {
  BarChart3,
  Image as ImageIcon,
  Images,
  Play,
  Video,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
import { mediaItems, type MediaItem, type MediaType } from "./mediaData";
import { projects } from "../projects/projectsData";

const typeOptions = [
  { label: "All media", value: "all" },
  { label: "Images", value: "Image" },
  { label: "Videos", value: "Video" },
  { label: "Infographics", value: "Infographic" },
];

const projectOptions = [
  { label: "All projects", value: "all" },
  { label: "Portfolio", value: "Portfolio" },
  ...projects.map((p) => ({ label: p.name, value: p.name })),
];

const typeIcon: Record<MediaType, LucideIcon> = {
  Image: ImageIcon,
  Video: Video,
  Infographic: BarChart3,
};

const tileTone: Record<MediaType, string> = {
  Image: "from-accent-blue/30 to-primary/20 text-primary",
  Video: "from-accent-violet/30 to-accent-pink/20 text-accent-violet",
  Infographic: "from-accent-teal/30 to-accent-amber/20 text-accent-teal",
};

function MediaPage() {
  const [type, setType] = useState(typeOptions[0]);
  const [project, setProject] = useState(projectOptions[0]);
  const [selected, setSelected] = useState<MediaItem | null>(null);

  const filtered = useMemo(
    () =>
      mediaItems.filter((m) => {
        const matchesType = type.value === "all" || m.type === type.value;
        const matchesProject =
          project.value === "all" || m.project === project.value;
        return matchesType && matchesProject;
      }),
    [type, project],
  );

  const counts = useMemo(
    () => ({
      images: mediaItems.filter((m) => m.type === "Image").length,
      videos: mediaItems.filter((m) => m.type === "Video").length,
      infographics: mediaItems.filter((m) => m.type === "Infographic").length,
    }),
    [],
  );

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Media Gallery"
        subtitle="Photos, videos, and infographics from across the portfolio."
      />

      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Images"
          value={counts.images}
          icon={ImageIcon}
          tone="info"
        />
        <StatCard label="Videos" value={counts.videos} icon={Video} tone="primary" />
        <StatCard
          label="Infographics"
          value={counts.infographics}
          icon={BarChart3}
          tone="success"
        />
        <StatCard label="Total Assets" value={mediaItems.length} icon={Images} tone="warning" />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <div className="w-44">
          <Select
            options={typeOptions}
            value={type}
            onChange={(opt) => opt && setType(opt)}
            isSearchable={false}
            aria-label="Filter by media type"
          />
        </div>
        <div className="w-52">
          <Select
            options={projectOptions}
            value={project}
            onChange={(opt) => opt && setProject(opt)}
            isSearchable={false}
            aria-label="Filter by project"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <Card>
          <EmptyState
            icon={Images}
            title="No media found"
            description="Adjust the type or project filter to see assets."
          />
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((m) => {
            const Icon = typeIcon[m.type];
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m)}
                className="group overflow-hidden rounded-xl border border-border bg-surface text-left shadow-sm transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <div
                  className={cn(
                    "relative flex aspect-video items-center justify-center bg-gradient-to-br",
                    tileTone[m.type],
                  )}
                >
                  <Icon className="h-9 w-9 opacity-70" />
                  {m.type === "Video" && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-transform group-hover:scale-110">
                        <Play className="h-5 w-5 translate-x-0.5" />
                      </span>
                    </span>
                  )}
                  <span className="absolute right-2 top-2">
                    <Badge variant="neutral">{m.meta}</Badge>
                  </span>
                </div>
                <div className="p-3">
                  <p className="truncate text-sm font-medium text-foreground">
                    {m.title}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {m.category} · {m.project}
                  </p>
                </div>
              </button>
            );
          })}
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
            <div
              className={cn(
                "relative flex aspect-video items-center justify-center rounded-lg bg-gradient-to-br",
                tileTone[selected.type],
              )}
            >
              {(() => {
                const Icon = typeIcon[selected.type];
                return <Icon className="h-14 w-14 opacity-70" />;
              })()}
              {selected.type === "Video" && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm">
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </span>
                </span>
              )}
            </div>
            <dl className="grid grid-cols-2 gap-4">
              <Field label="Type">{selected.type}</Field>
              <Field label="Category">{selected.category}</Field>
              <Field label="Project">{selected.project}</Field>
              <Field label="Date">{formatDate(selected.date)}</Field>
            </dl>
            <p className="text-xs text-muted-foreground">
              Preview is illustrative for this demo.
            </p>
          </div>
        )}
      </Modal>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm text-foreground">{children}</dd>
    </div>
  );
}

export default MediaPage;
