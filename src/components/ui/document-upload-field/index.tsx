import { FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { cn } from "@/src/lib/utils";

type DocumentUploadVariant = "default" | "success" | "error";

type DocumentUploadFieldProps = {
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

function formatBytes(bytes: number) {
  if (bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(bytes / 1024))} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function DocumentUploadField({
  label = "",
  showLabel = true,
  className,
  hint = "PDF, PNG, JPG ate 10MB",
  uploadTitle = "Clique ou arraste para enviar",
  attachedHint,
  accept = ".pdf,.png,.jpg,.jpeg,application/pdf,image/png,image/jpeg",
  selectedFile,
  persistedFile,
  showImagePreview = false,
  statusLabel,
  errorMessage,
  onFileChange,
  onFileRemove
}: DocumentUploadFieldProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const hasAttachedFile = Boolean(selectedFile || persistedFile);
  const variant: DocumentUploadVariant = errorMessage ? "error" : hasAttachedFile ? "success" : "default";
  const attachedFileName = selectedFile?.name ?? persistedFile?.name ?? "";
  const attachedFileSizeLabel = selectedFile ? formatBytes(selectedFile.size) : persistedFile?.sizeLabel ?? "";
  const attachedSecondaryText = attachedHint ?? attachedFileSizeLabel;
  const shouldShowImagePreview = Boolean(showImagePreview && selectedFile?.type.startsWith("image/") && previewUrl);

  useEffect(() => {
    if (!selectedFile || !showImagePreview || !selectedFile.type.startsWith("image/")) {
      setPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [selectedFile, showImagePreview]);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onFileChange(event.target.files?.[0] ?? null);
    event.target.value = "";
  };

  return (
    <div className={cn("document-upload-field", className)}>
      {showLabel ? <span className="document-upload-field__label">{label}</span> : null}
      {hasAttachedFile ? (
        <div className={cn("document-upload-field__surface", "document-upload-field__surface--attached", `is-${variant}`)}>
          {shouldShowImagePreview ? (
            <img className="document-upload-field__image-preview" src={previewUrl ?? undefined} alt={attachedFileName} />
          ) : (
            <span className="document-upload-field__file-icon" aria-hidden="true">
              <FileText />
            </span>
          )}

          <div className="document-upload-field__meta">
            <strong>{attachedFileName}</strong>
            {attachedSecondaryText ? <span>{attachedSecondaryText}</span> : null}
          </div>

          {statusLabel || onFileRemove ? (
            <div className="document-upload-field__footer">
              {statusLabel ? <span className="document-upload-field__status">{statusLabel}</span> : null}
              {onFileRemove ? (
                <button className="document-upload-field__remove" type="button" aria-label="Remover documento" onClick={onFileRemove}>
                  <Trash2 />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <label className={cn("document-upload-field__surface", `is-${variant}`)}>
          <input type="file" accept={accept} onChange={handleFileInputChange} />
          <span className="document-upload-field__icon" aria-hidden="true">
            <Upload />
          </span>
          <strong>{uploadTitle}</strong>
          <span>{hint}</span>
        </label>
      )}
      {errorMessage ? <small className="document-upload-field__error">{errorMessage}</small> : null}
    </div>
  );
}
