"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getSiteManagementColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { LoadingButton } from "@mui/lab";
import AddEditNoticeForm from "./addEditNoticeForm";
import { addEditNoticeTypes, editNoticeTypes } from "./types";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import useAxiosDelete from "../../../hooks/axios/useAxiosDelete";
import CommonAlert from "@/components/common/alert";

const DeclareResultComponent = () => {
  const [noticeData, setNoticeData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState(false); // Fixed variable name typo
  const [deleteNoticeId, setDeleteNoticeId] = useState<number>();
  const [noticeToEdit, setNoticeToEdit] = useState<editNoticeTypes>();
  const [deleteResultId, setDeleteResultId] = useState<number>();

  const onSuccess = (data: any) => {
    setNoticeData(data.result);
    setLoading(false);
  };

  const { Delete } = useAxiosDelete(
    `bid/delete-result?resultId=${deleteResultId}`
  );


  const { fetchData } = useAxiosGet(
    `/bid/result-history-admin?page=${page}&limit=10`,
    onSuccess
  );

  const handleResultDelete = async () => {
    const res = await Delete({});
    if (res && res?.success) {
      setDeleteResultId(undefined);
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (noticeToEdit) {
      setOpenForm(true);
    }
  }, [noticeToEdit]);

  const { post } = useAxiosPost(`/bid/declare-bid-result`);
  // const  updatePost = useAxiosPost(`/notice-rule/update-notice`);
  // const  updateStatus = useAxiosPost(`/notice-rule/notice-status`);

  const onSubmit = async (data: addEditNoticeTypes) => {
    const res = await post({ ...data });
    if (res && res?.success) {
      setOpenForm(false);
      await fetchData();
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

  return (
    <PageContainer title="Results" description="Results">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Result">
            <>
              <div className="flex w-full justify-end">
                <LoadingButton
                  color="primary"
                  variant="contained"
                  className="py-2"
                  aria-label="logout"
                  size="medium"
                  sx={{ width: "160px" }}
                  type="button"
                  onClick={() => setOpenForm(true)} // Consistent form opening
                >
                  Declare Result
                </LoadingButton>
              </div>

              <CommonAlert
                showModal={!!deleteResultId}
                AlertDiaogTitle="Confirm Delete Result"
                title="Are you sure,you want to delete this result"
                description="Once result is deleted the associated bids will get their bid amount refunded"
                ButtonText="Delete"
                onContinue={handleResultDelete}
                onCancel={() => {
                  setDeleteResultId(undefined);
                }}
                titleClassName="text-center"
                contentClassName="w-full flex-col flex justify-center items-center gap-8"
                descriptionclassName="text-black"
              />

              <AddEditNoticeForm
                openForm={openForm}
                noticeToEdit={noticeToEdit}
                setOpenFrom={setOpenForm}
                setNoticeToEdit={setNoticeToEdit}
                onSubmit={onSubmit}
              />

              <CommonTable
                columns={getSiteManagementColumns({
                  setDeleteNoticeId,
                  setNoticeToEdit,
                  setDeleteResultId
                })}
                data={noticeData}
                isLoading={loading}
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

export default DeclareResultComponent;
