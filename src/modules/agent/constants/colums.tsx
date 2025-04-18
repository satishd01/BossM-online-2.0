// app/(DashboardLayout)/agent/constants/columns.tsx
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@mui/material";
import Image from "next/image";
import { editAgentTypes } from "../types";
import { DeleteOutlined, ModeEditOutline } from "@mui/icons-material";
import { bufferToBase64 } from "@/utils";

export const getAgentsColumns = ({
  setDeleteAgentId,
  setAgentToEdit,
}: {
  setDeleteAgentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setAgentToEdit: React.Dispatch<
    React.SetStateAction<editAgentTypes | undefined>
  >;
}): ColumnDef<editAgentTypes>[] => [
  {
    header: "Full Name",
    accessorKey: "fullName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("fullName")}
      </span>
    ),
  },
  {
    header: "Email",
    accessorKey: "email",
    maxSize: 150,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300">
        {row.getValue("email")}
      </span>
    ),
  },
  {
    header: "Phone Number",
    accessorKey: "phoneNumber",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300">
        {row.getValue("phoneNumber")}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    maxSize: 50,
    cell: ({ row }) => (
      <span
        className={`text-lg font-bold capitalize ${
          row.getValue("status") === "ACTIVE"
            ? "text-green-500"
            : "text-red-500"
        }`}
      >
        {row.getValue("status")}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, fullName, email, phoneNumber, status } = row?.original;
      return (
        <div className="flex">
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() => setDeleteAgentId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400" />
          </Button>
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() =>
              setAgentToEdit({
                id,
                fullName,
                email,
                phoneNumber,
                status,
              })
            }
          >
            <ModeEditOutline className="text-primary w-10" />
          </Button>
        </div>
      );
    },
  },
];