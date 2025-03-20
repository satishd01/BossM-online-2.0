"use client";
import { Grid } from "@mui/material";
import DashboardCard from "@/app/(DashboardLayout)//components/shared/DashboardCard";
import { CommonTable } from "@/components/commonTable";
import { getGamesColumns } from "./constants/columns";
import React, { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
import { LoadingButton } from "@mui/lab";
import AddEditGameForm from "./addEditGameForm";
import { addEditGameTypes, editGameTypes } from "./types";
import axiosInstance from "../../../hooks/axios/axiosInstance";
import CommonAlert from "@/components/common/alert";
import useAxiosDelete from "../../../hooks/axios/useAxiosDelete";

const GamesComponent = () => {
  const [gameData, setGameData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [openForm, setOpenFrom] = useState(false);
  const [deleteGameId, setDeleteGameId] = useState<number>();
  const [gameToEdit, setGameToEdit] = useState<editGameTypes>();

  const onSuccess = (data: any) => {
    setGameData(data.result);
    setLoading(false);
  };

  const {
    data: dropDownData,
    isError: dropDownListError,
    isLoading: dropDownListLoading,
    fetchData,
  } = useAxiosGet(`/game/get-games?page=${page}&limit=5`, onSuccess);

  const { Delete } = useAxiosDelete(`/game/delete-game/${deleteGameId}`);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    if (gameToEdit) {
      setOpenFrom(true);
    }
  }, [gameToEdit]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        {/* <LoadingOverlay text="Loading..." isError={false} isSuccess={false} /> */}
      </div>
    );
  }

  const onSubmit = async (data: addEditGameTypes) => {
    const { file, gameName, rate } = data;
    const response = await fetch(file);
    const gameImage = await response.blob();

    const formData = new FormData();
    formData.append("files", gameImage);
    formData.append("gameName", gameName);
    formData.append("rate", rate?.toString());

    const endpoint = gameToEdit
      ? `/game/update-game/${gameToEdit.id}`
      : `/game/add-game`;

    const res = await axiosInstance.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res?.data?.success) {
      await fetchData();
      setOpenFrom(false);
      setGameToEdit(undefined);
    }
  };
  const handleGameDelete = async () => {
    const res = await Delete({});
    if (res && res?.success) {
      setDeleteGameId(undefined);
      await fetchData();
    }
  };
  return (
    <PageContainer title="Games" description="this is Games page">
      <Grid container spacing={3}>
        <Grid item sm={12} className="max-w-[88vw]">
          <DashboardCard title="Games">
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
                  onClick={() => setOpenFrom(true)}
                >
                  Add Game
                </LoadingButton>
              </div>
              {openForm && (
                <AddEditGameForm
                  openForm={openForm}
                  gameToEdit={gameToEdit}
                  setOpenFrom={setOpenFrom}
                  setGameToEdit={setGameToEdit}
                  onSubmit={onSubmit}
                />
              )}

              {!!deleteGameId && (
                <CommonAlert
                  showModal={!!deleteGameId}
                  AlertDiaogTitle="Confirm delete Game"
                  title="Are you sure,you want to delete Game"
                  description="Once Game is deleted it cannot be undone"
                  ButtonText="Delete"
                  onContinue={handleGameDelete}
                  onCancel={() => {
                    setDeleteGameId(undefined);
                  }}
                  titleClassName="text-center"
                  contentClassName="w-full flex-col flex justify-center items-center gap-8"
                  descriptionclassName="text-black"
                />
              )}
              <CommonTable
                columns={getGamesColumns({ setDeleteGameId, setGameToEdit })}
                data={gameData}
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

export default GamesComponent;
