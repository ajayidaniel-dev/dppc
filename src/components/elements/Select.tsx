import ReactSelect, { type GroupBase, type Props } from "react-select";
import { cn } from "../../utils/helpers";

const menuPortalTarget =
  typeof document !== "undefined" ? document.body : undefined;

/**
 * react-select wrapped in `unstyled` mode so its parts read the app's
 * semantic Tailwind tokens and flip correctly between light and dark.
 *
 * Menus portal to `document.body` with fixed positioning so dropdowns work
 * inside scrollable modals and other overflow-hidden containers.
 */
function Select<
  Option = unknown,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({ styles, classNames, ...rest }: Props<Option, IsMulti, Group>) {
  return (
    <ReactSelect
      unstyled
      menuPlacement="auto"
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
        menuPortal: () => "z-[9999]",
        menu: () =>
          "mt-1 overflow-hidden rounded-lg border border-border bg-surface shadow-lg",
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
        ...classNames,
      }}
      styles={{
        ...styles,
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
      }}
      {...rest}
      menuPortalTarget={rest.menuPortalTarget ?? menuPortalTarget}
      menuPosition={rest.menuPosition ?? "fixed"}
    />
  );
}

export default Select;
