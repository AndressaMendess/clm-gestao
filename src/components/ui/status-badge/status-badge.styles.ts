import { cva } from "class-variance-authority";

export const statusBadgeStyles = cva("status-badge", {
  variants: {
    tone: {
      success: "status-badge--success",
      warning: "status-badge--warning",
      error: "status-badge--error"
    }
  },
  defaultVariants: {
    tone: "success"
  }
});
