import React from "react";
import BidHistoryComponent from "@/modules/bid-history";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Bid-History",
};
const BidHistoryPage: React.FC = () => {
  return <BidHistoryComponent />;
};

export default BidHistoryPage;
