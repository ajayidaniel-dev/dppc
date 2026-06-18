import ReactSelect, { type GroupBase, type Props } from "react-select";
import { cn } from "../../utils/helpers";

/**
 * react-select wrapped in `unstyled` mode so its parts read the app's
 * semantic Tailwind tokens and flip correctly between light and dark.
 */
function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(props: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      unstyled
      classNamePrefix="app-select"
      classNames={{
        control: (state) =>
          cn(
            "min-h-10 rounded-lg border bg-surface px-2 text-sm text-foreground transition-colors",
            state.isFocused
              ? "border-primary ring-2 ring-ring/30"
              : "border-input"
          ),
        valueContainer: () => "gap-1 px-1",
        placeholder: () => "text-muted-foreground",
        singleValue: () => "text-foreground",
        input: () => "text-foreground",
        multiValue: () => "rounded bg-primary-soft px-1.5",
        multiValueLabel: () => "text-xs text-primary",
        multiValueRemove: () => "ml-1 rounded text-primary hover:bg-primary/20",
        indicatorSeparator: () => "bg-border",
        dropdownIndicator: () =>
          "px-1 text-muted-foreground hover:text-foreground",
        clearIndicator: () =>
          "px-1 text-muted-foreground hover:text-foreground",
        menu: () =>
          "z-50 mt-1 overflow-hidden rounded-lg border border-border bg-surface shadow-lg",
        menuList: () => "py-1",
        option: (state) =>
          cn(
            "cursor-pointer px-3 py-2 text-sm",
            state.isSelected
              ? "bg-primary text-primary-foreground"
              : state.isFocused
                ? "bg-surface-muted text-foreground"
                : "text-foreground"
          ),
        noOptionsMessage: () => "px-3 py-2 text-sm text-muted-foreground",
      }}
      {...props}
    />
  );
}

export default Select;
