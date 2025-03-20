"use client";
import { Divider, Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { convertCamelCaseToTitle } from "@/utils";
import MinBetForm from "./minBetForm";
import MarketBidModal from "./marketBidModal";
import Link from "next/link";
import CopyButton from "@/components/common/copyButton";

const DashboardComponent = () => {
  const [market, setMarket] = useState<{ id: number; marketName: string }>();

  const {
    data: dashboardData,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(`/dashboard/dashboard-by-admin`);

  useEffect(() => {
    fetchData();
  }, []);

  const getNavigatonPath = (key: string) => {
    switch (key) {
      case "totalUsers":
        return "/users";
      case "totalBids":
        return "/bid-history";
      case "totalGames":
        return "games";
      case "totalMarkets":
        return "/markets";
      case "totalDepositsToday":
        return "/deposit-request?today=true";
      case "totalTodaysUsers":
        return "/users?today=true";
      case "totalWithdrawals":
        return "/withdraw-request";
      case "totalWithdrawalsToday":
        return "/withdraw-request?today=true";
      case "totalBidsActive":
        return "/bid-history?today=true";
      case "totalDeposits":
        return "/deposit-request";
      case "totalWalletMoney":
        return "/users?wallet=true";
      default:
        return "/";
    }
  };

  return (
    <PageContainer title="Dashboard" description="this is Dashboard page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw] ">
          <DashboardCard title="Dashboard">
            <>
              <MinBetForm minBid={dashboardData?.result?.minBid || 0} />
              {market && (
                <MarketBidModal market={market} setMarket={setMarket} />
              )}
              <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-10 justify-center md:justify-between ">
                {dashboardData &&
                  Object.keys(dashboardData?.result)
                    ?.filter((item) => item !== "marketGameBids")
                    .map((data: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col text-center m-3 xl:m-2 w-full bg-white/95 px-5 py-2 rounded-lg text-primary  justify-between drop-shadow-md shadow-md  "
                      >
                        <Link
                          href={getNavigatonPath(data)}
                          className={
                            getNavigatonPath(data) === "/"
                              ? "cursor-default"
                              : "cursor-pointer"
                          }
                        >
                          <div key={index} className="flex flex-col">
                            <span className="text-sm  font-semibold ">
                              {convertCamelCaseToTitle(data)}
                            </span>
                            <span className="font-semibold mt-2 text-md">
                              {dashboardData?.result[data] || "-"}
                            </span>
                          </div>
                        </Link>

                        <CopyButton
                          textToCopy={`${convertCamelCaseToTitle(data)} ${
                            dashboardData?.result[data]
                          }`}
                        />
                      </div>
                    ))}
              </div>
              <>
                {dashboardData?.result["marketGameBids"] && (
                  <>
                    <Divider />

                    <span className="text-2xl font-semibold ">Game bids</span>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center md:justify-between ">
                      {dashboardData &&
                        dashboardData?.result["marketGameBids"].map(
                          (data: any, index: number) => (
                            <div
                              key={data?.id}
                              onClick={() =>
                                setMarket({
                                  id: data?.id,
                                  marketName: data?.marketName,
                                })
                              }
                              className="flex flex-col text-center m-3 xl:m-2 w-full bg-primary/90 px-5 py-2 rounded-lg text-white  justify-between drop-shadow-2xl shadow-2xl cursor-pointer hover:bg-primary/70"
                            >
                              <span className="text-lg break-words ">
                                {convertCamelCaseToTitle(data?.marketName)}
                              </span>
                              <span className="font-semibold mt-2 text-xl">
                                <span
                                  onClick={() =>
                                    setMarket({
                                      id: data?.id,
                                      marketName: data?.marketName,
                                    })
                                  }
                                >
                                  See more
                                </span>
                              </span>
                            </div>
                          )
                        )}
                    </div>
                  </>
                )}
              </>
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardComponent;
