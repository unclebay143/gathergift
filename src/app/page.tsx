import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import HowItWorks from "@/components/public/HowItWorks";
import Testimonials from "@/components/public/Testimonials";
import CallToAction from "@/components/public/CallToAction";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Occasions } from "@/components/public/Occasions";

export default function LandingPage() {
  return (
    <div className='bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
      <Hero />
      <div className='mx-auto flex justify-center items-center flex-col'>
        <InfiniteMovingCards speed='slow' />
        <InfiniteMovingCards speed='slow' direction='right' />
      </div>
      <div className='bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
        <HowItWorks />
        <Occasions />
        <Features />
      </div>
      <Testimonials />
      <CallToAction />
    </div>
  );
}
