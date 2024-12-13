import { Gift } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className='bg-white'>
      <div className='max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-center space-x-6'>
          <Link href='/' className='text-gray-400 hover:text-gray-500'>
            <span className='sr-only'>Home</span>
            <Gift className='h-6 w-6' aria-hidden='true' />
          </Link>
          <Link href='#' className='text-gray-400 hover:text-gray-500'>
            Facebook
          </Link>
          <Link href='#' className='text-gray-400 hover:text-gray-500'>
            Instagram
          </Link>
          <Link href='#' className='text-gray-400 hover:text-gray-500'>
            Twitter
          </Link>
        </div>
        <nav className='mt-8 flex justify-center space-x-4 text-sm text-gray-500'>
          <Link href='/about' className='hover:underline'>
            About
          </Link>
          <Link href='/community' className='hover:underline'>
            Community
          </Link>
          <Link href='/privacy' className='hover:underline'>
            Privacy Policy
          </Link>
          <Link href='/terms' className='hover:underline'>
            Terms of Service
          </Link>
        </nav>
        <p className='mt-8 text-center text-base text-gray-400'>
          © {new Date().getFullYear()} GatherGift. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
