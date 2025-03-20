"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@mui/material";
import { DeleteOutlined, ModeEditOutline } from "@mui/icons-material";
import { editMarketTypes } from "../types";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export const getMarketsColumns = ({
  setDeleteMarketId,
  setMarketToEdit,
}: {
  setDeleteMarketId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setMarketToEdit: React.Dispatch<
    React.SetStateAction<editMarketTypes | undefined>
  >;
}): ColumnDef<editMarketTypes>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Market ID",
    accessorKey: "marketId",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg font-bold dark:text-slate-300 capitalize">
        {row.getValue("marketId")}
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
    header: "Open Time",
    accessorKey: "openTime",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("openTime")}
      </span>
    ),
  },
  {
    header: "Close Time",
    accessorKey: "closeTime",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("closeTime")}
        {/*    ${row.getValue("bidAmount").toFixed(2)} */}
      </span>
    ),
  },
  {
    header: "Result Date",
    accessorKey: "resultDate",
    maxSize: 100,
    cell: ({ row }) => {
      const date = row.getValue("resultDate") as unknown as Date;
      return (
        <span className="text-lg dark:text-slate-300">
          {date ? format(date, "dd-MM-yyyy") : "-"}
        </span>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "status",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="text-lg dark:text-slate-300">
        {row.getValue("status")}
        {/*    ${row.getValue("bidAmount").toFixed(2)} */}
      </span>
    ),
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, closeTime, marketName, openTime, weekdayStatus } =
        row?.original;
      return (
        <div className="flex">
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() => setDeleteMarketId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400" />
          </Button>
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() =>
              setMarketToEdit({
                id,
                closeTime,
                marketName,
                openTime,
                weekdayStatus,
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
