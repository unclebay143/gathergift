import { MAP_CURRENCIES_TO_SYMBOLS } from "@/const";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import type { WishList } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Progress } from "./ui/progress";
import { Cake, Church, Gift, type LucideIcon } from "lucide-react";

export const WishCard = ({ data }: { data: WishList }) => {
  const {
    description,
    coverImage,
    title,
    target_amount,
    contributed_amount,
    items,
    currency,
    owner,
    category,
    _id,
  } = data;
  const coverImageWithAltImg = coverImage ?? items[0]?.image_url;

  const MAP_CATEGORY_TO_ICONS: {
    [key: string]: LucideIcon;
  } = {
    birthday: Cake,
    generic: Gift,
    wedding: Church,
  };

  const CategoryIcon =
    category && MAP_CATEGORY_TO_ICONS[category.toLowerCase()];

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden w-[300px] transition-transform hover:scale-105'>
      <div className='relative h-[200px] min-w-[200px] max-w-[300px] w-full'>
        {coverImageWithAltImg && (
          <Image
            layout='fill'
            objectFit='cover'
            src={coverImageWithAltImg}
            alt={title}
          />
        )}

        <div className='absolute inset-0 bg-gradient-to-t from-black/60 to-transparent' />
        {CategoryIcon && (
          <div className='absolute top-2 right-2 z-50'>
            <CategoryIcon className='text-red-400' />
          </div>
        )}
      </div>
      <div className='p-4 flex flex-col justify-between h-[208px] w-[300px]'>
        <div className='space-y-2'>
          <h3 className='text-lg font-semibold text-zinc-700 line-clamp-1'>
            {title}
          </h3>
          <p className='text-sm text-zinc-600 line-clamp-2'>{description}</p>
        </div>
        <div className='space-y-3'>
          {/* <div className='flex items-center gap-2'>
            <div className='relative rounded-full overflow-hidden w-4 h-4'>
              <Image layout='fill' objectFit='cover' src={image} alt={name} />
            </div>
            <span className='text-xs text-zinc-900'>
              Ayodele Samuel Adebayo
            </span>
          </div> */}
          <div className='space-y-2'>
            <Progress
              value={calculateProgressPercentage(
                target_amount,
                contributed_amount
              )}
              className='h-2  bg-secondary'
            />
            <div className='flex justify-between'>
              <p className='text-xs text-right text-zinc-500'>
                {MAP_CURRENCIES_TO_SYMBOLS[currency]}
                {formatCurrencyWithComma(target_amount)}
              </p>
              <p className='text-xs text-right text-zinc-500'>
                {calculateProgressPercentage(target_amount, contributed_amount)}
                % funded for {items.length} items
              </p>
            </div>
          </div>
          <Link
            href={`/${owner?.username}/wishlists/${_id}`}
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
            Support Wishlist
          </Link>
        </div>
      </div>
    </div>
  );
};
