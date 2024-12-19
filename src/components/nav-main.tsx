"use client";

import { ChevronRight, type LucideIcon } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    imageUrl?: string;
    isActive?: boolean;
    comingSoon?: boolean;
    items?: {
      title: string;
      url: string;
      icon?: LucideIcon;
      comingSoon?: boolean;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={`NavMain-${item.title}`}
            asChild
            defaultOpen={item.isActive}
            className='group/collapsible'
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                {item.comingSoon ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div>
                        <SidebarMenuSubButton className='opacity-70'>
                          {item.icon && <item.icon />}
                          <span>{item.title}</span>
                        </SidebarMenuSubButton>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side='right' sideOffset={8}>
                      Coming soon
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild={
                      !item.items || item.items?.length === 0 ? true : false
                    }
                  >
                    {!item.items || item.items?.length === 0 ? (
                      <Link href={item.url}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <>
                        {item.icon && <item.icon />}
                        {item.imageUrl && (
                          <img
                            src={item.imageUrl}
                            className='w-4 h-4 rounded aspect-square'
                          />
                        )}
                        <span>{item.title}</span>
                        <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                      </>
                    )}
                  </SidebarMenuButton>
                )}
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => (
                    <div key={`SidebarMenuSub-${subItem.title}`}>
                      {subItem.comingSoon ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <SidebarMenuSubButton className='opacity-70'>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </SidebarMenuSubButton>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side='right' sideOffset={8}>
                            Coming soon
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <Link href={subItem.url}>
                              {subItem.icon && <subItem.icon />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      )}
                    </div>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
