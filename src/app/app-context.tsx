"use client";

import React, { useEffect } from "react";
import { useAppContext, useDashboardLoader } from "./providers";
import { User } from "@/types";
import { LoaderScreen } from "@/components/LoaderScreen";

type Props = {
  currentUser: User;
};

export const AppContext = ({ currentUser }: Props) => {
  const { visibility } = useDashboardLoader();
  const { setCurrentUser } = useAppContext();

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser, setCurrentUser]);
  return <>{visibility && <LoaderScreen />}</>;
};
