import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/helpers";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  action?: ReactNode;
}

function Card({ title, action, className, children, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-surface p-5 shadow-sm",
        className
      )}
      {...rest}
    >
      {(title || action) && (
        <div className="mb-4 flex items-center justify-between">
          {title && (
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
          )}
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
