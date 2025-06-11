import * as Yup from "yup";

export const addEditAgentSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .notRequired()
    .nullable(),
  phoneNumber: Yup.string()
    .matches(/^[1-9]\d{9,14}$/, "Phone number must be 10 to 15 digits, starting with a non-zero digit")
    .required("Phone number is required"),
  fullName: Yup.string().required("Full name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  agentCommission: Yup.number()
    .typeError("Agent Commission must be a number")
    .min(0, "Minimum is 0%")
    .max(100, "Maximum is 100%")
    .required("Agent Commission is required"),
  partnership: Yup.number()
    .typeError("Partnership must be a number")
    .min(0, "Minimum is 0%")
    .max(100, "Maximum is 100%")
    .required("Partnership is required"),
});
