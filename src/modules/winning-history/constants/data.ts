export type bidHistoryType = {
  id: number;
  userId: number;
  marketId: number;
  gameId: number;
  date: string;
  status: string;
  session: string;
  bidDigit: number;
  bidAmount: number;
  winAmount: number;
  winStatus: boolean;
  deletedAt: null;
  createdAt: string;
  updatedAt: string;
  market: string;
  game: string;
};
