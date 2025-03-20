import * as Yup from "yup";

const weekdayStatusSchema = Yup.object().shape({
  0: Yup.string().oneOf(["active", "inactive"]).required(),
  1: Yup.string().oneOf(["active", "inactive"]).required(),
  2: Yup.string().oneOf(["active", "inactive"]).required(),
  3: Yup.string().oneOf(["active", "inactive"]).required(),
  4: Yup.string().oneOf(["active", "inactive"]).required(),
  5: Yup.string().oneOf(["active", "inactive"]).required(),
  6: Yup.string().oneOf(["active", "inactive"]).required(),
});
export const addMarketSchema = Yup.object().shape({
  openTime: Yup?.string().required("open time is required"),
  closeTime: Yup?.string().required("close time is required"),
  marketName: Yup?.string()?.required(" Market name is required"),
  weekdayStatus: weekdayStatusSchema,
});
