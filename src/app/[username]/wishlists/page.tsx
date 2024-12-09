import { featuredWishlists } from "@/components/public/FeaturedWishlists";
import { WishGroup } from "@/components/WishGroup";

export default function ChristmasWishlist() {
  return (
    <div className='relative overflow-hidden'>
      <div className='min-h-screen bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
        <div className='max-w-4xl mx-auto py-8 space-y-12'>
          <header className='text-center space-y-4'>
            <div className='relative inline-block'>
              <img
                alt='User Avatar'
                loading='lazy'
                width={100}
                height={100}
                decoding='async'
                className='rounded-full border-4 border-gold-300 shadow-lg'
                src='https://api.dicebear.com/9.x/micah/svg?seed=Rykerr'
                style={{ color: "transparent" }}
              />
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
              {/* <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 64 64'
                width={24}
                height={24}
                className='lucide lucide-snowflake absolute -top-2 -right-2 text-blue-300'
              >
                <polygon
                  fill='#4CAF50'
                  points='32 4 12 28 20 28 10 48 26 48 18 64 46 64 38 48 54 48 44 28 52 28 32 4'
                />
                <rect x='28' y='48' width='8' height='16' fill='#8B4513' />
                <circle cx='32' cy='12' r='2' fill='#FFEB3B' />
                <circle cx='24' cy='20' r='2' fill='#FF5722' />
                <circle cx='40' cy='20' r='2' fill='#FF5722' />
                <circle cx='32' cy='36' r='2' fill='#FFEB3B' />
              </svg> */}
            </div>
            <h1 className='text-4xl font-bold text-red-700'>
              John&apos;s Christmas Wishes
            </h1>
            <p className='text-xl text-green-700 italic'>
              Help make this Christmas magical!
            </p>
          </header>
          <section className='space-y-6'>
            <h2 className='text-2xl font-semibold text-center text-green-800'>
              Gift Wishes
            </h2>
            <div className='space-y-3'>
              <WishGroup items={featuredWishlists} />
            </div>
          </section>
          <section className='bg-white rounded-lg shadow-md p-6 space-y-4 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-semibold text-center text-green-800'>
              Total Contributions
            </h2>
            <div className='text-center'>
              <span className='text-4xl font-bold text-red-700'>$1500</span>
              <span className='text-xl text-gray-600'> / $5000</span>
            </div>
            <div
              aria-valuemax={100}
              aria-valuemin={0}
              role='progressbar'
              data-state='indeterminate'
              data-max={100}
              className='relative w-full overflow-hidden rounded-full bg-secondary h-4'
            >
              <div
                data-state='indeterminate'
                data-max={100}
                className='h-full w-full flex-1 bg-primary transition-all'
                style={{ transform: "translateX(-70%)" }}
              />
            </div>
            <p className='text-center text-sm text-gray-600'>
              30.0% of goal reached
            </p>
            <button
              className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 w-full bg-gold-500 hover:bg-gold-600 text-white'
              type='button'
              aria-haspopup='dialog'
              aria-expanded='false'
              aria-controls='radix-:r0:'
              data-state='closed'
            >
              Add Your Support
            </button>
          </section>
          <section className='space-y-4 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-semibold text-center text-green-800'>
              Messages from Contributors
            </h2>
            <div className='bg-white rounded-lg shadow-md p-4 max-h-60 overflow-y-auto space-y-4'>
              <div className='flex items-start space-x-3'>
                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                  <img
                    className='aspect-square h-full w-full'
                    alt='Alice'
                    src='https://api.dicebear.com/9.x/micah/svg?seed=Rykerrs'
                  />
                </span>
                <div>
                  <p className='font-semibold text-red-700'>Alice</p>
                  <p className='text-sm text-gray-600'>
                    Merry Christmas! Hope your wishes come true!
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                  <img
                    className='aspect-square h-full w-full'
                    alt='Bob'
                    src='https://api.dicebear.com/9.x/micah/svg?seed=Rykerfr'
                  />
                </span>
                <div>
                  <p className='font-semibold text-red-700'>Bob</p>
                  <p className='text-sm text-gray-600'>
                    Happy to contribute to your Christmas joy!
                  </p>
                </div>
              </div>
              <div className='flex items-start space-x-3'>
                <span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
                  <img
                    className='aspect-square h-full w-full'
                    alt='Charlie'
                    src='https://api.dicebear.com/9.x/micah/svg?seed=Rykwerr'
                  />
                </span>
                <div>
                  <p className='font-semibold text-red-700'>Charlie</p>
                  <p className='text-sm text-gray-600'>
                    Wishing you a wonderful holiday season!
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className='space-y-4 max-w-4xl mx-auto'>
            <h2 className='text-2xl font-semibold text-center text-green-800'>
              Share the Joy
            </h2>
            <div className='flex justify-center space-x-4'>
              <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700'>
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
              <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 px-4 py-2 bg-sky-500 text-white hover:bg-sky-600'>
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
              <button className='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input hover:text-accent-foreground h-10 px-4 py-2 bg-green-600 text-white hover:bg-green-700'>
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
              Be part of the joy! Help make these wishes come true!
            </p>
            <p className='text-sm text-gray-600'>
              © 2023 Christmas WishCard. Spread love and kindness this holiday
              season.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
}
