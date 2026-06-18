import Badge, { type BadgeVariant } from "./Badge";
import type { Status } from "../../utils/types";

interface StatusBadgeProps {
  status: Status;
  label?: string;
  className?: string;
}

const statusToVariant: Record<Status, BadgeVariant> = {
  green: "success",
  amber: "warning",
  red: "danger",
};

const defaultLabels: Record<Status, string> = {
  green: "On Track",
  amber: "Attention",
  red: "Critical",
};

function StatusBadge({ status, label, className }: StatusBadgeProps) {
  return (
    <Badge variant={statusToVariant[status]} dot className={className}>
      {label ?? defaultLabels[status]}
    </Badge>
  );
}

export default StatusBadge;
