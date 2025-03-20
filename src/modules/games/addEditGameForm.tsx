import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Modal } from "@/components/common/modal";
import { addEditGameSchema } from "./validation-schema";
import { addEditGameTypes, editGameTypes } from "./types";
import { HighlightOffOutlined } from "@mui/icons-material";
import Image from "next/image";
const AddEditGameForm = ({
  openForm,
  setOpenFrom,
  gameToEdit,
  onSubmit,
  setGameToEdit,
}: {
  openForm: boolean;
  gameToEdit?: editGameTypes;
  setOpenFrom: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: addEditGameTypes) => Promise<void>;
  setGameToEdit: React.Dispatch<
    React.SetStateAction<editGameTypes | undefined>
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
    resolver: yupResolver<addEditGameTypes>(addEditGameSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (gameToEdit) {
      const { fileData, gameName, rate } = gameToEdit;
      reset({
        file: fileData,
        gameName,
        rate,
      });
      setOpenFrom(true);
    } else {
      reset();
    }
  }, [gameToEdit]);

  const closeForm = () => {
    setGameToEdit(undefined);
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
              name="gameName"
              required
              register={register}
              label="Game name"
              placeholder=""
              type="string"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.gameName}
              onChange={() => clearErrors("gameName")}
            />

            <Textinput
              name="rate"
              required
              register={register}
              label="Rate"
              placeholder=""
              type="number"
              classLabel="mb-2 text-slate-500 !text-sm"
              className="w-full h-[36px] bg-slate-100 rounded-md px-2 border border-primary selection:bg-transparent"
              error={errors.rate}
              onChange={() => clearErrors("rate")}
            />
            {watch("file") && (
              <div className="flex justify-center">
                <Image
                  src={getValues("file")}
                  height={300}
                  width={300}
                  alt="Image"
                  className="self-center"
                />
                <HighlightOffOutlined onClick={() => setValue("file", "")} />
              </div>
            )}
            <div className="relative h-10 mt-5">
              <Button
                color="primary"
                variant="contained"
                size="medium"
                sx={{ width: "100%" }}
                onClick={() => document?.getElementById("gameImage")?.click()}
              >
                select image
                <input
                  id="gameImage"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    clearErrors("file");
                    e.target.files &&
                      setValue("file", URL.createObjectURL(e.target.files[0]));
                  }}
                />
              </Button>
              <span className="mt-1 h-2 text-red-400  absolute  text-danger-500 block text-sm">
                {errors?.file?.message || ""}
              </span>
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

export default AddEditGameForm;
