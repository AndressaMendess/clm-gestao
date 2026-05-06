import { cva } from "class-variance-authority";

export const buttonStyles = cva(
  "button inline-flex items-center justify-center gap-2 rounded-2xl border border-transparent text-sm font-medium leading-5 tracking-[-0.28px] transition-[background-color,color,box-shadow,transform,filter] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-button-primary-background-enabled,#f1672c)_50%,white)] focus-visible:ring-offset-2 disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        primary:
          "button--primary bg-[var(--color-button-primary-background-enabled,#f1672c)] text-[var(--color-button-primary-content-enabled,#fafafa)] shadow-[inset_0_4px_12px_0_var(--primitive-orange-400,#ff8a5f)] hover:brightness-[0.98] disabled:bg-[var(--color-button-primary-background-disabled,#c2c5c8)] disabled:text-[var(--color-button-primary-content-disabled,#44484d)] disabled:shadow-none",
        secondary:
          "button--secondary border-transparent bg-[var(--color-surface-card,#fafafa)] text-[var(--color-content-primary,#18181b)] shadow-[var(--shadow-card-soft,0_4px_20px_rgba(0,0,0,0.04))] hover:brightness-[0.98]",
        ghost: "button--ghost bg-transparent text-[var(--color-brand-primary-main,#f1672c)] shadow-none hover:brightness-[0.98]",
        danger: "button--danger bg-[var(--feedback-error-background,#fdecec)] text-[var(--feedback-error-content,#d93b31)] shadow-none hover:brightness-[0.98]",
        icon: "button--icon bg-transparent text-[#667085] shadow-none hover:brightness-[0.98]"
      },
      size: {
        sm: "button--sm min-h-10 px-4 py-2.5",
        md: "button--md min-h-[52px] px-6 py-3.5",
        icon: "button--icon-only h-10 w-10 min-w-10 rounded-[10px] p-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

export const iconButtonStyles = "icon-button inline-flex items-center justify-center h-10 w-10 rounded-[10px] text-[#667085]";
