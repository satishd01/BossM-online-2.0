"use client";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Textinput from "@/components/common/Textinput";
import { Button } from "@mui/material";
import { Dispatch, SetStateAction, useEffect } from "react";
import { Modal } from "@/components/common/modal";
import { addEditAgentSchema } from "./validation-schema";
import { addEditAgentTypes, editAgentTypes } from "./types";

const AddEditAgentForm = ({
  openForm,
  setOpenFrom,
  agentToEdit,
  onSubmit,
  setAgentToEdit,
}: {
  openForm: boolean;
  agentToEdit?: editAgentTypes;
  setOpenFrom: Dispatch<SetStateAction<boolean>>;
  onSubmit: (data: addEditAgentTypes) => Promise<void>;
  setAgentToEdit: React.Dispatch<React.SetStateAction<editAgentTypes | undefined>>;
}) => {
  const {
    register,
    formState: { errors },
    reset,
    handleSubmit,
  } = useForm<addEditAgentTypes>({
    resolver: yupResolver(addEditAgentSchema),
  });

  useEffect(() => {
    if (agentToEdit) {
      reset({
        email: agentToEdit.email || "",
        phoneNumber: agentToEdit.phoneNumber,
        fullName: agentToEdit.fullName,
        password: "", // Keep empty for edit
        agentCommission: agentToEdit.agentCommission,
        partnership: agentToEdit.partnership,
      });
    } else {
      reset({
        email: "",
        phoneNumber: "",
        fullName: "",
        password: "",
        agentCommission: 0,
        partnership: 0,
      });
    }
  }, [agentToEdit]);

  const closeForm = () => {
    setAgentToEdit(undefined);
    reset();
    setOpenFrom(false);
  };

  return (
    <Modal
      isOpen={openForm}
      modalTitle={agentToEdit ? "Edit Agent" : "Add New Agent"}
      closeForm={closeForm}
      className="w-[600px] max-h-[500px] overflow-y-auto" // added max height and scroll
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <Textinput
            name="fullName"
            register={register}
            label="Full Name"
            placeholder="Enter full name"
            error={errors.fullName}
          />

          {/* <Textinput
            name="email"
            register={register}
            label="Email"
            placeholder="Enter email"
            type="email"
            error={errors.email}
            disabled={!!agentToEdit}
          /> */}

          <Textinput
            name="phoneNumber"
            register={register}
            label="Phone Number"
            placeholder="+[country code][number]"
            error={errors.phoneNumber}
          />

          {!agentToEdit && (
            <Textinput
              name="password"
              register={register}
              label="Password"
              type="password"
              error={errors.password}
            />
          )}

          <Textinput
            name="agentCommission"
            register={register}
            label="Commission (%)"
            placeholder="Enter agent commission"
            type="number"
            error={errors.agentCommission}
          />

          <Textinput
            name="partnership"
            register={register}
            label="Partnership (%)"
            placeholder="Enter partnership"
            type="number"
            error={errors.partnership}
          />
        </div>

        <div className="mt-6">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            {agentToEdit ? "Update" : "Create"} Agent
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditAgentForm;
