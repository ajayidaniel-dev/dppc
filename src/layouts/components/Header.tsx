import { useState } from "react";
import {
  Bell,
  Check,
  ExternalLink,
  Globe,
  Menu,
  Network,
  Search,
} from "lucide-react";
import moment from "moment";
import toast from "react-hot-toast";
import { useAuth } from "../../utils/useAuth";
import { cn, getFirstName } from "../../utils/helpers";
import ThemeToggle from "../../components/elements/ThemeToggle";

interface HeaderProps {
  onMenuClick: () => void;
}

interface Notification {
  id: string;
  title: string;
  detail: string;
  time: string;
  unread: boolean;
  tone: "danger" | "warning" | "info" | "success";
}

const seedNotifications: Notification[] = [
  {
    id: "n1",
    title: "Risk escalated to leadership",
    detail: "RSK-003 · Vendor capacity shortfall on Coastal Highway",
    time: "12m ago",
    unread: true,
    tone: "danger",
  },
  {
    id: "n2",
    title: "Milestone due this week",
    detail: "Detailed design sign-off · Grid Modernization",
    time: "1h ago",
    unread: true,
    tone: "warning",
  },
  {
    id: "n3",
    title: "Monthly report ready",
    detail: "September Portfolio Report is ready to export",
    time: "3h ago",
    unread: true,
    tone: "info",
  },
  {
    id: "n4",
    title: "Project marked On Track",
    detail: "ERP Rollout returned to green status",
    time: "Yesterday",
    unread: false,
    tone: "success",
  },
];

const toneDot: Record<Notification["tone"], string> = {
  danger: "bg-danger",
  warning: "bg-warning",
  info: "bg-info",
  success: "bg-success",
};

const quickLinks = [
  { label: "Company Website", icon: Globe },
  { label: "Corporate Intranet", icon: Network },
];

function Header({ onMenuClick }: HeaderProps) {
  const { user } = useAuth();
  const [now] = useState(() => moment().format("dddd, DD MMM YYYY"));
  const firstName = getFirstName(user?.name ?? "there");

  const [notifications, setNotifications] = useState(seedNotifications);
  const [openMenu, setOpenMenu] = useState<null | "notifications" | "links">(
    null,
  );
  const unread = notifications.filter((n) => n.unread).length;

  const close = () => setOpenMenu(null);

  return (
    <header className="relative flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4 lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Brand shows in the header where the sidebar is hidden */}
        <div className="flex items-center gap-2 lg:hidden">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            D
          </div>
        </div>

        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold tracking-tight text-foreground">
            Welcome back, {firstName}
          </h1>
          <span className="hidden text-xs text-muted-foreground sm:block">
            {now}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 transition-colors focus-within:border-primary focus-within:ring-2 focus-within:ring-ring/30 md:flex">
          <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
          <input
            placeholder="Search projects, risks, reports…"
            aria-label="Search"
            className="w-48 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground xl:w-56"
          />
        </div>

        <div className="flex items-center gap-1">
          {/* Quick links */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu((m) => (m === "links" ? null : "links"))
              }
              aria-label="Quick links"
              aria-expanded={openMenu === "links"}
              className="hidden h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 sm:inline-flex"
            >
              <ExternalLink className="h-5 w-5" />
            </button>
            {openMenu === "links" && (
              <Dropdown onClose={close} title="Quick links">
                {quickLinks.map(({ label, icon: Icon }) => (
                  <button
                    key={label}
                    onClick={() => {
                      toast.success(`Opening ${label} (demo)`);
                      close();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm text-foreground transition-colors hover:bg-surface-muted"
                  >
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    {label}
                    <ExternalLink className="ml-auto h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                ))}
              </Dropdown>
            )}
          </div>

          <ThemeToggle />

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu((m) =>
                  m === "notifications" ? null : "notifications",
                )
              }
              aria-label={`Notifications (${unread} unread)`}
              aria-expanded={openMenu === "notifications"}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-1.5 top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[10px] font-semibold text-white ring-2 ring-surface">
                  {unread}
                </span>
              )}
            </button>
            {openMenu === "notifications" && (
              <Dropdown
                onClose={close}
                title="Notifications"
                width="w-80"
                headerAction={
                  unread > 0 ? (
                    <button
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, unread: false })),
                        )
                      }
                      className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Mark all read
                    </button>
                  ) : undefined
                }
              >
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map((n) => (
                    <button
                      key={n.id}
                      onClick={() =>
                        setNotifications((prev) =>
                          prev.map((x) =>
                            x.id === n.id ? { ...x, unread: false } : x,
                          ),
                        )
                      }
                      className={cn(
                        "flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-surface-muted",
                        n.unread && "bg-primary-soft/40",
                      )}
                    >
                      <span
                        className={cn(
                          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                          toneDot[n.tone],
                        )}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium text-foreground">
                          {n.title}
                        </span>
                        <span className="block truncate text-xs text-muted-foreground">
                          {n.detail}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-muted-foreground">
                          {n.time}
                        </span>
                      </span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-border px-4 py-2.5 text-center">
                  <button
                    onClick={() => {
                      toast.success("Viewing all notifications (demo)");
                      close();
                    }}
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    View all notifications
                  </button>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

interface DropdownProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  width?: string;
  headerAction?: React.ReactNode;
}

function Dropdown({
  title,
  children,
  onClose,
  width = "w-64",
  headerAction,
}: DropdownProps) {
  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} aria-hidden />
      <div
        className={cn(
          "absolute right-0 top-11 z-50 overflow-hidden rounded-xl border border-border bg-surface shadow-xl",
          width,
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <span className="text-sm font-semibold text-foreground">{title}</span>
          {headerAction}
        </div>
        {children}
      </div>
    </>
  );
}

export default Header;
