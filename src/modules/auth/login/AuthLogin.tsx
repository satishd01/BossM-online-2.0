import React, { useEffect, useState } from "react";
import { Box, Typography, Stack, MenuItem, TextField } from "@mui/material";
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
  const [selectedRole, setSelectedRole] = useState<string>(""); // Store the selected role locally
  const {
    register,
    formState: { errors },
    clearErrors,
    handleSubmit,
  } = useForm<LoginTypes>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const router = useRouter();
  const { post, isError, isLoading } = useAxiosPost("/user/admin-login");

  const onSubmit = async (formData: LoginTypes) => {
    // Exclude role from the form data before submission, since it's not needed by the API
    const { user, password } = formData;

    // Send only user and password to the API
    const res: any = await post({ user, password });

    if (res?.body && res?.success) {
      if (typeof window !== "undefined") {
        const { token, fullName, role, isAdmin } = res.body;

        localStorage.setItem("auth", token);
        localStorage.setItem("user", fullName);
        localStorage.setItem("role", role);
        localStorage.setItem("isAdmin", JSON.stringify(isAdmin));

        axiosInstance.defaults.headers.Authorization = token;
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
        BossM online
      </div>
      {subtext}
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit, onError)}>
        <Stack>
          <Box mt="25px">
            <Textinput
              name="user"
              register={register}
              label="Username"
              required
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
              required
              placeholder=""
              type="password"
              classLabel="mb-2 text-slate-500"
              className="w-full h-[46px] bg-slate-100 rounded-md px-2 border-2 border-primary selection:bg-transparent "
              error={errors.password}
              onChange={() => clearErrors("password")}
            />
          </Box>

          {/* Role selection for UI purposes only */}
          <Box mt="25px">
            <TextField
              select
              fullWidth
              label="Select Role"
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)} // Update local state on change
              error={false} // No need for error validation
            >
              <MenuItem value="ADMIN">Admin</MenuItem>
              <MenuItem value="AGENT">Agent</MenuItem>
            </TextField>
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
