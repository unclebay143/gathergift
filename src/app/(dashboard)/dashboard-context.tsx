"use client";

import React from "react";
import { LoaderScreen } from "@/components/LoaderScreen";
import { useDashboardLoader } from "../providers";

export const DashboardContext = () => {
  const { visibility, setVisibility } = useDashboardLoader();

  React.useEffect(() => {
    setTimeout(() => {
      setVisibility(false);
    }, 1500);
  }, [setVisibility]);

  return <>{visibility && <LoaderScreen />}</>;
};
