import { getCurrentUser } from "@/service/users/user.server";
import { getWishlist } from "@/service/wishlists/wishlists.server";
import { notFound } from "next/navigation";
import { SingleWishlistPage } from "./wishlist-id";

export default async function ChristmasWishlist({
  params,
}: {
  params: Promise<{ id: string; username: string }>;
}) {
  const { id, username } = await params;

  const [wishlist, currentUser] = await Promise.all([
    getWishlist({ id, username, visibility: "PUBLIC" }),
    getCurrentUser(),
  ]);

  if (!wishlist) {
    return notFound();
  }

  return (
    <SingleWishlistPage
      currentUser={currentUser}
      wishlist={wishlist}
      username={username}
    />
  );
}
