import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface TableColumn<T> {
  key: string;
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
}

export const DataTable = <T,>({
  columns,
  data,
  rowKey,
  className,
}: {
  columns: TableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  className?: string;
}) => (
  <div className={cn("overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-soft", className)}>
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                className={cn("whitespace-nowrap px-5 py-3 text-left text-xs font-semibold uppercase tracking-[0.16em] text-slate-500", column.className)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {data.map((row) => (
            <tr key={rowKey(row)} className="align-top">
              {columns.map((column) => (
                <td key={column.key} className="px-5 py-4 text-sm text-slate-700">
                  {column.cell(row)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
