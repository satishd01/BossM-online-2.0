import { loginSchema } from "./validation-schema";
import * as Yup from "yup";

export type LoginTypes = Yup.InferType<typeof loginSchema>;
