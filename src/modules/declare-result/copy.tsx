"use client";
import { Grid, Switch, FormControlLabel, Box } from "@mui/material";
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

interface ExternalApiResult {
  id: number;
  market: string;
  number: string;
  timing: string;
}


const DeclareResultComponent = () => {
  const [noticeData, setNoticeData] = useState<any>([]);
  const [externalResults, setExternalResults] = useState<ExternalApiResult[]>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [externalLoading, setExternalLoading] = useState<boolean>(true);
  const [openForm, setOpenForm] = useState(false);
  const [deleteNoticeId, setDeleteNoticeId] = useState<number>();
  const [noticeToEdit, setNoticeToEdit] = useState<editNoticeTypes>();
  const [deleteResultId, setDeleteResultId] = useState<number>();
  const [showInternalResults, setShowInternalResults] = useState(false); // Toggle state

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

  const fetchExternalResults = async () => {
    try {
      setExternalLoading(true);
      const response = await fetch('https://sboss.fun/admin/market_data.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          server_ip: "194.163.35.237",
          data: []
        })
      });
      const data = await response.json();
      if (data && Array.isArray(data.data)) {
        setExternalResults(data.data);
      } else {
        console.error('Invalid data structure:', data);
        setExternalResults([]);
      }
    } catch (error) {
      console.error('Error fetching external results:', error);
    } finally {
      setExternalLoading(false);
    }
  };

  const handleResultDelete = async () => {
    const res = await Delete({});
    if (res && res?.success) {
      setDeleteResultId(undefined);
      await fetchData();
    }
  };

  useEffect(() => {
    fetchData();
    fetchExternalResults();
  }, [page]);

  useEffect(() => {
    if (noticeToEdit) {
      setOpenForm(true);
    }
  }, [noticeToEdit]);

  const { post } = useAxiosPost(`/bid/declare-bid-result`);

  const onSubmit = async (data: addEditNoticeTypes) => {
    const res = await post({ ...data });
    if (res && res?.success) {
      setOpenForm(false);
      await fetchData();
    }
  };

  if (loading || externalLoading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

  return (
    <PageContainer title="Results" description="Results">
      <Grid container spacing={3}>
        {/* Toggle switch */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={showInternalResults}
                  onChange={() => setShowInternalResults(!showInternalResults)}
                  color="primary"
                />
              }
              label={showInternalResults ? "Your Results" : "External Results"}
              labelPlacement="start"
            />
          </Box>
        </Grid>

        {/* Results table (shows based on toggle state) */}
        {showInternalResults ? (
          <Grid item sm={12} className="max-w-[88vw]">
            <DashboardCard title="Your Results">
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
                    onClick={() => setOpenForm(true)}
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
        ) : (
          <Grid item sm={12} className="max-w-[88vw]">
            <DashboardCard title="External Results">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800">
                  <thead>
                    <tr className="w-full h-16 border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left pl-4 text-gray-600 dark:text-gray-400 font-normal pr-6">
                        Market Name
                      </th>
                      <th className="text-left pl-4 text-gray-600 dark:text-gray-400 font-normal pr-6">
                        Result
                      </th>
                      <th className="text-left pl-4 text-gray-600 dark:text-gray-400 font-normal pr-6">
                        Date
                      </th>
                      <th className="text-left pl-4 text-gray-600 dark:text-gray-400 font-normal pr-6">
                        Open Time
                      </th>
                      <th className="text-left pl-4 text-gray-600 dark:text-gray-400 font-normal pr-6">
                        Close Time
                      </th>
                    </tr>
                  </thead>
<tbody>
  {externalResults.map((result, index) => {
    const [openTimeRaw, closeTimeRaw] = result.timing.split(/[-–]+/).map(t => t.trim());
    return (
      <tr key={index} className="h-14 border-b border-gray-200 dark:border-gray-700">
        <td className="text-sm pl-4 pr-6 text-gray-900 dark:text-gray-300 font-medium">
          {result.market}
        </td>
        <td className="text-sm pl-4 pr-6 text-gray-900 dark:text-gray-300 font-medium">
          {result.number}
        </td>
        <td className="text-sm pl-4 pr-6 text-gray-900 dark:text-gray-300 font-medium">
          {new Date().toLocaleDateString()}
        </td>
        <td className="text-sm pl-4 pr-6 text-gray-900 dark:text-gray-300 font-medium">
          {openTimeRaw}
        </td>
        <td className="text-sm pl-4 pr-6 text-gray-900 dark:text-gray-300 font-medium">
          {closeTimeRaw}
        </td>
      </tr>
    );
  })}
</tbody>

                </table>
              </div>
            </DashboardCard>
          </Grid>
        )}
      </Grid>
    </PageContainer>
  );
};

export default DeclareResultComponent;