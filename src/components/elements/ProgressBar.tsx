import { cn } from "../../utils/helpers";

interface ProgressBarProps {
  value: number;
  showLabel?: boolean;
  className?: string;
}

function ProgressBar({ value, showLabel, className }: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <span className="shrink-0 text-xs text-muted-foreground">
          {clamped}%
        </span>
      )}
    </div>
  );
}

export default ProgressBar;
