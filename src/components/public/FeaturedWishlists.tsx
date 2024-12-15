import { wishes } from "@/utils/dummy";
import { WishCard } from "../WishCard";

export default function FeaturedWishlists() {
  return (
    <div className='flex flex-wrap justify-center gap-6 max-w-7xl mx-auto lg:justify-start'>
      {wishes.map((wishlist) => (
        <WishCard data={wishlist} key={wishlist._id} />
      ))}
    </div>
  );
}
