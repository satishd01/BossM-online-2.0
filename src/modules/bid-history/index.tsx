"use client";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import CommonAlert from "@/components/common/alert";
import { useSearchParams } from "next/navigation";

const BidHistoryComponent = () => {
  const [bidHistoryData, setBidHistoryData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();
  const [bidAmount, setBidAmount] = useState<string>(""); // New state for the bid amount input
  const searchParams = useSearchParams();
  const [pagination, setPagination] = useState<string | number>(5);

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

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

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

  return (
    <PageContainer title="Bid History" description="this is bid history page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Bid History">
            <>
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
              <CommonTable
                columns={getSiteManagementColumns({ setActionId })}
                data={bidHistoryData}
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
