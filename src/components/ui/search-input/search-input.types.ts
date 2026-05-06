import type { ChangeEventHandler } from "react";

export type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  ariaLabel: string;
  className?: string;
};
