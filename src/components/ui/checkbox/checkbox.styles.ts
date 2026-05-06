import { cva } from "class-variance-authority";

export const checkboxStyles = cva(
  "peer h-4 w-4 shrink-0 rounded-[4px] border border-[var(--color-border-secondary)] !bg-white shadow-xs outline-none transition-colors transition-shadow hover:border-[var(--color-border-tertiary)] focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "data-[state=checked]:!border-primary data-[state=checked]:!bg-primary data-[state=checked]:!text-primary-foreground",
        success:
          "data-[state=checked]:!border-[var(--color-feedback-success-content)] data-[state=checked]:!bg-[var(--color-feedback-success-content)] data-[state=checked]:!text-[var(--color-content-always-light)]",
        attendance:
          "h-7 w-7 rounded-[10px] border-[var(--color-border-tertiary)] data-[state=checked]:!border-[var(--color-feedback-success-content)] data-[state=checked]:!bg-[var(--color-feedback-success-content)] data-[state=checked]:!text-[var(--color-content-always-light)]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export const checkboxIndicatorStyles = "flex items-center justify-center text-current";
export const checkboxIconStyles = "size-3.5";
