export type DocumentUploadVariant = "default" | "success" | "error";

export type DocumentUploadFieldProps = {
  label?: string;
  showLabel?: boolean;
  className?: string;
  hint?: string;
  uploadTitle?: string;
  attachedHint?: string;
  accept?: string;
  selectedFile: File | null;
  persistedFile?: {
    name: string;
    sizeLabel?: string;
  } | null;
  showImagePreview?: boolean;
  statusLabel?: string;
  errorMessage?: string;
  onFileChange: (file: File | null) => void;
  onFileRemove?: () => void;
};
