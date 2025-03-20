"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { bidHistoryType } from "@/modules/deposit-request/types";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const getSiteManagementColumns = ({
  setActionId,
}: {
  setActionId: (value: { id: number; winStatus: any; status: any }) => void;
}): ColumnDef<bidHistoryType>[] => [
  {
    header: "User",
    accessorKey: "userName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("userName")}
      </span>
    ),
  },
  {
    header: "User ID",
    accessorKey: "userId",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("userId")}
      </span>
    ),
  },
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
    header: "Market Name",
    accessorKey: "marketName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("marketName")}
      </span>
    ),
  },
  {
    header: "Bid Amount",
    accessorKey: "bidAmount",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("bidAmount")}
      </span>
    ),
  },
  {
    header: "Bid Digit",
    accessorKey: "bidDigit",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("bidDigit")}
      </span>
    ),
  },
  {
    header: "Panna Digit",
    accessorKey: "pannaDigit",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("pannaDigit")}
      </span>
    ),
  },
  {
    header: "Bidding Date",
    accessorKey: "date",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {format(new Date(row.getValue("date")), "dd/MM/yyyy h:mma")}
      </span>
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
    header: "Status",
    accessorKey: "status",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("status")}
      </span>
    ),
  },
  // {
  //   accessorKey: "id",
  //   header: "Action",
  //   cell: ({ row }) => {
  //     const status = row.getValue("status");
  //     return status === "pending" ? (
  //       <div className="flex space-x-2">
  //         <Button
  //           className="flex justify-center bg-green-500 hover:bg-green-600 text-white"
  //           onClick={() =>
  //             setActionId({
  //               id: row.getValue("id"),
  //               status: "completed",
  //               winStatus: true,
  //             })
  //           }
  //         >
  //           Won
  //         </Button>
  //         <Button
  //           className="flex justify-center bg-red-500 hover:bg-red-600 text-white"
  //           onClick={() =>
  //             setActionId({
  //               id: row.getValue("id"),
  //               status: "completed",
  //               winStatus: false,
  //             })
  //           }
  //         >
  //           Lost
  //         </Button>
  //       </div>
  //     ) : (
  //       <span className="text-gray-500">No Action Required</span>
  //     );
  //   },
  // },
];