"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { create } from "zustand";
import type { User as UserType } from "@/types";
import { AppContext } from "./app-context";

export type DashboardLoaderStore = {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
};

export const useDashboardLoader = create<DashboardLoaderStore>((set) => ({
  visibility: false,
  setVisibility: (visibility: boolean) => set({ visibility }),
}));

export type AppContextStore = {
  currentUser: UserType;
  setCurrentUser: (user: UserType) => void;
};
export const useAppContext = create<AppContextStore>((set) => ({
  currentUser: null,
  setCurrentUser: (user: UserType) => set({ currentUser: user }),
}));

export const AppProvider = ({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: UserType;
}) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppContext currentUser={currentUser} />
        <main className='flex-grow'>{children}</main>
      </SessionProvider>
    </QueryClientProvider>
  );
};
