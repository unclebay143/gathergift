"use client";

import { useEffect } from "react";
import { useAppContext } from "./providers";
import { User } from "@/types";

type Props = {
  currentUser: User;
};

export const AppContext = ({ currentUser }: Props) => {
  const { setCurrentUser } = useAppContext();

  useEffect(() => {
    setCurrentUser(currentUser);
  }, [currentUser, setCurrentUser]);
  return null;
};
