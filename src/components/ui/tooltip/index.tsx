import { cn } from "@/src/lib/utils";

type TooltipProps = {
  label: string;
  visible: boolean;
  className?: string;
};

export function Tooltip({ label, visible, className }: TooltipProps) {
  return (
    <span
      className={cn(
        "pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-[5] -translate-y-1/2 rounded-xl bg-[var(--color-brand-secondary-main)] px-3 py-2 text-[var(--text-body-small-size)] font-medium leading-[1.2] tracking-[var(--text-body-letter-spacing)] whitespace-nowrap text-[var(--color-content-always-light)] opacity-0 shadow-[0_10px_30px_color-mix(in_srgb,var(--color-content-always-dark)_18%,transparent)] transition-[opacity,transform] duration-150 after:absolute after:left-[-4px] after:top-1/2 after:h-2.5 after:w-2.5 after:-translate-y-1/2 after:rotate-45 after:bg-[var(--color-brand-secondary-main)] max-[960px]:hidden group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100",
        !visible && "hidden",
        className
      )}
      role="tooltip"
    >
      {label}
    </span>
  );
}
