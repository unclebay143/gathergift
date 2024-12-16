import { Button } from "@/components/ui/button";
import { Gift, Star, Heart } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <div className='relative overflow-hidden border-b'>
      <div className='max-w-7xl mx-auto'>
        <div className='relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-28'>
          <div className='mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 xl:px-0'>
            <div className='sm:text-center lg:text-left'>
              <h1 className='text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl'>
                <span className='block xl:inline'>Gather joy with</span>{" "}
                <span className='block text-green-600 xl:inline'>
                  collaborative gifting
                </span>
              </h1>
              <p className='mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0'>
                Create, share, and let people contribute to your wishlists for
                any occasion. Make gift-giving a delightful group experience
                with GatherGift.
              </p>
              <div className='mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start'>
                <div className='rounded-md shadow'>
                  <Button
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 md:py-4 md:text-lg md:px-10'
                    asChild
                  >
                    <Link href='/wishes'>
                      <Gift className='w-5 h-5 mr-2' />
                      Create Your Wishlist
                    </Link>
                  </Button>
                </div>
                <div className='mt-3 sm:mt-0 sm:ml-3'>
                  <Button
                    variant='outline'
                    className='w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 md:py-4 md:text-lg md:px-10'
                  >
                    Learn more
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='lg:absolute lg:inset-y-0 lg:right-0 lg:w-[40%] xl:w-1/2'>
        <div className='h-56 w-full sm:h-72 md:h-96 lg:w-full lg:h-full bg-red-100 flex items-center justify-center'>
          <div className='relative w-64 h-64'>
            <Gift className='absolute inset-0 w-full h-full text-red-500 animate-pulse' />
            <Star className='absolute top-0 left-0 w-12 h-12 text-yellow-400 animate-spin-slow' />
            <Heart className='absolute bottom-0 right-0 w-12 h-12 text-pink-400 animate-bounce' />
          </div>
        </div>
      </div>
    </div>
  );
}
