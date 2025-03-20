import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Modal } from "@/components/common/modal";
import { addEditNoticechema } from "./validation-schema";
import { addEditNoticeTypes, editNoticeTypes } from "./types";
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
    formState: { errors },
    reset,
    clearErrors,
    setValue,
    watch,
    getValues,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<addEditNoticeTypes>(addEditNoticechema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (noticeToEdit) {
      const { description } = noticeToEdit;
      reset({
        description,
      });
      setOpenFrom(true);
    } else {
      reset();
    }
  }, [noticeToEdit]);

  const closeForm = () => {
    setNoticeToEdit(undefined);
    reset();
    setOpenFrom(false);
  };
  return (
    <Modal
      isOpen={openForm}
      modalTitle="Add a new notice rule"
      closeForm={closeForm}
      className="w-[600px]"
    >
      <div>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300 ">
            <Textinput
              name="description"
              required
              register={register}
              label="Description"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.description}
              onChange={() => clearErrors("description")}
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
    </Modal>
  );
};

export default AddEditNoticeForm;
