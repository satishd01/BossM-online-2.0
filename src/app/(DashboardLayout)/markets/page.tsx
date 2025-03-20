import React from "react";
import MarketsComponent from "@/modules/markets";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Markets",
};
const MarketsPage: React.FC = () => {
  return <MarketsComponent />;
};

export default MarketsPage;
