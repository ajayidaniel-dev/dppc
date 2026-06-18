import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type RowSelectionState,
} from "@tanstack/react-table";
import { cn } from "../../utils/helpers";
import Pagination from "./Pagination";
import Spinner from "./Spinner";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    align?: "left" | "right" | "center";
    wrap?: boolean;
    maxWidth?: string;
  }
}

interface TableProps<T extends { id: string | number }> {
  columns: ColumnDef<T, any>[];
  data: T[];
  isLoading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  enableRowSelection?: boolean;
  rowSelection?: RowSelectionState;
  setRowSelection?: (updater: RowSelectionState) => void;
  // Pagination
  currentPage?: number;
  setCurrentPage?: (page: number) => void;
  totalPage?: number;
  count?: number;
  limit?: number;
}

const alignClass = (align?: "left" | "right" | "center") =>
  align === "right"
    ? "text-right"
    : align === "center"
      ? "text-center"
      : "text-left";

function Table<T extends { id: string | number }>({
  columns,
  data,
  isLoading,
  emptyMessage = "No records found.",
  onRowClick,
  enableRowSelection,
  rowSelection,
  setRowSelection,
  currentPage,
  setCurrentPage,
  totalPage,
  count,
  limit,
}: TableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
    enableRowSelection,
    state: rowSelection ? { rowSelection } : undefined,
    onRowSelectionChange:
      setRowSelection &&
      ((updater) => {
        const next =
          typeof updater === "function" ? updater(rowSelection ?? {}) : updater;
        setRowSelection(next);
      }),
  });

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="bg-surface-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    style={{ maxWidth: header.column.columnDef.meta?.maxWidth }}
                    className={cn(
                      "whitespace-nowrap px-4 py-3 font-medium text-muted-foreground",
                      alignClass(header.column.columnDef.meta?.align)
                    )}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length}>
                  <Spinner label="Loading…" />
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-4 py-10 text-center text-muted-foreground"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.original)}
                  className={cn(
                    "border-t border-border transition-colors",
                    onRowClick && "cursor-pointer hover:bg-surface-muted",
                    row.getIsSelected() && "bg-primary-soft"
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={{ maxWidth: cell.column.columnDef.meta?.maxWidth }}
                      className={cn(
                        "px-4 py-3 text-foreground",
                        alignClass(cell.column.columnDef.meta?.align),
                        cell.column.columnDef.meta?.wrap
                          ? "whitespace-normal wrap-break-word"
                          : "whitespace-nowrap"
                      )}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {currentPage !== undefined &&
        setCurrentPage &&
        totalPage !== undefined && (
          <div className="border-t border-border">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPage={totalPage}
              count={count}
              limit={limit}
            />
          </div>
        )}
    </div>
  );
}

export default Table;
