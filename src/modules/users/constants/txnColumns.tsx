"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const txnColumns = ({}: {}): ColumnDef<any>[] => [
  {
    header: "Sr.No",
    accessorKey: "index",
    cell: ({ row }) => (
      <section className="w-full text-center text-sm dark:text-slate-400 capitalize">
        {row.index + 1}
      </section>
    ),
  },
  {
    header: "Title",
    accessorKey: "title",
    maxSize: 100,

    cell: ({ row }) => (
      <>
        <span className="w-full text-center text-sm  dark:text-slate-400 capitalize">
          {row.getValue("title") || "-"}
        </span>
      </>
    ),
  },

  {
    header: "Descriptions",
    accessorKey: "description",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    header: "Request date",
    accessorKey: "createdAt",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy h:mma")}
      </span>
    ),
  },
];

