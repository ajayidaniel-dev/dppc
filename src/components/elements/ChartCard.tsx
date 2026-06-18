import type { ReactElement, ReactNode } from "react";
import { ResponsiveContainer } from "recharts";
import Card from "./Card";

interface ChartCardProps {
  title?: string;
  action?: ReactNode;
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
    <Card title={title} action={action} className={className}>
      <ResponsiveContainer width="100%" height={height}>
        {children}
      </ResponsiveContainer>
    </Card>
  );
}

export default ChartCard;
