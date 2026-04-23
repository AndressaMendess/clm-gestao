import type { LucideIcon } from "lucide-react";
import { cn } from "@/src/lib/utils";

type DashboardNavItemProps = {
  icon: LucideIcon;
  label: string;
  isCollapsed?: boolean;
  isActive?: boolean;
  onClick?: () => void;
};

export function DashboardNavItem({
  icon: Icon,
  label,
  isCollapsed = false,
  isActive = false,
  onClick
}: DashboardNavItemProps) {
  return (
    <button
      className={cn(
        "group relative flex w-full items-center gap-3 rounded-[56px] px-4 py-3.5 text-left transition-[background-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)] focus-visible:ring-offset-2",
        isCollapsed ? "justify-center max-[960px]:justify-start" : "justify-start",
        isActive
          ? "bg-[var(--color-brand-primary-main)] text-[var(--color-content-always-light)] shadow-[inset_0_4px_12px_0_var(--primitive-orange-400),0_10px_15px_0_var(--primitive-orange-200)] hover:bg-[var(--color-button-primary-background-hover)]"
          : "text-[var(--color-content-tertiary)] hover:bg-[color-mix(in_srgb,var(--color-background-primary)_86%,transparent)] hover:translate-x-px"
      )}
      type="button"
      aria-label={isCollapsed ? label : undefined}
      onClick={onClick}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span
        className={cn(
          "text-[var(--text-body-large-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)]",
          isCollapsed ? "hidden max-[960px]:inline" : "inline"
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[5] -translate-y-1/2 rounded-xl bg-[var(--color-brand-secondary-main)] px-3 py-2 text-[var(--text-body-small-size)] font-medium leading-[1.2] tracking-[var(--text-body-letter-spacing)] whitespace-nowrap text-[var(--color-content-always-light)] opacity-0 shadow-[0_10px_30px_color-mix(in_srgb,var(--color-content-always-dark)_18%,transparent)] transition-[opacity,transform] duration-150 after:absolute after:left-[-4px] after:top-1/2 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:rotate-45 after:bg-[var(--color-brand-secondary-main)]",
          isCollapsed
            ? "max-[960px]:hidden group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100"
            : "hidden"
        )}
        role="tooltip"
      >
        {label}
      </span>
    </button>
  );
}
