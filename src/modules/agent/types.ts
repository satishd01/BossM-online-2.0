import * as Yup from "yup";
import { addEditAgentSchema } from "./validation-schema";

// Nested user type inside an agent
export type userType = {
  id: number;
  phoneNumber: string;
  email: string;
  fullName: string;
  status: string;
  wallet: number;
};

export type addEditAgentTypes = Yup.InferType<typeof addEditAgentSchema>;

export type editAgentTypes = {
  id: number;
  email: string;
  phoneNumber: string;
  fullName: string;
  status?: string;
  users?: userType[];
};
