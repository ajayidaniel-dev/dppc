import type { ReactNode } from "react";
import { useAuth } from "../../utils/useAuth";

interface PermissionGateProps {
  /** Render children only if the user has ALL of these permissions. */
  permissions?: string[];
  /** Render children if the user has ANY of these permissions. */
  anyOf?: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

function PermissionGate({
  permissions,
  anyOf,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { hasPermission, hasAnyPermission } = useAuth();

  const allOk = permissions ? permissions.every((p) => hasPermission(p)) : true;
  const anyOk = anyOf ? hasAnyPermission(anyOf) : true;

  return allOk && anyOk ? <>{children}</> : <>{fallback}</>;
}

export default PermissionGate;
