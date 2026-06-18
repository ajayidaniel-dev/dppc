import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/helpers";

interface FormTextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, error, className, id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "min-h-20 rounded-lg border border-input bg-surface px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/30",
            error && "border-danger focus:border-danger focus:ring-danger/30",
            className,
          )}
          {...rest}
        />
        {error && <span className="text-xs text-danger">{error}</span>}
      </div>
    );
  },
);

FormTextarea.displayName = "FormTextarea";

export default FormTextarea;
