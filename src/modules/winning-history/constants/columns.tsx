"use client";
import { ColumnDef } from "@tanstack/react-table";
import { bidHistoryType } from "./data";
import { Chip } from "@mui/material";
import { format } from "date-fns";
export const getWinningHistoryColumns = (): ColumnDef<bidHistoryType>[] => [
  {
    header: "User name",
    accessorKey: "userName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("userName")}
      </span>
    ),
  },
  {
    header: "Phone number",
    accessorKey: "phoneNumber",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("phoneNumber")}
      </span>
    ),
  },
  {
    header: "Date",
    accessorKey: "date",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {format(new Date(row.getValue("date")), "dd/MM/yyyy")}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    maxSize: 100,
    cell: ({ row }) => (
      <Chip
        sx={{
          px: "4px",
          backgroundColor: "primary.main",
          color: "#fff",
        }}
        size="small"
        label={row.getValue("status")}
      />
    ),
  },
  {
    header: "Session",
    accessorKey: "session",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("session")}
      </span>
    ),
  },
  {
    header: "Bid Digit",
    accessorKey: "bidDigit",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("bidDigit")}
      </span>
    ),
  },
  {
    header: "Panna Digit",
    accessorKey: "pannaDigit",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("pannaDigit")}
      </span>
    ),
  },
  {
    header: "Bid Amount",
    accessorKey: "bidAmount",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("bidAmount")}
        {/*    ${row.getValue("bidAmount").toFixed(2)} */}
      </span>
    ),
  },
  {
    header: "Win Amount",
    accessorKey: "winAmount",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("winAmount")}
        {/* ${row.getValue("winAmount").toFixed(2)} */}
      </span>
    ),
  },
  {
    header: "Win Status",
    accessorKey: "winStatus",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        <Chip
          sx={{
            px: "4px",
            backgroundColor: row.getValue("winStatus")
              ? "success.main"
              : "secondary.main",
            color: "#fff",
          }}
          size="small"
          label={row.getValue("winStatus") ? "Won" : "Lost"}
        />
      </span>
    ),
  },
  {
    header: "Market",
    accessorKey: "market",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("market")}
      </span>
    ),
  },
  {
    header: "Game",
    accessorKey: "game",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("game")}
      </span>
    ),
  },
];

