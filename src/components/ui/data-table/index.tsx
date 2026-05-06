import type { ReactNode } from "react";
import type { CheckedState } from "@radix-ui/react-checkbox";

import { cn } from "@/src/lib/utils";
import { TableCard } from "@/src/components/ui/table-card";
import { Checkbox } from "@/src/components/ui/checkbox";

export type DataTableColumn<T> = {
  id: string;
  header: ReactNode;
  cell: (row: T) => ReactNode;
  thClassName?: string;
  tdClassName?: string;
};

type DataTablePagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  ariaLabel: string;
};

type DataTableProps<T> = {
  title: string;
  titleId?: string;
  countLabel: string;
  columns: DataTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string | number;
  mobileCard: (row: T) => ReactNode;
  pagination?: DataTablePagination;
  tableMinWidthClassName?: string;
  selection?: {
    selectedRowKeys: Array<string | number>;
    onSelectionChange: (keys: Array<string | number>) => void;
    rowAriaLabel?: (row: T) => string;
    selectAllAriaLabel?: string;
  };
};

export function DataTable<T>({
  title,
  titleId,
  countLabel,
  columns,
  rows,
  rowKey,
  mobileCard,
  pagination,
  tableMinWidthClassName = "min-w-[1040px]",
  selection
}: DataTableProps<T>) {
  const currentRowKeys = rows.map((row) => rowKey(row));
  const selectedCurrentPageCount = currentRowKeys.filter((key) => selection?.selectedRowKeys.includes(key)).length;
  const isAllCurrentPageSelected =
    Boolean(selection) && currentRowKeys.length > 0 && selectedCurrentPageCount === currentRowKeys.length;
  const isSomeCurrentPageSelected = Boolean(selection) && selectedCurrentPageCount > 0 && !isAllCurrentPageSelected;

  const handleToggleSelectAllCurrentPage = (checked: CheckedState) => {
    if (!selection) {
      return;
    }

    const shouldSelectAll = checked === true;
    if (shouldSelectAll) {
      selection.onSelectionChange([...new Set([...selection.selectedRowKeys, ...currentRowKeys])]);
      return;
    }

    selection.onSelectionChange(selection.selectedRowKeys.filter((key) => !currentRowKeys.includes(key)));
  };

  const handleToggleRowSelection = (key: string | number, checked: CheckedState) => {
    if (!selection) {
      return;
    }

    const shouldSelect = checked === true;
    if (shouldSelect) {
      selection.onSelectionChange(selection.selectedRowKeys.includes(key) ? selection.selectedRowKeys : [...selection.selectedRowKeys, key]);
      return;
    }

    selection.onSelectionChange(selection.selectedRowKeys.filter((currentKey) => currentKey !== key));
  };

  return (
    <TableCard title={title} titleId={titleId} countLabel={countLabel}>
      <div className="hidden overflow-x-auto overflow-y-hidden md:block">
        <table className={cn("w-full border-collapse", tableMinWidthClassName)}>
          <thead>
            <tr>
              {selection ? (
                <th className="h-10 w-10 bg-[var(--color-background-secondary)] pl-6 pr-2 text-left">
                  <Checkbox
                    aria-label={selection.selectAllAriaLabel ?? "Selecionar todos"}
                    checked={isAllCurrentPageSelected ? true : isSomeCurrentPageSelected ? "indeterminate" : false}
                    onCheckedChange={handleToggleSelectAllCurrentPage}
                  />
                </th>
              ) : null}
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={cn(
                    "h-10 bg-[var(--color-background-secondary)] px-6 text-left text-[var(--text-body-small-size)] font-medium leading-[1.33] text-[var(--color-content-tertiary)]",
                    column.thClassName
                  )}
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {rows.map((row) => {
              const key = rowKey(row);

              return (
                <tr key={key}>
                  {selection ? (
                    <td className="border-t border-[var(--color-surface-border)] pl-6 pr-2 py-[15px] align-middle">
                      <Checkbox
                        aria-label={selection.rowAriaLabel?.(row) ?? "Selecionar linha"}
                        checked={selection.selectedRowKeys.includes(key)}
                        onCheckedChange={(checked) => handleToggleRowSelection(key, checked)}
                      />
                    </td>
                  ) : null}
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={cn(
                        "border-t border-[var(--color-surface-border)] px-6 py-[15px] align-middle [&_button>span]:transition-colors [&_button>span]:duration-150 hover:[&_button>span]:text-[var(--color-brand-primary-main)] [&_button:focus-visible>span]:text-[var(--color-brand-primary-main)]",
                        column.tdClassName
                      )}
                    >
                      {column.cell(row)}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-3 p-4 md:hidden">
        {rows.map((row) => {
          const key = rowKey(row);

          return (
            <article key={key}>
              {selection ? (
                <div className="mb-2 flex items-center">
                  <Checkbox
                    aria-label={selection.rowAriaLabel?.(row) ?? "Selecionar linha"}
                    checked={selection.selectedRowKeys.includes(key)}
                    onCheckedChange={(checked) => handleToggleRowSelection(key, checked)}
                  />
                </div>
              ) : null}
              {mobileCard(row)}
            </article>
          );
        })}
      </div>

      {pagination && pagination.totalPages > 1 ? (
        <footer className="flex flex-col items-stretch justify-between gap-4 border-t border-[var(--color-surface-border)] px-4 pt-3 pb-4 sm:flex-row sm:items-center sm:px-6">
          <button
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-[8px] border border-[#d0d5dd] bg-[var(--color-surface-card)] px-3.5 py-2 text-[var(--text-body-medium)] font-medium text-[#344054] shadow-[var(--color-button-shadow)] disabled:cursor-default disabled:opacity-50"
            type="button"
            onClick={() => pagination.onPageChange(Math.max(1, pagination.currentPage - 1))}
            disabled={pagination.currentPage === 1}
          >
            <span>Anterior</span>
          </button>

          <div className="flex flex-wrap items-center justify-center gap-0.5" aria-label={pagination.ariaLabel}>
            {Array.from({ length: pagination.totalPages }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={cn(
                  "h-10 w-10 rounded-[8px] text-[var(--text-body-medium)] font-medium",
                  page === pagination.currentPage ? "bg-[var(--color-count-badge-bg)] text-[#7f56d9]" : "text-[#667085]"
                )}
                type="button"
                onClick={() => pagination.onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="inline-flex min-h-9 items-center justify-center gap-2 rounded-[8px] border border-[#d0d5dd] bg-[var(--color-surface-card)] px-3.5 py-2 text-[var(--text-body-medium)] font-medium text-[#344054] shadow-[var(--color-button-shadow)] disabled:cursor-default disabled:opacity-50"
            type="button"
            onClick={() => pagination.onPageChange(Math.min(pagination.totalPages, pagination.currentPage + 1))}
            disabled={pagination.currentPage === pagination.totalPages}
          >
            <span>Próxima</span>
          </button>
        </footer>
      ) : null}
    </TableCard>
  );
}
