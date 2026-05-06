import { cva } from "class-variance-authority";

export const frequencyStatusBadgeStyles = cva("frequency-status-badge", {
  variants: {
    tone: {
      success: "frequency-status-badge--success",
      error: "frequency-status-badge--error",
      warning: "frequency-status-badge--warning"
    }
  }
});
