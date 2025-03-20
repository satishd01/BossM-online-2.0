import React from "react";
import BidHistoryComponent from "@/modules/bid-history";
import { Metadata } from "next";
import BannerComponent from "@/modules/banner";
export const metadata: Metadata = {
  title: "Banner",
};
const BannerPage: React.FC = () => {
  return <BannerComponent />;
};

export default BannerPage;
