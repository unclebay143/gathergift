import * as React from "react";
import { CreateUpdateWish } from "./CreateUpdateWish";
import { getWishlist } from "@/service/wishlists/wishlists.server";

export default async function CreateUpdateWishPage({
  params,
}: {
  params: Promise<{ actionOrWishId: string }>;
}) {
  const actionOrWishId = (await params).actionOrWishId;

  const wishlist = await getWishlist({ id: actionOrWishId });

  return (
    <div className='relative container mx-auto px-4 py-8 min-h-[90vh] flex justify-between flex-col'>
      <CreateUpdateWish
        actionOrWishId={actionOrWishId}
        wishlistToEdit={wishlist}
      />
    </div>
  );
}
