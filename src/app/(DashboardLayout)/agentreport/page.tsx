import React from "react";
import CommissionReport from "@/modules/agentreport/commition";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Commission Report",
  description: "View and manage agent commission reports",
};

const CommissionReportPage: React.FC = () => {
  return <CommissionReport />;
};

export default CommissionReportPage;