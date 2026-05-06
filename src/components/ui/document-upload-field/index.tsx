import { FileText, Trash2, Upload } from "lucide-react";
import { useEffect, useState } from "react";
import type { ChangeEvent } from "react";

import { cn } from "@/src/lib/utils";
import {
  documentUploadFieldAttachedSuccessStyles,
  documentUploadFieldErrorStyles,
  documentUploadFieldFileIconStyles,
  documentUploadFieldFooterStyles,
  documentUploadFieldHiddenInputStyles,
  documentUploadFieldHintStyles,
  documentUploadFieldImagePreviewStyles,
  documentUploadFieldLabelStyles,
  documentUploadFieldMetaStyles,
  documentUploadFieldRemoveStyles,
  documentUploadFieldRemoveInFooterStyles,
  documentUploadFieldRootStyles,
  documentUploadFieldStatusStyles,
  documentUploadFieldSurfaceStyles,
  documentUploadFieldTitleStyles,
  documentUploadFieldUploadIconStyles
} from "./document-upload-field.styles";
import type { DocumentUploadFieldProps, DocumentUploadVariant } from "./document-upload-field.types";
export type { DocumentUploadFieldProps, DocumentUploadVariant } from "./document-upload-field.types";

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
    <div className={cn(documentUploadFieldRootStyles, className)}>
      {showLabel ? <span className={documentUploadFieldLabelStyles}>{label}</span> : null}
      {hasAttachedFile ? (
        <div className={cn(documentUploadFieldSurfaceStyles({ attached: true, variant }), variant === "success" && documentUploadFieldAttachedSuccessStyles)}>
          {shouldShowImagePreview ? (
            <img className={documentUploadFieldImagePreviewStyles} src={previewUrl ?? undefined} alt={attachedFileName} />
          ) : (
            <span className={documentUploadFieldFileIconStyles} aria-hidden="true">
              <FileText />
            </span>
          )}

          <div className={documentUploadFieldMetaStyles}>
            <strong>{attachedFileName}</strong>
            {attachedSecondaryText ? <span>{attachedSecondaryText}</span> : null}
          </div>

          {statusLabel || onFileRemove ? (
            <div className={documentUploadFieldFooterStyles}>
              {statusLabel ? <span className={documentUploadFieldStatusStyles}>{statusLabel}</span> : null}
              {onFileRemove ? (
                <button className={cn(documentUploadFieldRemoveStyles, documentUploadFieldRemoveInFooterStyles)} type="button" aria-label="Remover documento" onClick={onFileRemove}>
                  <Trash2 />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : (
        <label className={documentUploadFieldSurfaceStyles({ variant })}>
          <input className={documentUploadFieldHiddenInputStyles} type="file" accept={accept} onChange={handleFileInputChange} />
          <span className={documentUploadFieldUploadIconStyles} aria-hidden="true">
            <Upload />
          </span>
          <strong className={documentUploadFieldTitleStyles}>{uploadTitle}</strong>
          <span className={documentUploadFieldHintStyles}>{hint}</span>
        </label>
      )}
      {errorMessage ? <small className={documentUploadFieldErrorStyles}>{errorMessage}</small> : null}
    </div>
  );
}
