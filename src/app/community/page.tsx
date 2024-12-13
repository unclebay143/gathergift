import FeaturedWishlists from "@/components/public/FeaturedWishlists";
import { PublicLayout } from "../public-layout";

export default function CommunityPage() {
  return (
    <PublicLayout>
      <div className='min-h-screen  bg-gradient-to-b from-red-50 to-green-50 text-zinc-800'>
        <div className='mx-auto w-full py-4 sm:py-6 lg:p-8 space-y-16'>
          <header className='text-center space-y-6'>
            <div className='flex justify-center items-center space-x-2'>
              <h1 className='text-5xl font-bold text-green-600'>
                Community Wishlists
              </h1>
            </div>
            <p className='text-xl text-zinc-600 max-w-2xl mx-auto'>
              Explore wishlists shared by our community and contribute to making
              dreams come true. Support celebrations, milestones, and special
              moments that matter.
            </p>
          </header>
          <FeaturedWishlists />
        </div>
      </div>
    </PublicLayout>
  );
}
