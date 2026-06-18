import { useMemo, useState } from "react";
import {
  BarChart3,
  Image as ImageIcon,
  Images,
  Play,
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
import { handleProjectImageError } from "../projects/projectsData";
import { mediaItems, type MediaItem } from "./mediaData";
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
          {filtered.map((m) => (
              <button
                key={m.id}
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
              <Field label="Type">{selected.type}</Field>
              <Field label="Category">{selected.category}</Field>
              <Field label="Project">{selected.project}</Field>
              <Field label="Date">{formatDate(selected.date)}</Field>
            </dl>
            {selected.type === "Video" && (
              <p className="text-xs text-muted-foreground">
                Video playback is illustrative for this demo.
              </p>
            )}
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
