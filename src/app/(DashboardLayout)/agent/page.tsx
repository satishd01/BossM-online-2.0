import React from "react";
import Agentcomponent from "@/modules/agent";
import { Metadata } from "next";
import AgentComponent from "@/modules/agent";
export const metadata: Metadata = {
  title: "Agent",
};
const GamesPage: React.FC = () => {
  return <AgentComponent />;
};

export default GamesPage;
