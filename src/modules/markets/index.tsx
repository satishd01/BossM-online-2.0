"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getMarketsColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import AddMarketForm from "./addMarketForm";
import { addMarketTypes, editMarketTypes, MarketStatus } from "./types";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import CommonAlert from "@/components/common/alert";
import useAxiosDelete from "../../../hooks/axios/useAxiosDelete";
import { LoadingButton } from "@mui/lab";
import useAxiosPut from "../../../hooks/axios/useAxiosPut";

const MarketsComponent = () => {
  const [marketData, setMarketData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [openForm, setOpenFrom] = useState(false);
  const [deleteMarketId, setDeleteMarketId] = useState<number>();
  const [marketToEdit, setMarketToEdit] = useState<editMarketTypes>();
  const [selectedMarketIds, setSelectedMarketIds] = useState<number[]>([]);
  const [marketStatusChange, setMarketStatusChange] = useState<MarketStatus>();

  const onSuccess = (data: any) => {
    setMarketData(data.result);
  };

  const { isLoading: dropDownListLoading, fetchData } = useAxiosGet(
    `/market/get-market?page=${page}&limit=5`,
    onSuccess
  );

  const { post } = useAxiosPost(`/market/add-market`);

  const { put } = useAxiosPut(`/market/update-market`);

  const { Delete } = useAxiosDelete(`/market/delete-market/${deleteMarketId}`);

  const { post: postChangeAllMarketStatus, isLoading } = useAxiosPost(
    `/dashboard/change-market-status`
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (marketToEdit) {
      setOpenFrom(true);
    }
  }, [marketToEdit]);

  const onSubmit = async (data: addMarketTypes) => {
    const { closeTime, marketName, openTime, weekdayStatus } = data;
    if (marketToEdit) {
      const res = await put({
        closeTime: closeTime?.replace(":", "."),
        openTime: openTime?.replace(":", "."),
        marketName,
        marketId: marketToEdit?.id,
        weekdayStatus,
      });
      if (res && res?.success) {
        setOpenFrom(false);
        setMarketToEdit(undefined);
        await fetchData();
      }
    } else {
      const res = await post({
        closeTime: closeTime?.replace(":", "."),
        openTime: openTime?.replace(":", "."),
        marketName,
        weekdayStatus,
      });
      if (res && res?.success) {
        setOpenFrom(false);
        await fetchData();
      }
    }
  };

  const handleChangeMarketStatus = async () => {
    if (!marketStatusChange) {
      return;
    }
    const res = await postChangeAllMarketStatus({
      markets: selectedMarketIds,
      status: marketStatusChange,
    });

    if (res && res?.success) {
      setMarketStatusChange(undefined);
      await fetchData();
    }
  };
  const handleMarketDelete = async () => {
    const res = await Delete({});
    if (res && res?.success) {
      setDeleteMarketId(undefined);
      await fetchData();
    }
  };

  return (
    <PageContainer title="Markets" description="this is Markets page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Markets">
            <>
              {!!marketStatusChange && (
                <CommonAlert
                  showModal={!!marketStatusChange}
                  AlertDiaogTitle="Confirm status change of Market"
                  title="Are you sure,you want to perform the action on Market"
                  description="This action will change the status of Market"
                  ButtonText="change"
                  onContinue={handleChangeMarketStatus}
                  onCancel={() => {
                    setMarketStatusChange(undefined);
                  }}
                  titleClassName="text-center"
                  contentClassName="w-full flex-col flex justify-center items-center gap-8"
                  descriptionclassName="text-black"
                />
              )}
              <div className="grid md:flex  space-y-3 md:space-y-0 md:space-x-3 w-full justify-between">
                <LoadingButton
                  color="primary"
                  // className="py-2"
                  variant="contained"
                  size="medium"
                  disabled={isLoading || !selectedMarketIds?.length}
                  sx={{ width: "200px" }}
                  type="button"
                  onClick={() => setMarketStatusChange(MarketStatus.Active)}
                >
                  Activate markets
                </LoadingButton>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  // className="py-2"
                  disabled={isLoading || !selectedMarketIds?.length}
                  size="medium"
                  sx={{ width: "200px" }}
                  type="button"
                  onClick={() => setMarketStatusChange(MarketStatus.Inactive)}
                >
                  Deactivate markets
                </LoadingButton>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  // className="py-2"
                  aria-label="logout"
                  size="medium"
                  sx={{ width: "200px" }}
                  type="button"
                  onClick={() => setOpenFrom(true)}
                >
                  Add market
                </LoadingButton>
              </div>

              {openForm && (
                <AddMarketForm
                  openForm={openForm}
                  marketToEdit={marketToEdit}
                  setOpenFrom={setOpenFrom}
                  setMarketToEdit={setMarketToEdit}
                  onSubmit={onSubmit}
                />
              )}

              {!!deleteMarketId && (
                <CommonAlert
                  showModal={!!deleteMarketId}
                  AlertDiaogTitle="Confirm delete Market"
                  title="Are you sure,you want to delete Market"
                  description="Once Market is deleted it cannot be undone"
                  ButtonText="Delete"
                  onContinue={handleMarketDelete}
                  onCancel={() => {
                    setDeleteMarketId(undefined);
                  }}
                  titleClassName="text-center"
                  contentClassName="w-full flex-col flex justify-center items-center gap-8"
                  descriptionclassName="text-black"
                />
              )}
              <CommonTable
                setSelectedIds={setSelectedMarketIds}
                columns={getMarketsColumns({
                  setDeleteMarketId,
                  setMarketToEdit,
                })}
                data={marketData}
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

export default MarketsComponent;
