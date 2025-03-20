import * as Yup from "yup";

const passwordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old password is required"),
  newPassword: Yup.string().required("New password is required"),
  confirmPassword: Yup.string().required("Confirm password is required"),
});

export default passwordSchema;
