// app/(DashboardLayout)/agent-bid-history/page.tsx
import AgentBidHistory from "@/modules/agentbidhistory";
import { Metadata } from "next";

// This is a server component (no "use client")
export const metadata: Metadata = {
  title: "Agent Bid History",
  description: "View agent bid history",
};

// Page component remains a server component
const AgentBidHistoryPage = () => {
  return <AgentBidHistory />;
};

export default AgentBidHistoryPage;