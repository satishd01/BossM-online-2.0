"use client";
import { ColumnDef } from "@tanstack/react-table";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { editAgentTypes } from "../types";
import React, { useState } from "react";

const ViewUsersModal = ({ agent }: { agent: editAgentTypes }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button size="small" variant="outlined" onClick={() => setOpen(true)}>
        View Users
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle className="flex justify-between items-center">
          Users of {agent.fullName}
          <IconButton onClick={() => setOpen(false)}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {agent.users && agent.users.length > 0 ? (
            <ul className="space-y-2">
              {agent.users.map((user) => (
                <li key={user.id} className="text-sm">
                  <Typography variant="body1" className="font-semibold">
                    {user.fullName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email || "No Email"} — {user.phoneNumber} — Wallet: ₹
                    {user.wallet}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography>No users available.</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const getAgentsColumns = ({
  setDeleteAgentId,
  setAgentToEdit,
}: {
  setDeleteAgentId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setAgentToEdit: React.Dispatch<React.SetStateAction<editAgentTypes | undefined>>;
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
    header: "Users",
    id: "view-users",
    cell: ({ row }) => <ViewUsersModal agent={row.original} />,
  },
];
