import { PublicLayout } from "@/app/public-layout";
import { Progress } from "@/components/progress";
import { WishItemGroup } from "@/components/WishItemGroup";
import { MAP_CURRENCIES_TO_SYMBOLS } from "@/const";
import {
  calculateProgressPercentage,
  formatCurrencyWithComma,
} from "@/lib/utils";
import { getPublicWish } from "@/service/wishlists/wishlists.server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ChristmasWishlist({
  params,
}: {
  params: Promise<{ id: string; username: string }>;
}) {
  const { id, username } = await params;
  const wishlist = await getPublicWish(username, id);

  if (!wishlist) {
    return notFound();
  }
  const {
    title,
    description,
    items,
    owner,
    currency,
    target_amount,
    contributed_amount,
  } = wishlist;
  const { photo } = owner || {};

  const currencySymbol = MAP_CURRENCIES_TO_SYMBOLS[currency];

  const percentageOfContribution = calculateProgressPercentage(
    wishlist.target_amount,
    wishlist.contributed_amount
  );

  const itemsSize = items?.length;
  const hasItems = itemsSize > 0 && !!items[0]?._id; // for case where wishlists with no items has contributed_amount

  return (
    <PublicLayout>
      <div className='relative overflow-hidden' id='top'>
        <div className='min-h-screen px-4 bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
          <div className='max-w-4xl mx-auto py-8 space-y-12'>
            <header className='text-center space-y-4'>
              <div className='relative inline-block'>
                <Link href={`/${username}/wishlists`} className='size-[100px]'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    alt='User Avatar'
                    width={100}
                    height={100}
                    className='rounded-full aspect-square border-4 border-amber-300 shadow-lg'
                    src={
                      photo ||
                      `https://api.dicebear.com/9.x/identicon/svg?seed=${username}`
                    }
                  />
                </Link>

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
                  className='lucide lucide-snowflake absolute -top-2 -right-2 text-blue-300'
                >
                  <line x1={2} x2={22} y1={12} y2={12} />
                  <line x1={12} x2={12} y1={2} y2={22} />
                  <path d='m20 16-4-4 4-4' />
                  <path d='m4 8 4 4-4 4' />
                  <path d='m16 4-4 4-4-4' />
                  <path d='m8 20 4-4 4 4' />
                </svg>
              </div>
              <h1 className='text-4xl font-bold text-red-700'>{title}</h1>
              <p className='text-xl text-green-700 italic'>{description}</p>
            </header>
            <section className='space-y-6'>
              <h2 className='text-2xl font-semibold text-center text-green-800'>
                Gift Wishes
              </h2>
              {hasItems && (
                <div className='space-y-3'>
                  <WishItemGroup items={items} currency={currency} />
                </div>
              )}
            </section>
            <section className='bg-white rounded-lg shadow-md p-6 space-y-4 max-w-4xl mx-auto'>
              <h2 className='text-2xl font-semibold text-center text-green-800'>
                Total Contributions
              </h2>
              <div className='text-center'>
                <span className='text-4xl font-bold text-red-700'>
                  {currencySymbol}
                  {formatCurrencyWithComma(contributed_amount) || 0}
                </span>
                <span className='text-xl text-gray-600'>
                  {" "}
                  / {currencySymbol}
                  {formatCurrencyWithComma(target_amount)}
                </span>
              </div>

              <Progress
                value={percentageOfContribution}
                className='h-4 bg-secondary'
              />

              <p className='text-center text-sm text-gray-600'>
                {percentageOfContribution}% of goal reached
              </p>
              <div className='text-center'>
                <a
                  href='#top'
                  className='text-xs rounded-md text-zinc-800 px-2 py-1.5 w-full'
                >
                  Add Your Support
                </a>
              </div>
            </section>
            <section className='space-y-4 max-w-4xl mx-auto'>
              <h2 className='text-2xl font-semibold text-center text-green-800'>
                Messages from Contributors
              </h2>
              <div className='bg-white rounded-lg shadow-md p-4 max-h-60 overflow-y-auto space-y-4'>
                {/* <div className='flex items-start space-x-3'>
                  <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                    <Image
                      fill
                      className='aspect-square h-full w-full'
                      alt='Alice'
                      src={DEFAULT_MALE_AVATAR}
                    />
                  </span>
                  <div>
                    <p className='font-semibold text-red-700'>Alice</p>
                    <p className='text-sm text-gray-600'>
                      Merry Christmas! Hope your wishlists come true!
                    </p>
                  </div>
                </div> */}

                <p className='text-zinc-600 text-xs text-center'>
                  Be the first to contribute and leave a message for {username}
                </p>
              </div>
            </section>
            <section className='space-y-4 max-w-4xl mx-auto'>
              <h2 className='text-2xl font-semibold text-center text-green-800'>
                Share the Joy
              </h2>
              <div className='flex justify-center space-x-4'>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700'>
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
                    className='lucide lucide-facebook mr-2 h-4 w-4'
                  >
                    <path d='M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' />
                  </svg>{" "}
                  Share
                </button>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input h-10 px-4 py-2 bg-sky-500 text-white hover:bg-sky-600'>
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
                    className='lucide lucide-twitter mr-2 h-4 w-4'
                  >
                    <path d='M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z' />
                  </svg>{" "}
                  Tweet
                </button>
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input h-10 px-4 py-2 bg-green-600 text-white hover:bg-green-700'>
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
                    className='lucide lucide-mail mr-2 h-4 w-4'
                  >
                    <rect width={20} height={16} x={2} y={4} rx={2} />
                    <path d='m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7' />
                  </svg>{" "}
                  Email
                </button>
              </div>
              <div className='flex items-center justify-center space-x-2 bg-white rounded-lg shadow-md p-2'>
                <input
                  readOnly
                  className='flex-grow bg-gray-100 p-2 rounded text-sm'
                  type='text'
                  defaultValue='https://example.com/john-wishcard'
                />
                <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-zinc-50 h-10 px-4 py-2 bg-yellow-500 text-white hover:bg-yellow-600'>
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
                    className='lucide lucide-share2 mr-2 h-4 w-4'
                  >
                    <circle cx={18} cy={5} r={3} />
                    <circle cx={6} cy={12} r={3} />
                    <circle cx={18} cy={19} r={3} />
                    <line x1='8.59' x2='15.42' y1='13.51' y2='17.49' />
                    <line x1='15.41' x2='8.59' y1='6.51' y2='10.49' />
                  </svg>{" "}
                  Copy
                  {/*  Copied */}
                </button>
              </div>
            </section>
            <footer className='text-center space-y-4'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width={32}
                height={32}
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
                className='lucide lucide-gift inline-block text-red-600 animate-bounce'
              >
                <rect x={3} y={8} width={18} height={4} rx={1} />
                <path d='M12 8v13' />
                <path d='M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7' />
                <path d='M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5' />
              </svg>
              <p className='text-xl font-semibold text-green-800'>
                Be part of the joy! Help make these wishlists come true!
              </p>
              <p className='text-sm text-gray-600'>
                © {new Date().getFullYear()} Christmas WishCard. Spread love and
                kindness this holiday season.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
