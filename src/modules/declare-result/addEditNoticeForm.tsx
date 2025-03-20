import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Modal } from "@/components/common/modal";
import { addEditNoticechema } from "./validation-schema";
import { addEditNoticeTypes, editNoticeTypes } from "./types";
import { DatePicker } from "@/components/common/datePicker";
import SelectInput from "@/components/common/selectInput";
import useAxiosGet from "../../../hooks/axios/useAxiosGet";
const today = new Date();
const AddEditNoticeForm = ({
  openForm,
  setOpenFrom,
  noticeToEdit,
  onSubmit,
  setNoticeToEdit,
}: {
  openForm: boolean;
  noticeToEdit?: editNoticeTypes;
  setOpenFrom: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: addEditNoticeTypes) => Promise<void>;
  setNoticeToEdit: React.Dispatch<
    React.SetStateAction<editNoticeTypes | undefined>
  >;
}) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<addEditNoticeTypes>(addEditNoticechema),
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      date: today, // Set today's date as the default value
    },
  });

  useEffect(() => {
    if (noticeToEdit) {
      const { date, marketId, pannaDigit, bidDigit, session } = noticeToEdit;
      reset({
        date,
        marketId,
        pannaDigit,
        bidDigit,
        session,
      });
      setOpenFrom(true);
      setSelectedDate(undefined);
    } else {
      reset();
    }
  }, [noticeToEdit]);


  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => {
    const now = new Date();
    const istOffset = 5.5 * 60;
    const localTime = now.getTime() + now.getTimezoneOffset() * 60000 + istOffset * 60000;
    return new Date(localTime);
  });

    const [marketData, setMarketData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const onSuccess = (data: any) => {
    const mappedMarketData = data.result.data.map((market: any) => ({
      value: +market.id, // Use id as value
      label: market.marketName, // Use marketName as label
    }));
    setMarketData(mappedMarketData); // Update the marketData state with the mapped data
    setLoading(false);
  };

  const { fetchData } = useAxiosGet(
    `/market/get-market?page=1&limit=100`,
    onSuccess
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!openForm) {
      closeForm();
    }
  }, [openForm]);

  const dropdownOptions = [
    { value: "open", label: "Open" },
    { value: "close", label: "Close" },
  ];

  const closeForm = () => {
    setNoticeToEdit(undefined);
    reset({ date: today });
    setOpenFrom(false);
  };

  return (
    <Modal
      isOpen={openForm}
      modalTitle="Declare Result"
      closeForm={closeForm}
      className="w-[600px]"
    >
      <div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300">
            <div className="text-primary w-full mt-4">
              <label>Select Date</label>
              <DatePicker
                onSelect={(date) => {
                  if (date) {
                    const localDate = new Date(
                      date.setMinutes(
                        date.getMinutes() - date.getTimezoneOffset()
                      )
                    );
                    setSelectedDate(localDate);
                    setValue("date", localDate);
                  }
                }}
                selected={selectedDate}
                className="h-11"
              />

              {errors?.date?.message && (
                <div className="mt-1 h-2 text-red-400 text-sm">
                  {errors.date.message}
                </div>
              )}
            </div>

            <Controller
              name="marketId"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Select Market"
                  options={marketData}
                  value={field.value}
                  onChange={(selectedOption: any) => {
                    if (selectedOption) {
                      field.onChange(+selectedOption); // Use field.onChange
                    }
                  }}
                  placeholder="Markets"
                  labelClassName="text-lg font-normal"
                />
              )}
            />

            <Controller
              name="session"
              control={control}
              render={({ field }) => (
                <SelectInput
                  label="Session"
                  options={dropdownOptions}
                  value={field.value} // Directly use field.value
                  onChange={(selectedOption: any) => {
                    if (selectedOption) {
                      field.onChange(selectedOption); // Use field.onChange
                    }
                  }}
                  placeholder="Session"
                  labelClassName="text-lg font-normal"
                />
              )}
            />

            <Textinput
              name="pannaDigit"
              required
              register={register}
              label="Panna Digit"
              placeholder=""
              type="text"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.pannaDigit}
              onChange={() => clearErrors("pannaDigit")}
            />

            <Textinput
              name="bidDigit"
              required
              register={register}
              label="Bid Digit"
              placeholder=""
              type="text"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.bidDigit}
              onChange={() => clearErrors("bidDigit")}
            />
          </div>

          <div className="w-full flex justify-center lg:justify-end items-end mt-5">
            <Button
              color="primary"
              variant="contained"
              aria-label="submit"
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

export default AddEditNoticeForm;
