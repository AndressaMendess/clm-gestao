import { cva } from "class-variance-authority";

export const inputFieldStyles =
  "input-field w-full min-h-[46px] rounded-[10px] border border-[var(--color-border-primary)] bg-[var(--color-surface-card)] px-3 py-2 text-sm leading-5 text-[var(--color-brand-secondary-main)] shadow-[var(--color-button-shadow)] outline-none placeholder:text-[var(--color-content-tertiary)] disabled:cursor-not-allowed disabled:opacity-50";

export const inputFieldWrapperStyles = "input-field-wrapper flex flex-col gap-1.5";

export const inputFieldLabelStyles =
  "input-field-wrapper__label text-[var(--text-body-small)] font-medium leading-[1.33] text-[#344054]";

export const inputFieldHelperStyles = cva(
  "input-field-wrapper__helper text-[var(--text-body-small)] leading-[1.33]",
  {
    variants: {
      tone: {
        default: "is-default text-[#667085]",
        error: "is-error text-[var(--color-feedback-error-content)]",
        success: "is-success text-[var(--color-feedback-success-content)]"
      }
    },
    defaultVariants: {
      tone: "default"
    }
  }
);
