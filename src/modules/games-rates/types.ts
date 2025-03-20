interface BidHistory {
  id: number;
  userId: number;
  marketId: number;
  gameId: number;
  date: string;
  status: "completed" | "pending" | "failed";
  session: "open" | "closed";
  bidDigit: number;
  bidAmount: number;
  winAmount: number;
  winStatus: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  market: string;
  game: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalData: number;
}

interface BidHistoryResponse {
  bidHistory: BidHistory[];
  pagination: Pagination;
}

export enum WinStatusEnum {
  WIN = "Won",
  LOSS = "Lost",
}
