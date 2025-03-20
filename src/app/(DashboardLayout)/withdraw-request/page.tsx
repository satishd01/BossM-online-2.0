import React from "react";
import WithdrawRequestComponent from "@/modules/withdraw-request";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Withdraw-Request",
};
const WithdrawRequestPage: React.FC = () => {
  return <WithdrawRequestComponent />;
};

export default WithdrawRequestPage;
