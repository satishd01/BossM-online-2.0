"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DeleteOutlined, ModeEditOutline } from "@mui/icons-material";
import { editNoticeTypes } from "../types";

export const getSiteManagementColumns = ({
  setDeleteNoticeId,
  setNoticeToEdit,
}: {
  setDeleteNoticeId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setNoticeToEdit: React.Dispatch<
    React.SetStateAction<editNoticeTypes | undefined>
  >;
}): ColumnDef<editNoticeTypes>[] => [
  {
    header: "Notice Description",
    accessorKey: "description",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("description")}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, description } = row?.original;
      return (
        <div className="flex space-x-4">
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0 !bg-transparent hover:bg-transparent"
            onClick={() => setDeleteNoticeId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400" style={{ backgroundColor: 'transparent' }} />
          </Button>
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0 !bg-transparent hover:bg-transparent"
            onClick={() =>
              setNoticeToEdit({
                id,
                description,
              })
            }
          >
            <ModeEditOutline className="text-blue-500" style={{ backgroundColor: 'transparent' }} />
          </Button>
        </div>
      );
    },
  },
];
