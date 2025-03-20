import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { minBidSchema } from "./validation-schema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import useAxiosPost from "../../../hooks/axios/useAxiosPost";
import { useEffect, useState } from "react";
import { Modal } from "@/components/common/modal";
import { minBidTypes } from "./types";

const MinBetForm = ({ minBid }: { minBid: number }) => {
  const [minBidModalOpen, setMinBidModalOpen] = useState<boolean>(false);

  const {
    register,
    formState: { errors },
    control,
    reset,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<minBidTypes>(minBidSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const {
    data: settingData,
    isLoading: settingLoading,
    post,
  } = useAxiosPost(`/dashboard/set-setting`);

  useEffect(() => {
    if (!minBid) return;
    reset({
      minBet: minBid || 0,
    });
  }, [minBid]);
  const onSubmit = async (data: minBidTypes) => {
    const res = await post(data);
    if (res && res?.success) {
      setMinBidModalOpen(false);
    }
    await post(data);
  };

  return (
    <>
      <div className="flex justify-end mb-5 font-bold">
        <Button
          variant="outlined"
          disabled={settingLoading}
          onClick={() => setMinBidModalOpen(true)}
        >
          Set minimum bid
        </Button>
      </div>
      <Modal
        closeForm={() => setMinBidModalOpen(false)}
        isOpen={minBidModalOpen}
        modalTitle={`Set minimum bet`}
        className="lg:w-[50vw] max-h-[88vh]  overflow-y-auto"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Textinput
            name="minBet"
            required
            register={register}
            label="Minimum bid"
            placeholder=""
            type="number"
            classLabel="mb-2 text-slate-500 !text-sm"
            className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
            error={errors.minBet}
            onChange={() => clearErrors("minBet")}
          />
          <Button variant="contained" className="mt-10" type="submit">
            set bid
          </Button>
        </form>
      </Modal>
    </>
  );
};

export default MinBetForm;
