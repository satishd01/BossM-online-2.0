import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { editUserSchema } from "./validation-schema";
import { EditUserDetails } from "./types";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
const EditUserDetailsForm = ({
  deductAmountForUserID,
  openDetailUser,
  addAmountForUserID,
  setOpenFrom,
  onSubmit,
}: {
  addAmountForUserID?: number | undefined;
  deductAmountForUserID?: number | undefined;
  openDetailUser: EditUserDetails | undefined;
  setOpenFrom: Dispatch<SetStateAction<EditUserDetails | undefined>>;
  onSubmit: (data: EditUserDetails) => Promise<void>;
}) => {
  const {
    register,
    formState: { errors },
    control,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<EditUserDetails>(editUserSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (openDetailUser) {
      reset({
        accNumber: openDetailUser?.accNumber,
        ifsc: openDetailUser?.ifsc,
        googlePay: openDetailUser?.googlePay,
        paytm: openDetailUser?.paytm,
        phonePe: openDetailUser?.phonePe,
        upi: openDetailUser?.upi,
        userId: openDetailUser?.userId,
      });
    } else
      reset({
        userId: deductAmountForUserID || addAmountForUserID,
      });
    {
    }
  }, [openDetailUser]);
  return (
    <div>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        {!deductAmountForUserID && !addAmountForUserID && (
          <div className="w-full pb-5 grid grid-cols-2 gap-2 justify-center  border-b border-slate-300 ">
            <Textinput
              name="accNumber"
              register={register}
              label="Account number"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.accNumber}
              onChange={() => clearErrors("accNumber")}
            />
            <Textinput
              name="googlePay"
              register={register}
              label="Google pay"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent "
              error={errors.googlePay}
              onChange={() => clearErrors("googlePay")}
            />
            <Textinput
              name="ifsc"
              register={register}
              label="IFSC code"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.ifsc}
              onChange={() => clearErrors("ifsc")}
            />
            <Textinput
              name="paytm"
              register={register}
              label="Paytm"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.paytm}
              onChange={() => clearErrors("paytm")}
            />

            <Textinput
              name="phonePe"
              register={register}
              label="PhonePe"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.phonePe}
              onChange={() => clearErrors("phonePe")}
            />
            <Textinput
              name="upi"
              register={register}
              label="Upi"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.upi}
              onChange={() => clearErrors("upi")}
            />
          </div>
        )}

        {deductAmountForUserID && (
          <Textinput
            name="subWallet"
            required
            register={register}
            label="Deduct Wallet"
            placeholder=""
            type="number"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.subWallet}
            onChange={() => clearErrors("subWallet")}
          />
        )}
        {addAmountForUserID && (
          <Textinput
            name="addWallet"
            required
            register={register}
            label="Add amount in wallet"
            placeholder=""
            type="number"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.addWallet}
            onChange={() => clearErrors("addWallet")}
          />
        )}

        <div className="w-full flex justify-center lg:justify-end items-end mt-5">
          <Button
            color="primary"
            variant="contained"
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

export default EditUserDetailsForm;
