import connectMongoose from "@/lib/mongodb";
import { Wish } from "@/model/wish";

export const getAllWishlist = async () => {
  try {
    await connectMongoose();
    const wishlist = await Wish.find();
    return JSON.parse(JSON.stringify(wishlist));
  } catch (error) {
    console.error("Error fetching gifts: ", error);
    return null;
  }
};
