import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import { Badge } from "../../components/elements";
import { cn } from "../../utils/helpers";
import {
  categoryMeta,
  groupResults,
  searchGlobal,
  suggestedSearches,
  type SearchResult,
} from "./globalSearchData";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(() => searchGlobal(query), [query]);
  const grouped = useMemo(() => groupResults(results), [results]);
  const flatResults = results;

  const goTo = useCallback(
    (result: SearchResult) => {
      navigate(result.path);
      onClose();
    },
    [navigate, onClose],
  );

  useEffect(() => {
    if (!isOpen) return;
    setQuery("");
    setActiveIndex(0);
    const t = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [isOpen]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (flatResults.length === 0) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % flatResults.length);
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + flatResults.length) % flatResults.length);
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const target = flatResults[activeIndex];
        if (target) goTo(target);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, flatResults, activeIndex, onClose, goTo]);

  if (!isOpen) return null;

  let runningIndex = -1;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 pt-[12vh]">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Global search"
        className="relative z-10 flex max-h-[min(70dvh,560px)] w-full max-w-2xl flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search developments, site risks, milestones, reports…"
            aria-label="Global search"
            className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden rounded border border-border bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground sm:inline">
            esc
          </kbd>
        </div>

        <div className="flex-1 overflow-y-auto p-2">
          {!query.trim() ? (
            <div className="px-2 py-3">
              <p className="text-xs font-medium text-muted-foreground">
                Suggested searches
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {suggestedSearches.map((term) => (
                  <button
                    key={term}
                    type="button"
                    onClick={() => setQuery(term)}
                    className="rounded-lg border border-border bg-surface px-3 py-1.5 text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  >
                    {term}
                  </button>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Search across developments, site risks, construction milestones,
                reports, documents, media, stakeholders, and pages.
              </p>
            </div>
          ) : results.length === 0 ? (
            <p className="px-3 py-8 text-center text-sm text-muted-foreground">
              No results for &ldquo;{query.trim()}&rdquo;. Try a development name,
              risk ID, or location.
            </p>
          ) : (
            [...grouped.entries()].map(([category, items]) => {
              const Icon = categoryMeta[category].icon;
              return (
                <div key={category} className="mb-2 last:mb-0">
                  <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                    {categoryMeta[category].label}
                  </p>
                  <ul className="flex flex-col gap-0.5">
                    {items.map((result) => {
                      runningIndex += 1;
                      const idx = runningIndex;
                      const active = idx === activeIndex;
                      return (
                        <li key={result.id}>
                          <button
                            type="button"
                            onClick={() => goTo(result)}
                            onMouseEnter={() => setActiveIndex(idx)}
                            className={cn(
                              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
                              active
                                ? "bg-primary-soft text-primary"
                                : "text-foreground hover:bg-surface-muted",
                            )}
                          >
                            <span
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                                active
                                  ? "bg-primary/15 text-primary"
                                  : "bg-surface-muted text-muted-foreground",
                              )}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block truncate text-sm font-medium">
                                {result.title}
                              </span>
                              <span
                                className={cn(
                                  "block truncate text-xs",
                                  active
                                    ? "text-primary/80"
                                    : "text-muted-foreground",
                                )}
                              >
                                {result.subtitle}
                              </span>
                            </span>
                            <Badge
                              variant={active ? "primary" : "neutral"}
                              className="hidden shrink-0 sm:inline-flex"
                            >
                              {result.category}
                            </Badge>
                            <ArrowRight
                              className={cn(
                                "h-4 w-4 shrink-0",
                                active ? "opacity-100" : "opacity-0",
                              )}
                            />
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">
            <kbd className="rounded border border-border px-1">↑</kbd>{" "}
            <kbd className="rounded border border-border px-1">↓</kbd> navigate
          </span>
          <span>
            <kbd className="rounded border border-border px-1">↵</kbd> open
          </span>
          <span className="hidden sm:inline">
            Rivers State development portfolio
          </span>
        </div>
      </div>
    </div>
  );
}

export default GlobalSearchModal;
