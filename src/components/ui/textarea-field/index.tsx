import { cn } from "@/src/lib/utils";
import {
  textareaFieldHelperStyles,
  textareaFieldInputStyles,
  textareaFieldLabelStyles,
  textareaFieldWrapperStyles
} from "./textarea-field.styles";
import type { TextareaFieldProps } from "./textarea-field.types";
export type { TextareaFieldProps } from "./textarea-field.types";

export function TextareaField({ label, helperText, className, wrapperClassName, ...props }: TextareaFieldProps) {
  return (
    <label className={cn(textareaFieldWrapperStyles, wrapperClassName)}>
      <span className={textareaFieldLabelStyles}>{label}</span>
      <textarea className={cn(textareaFieldInputStyles, className)} {...props} />
      {helperText ? <small className={textareaFieldHelperStyles}>{helperText}</small> : null}
    </label>
  );
}
