"use client";
import { Box, Grid } from "@mui/material";
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
import CommonAlert from "@/components/common/alert";

const NoticeBoardComponent = () => {
  const [noticeData, setNoticeData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState(false); // Fixed variable name typo
  const [deleteNoticeId, setDeleteNoticeId] = useState<number>();
  const [noticeToEdit, setNoticeToEdit] = useState<editNoticeTypes>();

  const onSuccess = (data: any) => {
    setNoticeData(data.result);
    setLoading(false);
  };

  const { fetchData } = useAxiosGet(
    `/notice-rule/get-notice-by-admin?page=${page}&limit=10`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (noticeToEdit) {
      setOpenForm(true);
    }
  }, [noticeToEdit]);

  const { post } = useAxiosPost(`/notice-rule/add-notice`);
  const updatePost = useAxiosPost(`/notice-rule/update-notice`);
  const updateStatus = useAxiosPost(`/notice-rule/notice-status`);

  const onSubmit = async (data: addEditNoticeTypes) => {
    const { description } = data;

    if (noticeToEdit) {
      const res = await updatePost.post({ description, id: noticeToEdit.id });
      if (res && res?.success) {
        setOpenForm(false);
        setNoticeToEdit(undefined);
        await fetchData();
      }
    } else {
      const res = await post({ description });
      if (res && res?.success) {
        setOpenForm(false);
        await fetchData();
      }
    }
  };

  const handleMarketDelete = async () => {
    const res = await updateStatus.post({ id: deleteNoticeId, active: false });
    if (res && res?.success) {
      setDeleteNoticeId(undefined);
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
    <PageContainer title="Notice Board" description="Notice Board">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Notice Board">
            <>
              <div className="flex w-full justify-end">
                <LoadingButton
                  color="primary"
                  variant="contained"
                  className="py-2"
                  aria-label="logout"
                  size="medium"
                  sx={{ width: "110px" }}
                  type="button"
                  onClick={() => setOpenForm(true)} // Consistent form opening
                >
                  Add Notice
                </LoadingButton>
              </div>

              {/* Always render the form, but control visibility with a prop */}
              <AddEditNoticeForm
                openForm={openForm}
                noticeToEdit={noticeToEdit}
                setOpenFrom={setOpenForm}
                setNoticeToEdit={setNoticeToEdit}
                onSubmit={onSubmit}
              />

              {!!deleteNoticeId && (
                <CommonAlert
                  showModal={!!deleteNoticeId}
                  AlertDiaogTitle="Confirm delete notice rule"
                  title="Are you sure,you want to delete notice rule"
                  description="Once notice is deleted it cannot be undone"
                  ButtonText="Delete"
                  onContinue={handleMarketDelete}
                  onCancel={() => {
                    setDeleteNoticeId(undefined);
                  }}
                  titleClassName="text-center"
                  contentClassName="w-full flex-col flex justify-center items-center gap-8"
                  descriptionclassName="text-black"
                />
              )}

              <CommonTable
                columns={getSiteManagementColumns({
                  setDeleteNoticeId,
                  setNoticeToEdit,
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

export default NoticeBoardComponent;
