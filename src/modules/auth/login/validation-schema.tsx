import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  user: Yup.string().required("User name is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string().oneOf(["ADMIN", "AGENT"], "Invalid role").required("Role is required"),
});
