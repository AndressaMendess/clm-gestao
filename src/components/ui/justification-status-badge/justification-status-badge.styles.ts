import { cva } from "class-variance-authority";

export const justificationStatusBadgeStyles = cva("justification-status-badge", {
  variants: {
    tone: {
      warning: "justification-status-badge--warning",
      success: "justification-status-badge--success",
      error: "justification-status-badge--error"
    }
  }
});

