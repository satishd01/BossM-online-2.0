"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getAgentsColumns } from "./constants/colums";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { LoadingButton } from "@mui/lab";
import AddEditAgentForm from "./addeditagentform";
import { addEditAgentTypes, editAgentTypes } from "./types";
import axiosInstance from "../../../hooks/axios/axiosInstance";
import CommonAlert from "@/components/common/alert";

const AgentComponent = () => {
  const [agentData, setAgentData] = useState<addEditAgentTypes[]>([]);
  const [page, setPage] = useState<number>(1);
  const [openForm, setOpenFrom] = useState(false);
  const [deleteAgentId, setDeleteAgentId] = useState<number>();
  const [agentToEdit, setAgentToEdit] = useState<editAgentTypes>();

  const fetchAgents = async () => {
    try {
      const response = await axiosInstance.get("/user/agent-profile", {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiZW1haWwiOiJhZ2VudGFAYWRtaW4uY29tIiwicGhvbmVOdW1iZXIiOiIrOTE2ODc2NTQzMjEwIiwiZnVsbE5hbWUiOiJhZG1pbiBVc2VyIiwicm9sZSI6IkFHRU5UIiwiaXNBZG1pbiI6dHJ1ZSwiaWF0IjoxNzQ0ODkyNzQ2fQ.c_VUTi64KYpbvlA0CGnNrRpxEdd7xfkx5GFSzWtSMyk",
        },
      });
      if (response?.data?.success) {
        setAgentData(response.data.body || []);
      }
    } catch (error) {
      console.error("Failed to fetch agents:", error);
    }
  };

  useEffect(() => {
    fetchAgents();
  }, [page]);

  const onSubmit = async (data: addEditAgentTypes) => {
    try {
      const payload: Record<string, any> = {
        phoneNumber: data.phoneNumber,
        password: data.password,
        fullName: data.fullName,
        deviceToken: "fcm_device_token_123",
        role: "AGENT",
      };
      
      if (data.email) {
        payload.email = data.email;
      }
  
      const response = await axiosInstance.post("/user/admin-signup", payload);
  
      if (response?.data?.success) {
        await fetchAgents();
        setOpenFrom(false);
        setAgentToEdit(undefined);
      }
    } catch (error) {
      console.error("Error submitting agent form:", error);
    }
  };

  const handleAgentDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/user/delete-agent/${deleteAgentId}`);
      if (response?.data?.success) {
        setDeleteAgentId(undefined);
        await fetchAgents();
      }
    } catch (error) {
      console.error("Error deleting agent:", error);
    }
  };

  return (
    <PageContainer title="Agents" description="this is Agents page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Agents">
            <>
              <div className="flex w-full justify-end mb-4">
                <LoadingButton
                  color="primary"
                  variant="contained"
                  className="py-2"
                  size="medium"
                  sx={{ width: "110px" }}
                  type="button"
                  onClick={() => setOpenFrom(true)}
                >
                  Add Agent
                </LoadingButton>
              </div>

              {openForm && (
                <AddEditAgentForm
                  openForm={openForm}
                  agentToEdit={agentToEdit}
                  setOpenFrom={setOpenFrom}
                  setAgentToEdit={setAgentToEdit}
                  onSubmit={onSubmit}
                />
              )}

              {!!deleteAgentId && (
                <CommonAlert
                  showModal={!!deleteAgentId}
                  AlertDiaogTitle="Confirm delete Agent"
                  title="Are you sure you want to delete this agent?"
                  description="Once an agent is deleted, it cannot be undone."
                  ButtonText="Delete"
                  onContinue={handleAgentDelete}
                  onCancel={() => setDeleteAgentId(undefined)}
                />
              )}

              <CommonTable
                columns={getAgentsColumns({ setDeleteAgentId, setAgentToEdit })}
                data={{
                  data: agentData,
                  pagination: {
                    page: page,
                    total: agentData.length,
                  },
                }}
                page={page}
                setPage={setPage}
                isLoading={false}
              />
            </>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default AgentComponent;
