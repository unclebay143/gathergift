"use client";

import * as React from "react";
import {
  ChartPie,
  GalleryVerticalEnd,
  Gift,
  History,
  Settings,
} from "lucide-react";

import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";

const data = {
  teams: [
    {
      name: "GatherGift",
      logo: GalleryVerticalEnd,
      imageUrl: "https://github.com/unclebay143.png",
      email: "unclebigbaytest@office.com",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "/overview",
      icon: ChartPie,
      comingSoon: true,
    },
    {
      imageUrl: "https://github.com/unclebay143.png",
      title: "Default",
      url: "#",
      items: [
        {
          title: "Wishlists",
          url: "/wishlists",
          icon: Gift,
        },
        {
          title: "Archives",
          url: "/wishlists/archives",
          icon: History,
        },
        {
          title: "Settings",
          url: "/settings",
          icon: Settings,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
