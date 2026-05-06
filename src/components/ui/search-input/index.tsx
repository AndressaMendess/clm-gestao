import { Search } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  searchInputFieldStyles,
  searchInputIconStyles,
  searchInputWrapperStyles
} from "./search-input.styles";
import type { SearchInputProps } from "./search-input.types";
export type { SearchInputProps } from "./search-input.types";

export function SearchInput({ value, onChange, placeholder, ariaLabel, className }: SearchInputProps) {
  return (
    <label className={cn(searchInputWrapperStyles, className)}>
      <Search className={searchInputIconStyles} aria-hidden="true" />
      <input
        type="text"
        className={searchInputFieldStyles}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}
