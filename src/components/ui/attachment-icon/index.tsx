import { CalendarDays, Download, Eye, FileText, Plus, Trash2, Upload } from "lucide-react";

import { cn } from "@/src/lib/utils";
import { attachmentIconStyles } from "./attachment-icon.styles";
import type { AttachmentIconProps } from "./attachment-icon.types";

export type { AttachmentIconName, AttachmentIconProps } from "./attachment-icon.types";

export function AttachmentIcon({ name, className }: AttachmentIconProps) {
  const iconClassName = cn(attachmentIconStyles(), className);

  switch (name) {
    case "file":
      return <FileText className={iconClassName} aria-hidden="true" />;
    case "calendar":
      return <CalendarDays className={iconClassName} aria-hidden="true" />;
    case "upload":
      return <Upload className={iconClassName} aria-hidden="true" />;
    case "plus":
      return <Plus className={iconClassName} aria-hidden="true" />;
    case "view":
      return <Eye className={iconClassName} aria-hidden="true" />;
    case "download":
      return <Download className={iconClassName} aria-hidden="true" />;
    case "trash":
      return <Trash2 className={iconClassName} aria-hidden="true" />;
    default:
      return null;
  }
}

