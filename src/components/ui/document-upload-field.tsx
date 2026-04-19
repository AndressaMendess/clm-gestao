import { FileText, Trash2, Upload } from "lucide-react";
import type { ChangeEvent } from "react";

import { cn } from "@/src/lib/utils";

type DocumentUploadVariant = "default" | "success" | "error";

type DocumentUploadFieldProps = {
  label: string;
  hint?: string;
  accept?: string;
  selectedFile: File | null;
  persistedFile?: {
    name: string;
    sizeLabel?: string;
  } | null;
  errorMessage?: string;
  onFileChange: (file: File | null) => void;
  onFileRemove?: () => void;
};

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentUploadField({
  label,
  hint = "PDF, PNG, JPG até 10MB",
  accept = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
  selectedFile,
  persistedFile,
  errorMessage,
  onFileChange,
  onFileRemove
}: DocumentUploadFieldProps) {
  const hasAttachedFile = Boolean(selectedFile || persistedFile);
  const variant: DocumentUploadVariant = errorMessage ? "error" : hasAttachedFile ? "success" : "default";
  const attachedFileName = selectedFile?.name ?? persistedFile?.name ?? "";
  const attachedFileSizeLabel = selectedFile ? formatBytes(selectedFile.size) : persistedFile?.sizeLabel ?? "";

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  return (
    <div className="document-upload-field">
      <span className="document-upload-field__label">{label}</span>
      {hasAttachedFile ? (
        <div className={cn("document-upload-field__surface", "document-upload-field__surface--attached", `is-${variant}`)}>
          <span className="document-upload-field__file-icon" aria-hidden="true">
            <FileText />
          </span>
          <strong>{attachedFileName}</strong>
          <span>{attachedFileSizeLabel}</span>
          {onFileRemove ? (
            <button
              className="document-upload-field__remove"
              type="button"
              aria-label="Remover documento"
              onClick={onFileRemove}
            >
              <Trash2 />
            </button>
          ) : null}
        </div>
      ) : (
        <label className={cn("document-upload-field__surface", `is-${variant}`)}>
          <input type="file" accept={accept} onChange={handleFileInputChange} />
          <span className="document-upload-field__icon" aria-hidden="true">
            <Upload />
          </span>
          <strong>Clique ou arraste para enviar</strong>
          <span>{hint}</span>
        </label>
      )}
      {errorMessage ? <small className="document-upload-field__error">{errorMessage}</small> : null}
    </div>
  );
}
