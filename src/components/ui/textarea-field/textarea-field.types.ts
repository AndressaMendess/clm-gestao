import type { TextareaHTMLAttributes } from "react";

export type TextareaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  helperText?: string;
  wrapperClassName?: string;
};
