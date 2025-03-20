import * as Yup from "yup";

export const addNotificationSchema = Yup.object().shape({
  title: Yup?.string().trim().required("Title is required"),
  description: Yup?.string().trim().required("Description is required"),
});

export type addNotificationTypes = Yup.InferType<typeof addNotificationSchema>;
