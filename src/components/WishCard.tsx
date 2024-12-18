import { MAP_CURRENCIES_TO_SYMBOLS } from "@/const";
import { formatCurrencyWithComma } from "@/lib/utils";
import { Wish } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const WishCard = ({ data }: { data: Wish }) => {
  const {
    description,
    coverImage,
    title,
    target_amount,
    items,
    currency,
    owner,
  } = data;
  const coverImageWithAltImg = coverImage ?? items[0]?.image_url;
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
        <div className='absolute top-2 right-2'>
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
            className='lucide lucide-star text-amber-400'
          >
            <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
          </svg>
        </div>
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
            <div
              aria-valuemax={100}
              aria-valuemin={0}
              role='progressbar'
              data-state='indeterminate'
              data-max={100}
              className='relative w-full overflow-hidden rounded-full bg-secondary h-2'
            >
              <div
                data-state='indeterminate'
                data-max={100}
                className='h-full w-full flex-1 bg-primary transition-all'
                style={{ transform: "translateX(-25%)" }}
              />
            </div>
            <div className='flex justify-between'>
              <p className='text-xs text-right text-zinc-500'>
                {MAP_CURRENCIES_TO_SYMBOLS[currency]}
                {formatCurrencyWithComma(target_amount)}
              </p>
              <p className='text-xs text-right text-zinc-500'>
                75% funded for 4 items
              </p>
            </div>
          </div>
          <Link
            href={`/${owner?.username}/wishlists`}
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
            Support This Gift
          </Link>
        </div>
      </div>
    </div>
  );
};
