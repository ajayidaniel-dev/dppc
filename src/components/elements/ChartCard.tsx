import type { ReactElement, ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import { cn } from "../../utils/helpers";
import Card from "./Card";

interface ChartCardProps {
  title?: string;
  action?: ReactNode;
  /** Minimum chart height in px; grows to fill the card when the grid row is taller. */
  height?: number;
  className?: string;
  children: ReactElement;
}

function ChartCard({
  title,
  action,
  height = 280,
  className,
  children,
}: ChartCardProps) {
  return (
    <Card
      title={title}
      action={action}
      className={cn("flex h-full flex-col", className)}
    >
      <div className="min-h-0 flex-1" style={{ minHeight: height }}>
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

export default ChartCard;
