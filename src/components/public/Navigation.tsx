import Link from "next/link";
import { Gift } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <nav className='bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-0'>
        <div className='flex justify-between h-16'>
          <div className='flex'>
            <Link href='/' className='flex-shrink-0 flex items-center'>
              <Gift className='h-8 w-8 text-red-600' />
              <span className='ml-2 text-2xl font-bold text-green-600'>
                GatherGift
              </span>
            </Link>
            <div className='hidden sm:ml-6 md:flex sm:space-x-8 items-center'>
              <Link
                href='/#how-it-works'
                className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700'
              >
                How It Works
              </Link>
              <Link
                href='/#features'
                className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700'
              >
                Features
              </Link>
              <Link
                href='/community'
                className='inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-700'
              >
                Community
              </Link>
            </div>
          </div>
          <div className='hidden sm:ml-6 sm:flex sm:items-center'>
            <Button variant='outline' className='mr-2' asChild>
              <Link href='/onboard'>Log in</Link>
            </Button>
            <Button asChild>
              <Link href='/onboard?view=signup'>Sign up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
