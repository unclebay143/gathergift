import FeaturedWishlists from "@/components/public/FeaturedWishlists";
import Footer from "@/components/public/Footer";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunityPage() {
  return (
    <div className='min-h-screen  bg-gradient-to-b from-red-50 to-green-50 text-zinc-800'>
      <div className='mx-auto w-full py-4 sm:py-6 lg:p-8 space-y-16'>
        <header className='text-center space-y-6'>
          <div className='flex justify-center items-center space-x-2'>
            {/* <Gift className='text-red-600 w-12 h-12' /> */}
            <h1 className='text-5xl font-bold text-green-600'>
              Explore Community Wishlists
            </h1>
          </div>
          <p className='text-xl text-zinc-600 max-w-2xl mx-auto'>
            {/* Discover a world of meaningful moments and dreams waiting to be
            fulfilled. Browse through public wishlists created by our
            community—birthday celebrations, dream vacations, wedding
            registries, and more. Find a story that resonates with you and
            contribute to making someone&apos;s special occasion unforgettable.
            Together, we can turn wishes into reality. */}
            Explore wishlists shared by our community and contribute to making
            dreams come true. Support celebrations, milestones, and special
            moments that matter.
          </p>
          {/* <p className='text-xl text-zinc-600 max-w-2xl mx-auto'>
            Bring people together to make wishes come true. Create, share, and
            let loved ones contribute to gift wishlists for your occasion.
          </p> */}
          {/* <div className='flex justify-center space-x-4'>
            <Button className='bg-red-600 hover:bg-red-700 text-white'>
              Create Wishlist
            </Button>
          </div> */}
        </header>
        <FeaturedWishlists />
      </div>
    </div>
  );
}
