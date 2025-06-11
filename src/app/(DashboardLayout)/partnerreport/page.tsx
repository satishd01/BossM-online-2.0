import React from "react";
import PartnershipReport from "@/modules/agentreport/partenship";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Partnership Report",
  description: "View and manage agent partnership reports",
};

const PartnershipReportPage: React.FC = () => {
  return <PartnershipReport />;
};

export default PartnershipReportPage;