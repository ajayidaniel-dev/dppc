import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, TrendingDown, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "../../utils/helpers";

type Tone = "primary" | "success" | "warning" | "danger" | "info";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  tone?: Tone;
  trend?: { value: string; positive?: boolean };
  hint?: string;
  to?: string;
  className?: string;
}

const toneClasses: Record<Tone, string> = {
  primary: "bg-primary-soft text-primary",
  success: "bg-success/15 text-success",
  warning: "bg-warning/15 text-warning",
  danger: "bg-danger/15 text-danger",
  info: "bg-info/15 text-info",
};

function StatCard({
  label,
  value,
  icon: Icon,
  tone = "primary",
  trend,
  hint,
  to,
  className,
}: StatCardProps) {
  const TrendIcon = trend?.positive ? TrendingUp : TrendingDown;

  const body = (
    <>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 text-2xl font-semibold text-foreground">{value}</p>
        </div>
        {Icon && (
          <span className={cn("rounded-lg p-2", toneClasses[tone])}>
            <Icon className="h-5 w-5" />
          </span>
        )}
      </div>

      {(trend || hint || to) && (
        <div className="mt-3 flex items-center justify-between gap-2">
          {trend ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-xs font-medium",
                trend.positive ? "text-success" : "text-danger",
              )}
            >
              <TrendIcon className="h-3.5 w-3.5" />
              {trend.value}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">{hint}</span>
          )}
          {to && (
            <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-opacity group-hover:text-primary motion-safe:opacity-0 motion-safe:group-hover:opacity-100" />
          )}
        </div>
      )}
    </>
  );

  const base = "rounded-xl border border-border bg-surface p-5 shadow-sm";

  if (to) {
    return (
      <Link
        to={to}
        className={cn(
          "group block transition-shadow hover:border-primary/40 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40",
          base,
          className,
        )}
      >
        {body}
      </Link>
    );
  }

  return <div className={cn(base, className)}>{body}</div>;
}

export default StatCard;
