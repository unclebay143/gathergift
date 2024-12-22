import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Info } from "lucide-react";
import { Checkbox } from "./ui/Checkbox";
import { WishItemDetailModal } from "./WishItemDetailModal";
import { Currency, Item } from "@/types";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import { MAP_CURRENCIES_TO_SYMBOLS } from "@/const";
import Image from "next/image";
import { Button } from "./ui/button";

interface WishItemProps {
  item: Item;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onExpand: () => void;
  currency: Currency;
}

export function WishItem({
  item,
  isSelected,
  isExpanded,
  onSelect,
  onExpand,
  currency,
}: WishItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    _id,
    name,
    description,
    image_url,
    amount,
    contributed_amount,
    externalLink,
  } = item;

  const progress = calculateProgressPercentage(amount, contributed_amount);

  return (
    <div className='border rounded-md p-4 mb-4 bg-zinc-50'>
      <div className='flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex items-center'>
          <Checkbox
            checked={isSelected}
            onChange={onSelect}
            id={`checkbox-${_id}`}
            label={name}
          />
        </div>
        <div className='flex flex-wrap items-center gap-2 sm:gap-4 justify-between'>
          <div className='flex items-center gap-2 sm:gap-4'>
            <span className='text-green-600 font-semibold text-sm sm:text-base'>
              {MAP_CURRENCIES_TO_SYMBOLS[currency]}
              {formatCurrencyWithComma(amount)}
            </span>
            <div className='flex items-center'>
              <div className='w-16 sm:w-20 bg-gray-200 rounded-full h-2 mr-2'>
                <div
                  className='bg-blue-600 h-2 rounded-full'
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className='text-xs sm:text-sm text-gray-600'>
                {progress}%
              </span>
            </div>
          </div>
          <div className='flex items-center gap-2 sm:gap-4'>
            <button
              onClick={onExpand}
              className='text-blue-500 hover:text-blue-700'
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            <button
              onClick={() => setIsModalOpen(true)}
              className='text-blue-500 hover:text-blue-700'
            >
              <Info size={16} />
            </button>
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className='mt-2'>
          {image_url && (
            <div className='relative w-full aspect-[2/1] mb-2'>
              <Image
                src={image_url}
                alt={name}
                className='object-cover rounded-md'
                fill
              />
            </div>
          )}
          <p className='text-gray-700 text-sm'>{description}</p>
          {externalLink && (
            <a
              href={externalLink}
              target='_blank'
              className='mt-3 w-full flex justify-end'
            >
              <Button size='sm' variant='outline'>
                View on Shopping Site
                <ExternalLink size='12' />
              </Button>
            </a>
          )}
        </div>
      )}
      <WishItemDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={item}
      />
    </div>
  );
}
