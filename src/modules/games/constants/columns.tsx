"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@mui/material";
import Image from "next/image";
import { editGameTypes } from "../types";
import { DeleteOutlined, ModeEditOutline } from "@mui/icons-material";
import { bufferToBase64 } from "@/utils";

export const getGamesColumns = ({
  setDeleteGameId,
  setGameToEdit,
}: {
  setDeleteGameId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setGameToEdit: React.Dispatch<
    React.SetStateAction<editGameTypes | undefined>
  >;
}): ColumnDef<editGameTypes>[] => [
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
  {
    header: "Game Icon",
    accessorKey: "fileData",
    maxSize: 50,
    cell: ({ row }: any) => {
      const fileData = row.original.fileData?.data;
      const base64Image = fileData ? bufferToBase64(fileData) : null;
      return base64Image ? (
        <div
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <Image
            src={base64Image}
            alt="game image"
            width={"100"}
            height={"100"}
            className="w-full h-full bg-cover"
          />
        </div>
      ) : (
        <span>No Image</span>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const { id, fileData, gameName, rate } = row?.original;
      const base64Image = fileData ? bufferToBase64(fileData?.data) : null;
      return (
        <div className="flex">
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() => setDeleteGameId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400" />
          </Button>
          <Button
            className="flex justify-center !px-2 !m-0 !min-w-0"
            onClick={() =>
              setGameToEdit({
                id,
                fileData: base64Image,
                gameName,
                rate,
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
