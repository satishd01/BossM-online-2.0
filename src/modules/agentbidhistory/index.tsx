"use client";
import React, { useEffect, useState } from "react";
import { Grid, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import CommonAlert from "@/components/common/alert";

interface AgentBidHistory {
  id: number;
  userName: string;
  userId: number;
  bidAmount: string;
  bidDigit: string;
  winAmount: string;
  winStatus: boolean;
  status: string;
  session: string;
  date: string;
  marketName: string;
  gameName: string;
  createdAt: string;
}

interface Agent {
  id: number;
  fullName: string;
  phoneNumber: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalData: number;
}

interface TableData {
  data: AgentBidHistory[];
  pagination: Pagination;
}

const getAgentBidHistoryColumns = ({
  setActionId,
}: {
  setActionId: (value: { id: number; winStatus: any; status: any }) => void;
}): ColumnDef<AgentBidHistory>[] => [
  {
    accessorKey: "userName",
    header: "User",
    cell: ({ row }) => row.getValue("userName") || "N/A",
  },
  {
    accessorKey: "userId",
    header: "User ID",
    cell: ({ row }) => row.getValue("userId"),
  },
  {
    accessorKey: "gameName",
    header: "Game",
    cell: ({ row }) => row.getValue("gameName") || "N/A",
  },
  {
    accessorKey: "marketName",
    header: "Market",
    cell: ({ row }) => row.getValue("marketName") || "N/A",
  },
  {
    accessorKey: "bidAmount",
    header: "Bid Amount",
    cell: ({ row }) => `${row.getValue("bidAmount")}`,
  },
  {
    accessorKey: "bidDigit",
    header: "Bid Digit",
    cell: ({ row }) => row.getValue("bidDigit"),
  },
  {
    accessorKey: "winAmount",
    header: "Win Amount",
    cell: ({ row }) => `${row.getValue("winAmount")}`,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("date")), "dd/MM/yyyy h:mma"),
  },
  {
    accessorKey: "session",
    header: "Session",
    cell: ({ row }) => row.getValue("session"),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.getValue("status"),
  },
];

const AgentBidHistoryComponent = () => {
  const [tableData, setTableData] = useState<TableData>({
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 1,
      limit: 10,
      totalData: 0
    }
  });
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgentId, setSelectedAgentId] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();
  const [pagination, setPagination] = useState<string | number>(10);

  // Fetch agents data
  const onAgentsSuccess = (data: any) => {
    setAgents(data.body);
    if (data.body.length > 0) {
      setSelectedAgentId(data.body[0].id);
    }
  };

  const { fetchData: fetchAgents } = useAxiosGet(
    `/user/agent-profile`,
    onAgentsSuccess
  );

  // Fetch bid history data
  const onBidHistorySuccess = (data: any) => {
    setTableData({
      data: data.result.bidHistory,
      pagination: data.result.pagination
    });
    setLoading(false);
  };

  const { fetchData: fetchBidHistory } = useAxiosGet(
    selectedAgentId 
      ? `/bid/admin/bid-history?agentId=${selectedAgentId}&page=${page}&limit=${pagination === "All" ? "1000000000" : pagination || 10}`
      : '',
    onBidHistorySuccess
  );

  useEffect(() => {
    fetchAgents();
  }, []);

  useEffect(() => {
    if (selectedAgentId) {
      setLoading(true);
      fetchBidHistory();
    }
  }, [selectedAgentId, page, pagination]);

  const handleAcceptReject = async (num: any) => {
    // Your implementation
  };

  if (loading && !selectedAgentId) {
    return <div className="w-full h-[100vh] flex items-center justify-center">Loading...</div>;
  }

  return (
    <PageContainer title="Agent Bid History" description="Agent bid history page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Agent Bid History">
            <>
              <FormControl fullWidth className="mb-4">
                <InputLabel id="agent-select-label">Select Agent</InputLabel>
                <Select
                  labelId="agent-select-label"
                  value={selectedAgentId || ""}
                  onChange={(e) => setSelectedAgentId(Number(e.target.value))}
                  label="Select Agent"
                  sx={{ width: 400,height:45 }}
                >
                  {agents.map((agent) => (
                    <MenuItem key={agent.id} value={agent.id}>
                      {agent.fullName} ({agent.phoneNumber})
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <CommonAlert
                showModal={!!actionId && actionId.winStatus === true}
                AlertDiaogTitle="Enter Winning Amount"
                title="Please confirm the action"
                description="You won the bid! Enter the amount."
                ButtonText="Confirm"
                onContinue={(inputValue) => handleAcceptReject(inputValue)}
                onCancel={() => setActionId(undefined)}
                showInput={true}
              />
              <CommonAlert
                showModal={!!actionId && actionId.winStatus === false}
                AlertDiaogTitle="Are you sure?"
                title="Please confirm the action"
                description="The bid will be marked as lost."
                ButtonText="Confirm"
                onContinue={(inputValue) => handleAcceptReject(0)}
                onCancel={() => setActionId(undefined)}
              />

              {selectedAgentId && (
                <CommonTable
                  columns={getAgentBidHistoryColumns({ setActionId })}
                  data={tableData}
                  setPagination={setPagination}
                  pagination={pagination}
                  isLoading={loading}
                  setPage={setPage}
                  page={page}
                />
              )}
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AgentBidHistoryComponent;