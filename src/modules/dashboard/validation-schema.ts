import * as Yup from "yup";

export const minBidSchema = Yup.object().shape({
  minBet: Yup?.number()
    .typeError("Please enter the number")
    .min(0)
    .required("min bid  is required"),
});

export const declareBidResultSchema = Yup.object().shape({
  winAmount: Yup?.number()
    ?.typeError("Please enter the number")
    .min(0)
    .required("win amount is required"),
  bidDigit: Yup?.number()
    .typeError("Please enter the number")
    .min(0)
    .required("min bid  is required"),
});
