"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getWinningHistoryColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";

const WinningHistoryComponent = () => {
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<string | number>(5);


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
  return (
    <PageContainer
      title="Winning history"
      description="this is winning history page"
    >
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Winning history">
            <CommonTable
              columns={getWinningHistoryColumns()}
              data={dropDownData?.result}
              setPagination={setPagination}
              pagination={pagination}
              isLoading={dropDownListLoading}
              page={page}
              setPage={setPage}
            />
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default WinningHistoryComponent;
