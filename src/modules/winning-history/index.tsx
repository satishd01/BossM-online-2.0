"use client";
import { Grid, TextField, Button, Box } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getWinningHistoryColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

const WinningHistoryComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<string | number>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>([]);

  const {
    data: dropDownData,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(`/bid/win-history-admin?page=${page}&limit=${pagination === "All" ? "1000000000" : pagination || 10}`);

  useEffect(() => {
    if (page) {
      fetchData();
    }
  }, [page, pagination]);

  useEffect(() => {
    if (dropDownData?.result?.data) {
      const filtered = dropDownData.result.data.filter((item: any) => {
        return (
          item.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.userId?.toString().includes(searchTerm) ||
          item.gameName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.marketName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.winAmount?.toString().includes(searchTerm)
        );
      });
      setFilteredData(filtered);
    }
  }, [searchTerm, dropDownData]);

  const exportToPDF = () => {
    const doc = new jsPDF();
    const title = "Winning History Report";
    const date = format(new Date(), "dd/MM/yyyy");
    
    // Add title and date
    doc.setFontSize(18);
    doc.text(title, 14, 15);
    doc.setFontSize(11);
    doc.text(`Generated on: ${date}`, 14, 22);
    
    // Prepare table data
    const headers = [
      "User",
      "User ID",
      "Game",
      "Market",
      "Win Amount",
      "Date",
      "Session"
    ];
    
    const data = filteredData.map((item: any) => [
      item.userName || "N/A",
      item.userId,
      item.gameName || "N/A",
      item.marketName || "N/A",
      `¥${item.winAmount}`,
      format(new Date(item.date), "dd/MM/yyyy h:mma"),
      item.session
    ]);
    
    // Add table using autoTable plugin
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
    
    doc.save(`winning_history_${date}.pdf`);
  };

  return (
    <PageContainer title="Winning history" description="this is winning history page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
<DashboardCard title="Winning history">
  <Box>
    <Box display="flex" flexDirection="column" gap={2} mb={3}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search by user, game, market, etc."
      />
      <Box display="flex" justifyContent="flex-end">
        <Button 
          variant="contained" 
          color="primary"
          onClick={exportToPDF}
          disabled={dropDownListLoading || !filteredData.length}
        >
          Export to PDF
        </Button>
      </Box>
    </Box>

    <CommonTable
      columns={getWinningHistoryColumns()}
      data={{
        data: filteredData,
        pagination: dropDownData?.result?.pagination || {
          currentPage: 1,
          totalPages: 1,
          limit: 10,
          totalData: filteredData.length
        }
      }}
      setPagination={setPagination}
      pagination={pagination}
      isLoading={dropDownListLoading}
      page={page}
      setPage={setPage}
    />
  </Box>
</DashboardCard>

        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WinningHistoryComponent;