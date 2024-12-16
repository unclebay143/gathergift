import Hero from "@/components/public/Hero";
import Features from "@/components/public/Features";
import HowItWorks from "@/components/public/HowItWorks";
import Testimonials from "@/components/public/Testimonials";
import CallToAction from "@/components/public/CallToAction";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { Occasions } from "@/components/public/Occasions";
import { getPublicWishes } from "@/service/wishlists/wishlists.server";
import { PublicLayout } from "./public-layout";

export default async function LandingPage() {
  const wishes = await getPublicWishes();
  const showWishes = wishes.length !== 0;

  return (
    <PublicLayout>
      <div className='bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
        <Hero />
        {showWishes ? (
          <div className='mx-auto flex justify-center items-center flex-col'>
            <InfiniteMovingCards speed='slow' data={wishes.slice(1, 10)} />
            <InfiniteMovingCards
              speed='slow'
              direction='right'
              data={wishes.slice(10, 20)}
            />
          </div>
        ) : null}
        <div className='bg-gradient-to-b from-red-50 to-green-50 text-gray-800'>
          <HowItWorks />
          <Occasions />
          <Features />
        </div>
        <Testimonials />
        <CallToAction />
      </div>
    </PublicLayout>
  );
}
