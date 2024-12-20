import { Button } from "@/components/ui/button";
import { Gift } from "lucide-react";
import Link from "next/link";

export default function CallToAction() {
  return (
    <div className='bg-red-700'>
      <div className='max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-extrabold text-white sm:text-4xl'>
          <span className='block'>Ready to start gathering gifts?</span>
          <span className='block'>Create your wishlist today.</span>
        </h2>
        <p className='mt-4 text-lg leading-6 text-red-200'>
          Join GatherGift now and experience the joy of collaborative gifting.
          It&apos;s free to start!
        </p>
        <Button
          className='mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-red-600 bg-white hover:bg-red-50 sm:w-auto'
          asChild
        >
          <Link href='/wishlists'>
            <Gift className='w-5 h-5 mr-2' />
            Create Your Wishlist
          </Link>
        </Button>
      </div>
    </div>
  );
}
