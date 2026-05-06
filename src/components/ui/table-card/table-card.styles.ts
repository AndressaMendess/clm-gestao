import { cn } from "@/src/lib/utils";

export const tableCardShellStyles =
  "overflow-hidden rounded-[12px] border border-[var(--color-surface-border)] bg-[var(--color-surface-card)] shadow-[var(--color-page-shadow)]";

export const tableCardHeaderStyles = "px-6 py-3";

export const tableCardTitleStyles = "flex items-center gap-2";

export const tableCardHeadingStyles =
  "m-0 text-[var(--text-body-x-large-size)] font-semibold leading-[var(--text-body-line-height)] text-[var(--color-content-primary)]";

export const tableCardCountBadgeStyles =
  "inline-flex min-h-[22px] items-center justify-center rounded-full bg-[var(--color-count-badge-bg)] px-2 py-0.5 text-xs font-medium leading-[18px] text-[var(--color-count-badge-text)]";

export function tableCardClassName(className?: string) {
  return cn(tableCardShellStyles, className);
}
