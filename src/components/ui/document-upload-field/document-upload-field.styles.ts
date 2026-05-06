import { cva } from "class-variance-authority";

export const documentUploadFieldRootStyles = "document-upload-field flex flex-col gap-1.5";
export const documentUploadFieldLabelStyles =
  "document-upload-field__label text-sm font-medium leading-[1.43] text-[var(--color-content-primary)]";
export const documentUploadFieldMetaStyles = "document-upload-field__meta flex flex-col gap-0.5";
export const documentUploadFieldFooterStyles =
  "document-upload-field__footer mt-0.5 flex w-full items-center justify-between";
export const documentUploadFieldStatusStyles =
  "document-upload-field__status inline-flex items-center justify-center text-[var(--text-body-small)] font-medium leading-[1.33]";
export const documentUploadFieldRemoveStyles =
  "document-upload-field__remove absolute right-4 top-4 inline-flex h-5 w-5 items-center justify-center rounded-md text-[#079455] [&>svg]:h-4 [&>svg]:w-4";
export const documentUploadFieldRemoveInFooterStyles = "static";
export const documentUploadFieldErrorStyles =
  "document-upload-field__error text-[var(--text-body-small)] leading-[1.33] text-[var(--color-feedback-error-content)]";
export const documentUploadFieldImagePreviewStyles =
  "document-upload-field__image-preview max-h-[340px] w-full rounded-xl object-cover";
export const documentUploadFieldUploadIconStyles =
  "document-upload-field__icon inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f2f4f7] text-[#667085]";
export const documentUploadFieldFileIconStyles =
  "document-upload-field__file-icon inline-flex h-10 w-10 items-center justify-center text-[#079455] [&>svg]:h-6 [&>svg]:w-6";
export const documentUploadFieldHiddenInputStyles = "absolute h-px w-px opacity-0 pointer-events-none";
export const documentUploadFieldTitleStyles =
  "text-[var(--text-body-medium)] font-medium leading-[1.43] text-[var(--color-content-primary)]";
export const documentUploadFieldHintStyles = "text-[var(--text-body-small)] leading-[1.33] text-[#667085]";

export const documentUploadFieldSurfaceStyles = cva(
  "document-upload-field__surface relative flex min-h-[136px] cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d0d5dd] bg-[#fcfcfd] p-5 text-center",
  {
    variants: {
      variant: {
        default: "is-default",
        success: "is-success",
        error: "is-error border-[var(--color-feedback-error-border)] bg-[var(--color-feedback-error-background)]"
      },
      attached: {
        true: "document-upload-field__surface--attached min-h-36 border-solid",
        false: ""
      }
    },
    defaultVariants: {
      variant: "default",
      attached: false
    }
  }
);

export const documentUploadFieldAttachedSuccessStyles = "border-[#079455] bg-[#ecfdf3] text-[#067647] cursor-default";
