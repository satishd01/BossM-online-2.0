"use client";
import { Divider, Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { convertCamelCaseToTitle } from "@/utils";
import MinBetForm from "./minBetForm";
import MarketBidModal from "./marketBidModal";
import Link from "next/link";
import CopyButton from "@/components/common/copyButton";

// ✅ Define types for transactions and dashboard data
interface TransactionCounts {
  body: {
    withdrawalPending: number;
    additionPending: number;
    totalPending: number;
    totalUsers: number;
  };
}

interface MarketGameBid {
  id: number;
  marketName: string;
}

interface DashboardResult {
  minBid: number;
  marketGameBids?: MarketGameBid[];
  [key: string]: any; // for other dynamic keys like totalUsers, totalBids, etc.
}

interface DashboardData {
  result: DashboardResult;
}

const DashboardComponent = () => {
  const [market, setMarket] = useState<{ id: number; marketName: string }>();
  const [pendingTransactions, setPendingTransactions] = useState({
    withdrawalPending: 0,
    additionPending: 0,
    totalPending: 0,
    totalUsers: 0
  });
  const [blink, setBlink] = useState(false);

  // ✅ Properly typed usage of useAxiosGet
  const {
    data: dashboardData,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet<DashboardData>(`/dashboard/dashboard-by-admin`);

  const { fetchData: fetchTransactions } = useAxiosGet<TransactionCounts>(
    `/user/transactions/counts`,
    (data) => {
      setPendingTransactions(data.body);
      if (data.body.totalPending > 0) {
        const interval = setInterval(() => setBlink(prev => !prev), 1000);
        return () => clearInterval(interval);
      }
    }
  );

  useEffect(() => {
    fetchData();
    fetchTransactions();
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
      <style jsx global>{`
        @keyframes blink {
          0% { background-color: #ef4444; }
          50% { background-color: #dc2626; }
          100% { background-color: #ef4444; }
        }
        .pending-alert {
          transition: all 0.3s ease;
        }
      `}</style>

      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Dashboard">
            <>
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                {/* Withdrawal Alert */}
                <Link href="/withdraw-request" className="flex-1">
                  <div
                    className={`pending-alert h-16 w-full rounded-lg shadow-md flex items-center justify-between px-4
                    ${pendingTransactions.withdrawalPending > 0
                        ? 'text-white animate-[blink_1s_infinite]'
                        : 'bg-gray-100 text-gray-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Withdrawals</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {pendingTransactions.withdrawalPending}
                      </span>
                      {pendingTransactions.withdrawalPending > 0 && (
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </Link>

                {/* Deposit Alert */}
                <Link href="/deposit-request" className="flex-1">
                  <div
                    className={`pending-alert h-16 w-full rounded-lg shadow-md flex items-center justify-between px-4
                    ${pendingTransactions.additionPending > 0
                        ? 'text-white animate-[blink_1s_infinite]'
                        : 'bg-gray-100 text-gray-700'}`}
                  >
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      <span className="font-medium">Deposits</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {pendingTransactions.additionPending}
                      </span>
                      {pendingTransactions.additionPending > 0 && (
                        <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>

              <MinBetForm minBid={dashboardData?.result?.minBid || 0} />
              {market && (
                <MarketBidModal market={market} setMarket={setMarket} />
              )}

              <div className="grid sm:grid-cols-3 md:grid-cols-4 gap-10 justify-center md:justify-between">
                {dashboardData &&
                  Object.keys(dashboardData?.result)
                    ?.filter((item) => item !== "marketGameBids")
                    .map((data: any, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col text-center m-3 xl:m-2 w-full bg-white/95 px-5 py-2 rounded-lg text-primary justify-between drop-shadow-md shadow-md"
                      >
                        <Link
                          href={getNavigatonPath(data)}
                          className={
                            getNavigatonPath(data) === "/"
                              ? "cursor-default"
                              : "cursor-pointer"
                          }
                        >
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold">
                              {convertCamelCaseToTitle(data)}
                            </span>
                            <span className="font-semibold mt-2 text-md">
                              {dashboardData?.result[data] || "-"}
                            </span>
                          </div>
                        </Link>
                        <CopyButton
                          textToCopy={`${convertCamelCaseToTitle(data)} ${dashboardData?.result[data]}`}
                        />
                      </div>
                    ))}
              </div>

              {dashboardData?.result["marketGameBids"] && (
                <>
                  <Divider />
                  <span className="text-2xl font-semibold">Game bids</span>
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center md:justify-between">
                    {dashboardData?.result["marketGameBids"].map(
                      (data: MarketGameBid, index: number) => (
                        <div
                          key={data?.id}
                          onClick={() =>
                            setMarket({
                              id: data?.id,
                              marketName: data?.marketName,
                            })
                          }
                          className="flex flex-col text-center m-3 xl:m-2 w-full bg-primary/90 px-5 py-2 rounded-lg text-white justify-between drop-shadow-2xl shadow-2xl cursor-pointer hover:bg-primary/70"
                        >
                          <span className="text-lg break-words">
                            {convertCamelCaseToTitle(data?.marketName)}
                          </span>
                          <span className="font-semibold mt-2 text-xl">
                            See more
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </>
              )}
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default DashboardComponent;
