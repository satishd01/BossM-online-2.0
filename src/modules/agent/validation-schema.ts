import * as Yup from "yup";

export const addEditAgentSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
    phoneNumber: Yup.string()
    .matches(/^[1-9]\d{9,14}$/, "Phone number must be 10 to 15 digits, starting with a non-zero digit")
    .required("Phone number is required"),  
  fullName: Yup.string().required("Full name is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});