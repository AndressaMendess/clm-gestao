import { cva } from "class-variance-authority";

export const collapsibleCardStyles = cva("collapsible-card");

export const collapsibleCardChevronStyles = cva("collapsible-card__chevron", {
  variants: {
    open: {
      true: "is-open",
      false: ""
    }
  }
});

export const collapsibleCardContentStyles = cva("collapsible-card__content", {
  variants: {
    collapsed: {
      true: "is-collapsed",
      false: ""
    }
  }
});

