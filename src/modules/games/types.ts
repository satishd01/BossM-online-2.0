import * as Yup from "yup";
import { addEditGameSchema } from "./validation-schema";

export type addEditGameTypes = Yup.InferType<typeof addEditGameSchema>;

export type editGameTypes = {
  id: number;
  rate: number;
  gameName: string;
  fileData: any;
};
