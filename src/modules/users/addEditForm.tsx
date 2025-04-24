import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addUserSchema } from "./validation-schema";
import { AddUserData } from "./types";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction } from "react";
const AddEditUserForm = ({
  setOpenFrom,
  onSubmit,
}: {
  setOpenFrom: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: AddUserData) => Promise<void>;
}) => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<AddUserData>(addUserSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <div>
      <form autoComplete="off"  onSubmit={handleSubmit((data) => {
    const { email, ...rest } = data;
    const payload = {
      ...rest,
      ...(email ? { email } : {}), // Only include email if it has a value
    };
    onSubmit(payload);
  })}>
        <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300 ">
          <Textinput
            name="fullName"
            required
            register={register}
            label="Full name"
            placeholder=""
            type="string"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.fullName}
            onChange={() => clearErrors("fullNamesad")}
          />
          <Textinput
            name="email"
            register={register}
            label="Email"
            placeholder=""
            type="string"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent "
            error={errors.email}
            onChange={() => clearErrors("email")}
          />
          <Textinput
            name="phoneNumber"
            required
            register={register}
            label="Phone Number"
            placeholder=""
            type="string"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.phoneNumber}
            onChange={() => clearErrors("phoneNumber")}
          />
          <Textinput
            name="password"
            required
            register={register}
            label="Password"
            placeholder=""
            type="string"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.password}
            onChange={() => clearErrors("Password")}
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
    </div>
  );
};

export default AddEditUserForm;
