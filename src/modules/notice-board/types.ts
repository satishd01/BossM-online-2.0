import * as Yup from "yup";
import { addEditNoticechema } from "./validation-schema";

export type addEditNoticeTypes = Yup.InferType<typeof addEditNoticechema>;

export type editNoticeTypes = {
  id: number;
  description: string;
};