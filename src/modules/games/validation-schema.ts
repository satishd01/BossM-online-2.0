import * as Yup from "yup";

export const addEditGameSchema = Yup.object().shape({
  file: Yup?.string().trim().required("Image is required"),
  rate: Yup?.number()
    .typeError("Please enter the number")
    .min(0)
    .required("Rate is required"),
  gameName: Yup?.string().required("Game name is required"),
});
