import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { addMarketTypes, editMarketTypes, WeekdayStatus } from "./types";
import { addMarketSchema } from "./validation-schema";
import { Modal } from "@/components/common/modal";
import { convertTo24HourFormat } from "@/utils";
import { weekDays } from "./constants";
import React from "react";
const AddMarketForm = ({
  openForm,
  setOpenFrom,
  marketToEdit,
  onSubmit,
  setMarketToEdit,
}: {
  openForm: boolean;
  marketToEdit?: addMarketTypes;
  setOpenFrom: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: addMarketTypes) => Promise<void>;
  setMarketToEdit: React.Dispatch<
    React.SetStateAction<editMarketTypes | undefined>
  >;
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>();
  const [selectedDays, setSelectedDays] = useState<number[]>([]);

  const handleDayClick = (index: number) => {
    setSelectedDays(
      (prevDays) =>
        prevDays.includes(index)
          ? prevDays.filter((day) => day !== index) // Remove the day if it's already selected
          : [...prevDays, index] // Add the day if it's not selected
    );
  };

  const {
    register,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<addMarketTypes>(addMarketSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    const weekdayStatus: WeekdayStatus = {
      0: selectedDays.includes(0) ? "active" : "inactive",
      1: selectedDays.includes(1) ? "active" : "inactive",
      2: selectedDays.includes(2) ? "active" : "inactive",
      3: selectedDays.includes(3) ? "active" : "inactive",
      4: selectedDays.includes(4) ? "active" : "inactive",
      5: selectedDays.includes(5) ? "active" : "inactive",
      6: selectedDays.includes(6) ? "active" : "inactive",
    };
    // Update form value
    setValue("weekdayStatus", weekdayStatus);
  }, [selectedDays, setValue]);

  useEffect(() => {
    if (marketToEdit) {
      const { closeTime, marketName, openTime } = marketToEdit;
      reset({
        closeTime: convertTo24HourFormat(closeTime),
        marketName,
        openTime: convertTo24HourFormat(openTime),
        weekdayStatus: marketToEdit.weekdayStatus,
      });
      const activeDays = Object.entries(marketToEdit.weekdayStatus)
        .filter(([_, status]) => status === "active")
        .map(([index]) => Number(index));

      // Set the selectedDays based on the activeDays
      setSelectedDays(activeDays);
      setOpenFrom(true);
    }
  }, [marketToEdit]);

  const closeForm = () => {
    setMarketToEdit(undefined);
    reset();
    setOpenFrom(false);
  };
  return (
    <Modal
      isOpen={openForm}
      modalTitle="Add a new market"
      closeForm={closeForm}
      className="w-[600px]"
    >
      <div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300 ">
            <Textinput
              name="marketName"
              required
              register={register}
              label="Market name"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.marketName}
              onChange={() => clearErrors("marketName")}
            />
            <>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Open time:
              </label>
              <div className="relative">
                <input
                  {...register("openTime")}
                  type="time"
                  id="openTime"
                  onChange={() => clearErrors("openTime")}
                  name="openTime"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              {errors?.openTime?.message && (
                <div
                  className={`mt-1 h-2 text-red-400  ${"text-danger-500 block text-sm"}`}
                >
                  {errors?.openTime?.message || ""}
                </div>
              )}
            </>

            <>
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Close time:
              </label>
              <div className="relative">
                <input
                  {...register("closeTime")}
                  type="time"
                  id="closeTime"
                  onChange={() => clearErrors("closeTime")}
                  name="closeTime"
                  className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors?.closeTime?.message && (
                  <div
                    className={`mt-1 h-2 text-red-400  ${"text-danger-500 block text-sm"}`}
                  >
                    {errors?.closeTime?.message || ""}
                  </div>
                )}
              </div>
            </>

            <div className="flex flex-wrap">
              {Object.entries(weekDays).map(([index, day]) => (
                <div
                  key={index}
                  className={`inline-block cursor-pointer p-2 text-white font-semibold w-24 rounded-lg m-2 text-center ${
                    selectedDays.includes(Number(index))
                      ? "bg-primary "
                      : "bg-red-500 line-through"
                  }`}
                  onClick={() => handleDayClick(Number(index))}
                >
                  {day}
                </div>
              ))}
            </div>
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
    </Modal>
  );
};

export default AddMarketForm;
