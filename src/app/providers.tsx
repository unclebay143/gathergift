"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { create } from "zustand";
import type { User as UserType } from "@/types";
import { AppContext } from "./app-context";
import { useNetworkStatus } from "@/hooks/use-network-status";
import { WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export type DashboardLoaderStore = {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
};

export const useDashboardLoader = create<DashboardLoaderStore>((set) => ({
  visibility: true,
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
  const { isOnline } = useNetworkStatus();

  if (!isOnline) {
    return (
      <div className='min-h-screen bg-white flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8'>
        <WifiOff className='h-24 w-24 text-gray-400 mb-8' />
        <h1 className='text-4xl font-bold text-gray-900 mb-2 text-center'>
          You&apos;re Offline
        </h1>
        <p className='text-xl text-gray-600 mb-8 text-center'>
          It seems you&apos;ve lost your internet connection.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className='bg-red-600 hover:bg-red-700 text-white'
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <AppContext currentUser={currentUser} />
        <main className='flex-grow'>{children}</main>
      </SessionProvider>
    </QueryClientProvider>
  );
};
