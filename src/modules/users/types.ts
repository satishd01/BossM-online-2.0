import { addUserSchema, editUserSchema } from "./validation-schema";
import * as Yup from "yup";

export type AddUserData = Yup.InferType<typeof addUserSchema>;

export type EditUserDetails = Yup.InferType<typeof editUserSchema>;

export enum UserStatus {
  Active = "active",
  Inactive = "inActive",
}
