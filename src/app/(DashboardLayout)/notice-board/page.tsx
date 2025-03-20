import React from "react";
import { Metadata } from "next";
import NoticeBoardComponent from "@/modules/notice-board";
export const metadata: Metadata = {
  title: "Notice-Board",
};
const NoticeBoardPage: React.FC = () => {
  return <NoticeBoardComponent />;
  
};

export default NoticeBoardPage;
