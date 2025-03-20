"use client";
import { ColumnDef } from "@tanstack/react-table";
import { editNoticeTypes } from "../types";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { DeleteOutlined, ModeEditOutline } from "@mui/icons-material";

export const getSiteManagementColumns = ({
  setDeleteNoticeId,
  setNoticeToEdit,
  setDeleteResultId
}: {
  setDeleteNoticeId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNoticeToEdit: React.Dispatch<
    React.SetStateAction<editNoticeTypes | undefined>
  >;
  setDeleteResultId: React.Dispatch<React.SetStateAction<number | undefined>>;
}): ColumnDef<editNoticeTypes>[] => [
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
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("marketName")}
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
    header: "Result",
    accessorKey: "date",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {format(new Date(row.getValue("date")), "dd/MM/yyyy")}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id } = row?.original;
      return (
        <div className="flex space-x-4">
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0 !bg-transparent hover:bg-transparent"
            onClick={() => setDeleteResultId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400" style={{ backgroundColor: 'transparent' }} />
          </Button>
        </div>
      );
    },
  },
];