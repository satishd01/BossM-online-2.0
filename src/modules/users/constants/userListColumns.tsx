"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@mui/material";
import { format } from "date-fns";
import { Dispatch, SetStateAction } from "react";
import {
  DeleteOutlined,
  DoDisturbAltOutlined,
  EditOutlined,
  TaskAltOutlined,
  History,
  CurrencyExchangeRounded,
  AccountBalance
} from "@mui/icons-material";
import { EditUserDetails } from "../types";
import { IndianRupee } from "lucide-react";
export const getUsersColumns = ({
  setDeleteUserId,
  setOpenDetailUser,
  setAddAmountForUserID,
  setDeductAmountForUserID,
  setUserStatus,
  setTxnHistoryId,
  SetUserIdForWinningBid,
  SetUserIdForAllBid
}: {
  setUserStatus: Dispatch<
    SetStateAction<
      | {
          id: number;
          status: string;
        }
      | undefined
    >
  >;
  setOpenDetailUser: Dispatch<SetStateAction<EditUserDetails | undefined>>;
  setDeductAmountForUserID: Dispatch<SetStateAction<number | undefined>>;
  setAddAmountForUserID: Dispatch<SetStateAction<number | undefined>>;
  setDeleteUserId: (value: SetStateAction<number | undefined>) => void;
  setTxnHistoryId: (value: SetStateAction<number | undefined>) => void;
  SetUserIdForWinningBid: (value: SetStateAction<number | undefined>) => void;
  SetUserIdForAllBid: (value: SetStateAction<number | undefined>) => void;
}): ColumnDef<any>[] => [
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
    header: "Phone Number",
    accessorKey: "phoneNumber",
    maxSize: 100,

    cell: ({ row }) => (
      <>
        <span className="w-full text-center text-sm  dark:text-slate-400 capitalize">
          {row.getValue("phoneNumber") || "-"}
        </span>
      </>
    ),
  },

  {
    header: "Full name",
    accessorKey: "fullName",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("fullName")}
      </span>
    ),
  },
  // {
  //   header: "Admin id",
  //   accessorKey: "adminsId",
  //   maxSize: 100,
  //   cell: ({ row }) => (
  //     <span className="w-full text-center text-sm dark:text-slate-300">
  //       {row.getValue("adminsId")}
  //     </span>
  //   ),
  // },

  {
    header: "Wallet",
    accessorKey: "wallet",
    maxSize: 100,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("wallet")}
        {/* ${row.getValue("winAmount").toFixed(2)} */}
      </span>
    ),
  },
  {
    header: "Registration date",
    accessorKey: "createdAt",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {format(new Date(row.getValue("createdAt")), "dd/MM/yyyy")}
      </span>
    ),
  },
  {
    header: "Password",
    accessorKey: "password",
    maxSize: 200,
    cell: ({ row }) => (
      <span className="w-full text-center text-sm dark:text-slate-300">
        {row.getValue("password")}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    maxSize: 200,
    cell: ({ row }) => {
      const status = row?.getValue("status");
      const id = row?.getValue("id") as unknown as number;
      return (
        <>
          {status === "active" && (
            <Button
              className="flex justify-center"
              size="small"
              onClick={() => setUserStatus({ id, status })}
            >
              <TaskAltOutlined className="text-primary w-5" />
            </Button>
          )}
          {status === "inActive" && (
            <Button
              className="flex justify-center"
              size="small"
              onClick={() => setUserStatus({ id, status })}
            >
              <DoDisturbAltOutlined className="text-red-400 w-5" />
            </Button>
          )}
        </>
      );
    },
  },
  {
    accessorKey: "id",
    header: "Action",
    cell: ({ row }) => {
      const {
        accNumber,
        addWallet,
        googlePay,
        ifsc,
        paytm,
        phonePe,
        status,
        subWallet,
        upi,
        id: userId,
      } = row?.original;
      return (
        <section className="flex">
          <Button
            className="flex justify-center"
            size="small"
            onClick={() => setDeleteUserId(row?.getValue("id"))}
          >
            <DeleteOutlined className="text-red-400 w-5" />
          </Button>
          <Button
            size="small"
            className="flex justify-center"
            onClick={() =>
              setOpenDetailUser({
                accNumber,
                addWallet,
                googlePay,
                ifsc,
                paytm,
                phonePe,
                status,
                subWallet,
                upi,
                userId,
              })
            }
          >
            <EditOutlined className="text-primary w-5" />
          </Button>
          <Button
            className="flex justify-center"
            size="small"
            onClick={() => setAddAmountForUserID(row?.getValue("id"))}
          >
            <IndianRupee className="text-green-500 w-5" />
          </Button>
          <Button
            className="flex justify-center"
            onClick={() => setDeductAmountForUserID(row?.getValue("id"))}
            size="small"
          >
            <IndianRupee className="text-red-500 w-5" />
          </Button>
          <Button
            className="flex justify-center"
            onClick={() => setTxnHistoryId(row?.getValue("id"))}
            size="small"
          >
            <History className="text-red-500 w-5" />
          </Button>
          <Button
            className="flex justify-center"
            onClick={() => SetUserIdForAllBid(row?.getValue("id"))}
            size="small"
          >
            <CurrencyExchangeRounded className="text-blue-500 w-5" />
          </Button>
          <Button
            className="flex justify-center"
            onClick={() => SetUserIdForWinningBid(row?.getValue("id"))}
            size="small"
          >
            <AccountBalance className="text-green-500 w-5" />
          </Button>
        </section>
      );
    },
  },
];
