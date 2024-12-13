"use client";

import * as React from "react";
import { Plus } from "lucide-react";

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

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <div className='flex items-center justify-between'>
            <div className='grid flex-1 text-left text-lg leading-tight grow'>
              <span className='truncate font-semibold'>GatherGift</span>
            </div>
            <DropdownMenuTrigger
              className='w-fit bg-transparent hover:bg-transparent'
              asChild
            >
              <SidebarMenuButton
                size='lg'
                className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
              >
                <div className='rounded-full overflow-hidden border-2 border-transparent hover:border-slate-200'>
                  <img
                    src='https://api.dicebear.com/9.x/micah/svg?seed=Liam'
                    width={30}
                    height={40}
                  />
                </div>
              </SidebarMenuButton>
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            align='start'
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuItem className='gap-2 p-2'>
              <div className='flex size-6 items-center justify-center rounded-md border bg-background'>
                <Plus className='size-4' />
              </div>
              <div className='font-medium text-muted-foreground'>Logout</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
