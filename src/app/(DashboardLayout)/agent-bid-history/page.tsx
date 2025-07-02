"use client";
import AgentBidHistory from "@/modules/agentbidhistory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agent Bid History",
  description: "View agent bid history",
};

const AgentBidHistoryPage = () => {
  return <AgentBidHistory />;
};

export default AgentBidHistoryPage;