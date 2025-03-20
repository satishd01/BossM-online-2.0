import React from "react";
import NotificationsComponent from "@/modules/notifications";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Games",
};
const GamesPage: React.FC = () => {
  return <NotificationsComponent />;
};

export default GamesPage;
