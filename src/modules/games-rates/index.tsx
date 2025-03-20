"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";

const GamesRatesComponent = () => {
  const [gameData, setGameData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = (data: any) => {
    setGameData(data.result);
    setLoading(false);
  };

  const {
    data: dropDownData,
    isError: dropDownListError,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(
    `/game/get-game-rate-by-admin?page=${page}&limit=10`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    console.log("loading");
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

  return (
    <PageContainer title="Games Rates" description="this is games rates page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Games Rates">
            <CommonTable
              columns={getSiteManagementColumns()}
              data={gameData}
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

export default GamesRatesComponent;
