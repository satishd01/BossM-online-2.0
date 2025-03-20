import React from "react";
import GamesComponent from "@/modules/games";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Games",
};
const GamesPage: React.FC = () => {
  return <GamesComponent />;
};

export default GamesPage;
