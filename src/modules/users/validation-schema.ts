import * as Yup from "yup";

export const addUserSchema = Yup.object().shape({
  fullName: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email")
    .nullable()
    .test(
      "email-or-phone",
      "Either email or phone number is required.",
      function (email) {
        const { phoneNumber } = this.parent; // Access other fields
        if (!email && !phoneNumber) {
          return this.createError({
            path: "email",
            message: "Either email or phone number is required.",
          });
        }
        return true;
      }
    ),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(
      /[^a-zA-Z\d]/,
      "Password must contain at least one special character"
    ),
  phoneNumber: Yup.string()
    .nullable()
    .test(
      "email-or-phone",
      "Either email or phone number is required.",
      function (phoneNumber) {
        const { email } = this.parent; // Access other fields
        if (!phoneNumber && !email) {
          return this.createError({
            path: "phoneNumber",
            message: "Either email or phone number is required.",
          });
        }
        return true;
      }
    ),
});

export const editUserSchema = Yup.object().shape({
  accNumber: Yup.string().trim().optional(),
  ifsc: Yup.string().trim().optional(),
  phonePe: Yup.string().trim().optional(),
  googlePay: Yup.string().trim().optional(),
  paytm: Yup.string().trim().optional(),
  upi: Yup.string().trim().optional(),
  addWallet: Yup.number().min(1, "Amount should be more than 1").optional(),
  subWallet: Yup.number().min(1, "Amount should be more than 1").optional(),
  status: Yup.string().trim().optional(),
  userId: Yup.number().required("User ID is required"),
});
