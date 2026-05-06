import { cva } from "class-variance-authority";

export const attachmentIconStyles = cva("attachment-symbol", {
  variants: {
    size: {
      section: "attachment-symbol--section",
      fileItem: "attachment-symbol--file-item",
      action: "attachment-symbol--action",
      iconButton: "attachment-symbol--icon-button",
      emptyState: "attachment-symbol--empty-state"
    }
  }
});

