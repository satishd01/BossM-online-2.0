import * as Yup from "yup";

export const addEditNoticechema = Yup.object().shape({
  description: Yup?.string().required("Notice description is required")
});
