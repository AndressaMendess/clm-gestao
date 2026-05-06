import { cva } from "class-variance-authority";

export const dashboardNavItemStyles = cva(
  "group relative flex w-full items-center gap-3 rounded-[56px] px-4 py-3.5 text-left transition-[background-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)] focus-visible:ring-offset-2",
  {
    variants: {
      collapsed: {
        true: "justify-center max-[960px]:justify-start",
        false: "justify-start"
      },
      active: {
        true: "bg-[var(--color-brand-primary-main)] text-[var(--color-content-always-light)] shadow-[inset_0_4px_12px_0_var(--primitive-orange-400),0_10px_15px_0_var(--primitive-orange-200)] hover:bg-[var(--color-button-primary-background-hover)]",
        false:
          "text-[var(--color-content-tertiary)] hover:bg-[color-mix(in_srgb,var(--color-background-primary)_86%,transparent)] hover:translate-x-px"
      }
    },
    defaultVariants: {
      collapsed: false,
      active: false
    }
  }
);

export const dashboardNavItemLabelStyles = cva(
  "text-[var(--text-body-large-size)] leading-[var(--text-body-line-height)] tracking-[var(--text-body-letter-spacing)]",
  {
    variants: {
      collapsed: {
        true: "hidden max-[960px]:inline",
        false: "inline"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  }
);
