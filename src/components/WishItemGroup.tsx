"use client";

import { WishItem } from "./WishItem";
import { useCallback, useState } from "react";
import { Checkbox } from "./ui/Checkbox";
import { ContributionModal } from "./ContributionModal";
import { toast } from "sonner";
import { Currency, Items } from "@/types";
import { wishes } from "@/utils/dummy";

interface WishItemGroupProps {
  items: Items;
  currency: Currency;
}

export function WishItemGroup({ items, currency }: WishItemGroupProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string | undefined>>(
    new Set([items[0]._id])
  );
  const [isContributionModalOpen, setIsContributionModalOpen] = useState(false);
  const [contributions, setContributions] = useState<Record<string, number>>(
    {}
  );

  const [selectedItems, setSelectedItems] = useState<Set<string | undefined>>(
    new Set()
  );
  const [allSelected, setAllSelected] = useState(false);

  const toggleExpanded = useCallback((id: string | undefined) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const toggleAllItems = useCallback((ids: (string | undefined)[]) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      const allAreSelected = ids.every((id) => newSet.has(id));

      if (allAreSelected) {
        ids.forEach((id) => newSet.delete(id));
        setAllSelected(false);
      } else {
        ids.forEach((id) => newSet.add(id));
        setAllSelected(true);
      }

      return newSet;
    });
  }, []);

  const toggleItem = (id: string | undefined) => {
    setSelectedItems((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      setAllSelected(newSet.size === items.length);
      return newSet;
    });
  };

  const handleContribute = (newContributions: Record<string, number>) => {
    setContributions((prev) => ({ ...prev, ...newContributions }));
    console.log(newContributions);
    // send this data to backend
    // Update the fundedPercentage of items based on contributions
    // wishes.forEach((item) => {
    //   if (newContributions[item._id]) {
    //     const contributionPercentage =
    //       (newContributions[item._id] / item.amount) * 100;
    //     item.progress = Math.min(100, item.progress + contributionPercentage);
    //   }
    // });
  };

  return (
    <div className='mb-4 space-y-3 w-full'>
      {items.map((item) => {
        return (
          <WishItem
            key={item._id}
            item={item}
            isSelected={selectedItems.has(item._id)}
            isExpanded={expandedItems.has(item._id)}
            onSelect={() => toggleItem(item._id)}
            onExpand={() => toggleExpanded(item._id)}
            currency={currency}
          />
        );
      })}

      <div className='border rounded-md p-4 mb-4 bg-zinc-100'>
        <Checkbox
          checked={allSelected}
          onChange={() => {
            const allIds = items.map((item) => item._id);
            toggleAllItems(allIds);
          }}
          id={`checkbox-all}`}
          label={"Select all"}
        />
      </div>

      <div className='flex items-center justify-center'>
        <button
          onClick={() => {
            if (selectedItems.size === 0) {
              toast.info("Please select at least 1 gift to contribute.");
              return;
            }
            setIsContributionModalOpen(true);
          }}
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
        selectedItems={wishes.filter((item) => selectedItems.has(item._id))}
        onContribute={handleContribute}
        initialContributions={contributions}
        currency={currency}
      />
    </div>
  );
}
