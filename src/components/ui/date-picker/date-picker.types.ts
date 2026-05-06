import type { ChangeEventHandler, InputHTMLAttributes } from "react";

export type DatePickerProps = Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "onChange" | "value"> & {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  label?: string;
  wrapperClassName?: string;
};
