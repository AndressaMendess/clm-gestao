import { cva } from "class-variance-authority";

export const dashboardPanelStyles =
  "overflow-hidden rounded-3xl bg-[var(--color-background-primary)] shadow-[var(--shadow-card-soft)]";

export const dashboardPanelHeaderStyles = cva(
  "flex items-center justify-between gap-4 px-6 pt-6",
  {
    variants: {
      compact: {
        true: "pb-4",
        false: "pb-6"
      }
    },
    defaultVariants: {
      compact: false
    }
  }
);

export const dashboardPanelTitleStyles =
  "m-0 text-[var(--text-heading-h5-size)] font-semibold leading-[var(--text-heading-5-line-height)] tracking-[var(--text-heading-letter-spacing)] text-[var(--color-content-primary)]";
