import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { useState } from "react";
import { Modal } from "@/components/common/modal";
import {
  addNotificationSchema,
  addNotificationTypes,
} from "../validation-schema";
import useAxiosPost from "../../../../hooks/axios/useAxiosPost";
const BroadCastNotification = ({ fetchData }: { fetchData: () => void }) => {
  const [openForm, setOpenFrom] = useState(false);
  const {
    register,
    formState: { errors },
    reset,
    clearErrors,
    handleSubmit,
  } = useForm({
    resolver: yupResolver<addNotificationTypes>(addNotificationSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const { isLoading: addNotificationLoading, post } = useAxiosPost(
    `/notification/add-notification`
  );
  const closeForm = () => {
    reset();
    setOpenFrom(false);
  };
  const onSubmit = async (data: addNotificationTypes) => {
    const res = await post({ ...data, isForAllUser: true });
    if (res && res?.success) {
      setOpenFrom(false);
      await fetchData();
    }
  };
  return (
    <>
      <section className="flex w-full justify-end">
        <Button
          onClick={() => setOpenFrom(true)}
          color="primary"
          variant="contained"
          aria-label="logout"
          size="large"
          type="button"
        >
          Send notification
        </Button>
      </section>

      {openForm && (
        <Modal
          isOpen={openForm}
          modalTitle="Send notification to all users"
          closeForm={closeForm}
          className="w-[600px]"
        >
          <div>
            <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
              <div className="w-full pb-5 flex flex-col justify-center gap-2.5 border-b border-slate-300 ">
                <Textinput
                  name="title"
                  required
                  register={register}
                  label="Title"
                  placeholder=""
                  type="string"
                  classLabel="mb-2 text-slate-500 !text-sm"
                  className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
                  error={errors.title}
                  onChange={() => clearErrors("title")}
                />

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
                  Send notification
                </Button>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default BroadCastNotification;
