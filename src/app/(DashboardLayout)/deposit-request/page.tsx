import React from "react";
import DepositRequestComponent from "@/modules/deposit-request";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Deposit-Request",
};
const DepositRequestPage: React.FC = () => {
  return <DepositRequestComponent />;
};

export default DepositRequestPage;
