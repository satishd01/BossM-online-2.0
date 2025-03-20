import React from "react";
import { Metadata } from "next";
import DeclareResultComponent from "@/modules/declare-result";
export const metadata: Metadata = {
  title: "Notice-Board",
};

const DeclareResultPage: React.FC = () => {
  return <DeclareResultComponent />;
};

export default DeclareResultPage;
