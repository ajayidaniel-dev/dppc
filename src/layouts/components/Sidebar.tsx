import { NavLink } from "react-router-dom";
import { LogOut, Settings, X } from "lucide-react";
import { routes } from "../../router/routes";
import { cn, getFirstName } from "../../utils/helpers";
import { useAuth } from "../../utils/useAuth";
import Avatar from "../../components/elements/Avatar";
import SidebarNav from "./SidebarNav";

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

function Brand() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
        D
      </div>
      <div className="leading-tight">
        <span className="block text-lg font-semibold tracking-tight text-foreground">
          DPPC
        </span>
        <span className="block text-[11px] text-muted-foreground">
          Property Development
        </span>
      </div>
    </div>
  );
}

function Footer({ onNavigate }: { onNavigate?: () => void }) {
  const { user, logout } = useAuth();
  const displayName = user?.name ?? "Guest User";
  const email = user?.email ?? "";

  return (
    <div className="border-t border-border p-3">
      <NavLink
        to={routes.SETTINGS}
        onClick={onNavigate}
        className={({ isActive }) =>
          cn(
            "mb-1 flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
            isActive
              ? "bg-primary-soft text-primary"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
          )
        }
      >
        {({ isActive }) => (
          <>
            <Settings
              className="h-5 w-5 shrink-0"
              strokeWidth={isActive ? 2.4 : 2}
            />
            Settings
          </>
        )}
      </NavLink>
      <div className="flex items-center gap-3 rounded-lg px-2 py-1.5">
        <Avatar name={displayName} size="md" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-foreground">
            {getFirstName(displayName)}
          </p>
          <p className="truncate text-xs text-muted-foreground">{email}</p>
        </div>
        <button
          onClick={logout}
          aria-label="Log out"
          title="Log out"
          className="shrink-0 rounded-md p-2 text-muted-foreground transition-colors hover:bg-surface-muted hover:text-danger focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  return (
    <>
      {/* Desktop rail */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-surface lg:flex">
        <div className="flex h-16 items-center border-b border-border px-6">
          <Brand />
        </div>
        <SidebarNav />
        <Footer />
      </aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
            aria-hidden
          />
          <aside className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col border-r border-border bg-surface shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-border px-5">
              <Brand />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="rounded-md p-1 text-muted-foreground hover:bg-surface-muted hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SidebarNav onNavigate={onClose} />
            <Footer onNavigate={onClose} />
          </aside>
        </div>
      )}
    </>
  );
}

export default Sidebar;
