import passwordSchema from "./validation-schema";
import * as Yup from "yup";

export type passwordTypes = Yup.InferType<typeof passwordSchema>;
