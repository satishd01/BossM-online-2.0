import React, { useEffect, useState } from "react";
import { Box, Typography, Stack } from "@mui/material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginTypes } from "./types";
import { loginSchema } from "./validation-schema";
import Textinput from "@/components/common/Textinput";
import { useRouter } from "next/navigation";
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";
import axiosInstance from "../../../../hooks/axios/axiosInstance";
import { currentProfile } from "@/lib/currentProfile";
import { LoadingButton } from "@mui/lab";

interface loginType {
  title?: string;
  subtitle?: JSX.Element | JSX.Element[];
  subtext?: JSX.Element | JSX.Element[];
}

const AuthLogin = ({ title, subtitle, subtext }: loginType) => {
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<LoginTypes>(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const router = useRouter();
  const { data, isError, post, isLoading } = useAxiosPost("/user/admin-login");
  const onSubmit = async (data: LoginTypes) => {
    const res: any = await post(data);

    if (res?.result && res?.success) {
      if (typeof window !== "undefined") {
        localStorage.setItem("auth", res?.result.token);
        localStorage.setItem("user", res?.result?.fullName);
        axiosInstance.defaults.headers.Authorization = res?.result.token;
        router.push("/");
      }
    }
  };

  useEffect(() => {
    const { profile } = currentProfile();
    if (profile) {
      router.push("/");
    }
  }, []);

  const onError = (error: any) => {
    console.log(error);
  };
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      <div className="w-full text-2xl font-bold text-center text-primary">
        SS Online
      </div>
      {subtext}
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack>
          <Box mt="25px">
            <Textinput
              name="user"
              register={register}
              label="Username"
              required={true}
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500"
              className="w-full h-[46px] bg-slate-100 rounded-md px-2 border-2 border-primary selection:bg-transparent "
              error={errors.user}
              onChange={() => clearErrors("user")}
            />
          </Box>
          <Box mt="25px">
            <Textinput
              name="password"
              register={register}
              label="Password"
              required={true}
              placeholder=""
              type="password"
              classLabel="mb-2 text-slate-500"
              className="w-full h-[46px] bg-slate-100 rounded-md px-2 border-2 border-primary selection:bg-transparent "
              error={errors.password}
              onChange={() => clearErrors("password")}
            />
          </Box>
        </Stack>
        <Box mt="25px">
          <LoadingButton
            loading={isLoading}
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </LoadingButton>
        </Box>
      </form>

      {subtitle}
    </>
  );
};

export default AuthLogin;
