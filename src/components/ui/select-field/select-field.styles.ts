import { cva } from "class-variance-authority";

export const selectFieldRootStyles = cva("select-field", {
  variants: {
    variant: {
      filter: "select-field--filter",
      form: "select-field--form"
    },
    open: {
      true: "is-open",
      false: ""
    }
  },
  defaultVariants: {
    variant: "filter",
    open: false
  }
});

export const selectFieldTriggerStyles = cva("select-field__select select-field__trigger", {
  variants: {
    variant: {
      filter: "",
      form: ""
    }
  },
  defaultVariants: {
    variant: "filter"
  }
});

export const selectFieldWrapperStyles = "select-field-wrapper";
export const selectFieldLabelStyles = "select-field-wrapper__label";
export const selectFieldValueStyles = "select-field__value";
export const selectFieldChevronStyles = "select-field__chevron";
export const selectFieldNativeStyles = "select-field__native";
export const selectFieldMenuStyles = "select-field__menu";

export const selectFieldOptionStyles = cva("select-field__option", {
  variants: {
    selected: {
      true: "is-selected",
      false: ""
    }
  },
  defaultVariants: {
    selected: false
  }
});

export const selectFieldHelperStyles = cva("select-field-wrapper__helper", {
  variants: {
    tone: {
      default: "is-default",
      error: "is-error",
      success: "is-success"
    }
  },
  defaultVariants: {
    tone: "default"
  }
});
