import { cva } from "class-variance-authority";

export const tabsListStyles = cva("tabs-list", {
  variants: {
    variant: {
      default: "tabs-list--default",
      drawer: "tabs-list--drawer",
      pill: "tabs-list--pill"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const tabsTriggerStyles = cva("tabs-trigger", {
  variants: {
    variant: {
      default: "tabs-trigger--default",
      drawer: "tabs-trigger--drawer",
      pill: "tabs-trigger--pill"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

export const tabsContentStyles = "tabs-content";
