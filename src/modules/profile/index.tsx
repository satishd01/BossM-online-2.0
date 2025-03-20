"use client";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import DashboardCard from "@/app/(DashboardLayout)/components/shared/DashboardCard";
import { Button, Grid } from "@mui/material";
import { useState } from "react";
import useAxiosPut from "../../../hooks/axios/useAxiosPut";
import Textinput from "@/components/common/Textinput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { passwordTypes } from "./types";
import passwordSchema from "./validation-schema";

const ProfileComponent = () => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<passwordTypes>(passwordSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const [notificationData, setNotificationData] = useState<any>([]);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = (data: any) => {
    setNotificationData(data.result);
    setLoading(false);
  };

  const {
    data: dropDownData,
    isLoading: dropDownListLoading,
    put,
  } = useAxiosPut(`user/change-admin-password`);

  const onSubmit = async (data: passwordTypes) => {
    const res = await put(data);
  };

  return (
    <PageContainer title="Profile" description="this is Profile page">
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <DashboardCard title="Profile">
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300 ">
                <Textinput
                  name="oldPassword"
                  required
                  register={register}
                  label="Old password"
                  placeholder=""
                  type="string"
                  classLabel="mb-2 text-slate-500 !text-sm"
                  className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
                  error={errors.oldPassword}
                  onChange={() => clearErrors("oldPassword")}
                />
                <Textinput
                  name="newPassword"
                  register={register}
                  label="New password"
                  required={true}
                  placeholder=""
                  type="string"
                  classLabel="mb-2 text-slate-500 !text-sm"
                  className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent "
                  error={errors.newPassword}
                  onChange={() => clearErrors("newPassword")}
                />
                <Textinput
                  name="confirmPassword"
                  required
                  register={register}
                  label="Confirm password"
                  placeholder=""
                  type="string"
                  classLabel="mb-2 text-slate-500 !text-sm"
                  className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
                  error={errors.confirmPassword}
                  onChange={() => clearErrors("confirmPassword")}
                />
              </div>

              <div className="w-full flex justify-center lg:justify-end items-end mt-5">
                <Button
                  color="primary"
                  variant="contained"
                  aria-label="logout"
                  size="large"
                  sx={{ width: "100%" }}
                  type="submit"
                >
                  Save
                </Button>
              </div>
            </form>
          </DashboardCard>
        </Grid>
      </Grid>
    </PageContainer>
  );
};
export default ProfileComponent;
