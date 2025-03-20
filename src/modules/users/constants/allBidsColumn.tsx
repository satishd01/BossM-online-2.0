"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const allBidsColumns = ({}: {}): ColumnDef<any>[] => [
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
    header: "Market",
    accessorKey: "marketName",
    maxSize: 100,
    cell: ({ row }) => (
      <>
        <span className="w-full text-center text-sm  dark:text-slate-400 capitalize">
          {row.getValue("marketName") || "-"}
        </span>
      </>
    ),
  },
  {
    header: "Game",
    accessorKey: "gameName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("gameName")}
      </span>
    ),
  },
  {
    header: "Session",
    accessorKey: "session",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("session")}
      </span>
    ),
  },
  {
    header: "Bid Digit",
    accessorKey: "bidDigit",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("bidDigit")}
      </span>
    ),
  },
  {
    header: "Bid Amount",
    accessorKey: "bidAmount",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("bidAmount")}
      </span>
    ),
  },
  {
    header: "Request date",
    accessorKey: "date",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {format(new Date(row.getValue("date")), "dd/MM/yyyy h:mma")}
      </span>
    ),
  },
];

