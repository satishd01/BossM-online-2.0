import React from "react";
import GamesRatesComponent from "@/modules/games-rates";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Games-Rates",
};
const GamesPage: React.FC = () => {
  return <GamesRatesComponent />;
  
};

export default GamesPage;
