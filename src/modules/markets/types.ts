import { addMarketSchema } from "./validation-schema";
import * as Yup from "yup";

export type addMarketTypes = Yup.InferType<typeof addMarketSchema>;

export type editMarketTypes = addMarketTypes & { id: number };

export enum MarketStatus {
  Active = "active",
  Inactive = "inactive",
}

export type WeekdayStatus = {
  0: "active" | "inactive";
  1: "active" | "inactive";
  2: "active" | "inactive";
  3: "active" | "inactive";
  4: "active" | "inactive";
  5: "active" | "inactive";
  6: "active" | "inactive";
};
