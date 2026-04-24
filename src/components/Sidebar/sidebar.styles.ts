import { cva } from "class-variance-authority";

export const sidebarOverlayStyles = cva(
  "fixed inset-0 z-[35] bg-[color-mix(in_srgb,var(--color-content-always-dark)_48%,transparent)] transition-opacity duration-200",
  {
    variants: {
      open: {
        true: "pointer-events-auto opacity-100",
        false: "pointer-events-none opacity-0"
      }
    },
    defaultVariants: {
      open: false
    }
  }
);

export const sidebarShellStyles = cva(
  "relative z-40 flex min-h-screen shrink-0 flex-col bg-[var(--color-background-secondary)] p-2 transition-[width,transform] duration-200 max-[960px]:fixed max-[960px]:left-0 max-[960px]:top-0 max-[960px]:h-screen max-[960px]:w-[min(320px,calc(100vw-32px))] max-[960px]:border-r max-[960px]:border-[var(--color-surface-border-soft)] max-[960px]:shadow-[24px_0_48px_color-mix(in_srgb,var(--color-content-always-dark)_12%,transparent)]",
  {
    variants: {
      collapsed: {
        true: "w-24 max-[960px]:w-[min(320px,calc(100vw-32px))]",
        false: "w-64 max-[960px]:w-[min(320px,calc(100vw-32px))]"
      },
      open: {
        true: "max-[960px]:translate-x-0",
        false: "max-[960px]:-translate-x-full"
      }
    },
    defaultVariants: {
      collapsed: false,
      open: false
    }
  }
);

export const sidebarBrandStyles = cva(
  "flex items-center px-4 py-6 max-[960px]:px-4 max-[960px]:py-5",
  {
    variants: {
      collapsed: {
        true: "flex-col-reverse justify-start gap-4 px-3 max-[960px]:flex-row max-[960px]:justify-between max-[960px]:gap-3 max-[960px]:px-4",
        false: "justify-between"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  }
);

export const sidebarBrandRowStyles = cva("relative flex w-full items-center justify-between gap-3", {
  variants: {
    collapsed: {
      true: "static w-auto justify-center max-[960px]:w-full max-[960px]:justify-between",
      false: "w-full"
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarToggleStyles = cva(
  "inline-flex h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--color-surface-border-soft)] bg-[var(--color-background-secondary)] text-[var(--color-brand-secondary-main)] shadow-[var(--color-page-shadow)] max-[960px]:hidden",
  {
    variants: {
      collapsed: {
        true: "",
        false: ""
      }
    },
    defaultVariants: {
      collapsed: false
    }
  }
);

export const sidebarCloseStyles =
  "hidden h-11 w-11 items-center justify-center rounded-[14px] border border-[var(--color-surface-border-soft)] bg-[var(--color-surface-card)] text-[var(--color-brand-secondary-main)] shadow-[var(--color-page-shadow)] max-[960px]:inline-flex";

export const sidebarContentStyles = cva("flex flex-1 flex-col gap-4", {
  variants: {
    collapsed: {
      true: "px-3 max-[960px]:px-4",
      false: ""
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarNavStyles = "flex flex-col gap-1";
export const sidebarDropdownTriggerStyles = cva(
  "group relative flex w-full items-center gap-3 rounded-[56px] px-4 py-3.5 text-left transition-[background-color,color,box-shadow,transform] duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)] focus-visible:ring-offset-2",
  {
    variants: {
      collapsed: {
        true: "justify-center max-[960px]:justify-start",
        false: "justify-start"
      },
      open: {
        true: "bg-[var(--color-brand-primary-main)] text-[var(--color-content-always-light)] shadow-[inset_0_4px_12px_0_var(--primitive-orange-400),0_10px_15px_0_var(--primitive-orange-200)] hover:bg-[var(--color-button-primary-background-hover)]",
        false:
          "text-[var(--color-content-tertiary)] hover:bg-[color-mix(in_srgb,var(--color-background-primary)_86%,transparent)] hover:translate-x-px"
      }
    },
    defaultVariants: {
      collapsed: false,
      open: false
    }
  }
);

export const sidebarDropdownChevronStyles = cva("ml-auto h-5 w-5 shrink-0 transition-transform duration-150", {
  variants: {
    open: {
      true: "rotate-180",
      false: "rotate-0"
    },
    collapsed: {
      true: "hidden max-[960px]:block",
      false: "block"
    }
  },
  defaultVariants: {
    open: false,
    collapsed: false
  }
});

export const sidebarSubnavStyles = cva("flex flex-col gap-1 pl-5 pr-0.5 pt-1", {
  variants: {
    collapsed: {
      true: "hidden max-[960px]:flex",
      false: "flex"
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarSubnavItemStyles = cva(
  "w-full rounded-[40px] px-6 py-3 text-left text-[var(--text-heading-h5-size)] leading-[var(--text-heading-5-line-height)] tracking-[var(--text-heading-letter-spacing)] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-focus-outline-mix)] focus-visible:ring-offset-2",
  {
    variants: {
      active: {
        true: "bg-[color-mix(in_srgb,var(--color-content-always-light)_40%,transparent)] text-[var(--color-brand-primary-main)]",
        false: "text-[var(--color-content-tertiary)] hover:bg-[color-mix(in_srgb,var(--color-content-always-light)_22%,transparent)]"
      }
    },
    defaultVariants: {
      active: false
    }
  }
);

export const sidebarDividerStyles = cva("h-px w-full bg-[var(--color-border-primary)]", {
  variants: {
    collapsed: {
      true: "max-[960px]:block hidden",
      false: "block"
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarFooterStyles = cva("px-4 pb-4 pt-4", {
  variants: {
    collapsed: {
      true: "px-3 max-[960px]:px-4",
      false: ""
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarUserStyles = cva("flex items-center gap-3", {
  variants: {
    collapsed: {
      true: "justify-center max-[960px]:justify-start",
      false: ""
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarUserMetaStyles = cva("min-w-0", {
  variants: {
    collapsed: {
      true: "hidden max-[960px]:block",
      false: "block"
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarLogoStyles = cva("h-[33px] w-28 object-contain", {
  variants: {
    collapsed: {
      true: "hidden max-[960px]:block",
      false: "block"
    }
  },
  defaultVariants: {
    collapsed: false
  }
});

export const sidebarBrandBadgeStyles = cva(
  "h-11 w-11 items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,var(--color-brand-secondary-main),var(--color-brand-secondary-gradient-end))] text-[0.9rem] font-bold tracking-[0.08em] text-[var(--color-content-always-light)]",
  {
    variants: {
      collapsed: {
        true: "inline-flex max-[960px]:hidden",
        false: "hidden"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  }
);

export const sidebarLogoutButtonStyles = cva(
  "relative mt-4 inline-flex min-h-9 w-full items-center gap-2 rounded-[14px] py-2 text-left text-sm leading-5 tracking-[-0.35px] text-[var(--color-content-tertiary)]",
  {
    variants: {
      collapsed: {
        true: "justify-center px-0 max-[960px]:justify-start max-[960px]:px-0",
        false: "justify-start"
      }
    },
    defaultVariants: {
      collapsed: false
    }
  }
);
