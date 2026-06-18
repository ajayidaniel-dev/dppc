import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../utils/helpers";

interface PaginationProps {
  currentPage: number;
  totalPage: number;
  setCurrentPage: (page: number) => void;
  count?: number;
  limit?: number;
}

function Pagination({
  currentPage,
  totalPage,
  setCurrentPage,
  count,
  limit = 10,
}: PaginationProps) {
  if (totalPage <= 1 && !count) return null;

  const from = count ? (currentPage - 1) * limit + 1 : 0;
  const to = count ? Math.min(currentPage * limit, count) : 0;

  const canPrev = currentPage > 1;
  const canNext = currentPage < totalPage;

  return (
    <div className="flex flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row">
      {count !== undefined && (
        <p className="text-sm text-muted-foreground">
          Showing <span className="font-medium text-foreground">{from}</span> to{" "}
          <span className="font-medium text-foreground">{to}</span> of{" "}
          <span className="font-medium text-foreground">{count}</span> entries
        </p>
      )}
      <div className="flex items-center gap-1">
        <button
          onClick={() => canPrev && setCurrentPage(currentPage - 1)}
          disabled={!canPrev}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <span
          className={cn(
            "inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-sm font-medium",
            "bg-primary text-primary-foreground"
          )}
        >
          {currentPage}
        </span>
        <span className="px-1 text-sm text-muted-foreground">
          of {totalPage || 1}
        </span>
        <button
          onClick={() => canNext && setCurrentPage(currentPage + 1)}
          disabled={!canNext}
          className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
