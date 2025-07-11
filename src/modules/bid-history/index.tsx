"use client";
import React, { useEffect, useState } from "react";
import { Grid, TextField, MenuItem, Button, Box } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import CommonAlert from "@/components/common/alert";
import { useSearchParams } from "next/navigation";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

type BidItem = {
  userName?: string;
  userId: string;
  gameName?: string;
  marketName?: string;
  bidAmount: number;
  bidDigit: string;
  winAmount: number;
  date: string;
  session: string;
  status: string;
};

const BidHistoryComponent = () => {
  const [bidHistoryData, setBidHistoryData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();
  const [bidAmount, setBidAmount] = useState<string>("");
  const searchParams = useSearchParams();
  const [pagination, setPagination] = useState<string | number>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filter, setFilter] = useState<{ user: string; market: string; game: string }>({
    user: "",
    market: "",
    game: ""
  });

  const today = searchParams.get("today");
  const { post } = useAxiosPost(`/bid/update-bid/${actionId?.id}`);

  const onSuccess = (data: any) => {
    setBidHistoryData(data.result);
    setLoading(false);
  };

  const {
    data: dropDownData,
    isError: dropDownListError,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(
    `/bid/bid-history-admin?page=${page}&limit=${pagination === "All" ? "1000000000" : pagination || 10
    }&${today ? "today=true" : ""}`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, [page, pagination]);

  const handleAcceptReject = async (num: any) => {
    const payload = actionId.winStatus
      ? { ...actionId, winAmount: num }
      : { ...actionId, winAmount: 0 };
    const res: any = await post(payload);
    if (res && res?.success) {
      setActionId(undefined);
      setBidAmount("");
      await fetchData();
    }
  };

  const filteredData: BidItem[] = bidHistoryData.data?.filter((item: BidItem) => {
    const matchesSearch =
      item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.userId?.toString().includes(searchTerm) ||
      item.gameName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.marketName?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      (filter.user === "" || item.userName?.includes(filter.user)) &&
      (filter.market === "" || item.marketName?.includes(filter.market)) &&
      (filter.game === "" || item.gameName?.includes(filter.game));

    return matchesSearch && matchesFilter;
  }) || [];

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "Bid History Report";
    const date = format(new Date(), "dd/MM/yyyy");

    doc.setFontSize(18);
    doc.text(title, 14, 15);
    doc.setFontSize(11);
    doc.text(`Generated on: ${date}`, 14, 22);

    const headers = [
      "User",
      "User ID",
      "Game",
      "Market",
      "Bid Amount",
      "Bid Digit",
      "Win Amount",
      "Date",
      "Session",
      "Status"
    ];

    const data = filteredData.map((item: BidItem) => [
      item.userName || "N/A",
      item.userId,
      item.gameName || "N/A",
      item.marketName || "N/A",
      `${item.bidAmount}`,
      item.bidDigit,
      `${item.winAmount}`,
      format(new Date(item.date), "dd/MM/yyyy h:mma"),
      item.session,
      item.status
    ]);

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255
      }
    });

    doc.save(`bid_history_${date}.pdf`);
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const uniqueUsers: string[] = Array.from(
    new Set(bidHistoryData.data?.map((item: BidItem) => item.userName))
  ).filter(Boolean) as string[];

  const uniqueMarkets: string[] = Array.from(
    new Set(bidHistoryData.data?.map((item: BidItem) => item.marketName))
  ).filter(Boolean) as string[];

  const uniqueGames: string[] = Array.from(
    new Set(bidHistoryData.data?.map((item: BidItem) => item.gameName))
  ).filter(Boolean) as string[];

  return (
    <PageContainer title="Bid History" description="This is bid history page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Bid History">
            <>
              {/* Search and Filter Section */}
              <Box display="flex" flexDirection="column" gap={2} mb={3}>
                <TextField
                  label="Search"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Box display="flex" gap={2}>
                  <TextField
                    select
                    label="User"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filter.user}
                    onChange={(e) => setFilter({ ...filter, user: e.target.value })}
                  >
                    <MenuItem value="">All Users</MenuItem>
                    {uniqueUsers.map((user) => (
                      <MenuItem key={user} value={user}>{user}</MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Market"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filter.market}
                    onChange={(e) => setFilter({ ...filter, market: e.target.value })}
                  >
                    <MenuItem value="">All Markets</MenuItem>
                    {uniqueMarkets.map((market) => (
                      <MenuItem key={market} value={market}>{market}</MenuItem>
                    ))}
                  </TextField>

                  <TextField
                    select
                    label="Game"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={filter.game}
                    onChange={(e) => setFilter({ ...filter, game: e.target.value })}
                  >
                    <MenuItem value="">All Games</MenuItem>
                    {uniqueGames.map((game) => (
                      <MenuItem key={game} value={game}>{game}</MenuItem>
                    ))}
                  </TextField>
                </Box>

                <Box display="flex" justifyContent="flex-end">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={exportToPDF}
                  >
                    Export to PDF
                  </Button>
                </Box>
              </Box>

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
                onContinue={() => handleAcceptReject(0)}
                onCancel={() => setActionId(undefined)}
              />

              <CommonTable
                columns={getSiteManagementColumns({ setActionId })}
                data={{
                  data: filteredData,
                  pagination: bidHistoryData.pagination
                }}
                setPagination={setPagination}
                pagination={pagination}
                isLoading={dropDownListLoading}
                page={page}
                setPage={setPage}
              />
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default BidHistoryComponent;
