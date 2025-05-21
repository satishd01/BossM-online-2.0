import * as Yup from "yup";
import { addEditNoticechema } from "./validation-schema";

export type addEditNoticeTypes = Yup.InferType<typeof addEditNoticechema>;

export type editNoticeTypes = {
  id: number;
  pannaDigit: string;
  bidDigit: string;
  date: Date;
  marketId: number;
  session: string;
};

export interface ExternalApiResult {
  name: string;
  result: string;
  date: string;
  open_time: string;
  close_time: string;
}