import * as React from "react";

import { cn } from "@/src/lib/utils";
import {
  inputFieldHelperStyles,
  inputFieldLabelStyles,
  inputFieldStyles,
  inputFieldWrapperStyles
} from "./input.styles";
import type { InputProps } from "./input.types";
export type { InputHelperTone, InputProps } from "./input.types";

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      label,
      showLabel = true,
      helperText,
      helperTone = "default",
      fieldClassName,
      id,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? generatedId;

    const input = (
      <input
        id={inputId}
        type={type}
        className={cn(inputFieldStyles, className)}
        ref={ref}
        {...props}
      />
    );

    if (!label && !helperText) {
      return input;
    }

    return (
      <label className={cn(inputFieldWrapperStyles, fieldClassName)} htmlFor={inputId}>
        {showLabel && label ? <span className={inputFieldLabelStyles}>{label}</span> : null}
        {input}
        {helperText ? <small className={inputFieldHelperStyles({ tone: helperTone })}>{helperText}</small> : null}
      </label>
    );
  }
);

Input.displayName = "Input";

export { Input };
