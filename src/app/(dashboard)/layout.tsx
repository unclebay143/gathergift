import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import React from "react";

import { Separator } from "@/components/ui/separator";
import { DashboardBreadCrumb } from "./dashboard-breadcrumb";
import { OnboardingModal } from "./onboading-modal";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <OnboardingModal />
      <SidebarInset>
        <div className='min-h-screen bg-zinc-50'>
          <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
            <div className='flex items-center gap-2 px-4'>
              <SidebarTrigger className='-ml-1' />
              <Separator orientation='vertical' className='mr-2 h-4' />
            </div>
            <DashboardBreadCrumb />
          </header>
          <div className='p-4 pt-0'>
            <div className='min-h-screen flex flex-1 flex-col gap-4 rounded-xl'>
              {/* <div className='min-h-screen flex flex-1 flex-col gap-4 rounded-xl bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-50 via-pink-50 to-white dark:from-purple-900 dark:via-pink-900 dark:to-gray-900'> */}
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
