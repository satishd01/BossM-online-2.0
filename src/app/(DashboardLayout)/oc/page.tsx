import React from "react";
import OCGroupCombined from "@/modules/oc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "OC Group Combined",
  description: "View and manage OC Group Combined results",
};

const OCGroupCombinedPage: React.FC = () => {
  return <OCGroupCombined />;
};

export default OCGroupCombinedPage;