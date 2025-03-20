"use client";
import { Box, Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import CommonAlert from "@/components/common/alert";
import useAxiosPut from "../../../hooks/axios/useAxiosPut";
import { useSearchParams } from "next/navigation";
const WithdrawRequestComponent = () => {
  const [withdrawData, setWithdrawData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionId, setActionId] = useState<any>();
  const searchParams = useSearchParams();
  const [pagination, setPagination] = useState<string | number>(5);
  const today = searchParams.get("today");
  const onSuccess = (data: any) => {
    setWithdrawData(data.result);
    setLoading(false);
  };

  const { put } = useAxiosPut(
    `/dashboard/update-txn-by-admin/${actionId?.txnId}`
  );
  const {
    data: dropDownData,
    isError: dropDownListError,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(
    `/dashboard/get-transaction-history-by-admin?page=${page}&limit=${pagination === "All" ? "1000000000" : pagination || 10}&type=WITHDRAWAL&${
      today ? "today=true" : ""
    }`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

  const handleAcceptReject = async () => {
    const res: any = await put(actionId);
    if (res && res?.success) {
      setActionId(undefined);
      await fetchData();
    }
  };

  return (
    <PageContainer
      title="Withdraw Request"
      description="this is withdraw request page"
    >
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Withdraw Request">
            <>
              <CommonAlert
                showModal={!!actionId}
                AlertDiaogTitle="Confirm the transaction"
                title="Are you sure,you want to confirm the transaction"
                description="Once it is done it cannot be undone"
                ButtonText="Confirm"
                onContinue={handleAcceptReject}
                onCancel={() => {
                  setActionId(undefined);
                }}
                titleClassName="text-center"
                contentClassName="w-full flex-col flex justify-center items-center gap-8"
                descriptionclassName="text-black"
              />
              <CommonTable
                columns={getSiteManagementColumns({ setActionId })}
                data={withdrawData}
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

export default WithdrawRequestComponent;
