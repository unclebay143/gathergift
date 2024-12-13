"use client";

import React, { useEffect } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { create } from "zustand";
import { usePathname } from "next/navigation";

type Props = {};

type Item = { href: string; label: string; isCurrent?: boolean };
type Items = Item[];

export type DashboardBreadCrumbStore = {
  items: Items;
  setItems: (items: Items) => void;
};

export const BreadCrumbUpdater = () => {
  const setItems = useDashboardBreadCrumb((state) => state.setItems);
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/").filter((segment) => segment);
    const items = pathSegments.map((segment, index) => ({
      href: "/" + pathSegments.slice(0, index + 1).join("/"),
      label: segment,
      isCurrent: index === pathSegments.length - 1,
    }));

    setItems(items);
  }, [pathname, setItems]);

  return null;
};

export const useDashboardBreadCrumb = create<DashboardBreadCrumbStore>(
  (set) => ({
    items: [],
    setItems: (items: Items) => set({ items }),
  })
);

export const DashboardBreadCrumb = (props: Props) => {
  const { items } = useDashboardBreadCrumb();
  const currentItem = items.find((item) => item.isCurrent);
  const previewItems = items.filter(
    (item) => item.label !== currentItem?.label
  );

  return (
    <Breadcrumb>
      <BreadCrumbUpdater />
      <BreadcrumbList>
        {previewItems.map(({ label, href }) => {
          return (
            <BreadcrumbItem className='hidden md:block' key={label}>
              <BreadcrumbLink href={href} className='capitalize'>
                {label}{" "}
              </BreadcrumbLink>
            </BreadcrumbItem>
          );
        })}
        {currentItem && (
          <>
            {previewItems.length > 0 && (
              <BreadcrumbSeparator className='hidden md:block' />
            )}
            <BreadcrumbItem>
              <BreadcrumbPage className='capitalize'>
                {currentItem.label}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
