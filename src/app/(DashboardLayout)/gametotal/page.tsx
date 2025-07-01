import React from "react";
import GameTotal from "@/modules/gametotal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Game Totals",
  description: "View and manage game totals and summaries",
};

const GameTotalPage: React.FC = () => {
  return <GameTotal />;
};

export default GameTotalPage;