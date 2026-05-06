import { cva } from "class-variance-authority";

export const dashboardActionCardStyles = cva(
  "flex min-h-[222px] flex-col justify-between gap-6 rounded-3xl border-0 p-6 text-left transition-[background-color,box-shadow,transform] duration-150 ease-out hover:-translate-y-px focus-visible:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)] focus-visible:ring-offset-2",
  {
    variants: {
      tone: {
        primary:
          "bg-[linear-gradient(148deg,var(--color-brand-primary-main)_34%,var(--color-brand-primary-gradient-end)_100%)] text-[var(--color-content-always-light)] shadow-[0_10px_15px_0_var(--primitive-orange-200),0_4px_6px_0_var(--primitive-orange-200)] hover:shadow-[var(--shadow-brand-primary-hover)] focus-visible:shadow-[var(--shadow-brand-primary-hover)]",
        purple:
          "bg-[var(--color-accent-purple-background)] text-[var(--color-content-primary)] shadow-[var(--shadow-card-soft)]",
        green:
          "bg-[var(--color-accent-green-background)] text-[var(--color-content-primary)] shadow-[var(--shadow-card-soft)]"
      }
    },
    defaultVariants: {
      tone: "primary"
    }
  }
);

export const dashboardActionCardTopStyles = "flex items-start justify-between gap-4";

export const dashboardActionCardIconStyles = cva(
  "inline-flex h-12 w-12 items-center justify-center rounded-[10px] [&>svg]:h-[18px] [&>svg]:w-[18px] [&>svg]:shrink-0",
  {
    variants: {
      tone: {
        primary:
          "bg-[color-mix(in_srgb,var(--color-content-always-light)_20%,transparent)] text-[var(--color-content-always-light)]",
        purple: "bg-[var(--primitive-purple-200)] text-[var(--color-accent-purple-content)]",
        green: "bg-[var(--primitive-green-200)] text-[var(--color-accent-green-content)]"
      }
    },
    defaultVariants: {
      tone: "primary"
    }
  }
);

export const dashboardActionCardArrowStyles = cva("h-[18px] w-[18px] shrink-0", {
  variants: {
    tone: {
      primary: "text-[var(--color-content-always-light)]",
      purple: "text-[var(--color-content-primary)]",
      green: "text-[var(--color-content-primary)]"
    }
  },
  defaultVariants: {
    tone: "primary"
  }
});

export const dashboardActionCardCopyStyles = "flex flex-col gap-1";

export const dashboardActionCardTitleStyles = cva(
  "text-[var(--text-heading-h6-size)] font-semibold leading-[var(--text-heading-6-line-height)] tracking-[var(--text-heading-6-letter-spacing)]",
  {
    variants: {
      tone: {
        primary: "text-[var(--color-content-always-light)]",
        purple: "text-[var(--color-content-primary)]",
        green: "text-[var(--color-content-primary)]"
      }
    },
    defaultVariants: {
      tone: "primary"
    }
  }
);

export const dashboardActionCardDescriptionStyles = cva(
  "m-0 text-[var(--text-body-medium-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)]",
  {
    variants: {
      tone: {
        primary: "text-[var(--color-content-always-light)]",
        purple: "text-[var(--color-content-secondary)]",
        green: "text-[var(--color-content-secondary)]"
      }
    },
    defaultVariants: {
      tone: "primary"
    }
  }
);
