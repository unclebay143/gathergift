import { PublicLayout } from "@/app/public-layout";
import WishlistsCardGroup from "@/components/public/FeaturedWishlists";
import { getPublicWishlists } from "@/service/wishlists/wishlists.server";

export default async function ChristmasWishlist({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;

  const wishlists = await getPublicWishlists(username);
  const showWishlists = wishlists.length !== 0;

  return (
    <PublicLayout>
      <div className='relative overflow-hidden'>
        <div className='min-h-screen px-4 bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
          <div className='max-w-4xl mx-auto py-8 space-y-12'>
            <header className='text-center space-y-4'>
              <div className='relative inline-block'>
                <div className='size-[100px]'>
                  <img
                    alt='User Avatar'
                    width={100}
                    height={100}
                    className='rounded-full aspect-square border-4 border-amber-300 shadow-lg'
                    src={"https://avatars.githubusercontent.com/u/58919619?v=4"}
                  />
                </div>

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
              <h1 className='text-4xl font-bold text-red-700'>
                Unclebigbay&apos;s Christmas Wishlists
              </h1>
              <p className='text-xl text-green-700 italic'>
                Help make this Christmas magical!
              </p>
            </header>
            <div className='space-y-3' id='selections'>
              {/* Todo: all public wishlist lists goes here */}
              {showWishlists ? (
                <WishlistsCardGroup wishlists={wishlists} />
              ) : (
                <p className='text-center'>
                  This user doesn&apos;t have a public wishlist yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
