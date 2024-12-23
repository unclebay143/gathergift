"use client";

import * as React from "react";
import { ChevronsUpDown, Gift, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { handleLogout } from "@/utils/auth";

export function TeamSwitcher({
  teams,
}: {
  teams: {
    name: string;
    logo: React.ElementType;
    plan?: string;
    imageUrl: string;
    email: string;
  }[];
}) {
  const { isMobile } = useSidebar();
  const [activeTeam] = React.useState(teams[0]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            // className='w-fit bg-transparent hover:bg-transparent'
            asChild
          >
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              {activeTeam?.imageUrl ? (
                <>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                    <img
                      src={activeTeam?.imageUrl}
                      className='size-8 rounded-md'
                    />
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {activeTeam?.email}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                    <Gift className='size-4' />
                  </div>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>GatherGift</span>
                  </div>
                </>
              )}
              <ChevronsUpDown className='ml-auto' />
              {/* <div className='ml-auto rounded-full overflow-hidden border-2 border-transparent hover:border-slate-200'>
                <img src={activeTeam.imageUrl} width={30} height={40} />
              </div> */}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? "bottom" : "right"}
            sideOffset={8}
          >
            <DropdownMenuItem
              className='gap-2 p-2 cursor-pointer'
              onClick={() => handleLogout()}
            >
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <LogOut className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Logout</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
