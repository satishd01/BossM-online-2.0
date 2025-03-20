import * as Yup from "yup";

export const addEditNoticechema = Yup.object().shape({
  pannaDigit: Yup?.string().required("Panna digit is required"),
  bidDigit: Yup?.string().required("Bid digit is required"),
  date: Yup.date().nullable().required("Result date is required"), 
  marketId: Yup?.number().required("MarketId is required"),
  session: Yup?.string().required("Session is required"),

});
