"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "./pagination";
import { Spinner } from "../common/loader";
import SelectInput from "../common/selectInput";
import { paginationOptions } from "./constants";
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export function CommonTable({
  columns,
  data,
  isLoading,
  setPage,
  page,
  setSelectedIds,
  pagination,
  setPagination,
}: {
  setPagination?: React.Dispatch<React.SetStateAction<string | number>>;
  pagination?: string | number;
  columns: any;
  data: { data: any; pagination: any };
  isLoading: boolean;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  page: number;
  setSelectedIds?: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const Columns = React.useMemo(() => columns, []);

  const table = useReactTable({
    data: data?.data || [],
    columns: Columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    // getSortedRowModel: getSortedRowModel(),
    // getFilteredRowModel: getFilteredRowModel(),
    // onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    pageCount: data?.pagination?.totalPages || 0,
    getRowId: (row: any) => row.id,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  React.useEffect(() => {
    if (setSelectedIds) {
      setSelectedIds(Object.keys(rowSelection).map(Number));
    }
  }, [rowSelection]);
  return (
    <div className="w-full h-full overflow-auto">
      <div className="flex items-center"></div>
      <div className="flex rounded-md bg-[#ffffff]  min-h-[calc(100vh-370px)] xl:h-[calc(100vh-370px)] p-2 overflow-x-auto">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-lg">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="">
            {!isLoading ? (
              table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        key={cell.id}
                        style={{
                          width: cell.column.getSize(),
                          height: "50px",
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <Spinner />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <section className=" grid md:flex items-center  mx-2">
        {setPagination && (
          <section className="w-48 mx-auto md:mx-0">
            <SelectInput
              options={paginationOptions}
              value={pagination}
              onChange={(selectedOption: any) => {
                setPagination(selectedOption);
              }}
              placeholder="Pagination"
              labelClassName="text-lg font-normal"
            />
          </section>
        )}
        {!isLoading && data?.pagination?.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={data?.pagination?.totalPages}
            setPage={setPage}
          />
        )}
      </section>
    </div>
  );
}
