"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import BroadCastNotification from "./components/broadcastNotification";

const NotificationsComponent = () => {
  const [notificationData, setNotificationData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = (data: any) => {
    setNotificationData(data.result);
    setLoading(false);
  };

  const { isLoading: dropDownListLoading, fetchData } = useAxiosGet(
    `/notification/get-notification-by-admin?page=${page}&limit=10`,
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

  return (
    <PageContainer
      title="Notifications"
      description="this is notifications page"
    >
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Notifications">
            <>
              <BroadCastNotification fetchData={fetchData} />
              <CommonTable
                columns={getSiteManagementColumns()}
                data={notificationData}
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

export default NotificationsComponent;
