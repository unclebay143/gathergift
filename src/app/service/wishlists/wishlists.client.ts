import { Wishlist } from "@/types/wishlist";

const BASE_URL = "/api/wishlists";

export const addWishlist = async (wishlistData: Wishlist) => {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
    });
    if (!response.ok) {
        throw new Error("Error adding wishlist");
    }

    return response.json();
};

export const editWishlist = async (id: string, wishlistData: Wishlist) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(wishlistData),
    });

    if (!response.ok) {
        throw new Error("Error updating wishlist");
    }
    return response.json();
};

export const deleteWishlist = async (id: string) => {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error deleting wishlist");
    }
    return response.json();
}