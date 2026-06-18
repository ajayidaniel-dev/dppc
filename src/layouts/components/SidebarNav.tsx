import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { navSections } from "../../constants";
import { cn } from "../../utils/helpers";

interface SidebarNavProps {
  onNavigate?: () => void;
}

const isPathActive = (pathname: string, path: string) =>
  pathname === path || pathname.startsWith(`${path}/`);

function SidebarNav({ onNavigate }: SidebarNavProps) {
  const { pathname } = useLocation();

  const [open, setOpen] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    navSections.forEach((s) => {
      if (s.label) {
        init[s.label] = s.items.some((i) => isPathActive(pathname, i.path));
      }
    });
    return init;
  });

  useEffect(() => {
    setOpen((prev) => {
      const next = { ...prev };
      navSections.forEach((s) => {
        if (s.label && s.items.some((i) => isPathActive(pathname, i.path))) {
          next[s.label] = true;
        }
      });
      return next;
    });
  }, [pathname]);

  const linkClass = (isActive: boolean, nested = false) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
      nested && "py-2",
      isActive
        ? "bg-primary-soft text-primary"
        : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
    );

  return (
    <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
      {navSections.map((section, idx) => {
        if (!section.label) {
          return section.items.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onNavigate}
              className={({ isActive }) => linkClass(isActive)}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className="h-5 w-5 shrink-0"
                    strokeWidth={isActive ? 2.4 : 2}
                  />
                  {label}
                </>
              )}
            </NavLink>
          ));
        }

        const GroupIcon = section.icon;
        const expanded = open[section.label] ?? false;
        const hasActive = section.items.some((i) =>
          isPathActive(pathname, i.path),
        );

        return (
          <div key={section.label} className={cn(idx > 0 && "mt-1")}>
            <button
              type="button"
              onClick={() =>
                setOpen((prev) => ({
                  ...prev,
                  [section.label as string]: !expanded,
                }))
              }
              aria-expanded={expanded}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                hasActive && !expanded
                  ? "text-foreground"
                  : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
              )}
            >
              {GroupIcon && <GroupIcon className="h-5 w-5 shrink-0" />}
              <span className="flex-1 text-left">{section.label}</span>
              {hasActive && !expanded && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </button>

            {expanded && (
              <div className="mt-1 flex flex-col gap-1 border-l border-border pl-3 ml-4">
                {section.items.map(({ label, path, icon: Icon }) => (
                  <NavLink
                    key={path}
                    to={path}
                    onClick={onNavigate}
                    className={({ isActive }) => linkClass(isActive, true)}
                  >
                    {({ isActive }) => (
                      <>
                        <Icon
                          className="h-4 w-4 shrink-0"
                          strokeWidth={isActive ? 2.4 : 2}
                        />
                        {label}
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
}

export default SidebarNav;
