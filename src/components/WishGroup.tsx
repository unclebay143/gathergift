"use client";

import { WishItem } from "./WishItem";
import { useSelectedItems } from "../hooks/useSelectedItems";
import { useExpandedItems } from "../hooks/useExpandedItems";
import { useState } from "react";
import { featuredWishlists } from "./public/FeaturedWishlists";
import { Checkbox } from "./Checkbox";
import { ContributionModal } from "./ContributionModal";

interface WishGroupProps {
  items: Array<{
    id: string;
    name: string;
    description: string;
    image: string;
    amount: number;
    progress: number;
  }>;
}

export function WishGroup({ items }: WishGroupProps) {
  const { selectedItems, toggleItem, toggleAllItems, allSelected } =
    useSelectedItems({ size: items.length });
  const { expandedItems, toggleExpanded } = useExpandedItems();

  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const handleItemSelect = (id: string) => {
    toggleItem(id);
  };

  const handleContribute = (contributions: Record<string, number>) => {
    // send this data to backend
    // Update the fundedPercentage of items based on contributions
    featuredWishlists.forEach((item) => {
      if (contributions[item.id]) {
        const contributionPercentage =
          (contributions[item.id] / item.amount) * 100;
        item.progress = Math.min(100, item.progress + contributionPercentage);
      }
    });
  };

  return (
    <div className='mb-4 space-y-3 w-full'>
      {items.map((item, idx) => {
        return (
          <WishItem
            key={item.id}
            {...item}
            isSelected={selectedItems.has(item.id)}
            isExpanded={expandedItems.has(item.id) || idx === 0}
            onSelect={() => toggleItem(item.id)}
            onExpand={() => toggleExpanded(item.id)}
            isFirstItem={idx === 0}
            toggleExpanded={toggleExpanded}
          />
        );
      })}

      <div>
        <div className='flex items-center mb-2 sm:mb-0'>
          <Checkbox
            checked={allSelected}
            onChange={() => {
              console.log("hi");
              const allIds = items.map((item) => item.id);
              toggleAllItems(allIds);
            }}
            id={`checkbox-all}`}
            label={"Select all"}
          />
        </div>
      </div>

      <div className='flex items-center justify-center'>
        <button
          onClick={() => setIsContributionModalOpen(true)}
          className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-green-600 hover:bg-green-700 text-white'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width={24}
            height={24}
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth={2}
            strokeLinecap='round'
            strokeLinejoin='round'
            className='lucide lucide-gift mr-2 h-4 w-4'
          >
            <rect x={3} y={8} width={18} height={4} rx={1} />
            <path d='M12 8v13' />
            <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
            <path d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' />
          </svg>
          Contribute to selected gifts
        </button>
      </div>

      <ContributionModal
        isOpen={isContributionModalOpen}
        onClose={() => setIsContributionModalOpen(false)}
        selectedItems={featuredWishlists.filter((item) =>
          selectedItems.has(item.id)
        )}
        onContribute={handleContribute}
      />
    </div>
  );
}
