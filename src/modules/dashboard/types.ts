import * as Yup from "yup";
import { declareBidResultSchema, minBidSchema } from "./validation-schema";

export type market = {
  marketName: string;
  id: number;
  games: game[];
  totalCount: number;
};

export type game = {
  gameName: string;
  id: number;
  bids: bid[];
  bidCount: number;
};
type bid = {
  key: number;
  count: number;
};
export type declareBidResultType = Yup.InferType<typeof declareBidResultSchema>;
export type minBidTypes = Yup.InferType<typeof minBidSchema>;
