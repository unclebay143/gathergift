import { WishCard } from "../WishCard";
import { WishLists } from "@/types";

export default function WishlistsCardGroup({
  wishlists,
}: {
  wishlists: WishLists;
}) {
  return (
    <div className='flex flex-wrap justify-center gap-6 max-w-7xl w-full mx-auto lg:justify-start'>
      {wishlists.map((wishlist) => (
        <WishCard data={wishlist} key={wishlist._id} />
      ))}
    </div>
  );
}
