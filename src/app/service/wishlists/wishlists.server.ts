import connectMongoose from "@/lib/mongodb";
import { WishLists } from "@/model/wishlists";

export const getAllWishlist = async () => {
    try {
        await connectMongoose();
        const wishlist = await WishLists.find();
        return JSON.parse(JSON.stringify(wishlist));
    } catch (error) {
        console.error("Error fetching gifts: ", error);
        return null;
    }
}