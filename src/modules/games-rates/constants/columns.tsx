"use client";
import { bidHistoryType } from "@/modules/deposit-request/types";
import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const getSiteManagementColumns = (): ColumnDef<bidHistoryType>[] => [
  {
    header: "Game Name",
    accessorKey: "gameName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("gameName")}
      </span>
    ),
  },
  {
    header: "Game Rate",
    accessorKey: "rate",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("rate")}
      </span>
    ),
  },
];
