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
  setActionId: (value: {
    txnId: number;
    status: string;
    txnType: string;
    userId: any;
    amount: any;
  }) => void;
}): ColumnDef<bidHistoryType>[] => [
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
    header: "Phone Number",
    accessorKey: "phoneNumber",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("phoneNumber")}
      </span>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("amount")}
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
  {
    header: "Request date",
    accessorKey: "createdAt",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy h:mma")}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const status = row.getValue("status");

      return status === "PENDING" ? (
        <div className="flex space-x-2">
          <Button
            className="flex justify-center bg-green-500 hover:bg-green-600 text-white"
            onClick={() =>
              setActionId({
                txnId: row.getValue("id"),
                status: "ACCEPTED",
                txnType: "WITHDRAWAL",
                userId: row.getValue("userId"),
                amount: row.getValue("amount"),
              })
            }
          >
            Accept
          </Button>
          <Button
            className="flex justify-center bg-red-500 hover:bg-red-600 text-white"
            onClick={() =>
              setActionId({
                txnId: row.getValue("id"),
                status: "REJECTED",
                txnType: "WITHDRAWAL",
                userId: row.getValue("userId"),
                amount: row.getValue("amount"),
              })
            }
          >
            Reject
          </Button>
        </div>
      ) : (
        <span className="text-gray-500">No Action Required</span>
      );
    },
  },
];
