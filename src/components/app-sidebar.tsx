"use client";

import * as React from "react";
import { GalleryVerticalEnd, Gift } from "lucide-react";

import { NavProjects } from "@/components/nav-projects";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";

const data = {
  teams: [
    {
      name: "GatherGift",
      logo: GalleryVerticalEnd,
    },
  ],
  projects: [
    {
      name: "Wishes",
      url: "/wishes",
      icon: Gift,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
      </SidebarContent>
    </Sidebar>
  );
}
